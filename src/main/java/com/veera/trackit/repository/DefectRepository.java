package com.veera.trackit.repository;

import com.veera.trackit.domain.Defect;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Defect entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DefectRepository extends JpaRepository<Defect, Long> {

}
