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
 * A Story.
 */
@Entity
@Table(name = "story")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Story implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "story_name", nullable = false)
    private String storyName;

    @Column(name = "description")
    private String description;

    @Column(name = "state")
    private String state;

    @Column(name = "note")
    private String note;

    @ManyToOne
    private Feature feature;

    @OneToOne
    @JoinColumn(unique = true)
    private Iteration iteration;

    @OneToOne
    @JoinColumn(unique = true)
    private ReleaseX releaseX;

    @OneToOne
    @JoinColumn(unique = true)
    private Milestone milestone;

    @OneToMany(mappedBy = "story")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Task> tasks = new HashSet<>();

    @ManyToOne
    private Story story;

    @OneToMany(mappedBy = "story")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Story> children = new HashSet<>();

    @OneToMany(mappedBy = "story")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Defect> defects = new HashSet<>();

    @OneToMany(mappedBy = "story")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Tag> tags = new HashSet<>();

    @OneToMany(mappedBy = "story")
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

    public String getStoryName() {
        return storyName;
    }

    public Story storyName(String storyName) {
        this.storyName = storyName;
        return this;
    }

    public void setStoryName(String storyName) {
        this.storyName = storyName;
    }

    public String getDescription() {
        return description;
    }

    public Story description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getState() {
        return state;
    }

    public Story state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getNote() {
        return note;
    }

    public Story note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Feature getFeature() {
        return feature;
    }

    public Story feature(Feature feature) {
        this.feature = feature;
        return this;
    }

    public void setFeature(Feature feature) {
        this.feature = feature;
    }

    public Iteration getIteration() {
        return iteration;
    }

    public Story iteration(Iteration iteration) {
        this.iteration = iteration;
        return this;
    }

    public void setIteration(Iteration iteration) {
        this.iteration = iteration;
    }

    public ReleaseX getReleaseX() {
        return releaseX;
    }

    public Story releaseX(ReleaseX releaseX) {
        this.releaseX = releaseX;
        return this;
    }

    public void setReleaseX(ReleaseX releaseX) {
        this.releaseX = releaseX;
    }

    public Milestone getMilestone() {
        return milestone;
    }

    public Story milestone(Milestone milestone) {
        this.milestone = milestone;
        return this;
    }

    public void setMilestone(Milestone milestone) {
        this.milestone = milestone;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public Story tasks(Set<Task> tasks) {
        this.tasks = tasks;
        return this;
    }

    public Story addTasks(Task task) {
        this.tasks.add(task);
        task.setStory(this);
        return this;
    }

    public Story removeTasks(Task task) {
        this.tasks.remove(task);
        task.setStory(null);
        return this;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public Story getStory() {
        return story;
    }

    public Story story(Story story) {
        this.story = story;
        return this;
    }

    public void setStory(Story story) {
        this.story = story;
    }

    public Set<Story> getChildren() {
        return children;
    }

    public Story children(Set<Story> stories) {
        this.children = stories;
        return this;
    }

    public Story addChildren(Story story) {
        this.children.add(story);
        story.setStory(this);
        return this;
    }

    public Story removeChildren(Story story) {
        this.children.remove(story);
        story.setStory(null);
        return this;
    }

    public void setChildren(Set<Story> stories) {
        this.children = stories;
    }

    public Set<Defect> getDefects() {
        return defects;
    }

    public Story defects(Set<Defect> defects) {
        this.defects = defects;
        return this;
    }

    public Story addDefects(Defect defect) {
        this.defects.add(defect);
        defect.setStory(this);
        return this;
    }

    public Story removeDefects(Defect defect) {
        this.defects.remove(defect);
        defect.setStory(null);
        return this;
    }

    public void setDefects(Set<Defect> defects) {
        this.defects = defects;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public Story tags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public Story addTags(Tag tag) {
        this.tags.add(tag);
        tag.setStory(this);
        return this;
    }

    public Story removeTags(Tag tag) {
        this.tags.remove(tag);
        tag.setStory(null);
        return this;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public Set<Discussion> getDiscussions() {
        return discussions;
    }

    public Story discussions(Set<Discussion> discussions) {
        this.discussions = discussions;
        return this;
    }

    public Story addDiscussions(Discussion discussion) {
        this.discussions.add(discussion);
        discussion.setStory(this);
        return this;
    }

    public Story removeDiscussions(Discussion discussion) {
        this.discussions.remove(discussion);
        discussion.setStory(null);
        return this;
    }

    public void setDiscussions(Set<Discussion> discussions) {
        this.discussions = discussions;
    }

    public Member getMember() {
        return member;
    }

    public Story member(Member member) {
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
        Story story = (Story) o;
        if (story.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), story.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Story{" +
            "id=" + getId() +
            ", storyName='" + getStoryName() + "'" +
            ", description='" + getDescription() + "'" +
            ", state='" + getState() + "'" +
            ", note='" + getNote() + "'" +
            "}";
    }
}
