package com.veera.trackit.repository;

import com.veera.trackit.domain.Iteration;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Iteration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IterationRepository extends JpaRepository<Iteration, Long> {

}
