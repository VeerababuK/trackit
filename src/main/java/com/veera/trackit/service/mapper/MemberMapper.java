package com.veera.trackit.service.mapper;

import com.veera.trackit.domain.*;
import com.veera.trackit.service.dto.MemberDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Member and its DTO MemberDTO.
 */
@Mapper(componentModel = "spring", uses = {ProjectMapper.class})
public interface MemberMapper extends EntityMapper<MemberDTO, Member> {

    @Mapping(source = "project.id", target = "projectId")
    MemberDTO toDto(Member member);

    @Mapping(source = "projectId", target = "project")
    @Mapping(target = "epics", ignore = true)
    @Mapping(target = "features", ignore = true)
    @Mapping(target = "stories", ignore = true)
    @Mapping(target = "tasks", ignore = true)
    @Mapping(target = "defects", ignore = true)
    Member toEntity(MemberDTO memberDTO);

    default Member fromId(Long id) {
        if (id == null) {
            return null;
        }
        Member member = new Member();
        member.setId(id);
        return member;
    }
}
