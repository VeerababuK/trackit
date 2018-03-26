package com.veera.trackit.service.mapper;

import com.veera.trackit.domain.*;
import com.veera.trackit.service.dto.DefectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Defect and its DTO DefectDTO.
 */
@Mapper(componentModel = "spring", uses = {StoryMapper.class, MemberMapper.class})
public interface DefectMapper extends EntityMapper<DefectDTO, Defect> {

    @Mapping(source = "story.id", target = "storyId")
    @Mapping(source = "member.id", target = "memberId")
    DefectDTO toDto(Defect defect);

    @Mapping(source = "storyId", target = "story")
    @Mapping(target = "discussions", ignore = true)
    @Mapping(source = "memberId", target = "member")
    Defect toEntity(DefectDTO defectDTO);

    default Defect fromId(Long id) {
        if (id == null) {
            return null;
        }
        Defect defect = new Defect();
        defect.setId(id);
        return defect;
    }
}
