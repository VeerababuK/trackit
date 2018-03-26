package com.veera.trackit.web.rest;

import com.veera.trackit.TrackitApp;

import com.veera.trackit.domain.ReleaseX;
import com.veera.trackit.repository.ReleaseXRepository;
import com.veera.trackit.service.dto.ReleaseXDTO;
import com.veera.trackit.service.mapper.ReleaseXMapper;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.veera.trackit.web.rest.TestUtil.sameInstant;
import static com.veera.trackit.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ReleaseXResource REST controller.
 *
 * @see ReleaseXResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TrackitApp.class)
public class ReleaseXResourceIntTest {

    private static final String DEFAULT_RELEASE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_RELEASE_NAME = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FROM_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FROM_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_TO_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TO_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_NOTE = "BBBBBBBBBB";

    @Autowired
    private ReleaseXRepository releaseXRepository;

    @Autowired
    private ReleaseXMapper releaseXMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReleaseXMockMvc;

    private ReleaseX releaseX;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReleaseXResource releaseXResource = new ReleaseXResource(releaseXRepository, releaseXMapper);
        this.restReleaseXMockMvc = MockMvcBuilders.standaloneSetup(releaseXResource)
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
    public static ReleaseX createEntity(EntityManager em) {
        ReleaseX releaseX = new ReleaseX()
            .releaseName(DEFAULT_RELEASE_NAME)
            .fromDate(DEFAULT_FROM_DATE)
            .toDate(DEFAULT_TO_DATE)
            .note(DEFAULT_NOTE);
        return releaseX;
    }

    @Before
    public void initTest() {
        releaseX = createEntity(em);
    }

