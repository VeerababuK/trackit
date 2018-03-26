package com.veera.trackit.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.veera.trackit.domain.ReleaseX;

import com.veera.trackit.repository.ReleaseXRepository;
import com.veera.trackit.web.rest.errors.BadRequestAlertException;
import com.veera.trackit.web.rest.util.HeaderUtil;
import com.veera.trackit.service.dto.ReleaseXDTO;
import com.veera.trackit.service.mapper.ReleaseXMapper;
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
 * REST controller for managing ReleaseX.
 */
@RestController
@RequestMapping("/api")
public class ReleaseXResource {

    private final Logger log = LoggerFactory.getLogger(ReleaseXResource.class);

    private static final String ENTITY_NAME = "releaseX";

    private final ReleaseXRepository releaseXRepository;

    private final ReleaseXMapper releaseXMapper;

    public ReleaseXResource(ReleaseXRepository releaseXRepository, ReleaseXMapper releaseXMapper) {
        this.releaseXRepository = releaseXRepository;
        this.releaseXMapper = releaseXMapper;
    }

    /**
     * POST  /release-xes : Create a new releaseX.
     *
     * @param releaseXDTO the releaseXDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new releaseXDTO, or with status 400 (Bad Request) if the releaseX has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/release-xes")
    @Timed
    public ResponseEntity<ReleaseXDTO> createReleaseX(@Valid @RequestBody ReleaseXDTO releaseXDTO) throws URISyntaxException {
        log.debug("REST request to save ReleaseX : {}", releaseXDTO);
        if (releaseXDTO.getId() != null) {
            throw new BadRequestAlertException("A new releaseX cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReleaseX releaseX = releaseXMapper.toEntity(releaseXDTO);
        releaseX = releaseXRepository.save(releaseX);
        ReleaseXDTO result = releaseXMapper.toDto(releaseX);
        return ResponseEntity.created(new URI("/api/release-xes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /release-xes : Updates an existing releaseX.
     *
     * @param releaseXDTO the releaseXDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated releaseXDTO,
     * or with status 400 (Bad Request) if the releaseXDTO is not valid,
     * or with status 500 (Internal Server Error) if the releaseXDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/release-xes")
    @Timed
    public ResponseEntity<ReleaseXDTO> updateReleaseX(@Valid @RequestBody ReleaseXDTO releaseXDTO) throws URISyntaxException {
        log.debug("REST request to update ReleaseX : {}", releaseXDTO);
        if (releaseXDTO.getId() == null) {
            return createReleaseX(releaseXDTO);
        }
        ReleaseX releaseX = releaseXMapper.toEntity(releaseXDTO);
        releaseX = releaseXRepository.save(releaseX);
        ReleaseXDTO result = releaseXMapper.toDto(releaseX);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, releaseXDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /release-xes : get all the releaseXES.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of releaseXES in body
     */
    @GetMapping("/release-xes")
    @Timed
    public List<ReleaseXDTO> getAllReleaseXES() {
        log.debug("REST request to get all ReleaseXES");
        List<ReleaseX> releaseXES = releaseXRepository.findAll();
        return releaseXMapper.toDto(releaseXES);
        }

    /**
     * GET  /release-xes/:id : get the "id" releaseX.
     *
     * @param id the id of the releaseXDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the releaseXDTO, or with status 404 (Not Found)
     */
    @GetMapping("/release-xes/{id}")
    @Timed
    public ResponseEntity<ReleaseXDTO> getReleaseX(@PathVariable Long id) {
        log.debug("REST request to get ReleaseX : {}", id);
        ReleaseX releaseX = releaseXRepository.findOne(id);
        ReleaseXDTO releaseXDTO = releaseXMapper.toDto(releaseX);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(releaseXDTO));
    }

    /**
     * DELETE  /release-xes/:id : delete the "id" releaseX.
     *
     * @param id the id of the releaseXDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/release-xes/{id}")
    @Timed
    public ResponseEntity<Void> deleteReleaseX(@PathVariable Long id) {
        log.debug("REST request to delete ReleaseX : {}", id);
        releaseXRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
