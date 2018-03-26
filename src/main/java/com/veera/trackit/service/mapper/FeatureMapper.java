package com.veera.trackit.service.mapper;

import com.veera.trackit.domain.*;
import com.veera.trackit.service.dto.FeatureDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Feature and its DTO FeatureDTO.
 */
@Mapper(componentModel = "spring", uses = {EpicMapper.class, MilestoneMapper.class, ReleaseXMapper.class, MemberMapper.class})
public interface FeatureMapper extends EntityMapper<FeatureDTO, Feature> {

    @Mapping(source = "epic.id", target = "epicId")
    @Mapping(source = "milestone.id", target = "milestoneId")
    @Mapping(source = "releaseX.id", target = "releaseXId")
    @Mapping(source = "member.id", target = "memberId")
    FeatureDTO toDto(Feature feature);

    @Mapping(source = "epicId", target = "epic")
    @Mapping(source = "milestoneId", target = "milestone")
    @Mapping(source = "releaseXId", target = "releaseX")
    @Mapping(target = "stories", ignore = true)
    @Mapping(source = "memberId", target = "member")
    Feature toEntity(FeatureDTO featureDTO);

    default Feature fromId(Long id) {
        if (id == null) {
            return null;
        }
        Feature feature = new Feature();
        feature.setId(id);
        return feature;
    }
}