    @Test
    @Transactional
    public void createReleaseX() throws Exception {
        int databaseSizeBeforeCreate = releaseXRepository.findAll().size();

        // Create the ReleaseX
        ReleaseXDTO releaseXDTO = releaseXMapper.toDto(releaseX);
        restReleaseXMockMvc.perform(post("/api/release-xes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(releaseXDTO)))
            .andExpect(status().isCreated());

        // Validate the ReleaseX in the database
        List<ReleaseX> releaseXList = releaseXRepository.findAll();
        assertThat(releaseXList).hasSize(databaseSizeBeforeCreate + 1);
        ReleaseX testReleaseX = releaseXList.get(releaseXList.size() - 1);
        assertThat(testReleaseX.getReleaseName()).isEqualTo(DEFAULT_RELEASE_NAME);
        assertThat(testReleaseX.getFromDate()).isEqualTo(DEFAULT_FROM_DATE);
        assertThat(testReleaseX.getToDate()).isEqualTo(DEFAULT_TO_DATE);
        assertThat(testReleaseX.getNote()).isEqualTo(DEFAULT_NOTE);
    }

    @Test
    @Transactional
    public void createReleaseXWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = releaseXRepository.findAll().size();

        // Create the ReleaseX with an existing ID
        releaseX.setId(1L);
        ReleaseXDTO releaseXDTO = releaseXMapper.toDto(releaseX);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReleaseXMockMvc.perform(post("/api/release-xes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(releaseXDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ReleaseX in the database
        List<ReleaseX> releaseXList = releaseXRepository.findAll();
        assertThat(releaseXList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkReleaseNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = releaseXRepository.findAll().size();
        // set the field null
        releaseX.setReleaseName(null);

        // Create the ReleaseX, which fails.
        ReleaseXDTO releaseXDTO = releaseXMapper.toDto(releaseX);

        restReleaseXMockMvc.perform(post("/api/release-xes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(releaseXDTO)))
            .andExpect(status().isBadRequest());

        List<ReleaseX> releaseXList = releaseXRepository.findAll();
        assertThat(releaseXList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReleaseXES() throws Exception {
        // Initialize the database
        releaseXRepository.saveAndFlush(releaseX);

        // Get all the releaseXList
        restReleaseXMockMvc.perform(get("/api/release-xes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(releaseX.getId().intValue())))
            .andExpect(jsonPath("$.[*].releaseName").value(hasItem(DEFAULT_RELEASE_NAME.toString())))
            .andExpect(jsonPath("$.[*].fromDate").value(hasItem(sameInstant(DEFAULT_FROM_DATE))))
            .andExpect(jsonPath("$.[*].toDate").value(hasItem(sameInstant(DEFAULT_TO_DATE))))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE.toString())));
    }

    @Test
    @Transactional
    public void getReleaseX() throws Exception {
        // Initialize the database
        releaseXRepository.saveAndFlush(releaseX);

        // Get the releaseX
        restReleaseXMockMvc.perform(get("/api/release-xes/{id}", releaseX.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(releaseX.getId().intValue()))
            .andExpect(jsonPath("$.releaseName").value(DEFAULT_RELEASE_NAME.toString()))
            .andExpect(jsonPath("$.fromDate").value(sameInstant(DEFAULT_FROM_DATE)))
            .andExpect(jsonPath("$.toDate").value(sameInstant(DEFAULT_TO_DATE)))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReleaseX() throws Exception {
        // Get the releaseX
        restReleaseXMockMvc.perform(get("/api/release-xes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReleaseX() throws Exception {
        // Initialize the database
        releaseXRepository.saveAndFlush(releaseX);
        int databaseSizeBeforeUpdate = releaseXRepository.findAll().size();

        // Update the releaseX
        ReleaseX updatedReleaseX = releaseXRepository.findOne(releaseX.getId());
        // Disconnect from session so that the updates on updatedReleaseX are not directly saved in db
        em.detach(updatedReleaseX);
        updatedReleaseX
            .releaseName(UPDATED_RELEASE_NAME)
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE)
            .note(UPDATED_NOTE);
        ReleaseXDTO releaseXDTO = releaseXMapper.toDto(updatedReleaseX);

        restReleaseXMockMvc.perform(put("/api/release-xes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(releaseXDTO)))
            .andExpect(status().isOk());

        // Validate the ReleaseX in the database
        List<ReleaseX> releaseXList = releaseXRepository.findAll();
        assertThat(releaseXList).hasSize(databaseSizeBeforeUpdate);
        ReleaseX testReleaseX = releaseXList.get(releaseXList.size() - 1);
        assertThat(testReleaseX.getReleaseName()).isEqualTo(UPDATED_RELEASE_NAME);
        assertThat(testReleaseX.getFromDate()).isEqualTo(UPDATED_FROM_DATE);
        assertThat(testReleaseX.getToDate()).isEqualTo(UPDATED_TO_DATE);
        assertThat(testReleaseX.getNote()).isEqualTo(UPDATED_NOTE);
    }

    @Test
    @Transactional
    public void updateNonExistingReleaseX() throws Exception {
        int databaseSizeBeforeUpdate = releaseXRepository.findAll().size();

        // Create the ReleaseX
        ReleaseXDTO releaseXDTO = releaseXMapper.toDto(releaseX);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReleaseXMockMvc.perform(put("/api/release-xes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(releaseXDTO)))
            .andExpect(status().isCreated());

        // Validate the ReleaseX in the database
        List<ReleaseX> releaseXList = releaseXRepository.findAll();
        assertThat(releaseXList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteReleaseX() throws Exception {
        // Initialize the database
        releaseXRepository.saveAndFlush(releaseX);
        int databaseSizeBeforeDelete = releaseXRepository.findAll().size();

        // Get the releaseX
        restReleaseXMockMvc.perform(delete("/api/release-xes/{id}", releaseX.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReleaseX> releaseXList = releaseXRepository.findAll();
        assertThat(releaseXList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReleaseX.class);
        ReleaseX releaseX1 = new ReleaseX();
        releaseX1.setId(1L);
        ReleaseX releaseX2 = new ReleaseX();
        releaseX2.setId(releaseX1.getId());
        assertThat(releaseX1).isEqualTo(releaseX2);
        releaseX2.setId(2L);
        assertThat(releaseX1).isNotEqualTo(releaseX2);
        releaseX1.setId(null);
        assertThat(releaseX1).isNotEqualTo(releaseX2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReleaseXDTO.class);
        ReleaseXDTO releaseXDTO1 = new ReleaseXDTO();
        releaseXDTO1.setId(1L);
        ReleaseXDTO releaseXDTO2 = new ReleaseXDTO();
        assertThat(releaseXDTO1).isNotEqualTo(releaseXDTO2);
        releaseXDTO2.setId(releaseXDTO1.getId());
        assertThat(releaseXDTO1).isEqualTo(releaseXDTO2);
        releaseXDTO2.setId(2L);
        assertThat(releaseXDTO1).isNotEqualTo(releaseXDTO2);
        releaseXDTO1.setId(null);
        assertThat(releaseXDTO1).isNotEqualTo(releaseXDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(releaseXMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(releaseXMapper.fromId(null)).isNull();
    }
}
