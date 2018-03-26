package com.veera.trackit.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Milestone entity.
 */
public class MilestoneDTO implements Serializable {

    private Long id;

    @NotNull
    private String milestoneName;

    private ZonedDateTime date;

    private String note;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMilestoneName() {
        return milestoneName;
    }

    public void setMilestoneName(String milestoneName) {
        this.milestoneName = milestoneName;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MilestoneDTO milestoneDTO = (MilestoneDTO) o;
        if(milestoneDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), milestoneDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MilestoneDTO{" +
            "id=" + getId() +
            ", milestoneName='" + getMilestoneName() + "'" +
            ", date='" + getDate() + "'" +
            ", note='" + getNote() + "'" +
            "}";
    }
}
