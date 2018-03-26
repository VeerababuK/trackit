package com.veera.trackit.service.mapper;

import com.veera.trackit.domain.*;
import com.veera.trackit.service.dto.CalendarDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Calendar and its DTO CalendarDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CalendarMapper extends EntityMapper<CalendarDTO, Calendar> {



    default Calendar fromId(Long id) {
        if (id == null) {
            return null;
        }
        Calendar calendar = new Calendar();
        calendar.setId(id);
        return calendar;
    }
}
