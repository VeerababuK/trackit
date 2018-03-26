package com.veera.trackit.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.veera.trackit.domain.Discussion;

import com.veera.trackit.repository.DiscussionRepository;
import com.veera.trackit.web.rest.errors.BadRequestAlertException;
import com.veera.trackit.web.rest.util.HeaderUtil;
import com.veera.trackit.service.dto.DiscussionDTO;
import com.veera.trackit.service.mapper.DiscussionMapper;
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
 * REST controller for managing Discussion.
 */
@RestController
@RequestMapping("/api")
public class DiscussionResource {

    private final Logger log = LoggerFactory.getLogger(DiscussionResource.class);

    private static final String ENTITY_NAME = "discussion";

    private final DiscussionRepository discussionRepository;

    private final DiscussionMapper discussionMapper;

    public DiscussionResource(DiscussionRepository discussionRepository, DiscussionMapper discussionMapper) {
        this.discussionRepository = discussionRepository;
        this.discussionMapper = discussionMapper;
    }

    /**
     * POST  /discussions : Create a new discussion.
     *
     * @param discussionDTO the discussionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new discussionDTO, or with status 400 (Bad Request) if the discussion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/discussions")
    @Timed
    public ResponseEntity<DiscussionDTO> createDiscussion(@Valid @RequestBody DiscussionDTO discussionDTO) throws URISyntaxException {
        log.debug("REST request to save Discussion : {}", discussionDTO);
        if (discussionDTO.getId() != null) {
            throw new BadRequestAlertException("A new discussion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Discussion discussion = discussionMapper.toEntity(discussionDTO);
        discussion = discussionRepository.save(discussion);
        DiscussionDTO result = discussionMapper.toDto(discussion);
        return ResponseEntity.created(new URI("/api/discussions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /discussions : Updates an existing discussion.
     *
     * @param discussionDTO the discussionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated discussionDTO,
     * or with status 400 (Bad Request) if the discussionDTO is not valid,
     * or with status 500 (Internal Server Error) if the discussionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/discussions")
    @Timed
    public ResponseEntity<DiscussionDTO> updateDiscussion(@Valid @RequestBody DiscussionDTO discussionDTO) throws URISyntaxException {
        log.debug("REST request to update Discussion : {}", discussionDTO);
        if (discussionDTO.getId() == null) {
            return createDiscussion(discussionDTO);
        }
        Discussion discussion = discussionMapper.toEntity(discussionDTO);
        discussion = discussionRepository.save(discussion);
        DiscussionDTO result = discussionMapper.toDto(discussion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, discussionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /discussions : get all the discussions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of discussions in body
     */
    @GetMapping("/discussions")
    @Timed
    public List<DiscussionDTO> getAllDiscussions() {
        log.debug("REST request to get all Discussions");
        List<Discussion> discussions = discussionRepository.findAll();
        return discussionMapper.toDto(discussions);
        }

    /**
     * GET  /discussions/:id : get the "id" discussion.
     *
     * @param id the id of the discussionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the discussionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/discussions/{id}")
    @Timed
    public ResponseEntity<DiscussionDTO> getDiscussion(@PathVariable Long id) {
        log.debug("REST request to get Discussion : {}", id);
        Discussion discussion = discussionRepository.findOne(id);
        DiscussionDTO discussionDTO = discussionMapper.toDto(discussion);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(discussionDTO));
    }

    /**
     * DELETE  /discussions/:id : delete the "id" discussion.
     *
     * @param id the id of the discussionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/discussions/{id}")
    @Timed
    public ResponseEntity<Void> deleteDiscussion(@PathVariable Long id) {
        log.debug("REST request to delete Discussion : {}", id);
        discussionRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
