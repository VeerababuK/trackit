package com.veera.trackit.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.veera.trackit.domain.Feature;

import com.veera.trackit.repository.FeatureRepository;
import com.veera.trackit.web.rest.errors.BadRequestAlertException;
import com.veera.trackit.web.rest.util.HeaderUtil;
import com.veera.trackit.web.rest.util.PaginationUtil;
import com.veera.trackit.service.dto.FeatureDTO;
import com.veera.trackit.service.mapper.FeatureMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Feature.
 */
@RestController
@RequestMapping("/api")
public class FeatureResource {

    private final Logger log = LoggerFactory.getLogger(FeatureResource.class);

    private static final String ENTITY_NAME = "feature";

    private final FeatureRepository featureRepository;

    private final FeatureMapper featureMapper;

    public FeatureResource(FeatureRepository featureRepository, FeatureMapper featureMapper) {
        this.featureRepository = featureRepository;
        this.featureMapper = featureMapper;
    }

    /**
     * POST  /features : Create a new feature.
     *
     * @param featureDTO the featureDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new featureDTO, or with status 400 (Bad Request) if the feature has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/features")
    @Timed
    public ResponseEntity<FeatureDTO> createFeature(@Valid @RequestBody FeatureDTO featureDTO) throws URISyntaxException {
        log.debug("REST request to save Feature : {}", featureDTO);
        if (featureDTO.getId() != null) {
            throw new BadRequestAlertException("A new feature cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Feature feature = featureMapper.toEntity(featureDTO);
        feature = featureRepository.save(feature);
        FeatureDTO result = featureMapper.toDto(feature);
        return ResponseEntity.created(new URI("/api/features/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /features : Updates an existing feature.
     *
     * @param featureDTO the featureDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated featureDTO,
     * or with status 400 (Bad Request) if the featureDTO is not valid,
     * or with status 500 (Internal Server Error) if the featureDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/features")
    @Timed
    public ResponseEntity<FeatureDTO> updateFeature(@Valid @RequestBody FeatureDTO featureDTO) throws URISyntaxException {
        log.debug("REST request to update Feature : {}", featureDTO);
        if (featureDTO.getId() == null) {
            return createFeature(featureDTO);
        }
        Feature feature = featureMapper.toEntity(featureDTO);
        feature = featureRepository.save(feature);
        FeatureDTO result = featureMapper.toDto(feature);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, featureDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /features : get all the features.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of features in body
     */
    @GetMapping("/features")
    @Timed
    public ResponseEntity<List<FeatureDTO>> getAllFeatures(Pageable pageable) {
        log.debug("REST request to get a page of Features");
        Page<Feature> page = featureRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/features");
        return new ResponseEntity<>(featureMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /features/:id : get the "id" feature.
     *
     * @param id the id of the featureDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the featureDTO, or with status 404 (Not Found)
     */
    @GetMapping("/features/{id}")
    @Timed
    public ResponseEntity<FeatureDTO> getFeature(@PathVariable Long id) {
        log.debug("REST request to get Feature : {}", id);
        Feature feature = featureRepository.findOne(id);
        FeatureDTO featureDTO = featureMapper.toDto(feature);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(featureDTO));
    }

    /**
     * DELETE  /features/:id : delete the "id" feature.
     *
     * @param id the id of the featureDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/features/{id}")
    @Timed
    public ResponseEntity<Void> deleteFeature(@PathVariable Long id) {
        log.debug("REST request to delete Feature : {}", id);
        featureRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
