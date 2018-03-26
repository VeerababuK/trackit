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
 * A Task.
 */
@Entity
@Table(name = "task")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "task_name", nullable = false)
    private String taskName;

    @Column(name = "description")
    private String description;

    @Column(name = "state")
    private String state;

    @Column(name = "note")
    private String note;

    @ManyToOne
    private Story story;

    @OneToOne
    @JoinColumn(unique = true)
    private Iteration iteration;

    @OneToOne
    @JoinColumn(unique = true)
    private ReleaseX releaseX;

    @OneToMany(mappedBy = "task")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Tag> tags = new HashSet<>();

    @OneToMany(mappedBy = "task")
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

    public String getTaskName() {
        return taskName;
    }

    public Task taskName(String taskName) {
        this.taskName = taskName;
        return this;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getDescription() {
        return description;
    }

    public Task description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getState() {
        return state;
    }

    public Task state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getNote() {
        return note;
    }

    public Task note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Story getStory() {
        return story;
    }

    public Task story(Story story) {
        this.story = story;
        return this;
    }

    public void setStory(Story story) {
        this.story = story;
    }

    public Iteration getIteration() {
        return iteration;
    }

    public Task iteration(Iteration iteration) {
        this.iteration = iteration;
        return this;
    }

    public void setIteration(Iteration iteration) {
        this.iteration = iteration;
    }

    public ReleaseX getReleaseX() {
        return releaseX;
    }

    public Task releaseX(ReleaseX releaseX) {
        this.releaseX = releaseX;
        return this;
    }

    public void setReleaseX(ReleaseX releaseX) {
        this.releaseX = releaseX;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public Task tags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public Task addTags(Tag tag) {
        this.tags.add(tag);
        tag.setTask(this);
        return this;
    }

    public Task removeTags(Tag tag) {
        this.tags.remove(tag);
        tag.setTask(null);
        return this;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public Set<Discussion> getDiscussions() {
        return discussions;
    }

    public Task discussions(Set<Discussion> discussions) {
        this.discussions = discussions;
        return this;
    }

    public Task addDiscussions(Discussion discussion) {
        this.discussions.add(discussion);
        discussion.setTask(this);
        return this;
    }

    public Task removeDiscussions(Discussion discussion) {
        this.discussions.remove(discussion);
        discussion.setTask(null);
        return this;
    }

    public void setDiscussions(Set<Discussion> discussions) {
        this.discussions = discussions;
    }

    public Member getMember() {
        return member;
    }

    public Task member(Member member) {
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
        Task task = (Task) o;
        if (task.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), task.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", taskName='" + getTaskName() + "'" +
            ", description='" + getDescription() + "'" +
            ", state='" + getState() + "'" +
            ", note='" + getNote() + "'" +
            "}";
    }
}
