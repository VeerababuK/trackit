package com.veera.trackit.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.veera.trackit.domain.Epic;

import com.veera.trackit.repository.EpicRepository;
import com.veera.trackit.web.rest.errors.BadRequestAlertException;
import com.veera.trackit.web.rest.util.HeaderUtil;
import com.veera.trackit.web.rest.util.PaginationUtil;
import com.veera.trackit.service.dto.EpicDTO;
import com.veera.trackit.service.mapper.EpicMapper;
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
 * REST controller for managing Epic.
 */
@RestController
@RequestMapping("/api")
public class EpicResource {

    private final Logger log = LoggerFactory.getLogger(EpicResource.class);

    private static final String ENTITY_NAME = "epic";

    private final EpicRepository epicRepository;

    private final EpicMapper epicMapper;

    public EpicResource(EpicRepository epicRepository, EpicMapper epicMapper) {
        this.epicRepository = epicRepository;
        this.epicMapper = epicMapper;
    }

    /**
     * POST  /epics : Create a new epic.
     *
     * @param epicDTO the epicDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new epicDTO, or with status 400 (Bad Request) if the epic has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/epics")
    @Timed
    public ResponseEntity<EpicDTO> createEpic(@Valid @RequestBody EpicDTO epicDTO) throws URISyntaxException {
        log.debug("REST request to save Epic : {}", epicDTO);
        if (epicDTO.getId() != null) {
            throw new BadRequestAlertException("A new epic cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Epic epic = epicMapper.toEntity(epicDTO);
        epic = epicRepository.save(epic);
        EpicDTO result = epicMapper.toDto(epic);
        return ResponseEntity.created(new URI("/api/epics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /epics : Updates an existing epic.
     *
     * @param epicDTO the epicDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated epicDTO,
     * or with status 400 (Bad Request) if the epicDTO is not valid,
     * or with status 500 (Internal Server Error) if the epicDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/epics")
    @Timed
    public ResponseEntity<EpicDTO> updateEpic(@Valid @RequestBody EpicDTO epicDTO) throws URISyntaxException {
        log.debug("REST request to update Epic : {}", epicDTO);
        if (epicDTO.getId() == null) {
            return createEpic(epicDTO);
        }
        Epic epic = epicMapper.toEntity(epicDTO);
        epic = epicRepository.save(epic);
        EpicDTO result = epicMapper.toDto(epic);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, epicDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /epics : get all the epics.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of epics in body
     */
    @GetMapping("/epics")
    @Timed
    public ResponseEntity<List<EpicDTO>> getAllEpics(Pageable pageable) {
        log.debug("REST request to get a page of Epics");
        Page<Epic> page = epicRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/epics");
        return new ResponseEntity<>(epicMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /epics/:id : get the "id" epic.
     *
     * @param id the id of the epicDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the epicDTO, or with status 404 (Not Found)
     */
    @GetMapping("/epics/{id}")
    @Timed
    public ResponseEntity<EpicDTO> getEpic(@PathVariable Long id) {
        log.debug("REST request to get Epic : {}", id);
        Epic epic = epicRepository.findOne(id);
        EpicDTO epicDTO = epicMapper.toDto(epic);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(epicDTO));
    }

    /**
     * DELETE  /epics/:id : delete the "id" epic.
     *
     * @param id the id of the epicDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/epics/{id}")
    @Timed
    public ResponseEntity<Void> deleteEpic(@PathVariable Long id) {
        log.debug("REST request to delete Epic : {}", id);
        epicRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
