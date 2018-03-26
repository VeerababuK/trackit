package com.veera.trackit.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Discussion.
 */
@Entity
@Table(name = "discussion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Discussion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "discussion_text", nullable = false)
    private String discussionText;

    @ManyToOne
    private Epic epic;

    @ManyToOne
    private Story story;

    @ManyToOne
    private Task task;

    @ManyToOne
    private Defect defect;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDiscussionText() {
        return discussionText;
    }

    public Discussion discussionText(String discussionText) {
        this.discussionText = discussionText;
        return this;
    }

    public void setDiscussionText(String discussionText) {
        this.discussionText = discussionText;
    }

    public Epic getEpic() {
        return epic;
    }

    public Discussion epic(Epic epic) {
        this.epic = epic;
        return this;
    }

    public void setEpic(Epic epic) {
        this.epic = epic;
    }

    public Story getStory() {
        return story;
    }

    public Discussion story(Story story) {
        this.story = story;
        return this;
    }

    public void setStory(Story story) {
        this.story = story;
    }

    public Task getTask() {
        return task;
    }

    public Discussion task(Task task) {
        this.task = task;
        return this;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public Defect getDefect() {
        return defect;
    }

    public Discussion defect(Defect defect) {
        this.defect = defect;
        return this;
    }

    public void setDefect(Defect defect) {
        this.defect = defect;
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
        Discussion discussion = (Discussion) o;
        if (discussion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), discussion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Discussion{" +
            "id=" + getId() +
            ", discussionText='" + getDiscussionText() + "'" +
            "}";
    }
}
