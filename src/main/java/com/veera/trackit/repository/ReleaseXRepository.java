package com.veera.trackit.repository;

import com.veera.trackit.domain.ReleaseX;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ReleaseX entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReleaseXRepository extends JpaRepository<ReleaseX, Long> {

}
