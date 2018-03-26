package com.veera.trackit.service.mapper;

import com.veera.trackit.domain.*;
import com.veera.trackit.service.dto.EpicDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Epic and its DTO EpicDTO.
 */
@Mapper(componentModel = "spring", uses = {ReleaseXMapper.class, MilestoneMapper.class, MemberMapper.class})
public interface EpicMapper extends EntityMapper<EpicDTO, Epic> {

    @Mapping(source = "releaseX.id", target = "releaseXId")
    @Mapping(source = "milestone.id", target = "milestoneId")
    @Mapping(source = "member.id", target = "memberId")
    EpicDTO toDto(Epic epic);

    @Mapping(source = "releaseXId", target = "releaseX")
    @Mapping(source = "milestoneId", target = "milestone")
    @Mapping(target = "features", ignore = true)
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "discussions", ignore = true)
    @Mapping(source = "memberId", target = "member")
    Epic toEntity(EpicDTO epicDTO);

    default Epic fromId(Long id) {
        if (id == null) {
            return null;
        }
        Epic epic = new Epic();
        epic.setId(id);
        return epic;
    }
}
