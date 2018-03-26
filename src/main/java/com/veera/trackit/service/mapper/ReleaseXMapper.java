package com.veera.trackit.service.mapper;

import com.veera.trackit.domain.*;
import com.veera.trackit.service.dto.ReleaseXDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ReleaseX and its DTO ReleaseXDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ReleaseXMapper extends EntityMapper<ReleaseXDTO, ReleaseX> {



    default ReleaseX fromId(Long id) {
        if (id == null) {
            return null;
        }
        ReleaseX releaseX = new ReleaseX();
        releaseX.setId(id);
        return releaseX;
    }
}
