package com.veera.trackit.service.mapper;

import com.veera.trackit.domain.*;
import com.veera.trackit.service.dto.StoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Story and its DTO StoryDTO.
 */
@Mapper(componentModel = "spring", uses = {FeatureMapper.class, IterationMapper.class, ReleaseXMapper.class, MilestoneMapper.class, MemberMapper.class})
public interface StoryMapper extends EntityMapper<StoryDTO, Story> {

    @Mapping(source = "feature.id", target = "featureId")
    @Mapping(source = "iteration.id", target = "iterationId")
    @Mapping(source = "releaseX.id", target = "releaseXId")
    @Mapping(source = "milestone.id", target = "milestoneId")
    @Mapping(source = "story.id", target = "storyId")
    @Mapping(source = "member.id", target = "memberId")
    StoryDTO toDto(Story story);

    @Mapping(source = "featureId", target = "feature")
    @Mapping(source = "iterationId", target = "iteration")
    @Mapping(source = "releaseXId", target = "releaseX")
    @Mapping(source = "milestoneId", target = "milestone")
    @Mapping(target = "tasks", ignore = true)
    @Mapping(source = "storyId", target = "story")
    @Mapping(target = "children", ignore = true)
    @Mapping(target = "defects", ignore = true)
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "discussions", ignore = true)
    @Mapping(source = "memberId", target = "member")
    Story toEntity(StoryDTO storyDTO);

    default Story fromId(Long id) {
        if (id == null) {
            return null;
        }
        Story story = new Story();
        story.setId(id);
        return story;
    }
}
