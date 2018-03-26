package com.veera.trackit.service.mapper;

import com.veera.trackit.domain.*;
import com.veera.trackit.service.dto.IterationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Iteration and its DTO IterationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface IterationMapper extends EntityMapper<IterationDTO, Iteration> {



    default Iteration fromId(Long id) {
        if (id == null) {
            return null;
        }
        Iteration iteration = new Iteration();
        iteration.setId(id);
        return iteration;
    }
}
