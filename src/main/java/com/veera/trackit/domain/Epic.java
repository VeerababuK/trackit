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
 * A Epic.
 */
@Entity
@Table(name = "epic")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Epic implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "epic_name", nullable = false)
    private String epicName;

    @Column(name = "description")
    private String description;

    @Column(name = "state")
    private String state;

    @Column(name = "note")
    private String note;

    @OneToOne
    @JoinColumn(unique = true)
    private ReleaseX releaseX;

    @OneToOne
    @JoinColumn(unique = true)
    private Milestone milestone;

    @OneToMany(mappedBy = "epic")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Feature> features = new HashSet<>();

    @OneToMany(mappedBy = "epic")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Tag> tags = new HashSet<>();

    @OneToMany(mappedBy = "epic")
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

    public String getEpicName() {
        return epicName;
    }

    public Epic epicName(String epicName) {
        this.epicName = epicName;
        return this;
    }

    public void setEpicName(String epicName) {
        this.epicName = epicName;
    }

    public String getDescription() {
        return description;
    }

    public Epic description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getState() {
        return state;
    }

    public Epic state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getNote() {
        return note;
    }

    public Epic note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public ReleaseX getReleaseX() {
        return releaseX;
    }

    public Epic releaseX(ReleaseX releaseX) {
        this.releaseX = releaseX;
        return this;
    }

    public void setReleaseX(ReleaseX releaseX) {
        this.releaseX = releaseX;
    }

    public Milestone getMilestone() {
        return milestone;
    }

    public Epic milestone(Milestone milestone) {
        this.milestone = milestone;
        return this;
    }

    public void setMilestone(Milestone milestone) {
        this.milestone = milestone;
    }

    public Set<Feature> getFeatures() {
        return features;
    }

    public Epic features(Set<Feature> features) {
        this.features = features;
        return this;
    }

    public Epic addFeatures(Feature feature) {
        this.features.add(feature);
        feature.setEpic(this);
        return this;
    }

    public Epic removeFeatures(Feature feature) {
        this.features.remove(feature);
        feature.setEpic(null);
        return this;
    }

    public void setFeatures(Set<Feature> features) {
        this.features = features;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public Epic tags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public Epic addTags(Tag tag) {
        this.tags.add(tag);
        tag.setEpic(this);
        return this;
    }

    public Epic removeTags(Tag tag) {
        this.tags.remove(tag);
        tag.setEpic(null);
        return this;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public Set<Discussion> getDiscussions() {
        return discussions;
    }

    public Epic discussions(Set<Discussion> discussions) {
        this.discussions = discussions;
        return this;
    }

    public Epic addDiscussions(Discussion discussion) {
        this.discussions.add(discussion);
        discussion.setEpic(this);
        return this;
    }

    public Epic removeDiscussions(Discussion discussion) {
        this.discussions.remove(discussion);
        discussion.setEpic(null);
        return this;
    }

    public void setDiscussions(Set<Discussion> discussions) {
        this.discussions = discussions;
    }

    public Member getMember() {
        return member;
    }

    public Epic member(Member member) {
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
        Epic epic = (Epic) o;
        if (epic.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), epic.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Epic{" +
            "id=" + getId() +
            ", epicName='" + getEpicName() + "'" +
            ", description='" + getDescription() + "'" +
            ", state='" + getState() + "'" +
            ", note='" + getNote() + "'" +
            "}";
    }
}
