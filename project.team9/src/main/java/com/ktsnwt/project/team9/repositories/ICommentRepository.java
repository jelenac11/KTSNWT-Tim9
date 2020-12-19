package com.ktsnwt.project.team9.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ktsnwt.project.team9.model.Comment;

@Repository
public interface ICommentRepository extends JpaRepository<Comment, Long> {

	Page<Comment> findByCulturalOfferIdAndApproved(Long id, boolean approved, Pageable pageable);


	@Query(value="SELECT * FROM comment c JOIN cultural_offer co ON c.cultural_offer_id = co.cultural_offer_id WHERE co.user_id = ?1 AND NOT c.approved", nativeQuery=true)
	Page<Comment> findByApprovedFalseAndCulturalOfferUserId(Long id, Pageable pageable);

	@Modifying
	@Transactional
	@Query(value="DELETE FROM comment WHERE comment_id = ?1", nativeQuery=true)
	void delete(Long id);
}
