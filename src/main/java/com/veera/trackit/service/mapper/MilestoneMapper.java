package com.veera.trackit.service.mapper;

import com.veera.trackit.domain.*;
import com.veera.trackit.service.dto.MilestoneDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Milestone and its DTO MilestoneDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MilestoneMapper extends EntityMapper<MilestoneDTO, Milestone> {



    default Milestone fromId(Long id) {
        if (id == null) {
            return null;
        }
        Milestone milestone = new Milestone();
        milestone.setId(id);
        return milestone;
    }
}
