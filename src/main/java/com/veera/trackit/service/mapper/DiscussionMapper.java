package com.veera.trackit.service.mapper;

import com.veera.trackit.domain.*;
import com.veera.trackit.service.dto.DiscussionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Discussion and its DTO DiscussionDTO.
 */
@Mapper(componentModel = "spring", uses = {EpicMapper.class, StoryMapper.class, TaskMapper.class, DefectMapper.class})
public interface DiscussionMapper extends EntityMapper<DiscussionDTO, Discussion> {

    @Mapping(source = "epic.id", target = "epicId")
    @Mapping(source = "story.id", target = "storyId")
    @Mapping(source = "task.id", target = "taskId")
    @Mapping(source = "defect.id", target = "defectId")
    DiscussionDTO toDto(Discussion discussion);

    @Mapping(source = "epicId", target = "epic")
    @Mapping(source = "storyId", target = "story")
    @Mapping(source = "taskId", target = "task")
    @Mapping(source = "defectId", target = "defect")
    Discussion toEntity(DiscussionDTO discussionDTO);

    default Discussion fromId(Long id) {
        if (id == null) {
            return null;
        }
        Discussion discussion = new Discussion();
        discussion.setId(id);
        return discussion;
    }
}
