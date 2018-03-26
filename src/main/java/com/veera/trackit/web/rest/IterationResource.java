package com.veera.trackit.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.veera.trackit.domain.Iteration;

import com.veera.trackit.repository.IterationRepository;
import com.veera.trackit.web.rest.errors.BadRequestAlertException;
import com.veera.trackit.web.rest.util.HeaderUtil;
import com.veera.trackit.service.dto.IterationDTO;
import com.veera.trackit.service.mapper.IterationMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Iteration.
 */
@RestController
@RequestMapping("/api")
public class IterationResource {

    private final Logger log = LoggerFactory.getLogger(IterationResource.class);

    private static final String ENTITY_NAME = "iteration";

    private final IterationRepository iterationRepository;

    private final IterationMapper iterationMapper;

    public IterationResource(IterationRepository iterationRepository, IterationMapper iterationMapper) {
        this.iterationRepository = iterationRepository;
        this.iterationMapper = iterationMapper;
    }

    /**
     * POST  /iterations : Create a new iteration.
     *
     * @param iterationDTO the iterationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new iterationDTO, or with status 400 (Bad Request) if the iteration has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/iterations")
    @Timed
    public ResponseEntity<IterationDTO> createIteration(@Valid @RequestBody IterationDTO iterationDTO) throws URISyntaxException {
        log.debug("REST request to save Iteration : {}", iterationDTO);
        if (iterationDTO.getId() != null) {
            throw new BadRequestAlertException("A new iteration cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Iteration iteration = iterationMapper.toEntity(iterationDTO);
        iteration = iterationRepository.save(iteration);
        IterationDTO result = iterationMapper.toDto(iteration);
        return ResponseEntity.created(new URI("/api/iterations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /iterations : Updates an existing iteration.
     *
     * @param iterationDTO the iterationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated iterationDTO,
     * or with status 400 (Bad Request) if the iterationDTO is not valid,
     * or with status 500 (Internal Server Error) if the iterationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/iterations")
    @Timed
    public ResponseEntity<IterationDTO> updateIteration(@Valid @RequestBody IterationDTO iterationDTO) throws URISyntaxException {
        log.debug("REST request to update Iteration : {}", iterationDTO);
        if (iterationDTO.getId() == null) {
            return createIteration(iterationDTO);
        }
        Iteration iteration = iterationMapper.toEntity(iterationDTO);
        iteration = iterationRepository.save(iteration);
        IterationDTO result = iterationMapper.toDto(iteration);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, iterationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /iterations : get all the iterations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of iterations in body
     */
    @GetMapping("/iterations")
    @Timed
    public List<IterationDTO> getAllIterations() {
        log.debug("REST request to get all Iterations");
        List<Iteration> iterations = iterationRepository.findAll();
        return iterationMapper.toDto(iterations);
        }

    /**
     * GET  /iterations/:id : get the "id" iteration.
     *
     * @param id the id of the iterationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the iterationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/iterations/{id}")
    @Timed
    public ResponseEntity<IterationDTO> getIteration(@PathVariable Long id) {
        log.debug("REST request to get Iteration : {}", id);
        Iteration iteration = iterationRepository.findOne(id);
        IterationDTO iterationDTO = iterationMapper.toDto(iteration);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(iterationDTO));
    }

    /**
     * DELETE  /iterations/:id : delete the "id" iteration.
     *
     * @param id the id of the iterationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/iterations/{id}")
    @Timed
    public ResponseEntity<Void> deleteIteration(@PathVariable Long id) {
        log.debug("REST request to delete Iteration : {}", id);
        iterationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
