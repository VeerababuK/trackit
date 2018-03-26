package com.veera.trackit.service.mapper;

import com.veera.trackit.domain.*;
import com.veera.trackit.service.dto.TaskDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Task and its DTO TaskDTO.
 */
@Mapper(componentModel = "spring", uses = {StoryMapper.class, IterationMapper.class, ReleaseXMapper.class, MemberMapper.class})
public interface TaskMapper extends EntityMapper<TaskDTO, Task> {

    @Mapping(source = "story.id", target = "storyId")
    @Mapping(source = "iteration.id", target = "iterationId")
    @Mapping(source = "releaseX.id", target = "releaseXId")
    @Mapping(source = "member.id", target = "memberId")
    TaskDTO toDto(Task task);

    @Mapping(source = "storyId", target = "story")
    @Mapping(source = "iterationId", target = "iteration")
    @Mapping(source = "releaseXId", target = "releaseX")
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "discussions", ignore = true)
    @Mapping(source = "memberId", target = "member")
    Task toEntity(TaskDTO taskDTO);

    default Task fromId(Long id) {
        if (id == null) {
            return null;
        }
        Task task = new Task();
        task.setId(id);
        return task;
    }
}
