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
 * A Member.
 */
@Entity
@Table(name = "member")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Member implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "member_name", nullable = false)
    private String memberName;

    @Column(name = "jhi_type")
    private String type;

    @Column(name = "note")
    private String note;

    @ManyToOne
    private Project project;

    @OneToMany(mappedBy = "member")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Epic> epics = new HashSet<>();

    @OneToMany(mappedBy = "member")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Feature> features = new HashSet<>();

    @OneToMany(mappedBy = "member")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Story> stories = new HashSet<>();

    @OneToMany(mappedBy = "member")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Task> tasks = new HashSet<>();

    @OneToMany(mappedBy = "member")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Defect> defects = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMemberName() {
        return memberName;
    }

    public Member memberName(String memberName) {
        this.memberName = memberName;
        return this;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getType() {
        return type;
    }

    public Member type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getNote() {
        return note;
    }

    public Member note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Project getProject() {
        return project;
    }

    public Member project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Set<Epic> getEpics() {
        return epics;
    }

    public Member epics(Set<Epic> epics) {
        this.epics = epics;
        return this;
    }

    public Member addEpics(Epic epic) {
        this.epics.add(epic);
        epic.setMember(this);
        return this;
    }

    public Member removeEpics(Epic epic) {
        this.epics.remove(epic);
        epic.setMember(null);
        return this;
    }

    public void setEpics(Set<Epic> epics) {
        this.epics = epics;
    }

    public Set<Feature> getFeatures() {
        return features;
    }

    public Member features(Set<Feature> features) {
        this.features = features;
        return this;
    }

    public Member addFeatures(Feature feature) {
        this.features.add(feature);
        feature.setMember(this);
        return this;
    }

    public Member removeFeatures(Feature feature) {
        this.features.remove(feature);
        feature.setMember(null);
        return this;
    }

    public void setFeatures(Set<Feature> features) {
        this.features = features;
    }

    public Set<Story> getStories() {
        return stories;
    }

    public Member stories(Set<Story> stories) {
        this.stories = stories;
        return this;
    }

    public Member addStories(Story story) {
        this.stories.add(story);
        story.setMember(this);
        return this;
    }

    public Member removeStories(Story story) {
        this.stories.remove(story);
        story.setMember(null);
        return this;
    }

    public void setStories(Set<Story> stories) {
        this.stories = stories;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public Member tasks(Set<Task> tasks) {
        this.tasks = tasks;
        return this;
    }

    public Member addTasks(Task task) {
        this.tasks.add(task);
        task.setMember(this);
        return this;
    }

    public Member removeTasks(Task task) {
        this.tasks.remove(task);
        task.setMember(null);
        return this;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public Set<Defect> getDefects() {
        return defects;
    }

    public Member defects(Set<Defect> defects) {
        this.defects = defects;
        return this;
    }

    public Member addDefects(Defect defect) {
        this.defects.add(defect);
        defect.setMember(this);
        return this;
    }

    public Member removeDefects(Defect defect) {
        this.defects.remove(defect);
        defect.setMember(null);
        return this;
    }

    public void setDefects(Set<Defect> defects) {
        this.defects = defects;
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
        Member member = (Member) o;
        if (member.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), member.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Member{" +
            "id=" + getId() +
            ", memberName='" + getMemberName() + "'" +
            ", type='" + getType() + "'" +
            ", note='" + getNote() + "'" +
            "}";
    }
}
