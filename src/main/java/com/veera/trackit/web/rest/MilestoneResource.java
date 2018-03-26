package com.veera.trackit.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.veera.trackit.domain.Milestone;

import com.veera.trackit.repository.MilestoneRepository;
import com.veera.trackit.web.rest.errors.BadRequestAlertException;
import com.veera.trackit.web.rest.util.HeaderUtil;
import com.veera.trackit.service.dto.MilestoneDTO;
import com.veera.trackit.service.mapper.MilestoneMapper;
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
 * REST controller for managing Milestone.
 */
@RestController
@RequestMapping("/api")
public class MilestoneResource {

    private final Logger log = LoggerFactory.getLogger(MilestoneResource.class);

    private static final String ENTITY_NAME = "milestone";

    private final MilestoneRepository milestoneRepository;

    private final MilestoneMapper milestoneMapper;

    public MilestoneResource(MilestoneRepository milestoneRepository, MilestoneMapper milestoneMapper) {
        this.milestoneRepository = milestoneRepository;
        this.milestoneMapper = milestoneMapper;
    }

    /**
     * POST  /milestones : Create a new milestone.
     *
     * @param milestoneDTO the milestoneDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new milestoneDTO, or with status 400 (Bad Request) if the milestone has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/milestones")
    @Timed
    public ResponseEntity<MilestoneDTO> createMilestone(@Valid @RequestBody MilestoneDTO milestoneDTO) throws URISyntaxException {
        log.debug("REST request to save Milestone : {}", milestoneDTO);
        if (milestoneDTO.getId() != null) {
            throw new BadRequestAlertException("A new milestone cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Milestone milestone = milestoneMapper.toEntity(milestoneDTO);
        milestone = milestoneRepository.save(milestone);
        MilestoneDTO result = milestoneMapper.toDto(milestone);
        return ResponseEntity.created(new URI("/api/milestones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /milestones : Updates an existing milestone.
     *
     * @param milestoneDTO the milestoneDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated milestoneDTO,
     * or with status 400 (Bad Request) if the milestoneDTO is not valid,
     * or with status 500 (Internal Server Error) if the milestoneDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/milestones")
    @Timed
    public ResponseEntity<MilestoneDTO> updateMilestone(@Valid @RequestBody MilestoneDTO milestoneDTO) throws URISyntaxException {
        log.debug("REST request to update Milestone : {}", milestoneDTO);
        if (milestoneDTO.getId() == null) {
            return createMilestone(milestoneDTO);
        }
        Milestone milestone = milestoneMapper.toEntity(milestoneDTO);
        milestone = milestoneRepository.save(milestone);
        MilestoneDTO result = milestoneMapper.toDto(milestone);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, milestoneDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /milestones : get all the milestones.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of milestones in body
     */
    @GetMapping("/milestones")
    @Timed
    public List<MilestoneDTO> getAllMilestones() {
        log.debug("REST request to get all Milestones");
        List<Milestone> milestones = milestoneRepository.findAll();
        return milestoneMapper.toDto(milestones);
        }

    /**
     * GET  /milestones/:id : get the "id" milestone.
     *
     * @param id the id of the milestoneDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the milestoneDTO, or with status 404 (Not Found)
     */
    @GetMapping("/milestones/{id}")
    @Timed
    public ResponseEntity<MilestoneDTO> getMilestone(@PathVariable Long id) {
        log.debug("REST request to get Milestone : {}", id);
        Milestone milestone = milestoneRepository.findOne(id);
        MilestoneDTO milestoneDTO = milestoneMapper.toDto(milestone);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(milestoneDTO));
    }

    /**
     * DELETE  /milestones/:id : delete the "id" milestone.
     *
     * @param id the id of the milestoneDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/milestones/{id}")
    @Timed
    public ResponseEntity<Void> deleteMilestone(@PathVariable Long id) {
        log.debug("REST request to delete Milestone : {}", id);
        milestoneRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
