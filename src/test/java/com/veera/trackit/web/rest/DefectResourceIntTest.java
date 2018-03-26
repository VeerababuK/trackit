package com.veera.trackit.web.rest;

import com.veera.trackit.TrackitApp;

import com.veera.trackit.domain.Defect;
import com.veera.trackit.repository.DefectRepository;
import com.veera.trackit.service.dto.DefectDTO;
import com.veera.trackit.service.mapper.DefectMapper;
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
 * Test class for the DefectResource REST controller.
 *
 * @see DefectResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TrackitApp.class)
public class DefectResourceIntTest {

    private static final String DEFAULT_DEFECT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DEFECT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_STATE = "AAAAAAAAAA";
    private static final String UPDATED_STATE = "BBBBBBBBBB";

    private static final String DEFAULT_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_NOTE = "BBBBBBBBBB";

    @Autowired
    private DefectRepository defectRepository;

    @Autowired
    private DefectMapper defectMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDefectMockMvc;

    private Defect defect;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DefectResource defectResource = new DefectResource(defectRepository, defectMapper);
        this.restDefectMockMvc = MockMvcBuilders.standaloneSetup(defectResource)
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
    public static Defect createEntity(EntityManager em) {
        Defect defect = new Defect()
            .defectName(DEFAULT_DEFECT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .state(DEFAULT_STATE)
            .note(DEFAULT_NOTE);
        return defect;
    }

    @Before
    public void initTest() {
        defect = createEntity(em);
    }

    @Test
    @Transactional
    public void createDefect() throws Exception {
        int databaseSizeBeforeCreate = defectRepository.findAll().size();

        // Create the Defect
        DefectDTO defectDTO = defectMapper.toDto(defect);
        restDefectMockMvc.perform(post("/api/defects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(defectDTO)))
            .andExpect(status().isCreated());

        // Validate the Defect in the database
        List<Defect> defectList = defectRepository.findAll();
        assertThat(defectList).hasSize(databaseSizeBeforeCreate + 1);
        Defect testDefect = defectList.get(defectList.size() - 1);
        assertThat(testDefect.getDefectName()).isEqualTo(DEFAULT_DEFECT_NAME);
        assertThat(testDefect.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testDefect.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testDefect.getNote()).isEqualTo(DEFAULT_NOTE);
    }

    @Test
    @Transactional
    public void createDefectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = defectRepository.findAll().size();

        // Create the Defect with an existing ID
        defect.setId(1L);
        DefectDTO defectDTO = defectMapper.toDto(defect);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDefectMockMvc.perform(post("/api/defects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(defectDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Defect in the database
        List<Defect> defectList = defectRepository.findAll();
        assertThat(defectList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDefectNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = defectRepository.findAll().size();
        // set the field null
        defect.setDefectName(null);

        // Create the Defect, which fails.
        DefectDTO defectDTO = defectMapper.toDto(defect);

        restDefectMockMvc.perform(post("/api/defects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(defectDTO)))
            .andExpect(status().isBadRequest());

        List<Defect> defectList = defectRepository.findAll();
        assertThat(defectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDefects() throws Exception {
        // Initialize the database
        defectRepository.saveAndFlush(defect);

        // Get all the defectList
        restDefectMockMvc.perform(get("/api/defects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(defect.getId().intValue())))
            .andExpect(jsonPath("$.[*].defectName").value(hasItem(DEFAULT_DEFECT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE.toString())));
    }

    @Test
    @Transactional
    public void getDefect() throws Exception {
        // Initialize the database
        defectRepository.saveAndFlush(defect);

        // Get the defect
        restDefectMockMvc.perform(get("/api/defects/{id}", defect.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(defect.getId().intValue()))
            .andExpect(jsonPath("$.defectName").value(DEFAULT_DEFECT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDefect() throws Exception {
        // Get the defect
        restDefectMockMvc.perform(get("/api/defects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDefect() throws Exception {
        // Initialize the database
        defectRepository.saveAndFlush(defect);
        int databaseSizeBeforeUpdate = defectRepository.findAll().size();

        // Update the defect
        Defect updatedDefect = defectRepository.findOne(defect.getId());
        // Disconnect from session so that the updates on updatedDefect are not directly saved in db
        em.detach(updatedDefect);
        updatedDefect
            .defectName(UPDATED_DEFECT_NAME)
            .description(UPDATED_DESCRIPTION)
            .state(UPDATED_STATE)
            .note(UPDATED_NOTE);
        DefectDTO defectDTO = defectMapper.toDto(updatedDefect);

        restDefectMockMvc.perform(put("/api/defects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(defectDTO)))
            .andExpect(status().isOk());

        // Validate the Defect in the database
        List<Defect> defectList = defectRepository.findAll();
        assertThat(defectList).hasSize(databaseSizeBeforeUpdate);
        Defect testDefect = defectList.get(defectList.size() - 1);
        assertThat(testDefect.getDefectName()).isEqualTo(UPDATED_DEFECT_NAME);
        assertThat(testDefect.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testDefect.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testDefect.getNote()).isEqualTo(UPDATED_NOTE);
    }

    @Test
    @Transactional
    public void updateNonExistingDefect() throws Exception {
        int databaseSizeBeforeUpdate = defectRepository.findAll().size();

        // Create the Defect
        DefectDTO defectDTO = defectMapper.toDto(defect);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDefectMockMvc.perform(put("/api/defects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(defectDTO)))
            .andExpect(status().isCreated());

        // Validate the Defect in the database
        List<Defect> defectList = defectRepository.findAll();
        assertThat(defectList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDefect() throws Exception {
        // Initialize the database
        defectRepository.saveAndFlush(defect);
        int databaseSizeBeforeDelete = defectRepository.findAll().size();

        // Get the defect
        restDefectMockMvc.perform(delete("/api/defects/{id}", defect.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Defect> defectList = defectRepository.findAll();
        assertThat(defectList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Defect.class);
        Defect defect1 = new Defect();
        defect1.setId(1L);
        Defect defect2 = new Defect();
        defect2.setId(defect1.getId());
        assertThat(defect1).isEqualTo(defect2);
        defect2.setId(2L);
        assertThat(defect1).isNotEqualTo(defect2);
        defect1.setId(null);
        assertThat(defect1).isNotEqualTo(defect2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DefectDTO.class);
        DefectDTO defectDTO1 = new DefectDTO();
        defectDTO1.setId(1L);
        DefectDTO defectDTO2 = new DefectDTO();
        assertThat(defectDTO1).isNotEqualTo(defectDTO2);
        defectDTO2.setId(defectDTO1.getId());
        assertThat(defectDTO1).isEqualTo(defectDTO2);
        defectDTO2.setId(2L);
        assertThat(defectDTO1).isNotEqualTo(defectDTO2);
        defectDTO1.setId(null);
        assertThat(defectDTO1).isNotEqualTo(defectDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(defectMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(defectMapper.fromId(null)).isNull();
    }
}
