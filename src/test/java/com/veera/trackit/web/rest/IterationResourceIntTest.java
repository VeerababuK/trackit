package com.veera.trackit.web.rest;

import com.veera.trackit.TrackitApp;

import com.veera.trackit.domain.Iteration;
import com.veera.trackit.repository.IterationRepository;
import com.veera.trackit.service.dto.IterationDTO;
import com.veera.trackit.service.mapper.IterationMapper;
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
 * Test class for the IterationResource REST controller.
 *
 * @see IterationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TrackitApp.class)
public class IterationResourceIntTest {

    private static final String DEFAULT_ITERATION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ITERATION_NAME = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FROM_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FROM_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_TO_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TO_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private IterationRepository iterationRepository;

    @Autowired
    private IterationMapper iterationMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIterationMockMvc;

    private Iteration iteration;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IterationResource iterationResource = new IterationResource(iterationRepository, iterationMapper);
        this.restIterationMockMvc = MockMvcBuilders.standaloneSetup(iterationResource)
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
    public static Iteration createEntity(EntityManager em) {
        Iteration iteration = new Iteration()
            .iterationName(DEFAULT_ITERATION_NAME)
            .fromDate(DEFAULT_FROM_DATE)
            .toDate(DEFAULT_TO_DATE);
        return iteration;
    }

    @Before
    public void initTest() {
        iteration = createEntity(em);
    }

    @Test
    @Transactional
    public void createIteration() throws Exception {
        int databaseSizeBeforeCreate = iterationRepository.findAll().size();

        // Create the Iteration
        IterationDTO iterationDTO = iterationMapper.toDto(iteration);
        restIterationMockMvc.perform(post("/api/iterations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iterationDTO)))
            .andExpect(status().isCreated());

        // Validate the Iteration in the database
        List<Iteration> iterationList = iterationRepository.findAll();
        assertThat(iterationList).hasSize(databaseSizeBeforeCreate + 1);
        Iteration testIteration = iterationList.get(iterationList.size() - 1);
        assertThat(testIteration.getIterationName()).isEqualTo(DEFAULT_ITERATION_NAME);
        assertThat(testIteration.getFromDate()).isEqualTo(DEFAULT_FROM_DATE);
        assertThat(testIteration.getToDate()).isEqualTo(DEFAULT_TO_DATE);
    }

    @Test
    @Transactional
    public void createIterationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = iterationRepository.findAll().size();

        // Create the Iteration with an existing ID
        iteration.setId(1L);
        IterationDTO iterationDTO = iterationMapper.toDto(iteration);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIterationMockMvc.perform(post("/api/iterations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iterationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Iteration in the database
        List<Iteration> iterationList = iterationRepository.findAll();
        assertThat(iterationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIterationNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = iterationRepository.findAll().size();
        // set the field null
        iteration.setIterationName(null);

        // Create the Iteration, which fails.
        IterationDTO iterationDTO = iterationMapper.toDto(iteration);

        restIterationMockMvc.perform(post("/api/iterations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iterationDTO)))
            .andExpect(status().isBadRequest());

        List<Iteration> iterationList = iterationRepository.findAll();
        assertThat(iterationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllIterations() throws Exception {
        // Initialize the database
        iterationRepository.saveAndFlush(iteration);

        // Get all the iterationList
        restIterationMockMvc.perform(get("/api/iterations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(iteration.getId().intValue())))
            .andExpect(jsonPath("$.[*].iterationName").value(hasItem(DEFAULT_ITERATION_NAME.toString())))
            .andExpect(jsonPath("$.[*].fromDate").value(hasItem(sameInstant(DEFAULT_FROM_DATE))))
            .andExpect(jsonPath("$.[*].toDate").value(hasItem(sameInstant(DEFAULT_TO_DATE))));
    }

    @Test
    @Transactional
    public void getIteration() throws Exception {
        // Initialize the database
        iterationRepository.saveAndFlush(iteration);

        // Get the iteration
        restIterationMockMvc.perform(get("/api/iterations/{id}", iteration.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(iteration.getId().intValue()))
            .andExpect(jsonPath("$.iterationName").value(DEFAULT_ITERATION_NAME.toString()))
            .andExpect(jsonPath("$.fromDate").value(sameInstant(DEFAULT_FROM_DATE)))
            .andExpect(jsonPath("$.toDate").value(sameInstant(DEFAULT_TO_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingIteration() throws Exception {
        // Get the iteration
        restIterationMockMvc.perform(get("/api/iterations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIteration() throws Exception {
        // Initialize the database
        iterationRepository.saveAndFlush(iteration);
        int databaseSizeBeforeUpdate = iterationRepository.findAll().size();

        // Update the iteration
        Iteration updatedIteration = iterationRepository.findOne(iteration.getId());
        // Disconnect from session so that the updates on updatedIteration are not directly saved in db
        em.detach(updatedIteration);
        updatedIteration
            .iterationName(UPDATED_ITERATION_NAME)
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE);
        IterationDTO iterationDTO = iterationMapper.toDto(updatedIteration);

        restIterationMockMvc.perform(put("/api/iterations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iterationDTO)))
            .andExpect(status().isOk());

        // Validate the Iteration in the database
        List<Iteration> iterationList = iterationRepository.findAll();
        assertThat(iterationList).hasSize(databaseSizeBeforeUpdate);
        Iteration testIteration = iterationList.get(iterationList.size() - 1);
        assertThat(testIteration.getIterationName()).isEqualTo(UPDATED_ITERATION_NAME);
        assertThat(testIteration.getFromDate()).isEqualTo(UPDATED_FROM_DATE);
        assertThat(testIteration.getToDate()).isEqualTo(UPDATED_TO_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingIteration() throws Exception {
        int databaseSizeBeforeUpdate = iterationRepository.findAll().size();

        // Create the Iteration
        IterationDTO iterationDTO = iterationMapper.toDto(iteration);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIterationMockMvc.perform(put("/api/iterations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iterationDTO)))
            .andExpect(status().isCreated());

        // Validate the Iteration in the database
        List<Iteration> iterationList = iterationRepository.findAll();
        assertThat(iterationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIteration() throws Exception {
        // Initialize the database
        iterationRepository.saveAndFlush(iteration);
        int databaseSizeBeforeDelete = iterationRepository.findAll().size();

        // Get the iteration
        restIterationMockMvc.perform(delete("/api/iterations/{id}", iteration.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Iteration> iterationList = iterationRepository.findAll();
        assertThat(iterationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Iteration.class);
        Iteration iteration1 = new Iteration();
        iteration1.setId(1L);
        Iteration iteration2 = new Iteration();
        iteration2.setId(iteration1.getId());
        assertThat(iteration1).isEqualTo(iteration2);
        iteration2.setId(2L);
        assertThat(iteration1).isNotEqualTo(iteration2);
        iteration1.setId(null);
        assertThat(iteration1).isNotEqualTo(iteration2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(IterationDTO.class);
        IterationDTO iterationDTO1 = new IterationDTO();
        iterationDTO1.setId(1L);
        IterationDTO iterationDTO2 = new IterationDTO();
        assertThat(iterationDTO1).isNotEqualTo(iterationDTO2);
        iterationDTO2.setId(iterationDTO1.getId());
        assertThat(iterationDTO1).isEqualTo(iterationDTO2);
        iterationDTO2.setId(2L);
        assertThat(iterationDTO1).isNotEqualTo(iterationDTO2);
        iterationDTO1.setId(null);
        assertThat(iterationDTO1).isNotEqualTo(iterationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(iterationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(iterationMapper.fromId(null)).isNull();
    }
}
