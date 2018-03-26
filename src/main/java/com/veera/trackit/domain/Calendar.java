package com.veera.trackit.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Calendar.
 */
@Entity
@Table(name = "calendar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Calendar implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private ZonedDateTime date;

    @Column(name = "day")
    private String day;

    @Column(name = "weekend")
    private Boolean weekend;

    @Column(name = "month")
    private Integer month;

    @Column(name = "jhi_year")
    private Integer year;

    @Column(name = "holiday")
    private Boolean holiday;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Calendar date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public String getDay() {
        return day;
    }

    public Calendar day(String day) {
        this.day = day;
        return this;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public Boolean isWeekend() {
        return weekend;
    }

    public Calendar weekend(Boolean weekend) {
        this.weekend = weekend;
        return this;
    }

    public void setWeekend(Boolean weekend) {
        this.weekend = weekend;
    }

    public Integer getMonth() {
        return month;
    }

    public Calendar month(Integer month) {
        this.month = month;
        return this;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getYear() {
        return year;
    }

    public Calendar year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Boolean isHoliday() {
        return holiday;
    }

    public Calendar holiday(Boolean holiday) {
        this.holiday = holiday;
        return this;
    }

    public void setHoliday(Boolean holiday) {
        this.holiday = holiday;
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
        Calendar calendar = (Calendar) o;
        if (calendar.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), calendar.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Calendar{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", day='" + getDay() + "'" +
            ", weekend='" + isWeekend() + "'" +
            ", month=" + getMonth() +
            ", year=" + getYear() +
            ", holiday='" + isHoliday() + "'" +
            "}";
    }
}
