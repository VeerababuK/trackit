package com.veera.trackit.repository;

import com.veera.trackit.domain.Epic;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Epic entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EpicRepository extends JpaRepository<Epic, Long> {

}
