package com.veera.trackit.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.veera.trackit.domain.Calendar;

import com.veera.trackit.repository.CalendarRepository;
import com.veera.trackit.web.rest.errors.BadRequestAlertException;
import com.veera.trackit.web.rest.util.HeaderUtil;
import com.veera.trackit.service.dto.CalendarDTO;
import com.veera.trackit.service.mapper.CalendarMapper;
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
 * REST controller for managing Calendar.
 */
@RestController
@RequestMapping("/api")
public class CalendarResource {

    private final Logger log = LoggerFactory.getLogger(CalendarResource.class);

    private static final String ENTITY_NAME = "calendar";

    private final CalendarRepository calendarRepository;

    private final CalendarMapper calendarMapper;

    public CalendarResource(CalendarRepository calendarRepository, CalendarMapper calendarMapper) {
        this.calendarRepository = calendarRepository;
        this.calendarMapper = calendarMapper;
    }

    /**
     * POST  /calendars : Create a new calendar.
     *
     * @param calendarDTO the calendarDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new calendarDTO, or with status 400 (Bad Request) if the calendar has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/calendars")
    @Timed
    public ResponseEntity<CalendarDTO> createCalendar(@Valid @RequestBody CalendarDTO calendarDTO) throws URISyntaxException {
        log.debug("REST request to save Calendar : {}", calendarDTO);
        if (calendarDTO.getId() != null) {
            throw new BadRequestAlertException("A new calendar cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Calendar calendar = calendarMapper.toEntity(calendarDTO);
        calendar = calendarRepository.save(calendar);
        CalendarDTO result = calendarMapper.toDto(calendar);
        return ResponseEntity.created(new URI("/api/calendars/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /calendars : Updates an existing calendar.
     *
     * @param calendarDTO the calendarDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated calendarDTO,
     * or with status 400 (Bad Request) if the calendarDTO is not valid,
     * or with status 500 (Internal Server Error) if the calendarDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/calendars")
    @Timed
    public ResponseEntity<CalendarDTO> updateCalendar(@Valid @RequestBody CalendarDTO calendarDTO) throws URISyntaxException {
        log.debug("REST request to update Calendar : {}", calendarDTO);
        if (calendarDTO.getId() == null) {
            return createCalendar(calendarDTO);
        }
        Calendar calendar = calendarMapper.toEntity(calendarDTO);
        calendar = calendarRepository.save(calendar);
        CalendarDTO result = calendarMapper.toDto(calendar);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, calendarDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /calendars : get all the calendars.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of calendars in body
     */
    @GetMapping("/calendars")
    @Timed
    public List<CalendarDTO> getAllCalendars() {
        log.debug("REST request to get all Calendars");
        List<Calendar> calendars = calendarRepository.findAll();
        return calendarMapper.toDto(calendars);
        }

    /**
     * GET  /calendars/:id : get the "id" calendar.
     *
     * @param id the id of the calendarDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the calendarDTO, or with status 404 (Not Found)
     */
    @GetMapping("/calendars/{id}")
    @Timed
    public ResponseEntity<CalendarDTO> getCalendar(@PathVariable Long id) {
        log.debug("REST request to get Calendar : {}", id);
        Calendar calendar = calendarRepository.findOne(id);
        CalendarDTO calendarDTO = calendarMapper.toDto(calendar);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(calendarDTO));
    }

    /**
     * DELETE  /calendars/:id : delete the "id" calendar.
     *
     * @param id the id of the calendarDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/calendars/{id}")
    @Timed
    public ResponseEntity<Void> deleteCalendar(@PathVariable Long id) {
        log.debug("REST request to delete Calendar : {}", id);
        calendarRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
