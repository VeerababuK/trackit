package com.veera.trackit.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.veera.trackit.domain.Defect;

import com.veera.trackit.repository.DefectRepository;
import com.veera.trackit.web.rest.errors.BadRequestAlertException;
import com.veera.trackit.web.rest.util.HeaderUtil;
import com.veera.trackit.service.dto.DefectDTO;
import com.veera.trackit.service.mapper.DefectMapper;
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
 * REST controller for managing Defect.
 */
@RestController
@RequestMapping("/api")
public class DefectResource {

    private final Logger log = LoggerFactory.getLogger(DefectResource.class);

    private static final String ENTITY_NAME = "defect";

    private final DefectRepository defectRepository;

    private final DefectMapper defectMapper;

    public DefectResource(DefectRepository defectRepository, DefectMapper defectMapper) {
        this.defectRepository = defectRepository;
        this.defectMapper = defectMapper;
    }

    /**
     * POST  /defects : Create a new defect.
     *
     * @param defectDTO the defectDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new defectDTO, or with status 400 (Bad Request) if the defect has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/defects")
    @Timed
    public ResponseEntity<DefectDTO> createDefect(@Valid @RequestBody DefectDTO defectDTO) throws URISyntaxException {
        log.debug("REST request to save Defect : {}", defectDTO);
        if (defectDTO.getId() != null) {
            throw new BadRequestAlertException("A new defect cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Defect defect = defectMapper.toEntity(defectDTO);
        defect = defectRepository.save(defect);
        DefectDTO result = defectMapper.toDto(defect);
        return ResponseEntity.created(new URI("/api/defects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /defects : Updates an existing defect.
     *
     * @param defectDTO the defectDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated defectDTO,
     * or with status 400 (Bad Request) if the defectDTO is not valid,
     * or with status 500 (Internal Server Error) if the defectDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/defects")
    @Timed
    public ResponseEntity<DefectDTO> updateDefect(@Valid @RequestBody DefectDTO defectDTO) throws URISyntaxException {
        log.debug("REST request to update Defect : {}", defectDTO);
        if (defectDTO.getId() == null) {
            return createDefect(defectDTO);
        }
        Defect defect = defectMapper.toEntity(defectDTO);
        defect = defectRepository.save(defect);
        DefectDTO result = defectMapper.toDto(defect);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, defectDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /defects : get all the defects.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of defects in body
     */
    @GetMapping("/defects")
    @Timed
    public List<DefectDTO> getAllDefects() {
        log.debug("REST request to get all Defects");
        List<Defect> defects = defectRepository.findAll();
        return defectMapper.toDto(defects);
        }

    /**
     * GET  /defects/:id : get the "id" defect.
     *
     * @param id the id of the defectDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the defectDTO, or with status 404 (Not Found)
     */
    @GetMapping("/defects/{id}")
    @Timed
    public ResponseEntity<DefectDTO> getDefect(@PathVariable Long id) {
        log.debug("REST request to get Defect : {}", id);
        Defect defect = defectRepository.findOne(id);
        DefectDTO defectDTO = defectMapper.toDto(defect);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(defectDTO));
    }

    /**
     * DELETE  /defects/:id : delete the "id" defect.
     *
     * @param id the id of the defectDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/defects/{id}")
    @Timed
    public ResponseEntity<Void> deleteDefect(@PathVariable Long id) {
        log.debug("REST request to delete Defect : {}", id);
        defectRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
