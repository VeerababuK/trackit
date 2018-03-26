package com.veera.trackit.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Defect.
 */
@Entity
@Table(name = "defect")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Defect implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "defect_name", nullable = false)
    private String defectName;

    @Column(name = "description")
    private String description;

    @Column(name = "state")
    private String state;

    @Column(name = "note")
    private String note;

    @ManyToOne
    private Story story;

    @OneToMany(mappedBy = "defect")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Discussion> discussions = new HashSet<>();

    @ManyToOne
    private Member member;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDefectName() {
        return defectName;
    }

    public Defect defectName(String defectName) {
        this.defectName = defectName;
        return this;
    }

    public void setDefectName(String defectName) {
        this.defectName = defectName;
    }

    public String getDescription() {
        return description;
    }

    public Defect description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getState() {
        return state;
    }

    public Defect state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getNote() {
        return note;
    }

    public Defect note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Story getStory() {
        return story;
    }

    public Defect story(Story story) {
        this.story = story;
        return this;
    }

    public void setStory(Story story) {
        this.story = story;
    }

    public Set<Discussion> getDiscussions() {
        return discussions;
    }

    public Defect discussions(Set<Discussion> discussions) {
        this.discussions = discussions;
        return this;
    }

    public Defect addDiscussions(Discussion discussion) {
        this.discussions.add(discussion);
        discussion.setDefect(this);
        return this;
    }

    public Defect removeDiscussions(Discussion discussion) {
        this.discussions.remove(discussion);
        discussion.setDefect(null);
        return this;
    }

    public void setDiscussions(Set<Discussion> discussions) {
        this.discussions = discussions;
    }

    public Member getMember() {
        return member;
    }

    public Defect member(Member member) {
        this.member = member;
        return this;
    }

    public void setMember(Member member) {
        this.member = member;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Defect defect = (Defect) o;
        if (defect.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), defect.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Defect{" +
            "id=" + getId() +
            ", defectName='" + getDefectName() + "'" +
            ", description='" + getDescription() + "'" +
            ", state='" + getState() + "'" +
            ", note='" + getNote() + "'" +
            "}";
    }
}
