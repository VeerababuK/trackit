package com.veera.trackit.service.mapper;

import com.veera.trackit.domain.*;
import com.veera.trackit.service.dto.TagDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Tag and its DTO TagDTO.
 */
@Mapper(componentModel = "spring", uses = {EpicMapper.class, StoryMapper.class, TaskMapper.class})
public interface TagMapper extends EntityMapper<TagDTO, Tag> {

    @Mapping(source = "epic.id", target = "epicId")
    @Mapping(source = "story.id", target = "storyId")
    @Mapping(source = "task.id", target = "taskId")
    TagDTO toDto(Tag tag);

    @Mapping(source = "epicId", target = "epic")
    @Mapping(source = "storyId", target = "story")
    @Mapping(source = "taskId", target = "task")
    Tag toEntity(TagDTO tagDTO);

    default Tag fromId(Long id) {
        if (id == null) {
            return null;
        }
        Tag tag = new Tag();
        tag.setId(id);
        return tag;
    }
}
