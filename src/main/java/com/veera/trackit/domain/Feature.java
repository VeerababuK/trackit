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
 * A Feature.
 */
@Entity
@Table(name = "feature")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Feature implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "feature_name", nullable = false)
    private String featureName;

    @Column(name = "description")
    private String description;

    @Column(name = "state")
    private String state;

    @Column(name = "note")
    private String note;

    @ManyToOne
    private Epic epic;

    @OneToOne
    @JoinColumn(unique = true)
    private Milestone milestone;

    @OneToOne
    @JoinColumn(unique = true)
    private ReleaseX releaseX;

    @OneToMany(mappedBy = "feature")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Story> stories = new HashSet<>();

    @ManyToOne
    private Member member;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFeatureName() {
        return featureName;
    }

    public Feature featureName(String featureName) {
        this.featureName = featureName;
        return this;
    }

    public void setFeatureName(String featureName) {
        this.featureName = featureName;
    }

    public String getDescription() {
        return description;
    }

    public Feature description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getState() {
        return state;
    }

    public Feature state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getNote() {
        return note;
    }

    public Feature note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Epic getEpic() {
        return epic;
    }

    public Feature epic(Epic epic) {
        this.epic = epic;
        return this;
    }

    public void setEpic(Epic epic) {
        this.epic = epic;
    }

    public Milestone getMilestone() {
        return milestone;
    }

    public Feature milestone(Milestone milestone) {
        this.milestone = milestone;
        return this;
    }

    public void setMilestone(Milestone milestone) {
        this.milestone = milestone;
    }

    public ReleaseX getReleaseX() {
        return releaseX;
    }

    public Feature releaseX(ReleaseX releaseX) {
        this.releaseX = releaseX;
        return this;
    }

    public void setReleaseX(ReleaseX releaseX) {
        this.releaseX = releaseX;
    }

    public Set<Story> getStories() {
        return stories;
    }

    public Feature stories(Set<Story> stories) {
        this.stories = stories;
        return this;
    }

    public Feature addStories(Story story) {
        this.stories.add(story);
        story.setFeature(this);
        return this;
    }

    public Feature removeStories(Story story) {
        this.stories.remove(story);
        story.setFeature(null);
        return this;
    }

    public void setStories(Set<Story> stories) {
        this.stories = stories;
    }

    public Member getMember() {
        return member;
    }

    public Feature member(Member member) {
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
        Feature feature = (Feature) o;
        if (feature.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), feature.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Feature{" +
            "id=" + getId() +
            ", featureName='" + getFeatureName() + "'" +
            ", description='" + getDescription() + "'" +
            ", state='" + getState() + "'" +
            ", note='" + getNote() + "'" +
            "}";
    }
}
