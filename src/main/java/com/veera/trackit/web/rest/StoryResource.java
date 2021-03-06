package com.veera.trackit.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.veera.trackit.domain.Story;

import com.veera.trackit.repository.StoryRepository;
import com.veera.trackit.web.rest.errors.BadRequestAlertException;
import com.veera.trackit.web.rest.util.HeaderUtil;
import com.veera.trackit.web.rest.util.PaginationUtil;
import com.veera.trackit.service.dto.StoryDTO;
import com.veera.trackit.service.mapper.StoryMapper;
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
 * REST controller for managing Story.
 */
@RestController
@RequestMapping("/api")
public class StoryResource {

    private final Logger log = LoggerFactory.getLogger(StoryResource.class);

    private static final String ENTITY_NAME = "story";

    private final StoryRepository storyRepository;

    private final StoryMapper storyMapper;

    public StoryResource(StoryRepository storyRepository, StoryMapper storyMapper) {
        this.storyRepository = storyRepository;
        this.storyMapper = storyMapper;
    }

    /**
     * POST  /stories : Create a new story.
     *
     * @param storyDTO the storyDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new storyDTO, or with status 400 (Bad Request) if the story has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stories")
    @Timed
    public ResponseEntity<StoryDTO> createStory(@Valid @RequestBody StoryDTO storyDTO) throws URISyntaxException {
        log.debug("REST request to save Story : {}", storyDTO);
        if (storyDTO.getId() != null) {
            throw new BadRequestAlertException("A new story cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Story story = storyMapper.toEntity(storyDTO);
        story = storyRepository.save(story);
        StoryDTO result = storyMapper.toDto(story);
        return ResponseEntity.created(new URI("/api/stories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stories : Updates an existing story.
     *
     * @param storyDTO the storyDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated storyDTO,
     * or with status 400 (Bad Request) if the storyDTO is not valid,
     * or with status 500 (Internal Server Error) if the storyDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stories")
    @Timed
    public ResponseEntity<StoryDTO> updateStory(@Valid @RequestBody StoryDTO storyDTO) throws URISyntaxException {
        log.debug("REST request to update Story : {}", storyDTO);
        if (storyDTO.getId() == null) {
            return createStory(storyDTO);
        }
        Story story = storyMapper.toEntity(storyDTO);
        story = storyRepository.save(story);
        StoryDTO result = storyMapper.toDto(story);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, storyDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stories : get all the stories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of stories in body
     */
    @GetMapping("/stories")
    @Timed
    public ResponseEntity<List<StoryDTO>> getAllStories(Pageable pageable) {
        log.debug("REST request to get a page of Stories");
        Page<Story> page = storyRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/stories");
        return new ResponseEntity<>(storyMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /stories/:id : get the "id" story.
     *
     * @param id the id of the storyDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the storyDTO, or with status 404 (Not Found)
     */
    @GetMapping("/stories/{id}")
    @Timed
    public ResponseEntity<StoryDTO> getStory(@PathVariable Long id) {
        log.debug("REST request to get Story : {}", id);
        Story story = storyRepository.findOne(id);
        StoryDTO storyDTO = storyMapper.toDto(story);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(storyDTO));
    }

    /**
     * DELETE  /stories/:id : delete the "id" story.
     *
     * @param id the id of the storyDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stories/{id}")
    @Timed
    public ResponseEntity<Void> deleteStory(@PathVariable Long id) {
        log.debug("REST request to delete Story : {}", id);
        storyRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
