package com.ktsnwt.project.team9.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ktsnwt.project.team9.model.Mark;

@Repository
public interface IMarkRepository extends JpaRepository<Mark, Long> {

	@Query(value = "SELECT * FROM mark m WHERE m.user_id = ?1 AND m.cultural_offer_id = ?2", nativeQuery = true)
	Mark findByGraderAndCulturalOfferId(Long userId, Long offerId);
	
	List<Mark> findByCulturalOfferId(Long culturalOfferId);

}
