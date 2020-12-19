package com.ktsnwt.project.team9.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ktsnwt.project.team9.model.Comment;

@Repository
public interface ICommentRepository extends JpaRepository<Comment, Long> {

	Page<Comment> findByCulturalOfferIdAndApproved(Long id, boolean approved, Pageable pageable);

	@Query(value="SELECT * FROM comments c JOIN cultural_offers co ON c.cultural_offer_id = co.id WHERE co.user_id = ?1 AND NOT c.approved", nativeQuery=true)
	Page<Comment> findByApprovedFalseAndCulturalOfferUserId(Long id, Pageable pageable);

}
