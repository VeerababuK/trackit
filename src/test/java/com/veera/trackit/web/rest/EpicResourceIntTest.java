package com.veera.trackit.web.rest;

import com.veera.trackit.TrackitApp;

import com.veera.trackit.domain.Epic;
import com.veera.trackit.repository.EpicRepository;
import com.veera.trackit.service.dto.EpicDTO;
import com.veera.trackit.service.mapper.EpicMapper;
import com.veera.trackit.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.veera.trackit.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EpicResource REST controller.
 *
 * @see EpicResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TrackitApp.class)
public class EpicResourceIntTest {

    private static final String DEFAULT_EPIC_NAME = "AAAAAAAAAA";
    private static final String UPDATED_EPIC_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_STATE = "AAAAAAAAAA";
    private static final String UPDATED_STATE = "BBBBBBBBBB";

    private static final String DEFAULT_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_NOTE = "BBBBBBBBBB";

    @Autowired
    private EpicRepository epicRepository;

    @Autowired
    private EpicMapper epicMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEpicMockMvc;

    private Epic epic;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EpicResource epicResource = new EpicResource(epicRepository, epicMapper);
        this.restEpicMockMvc = MockMvcBuilders.standaloneSetup(epicResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Epic createEntity(EntityManager em) {
        Epic epic = new Epic()
            .epicName(DEFAULT_EPIC_NAME)
            .description(DEFAULT_DESCRIPTION)
            .state(DEFAULT_STATE)
            .note(DEFAULT_NOTE);
        return epic;
    }

    @Before
    public void initTest() {
        epic = createEntity(em);
    }

    @Test
    @Transactional
    public void createEpic() throws Exception {
        int databaseSizeBeforeCreate = epicRepository.findAll().size();

        // Create the Epic
        EpicDTO epicDTO = epicMapper.toDto(epic);
        restEpicMockMvc.perform(post("/api/epics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(epicDTO)))
            .andExpect(status().isCreated());

        // Validate the Epic in the database
        List<Epic> epicList = epicRepository.findAll();
        assertThat(epicList).hasSize(databaseSizeBeforeCreate + 1);
        Epic testEpic = epicList.get(epicList.size() - 1);
        assertThat(testEpic.getEpicName()).isEqualTo(DEFAULT_EPIC_NAME);
        assertThat(testEpic.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEpic.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testEpic.getNote()).isEqualTo(DEFAULT_NOTE);
    }

    @Test
    @Transactional
    public void createEpicWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = epicRepository.findAll().size();

        // Create the Epic with an existing ID
        epic.setId(1L);
        EpicDTO epicDTO = epicMapper.toDto(epic);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEpicMockMvc.perform(post("/api/epics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(epicDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Epic in the database
        List<Epic> epicList = epicRepository.findAll();
        assertThat(epicList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkEpicNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = epicRepository.findAll().size();
        // set the field null
        epic.setEpicName(null);

        // Create the Epic, which fails.
        EpicDTO epicDTO = epicMapper.toDto(epic);

        restEpicMockMvc.perform(post("/api/epics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(epicDTO)))
            .andExpect(status().isBadRequest());

        List<Epic> epicList = epicRepository.findAll();
        assertThat(epicList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEpics() throws Exception {
        // Initialize the database
        epicRepository.saveAndFlush(epic);

        // Get all the epicList
        restEpicMockMvc.perform(get("/api/epics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(epic.getId().intValue())))
            .andExpect(jsonPath("$.[*].epicName").value(hasItem(DEFAULT_EPIC_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE.toString())));
    }

    @Test
    @Transactional
    public void getEpic() throws Exception {
        // Initialize the database
        epicRepository.saveAndFlush(epic);

        // Get the epic
        restEpicMockMvc.perform(get("/api/epics/{id}", epic.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(epic.getId().intValue()))
            .andExpect(jsonPath("$.epicName").value(DEFAULT_EPIC_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEpic() throws Exception {
        // Get the epic
        restEpicMockMvc.perform(get("/api/epics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEpic() throws Exception {
        // Initialize the database
        epicRepository.saveAndFlush(epic);
        int databaseSizeBeforeUpdate = epicRepository.findAll().size();

        // Update the epic
        Epic updatedEpic = epicRepository.findOne(epic.getId());
        // Disconnect from session so that the updates on updatedEpic are not directly saved in db
        em.detach(updatedEpic);
        updatedEpic
            .epicName(UPDATED_EPIC_NAME)
            .description(UPDATED_DESCRIPTION)
            .state(UPDATED_STATE)
            .note(UPDATED_NOTE);
        EpicDTO epicDTO = epicMapper.toDto(updatedEpic);

        restEpicMockMvc.perform(put("/api/epics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(epicDTO)))
            .andExpect(status().isOk());

        // Validate the Epic in the database
        List<Epic> epicList = epicRepository.findAll();
        assertThat(epicList).hasSize(databaseSizeBeforeUpdate);
        Epic testEpic = epicList.get(epicList.size() - 1);
        assertThat(testEpic.getEpicName()).isEqualTo(UPDATED_EPIC_NAME);
        assertThat(testEpic.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEpic.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testEpic.getNote()).isEqualTo(UPDATED_NOTE);
    }

    @Test
    @Transactional
    public void updateNonExistingEpic() throws Exception {
        int databaseSizeBeforeUpdate = epicRepository.findAll().size();

        // Create the Epic
        EpicDTO epicDTO = epicMapper.toDto(epic);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEpicMockMvc.perform(put("/api/epics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(epicDTO)))
            .andExpect(status().isCreated());

        // Validate the Epic in the database
        List<Epic> epicList = epicRepository.findAll();
        assertThat(epicList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEpic() throws Exception {
        // Initialize the database
        epicRepository.saveAndFlush(epic);
        int databaseSizeBeforeDelete = epicRepository.findAll().size();

        // Get the epic
        restEpicMockMvc.perform(delete("/api/epics/{id}", epic.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Epic> epicList = epicRepository.findAll();
        assertThat(epicList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Epic.class);
        Epic epic1 = new Epic();
        epic1.setId(1L);
        Epic epic2 = new Epic();
        epic2.setId(epic1.getId());
        assertThat(epic1).isEqualTo(epic2);
        epic2.setId(2L);
        assertThat(epic1).isNotEqualTo(epic2);
        epic1.setId(null);
        assertThat(epic1).isNotEqualTo(epic2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EpicDTO.class);
        EpicDTO epicDTO1 = new EpicDTO();
        epicDTO1.setId(1L);
        EpicDTO epicDTO2 = new EpicDTO();
        assertThat(epicDTO1).isNotEqualTo(epicDTO2);
        epicDTO2.setId(epicDTO1.getId());
        assertThat(epicDTO1).isEqualTo(epicDTO2);
        epicDTO2.setId(2L);
        assertThat(epicDTO1).isNotEqualTo(epicDTO2);
        epicDTO1.setId(null);
        assertThat(epicDTO1).isNotEqualTo(epicDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(epicMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(epicMapper.fromId(null)).isNull();
    }
}
