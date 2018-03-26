package com.veera.trackit.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Discussion entity.
 */
public class DiscussionDTO implements Serializable {

    private Long id;

    @NotNull
    private String discussionText;

    private Long epicId;

    private Long storyId;

    private Long taskId;

    private Long defectId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDiscussionText() {
        return discussionText;
    }

    public void setDiscussionText(String discussionText) {
        this.discussionText = discussionText;
    }

    public Long getEpicId() {
        return epicId;
    }

    public void setEpicId(Long epicId) {
        this.epicId = epicId;
    }

    public Long getStoryId() {
        return storyId;
    }

    public void setStoryId(Long storyId) {
        this.storyId = storyId;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Long getDefectId() {
        return defectId;
    }

    public void setDefectId(Long defectId) {
        this.defectId = defectId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DiscussionDTO discussionDTO = (DiscussionDTO) o;
        if(discussionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), discussionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DiscussionDTO{" +
            "id=" + getId() +
            ", discussionText='" + getDiscussionText() + "'" +
            "}";
    }
}
