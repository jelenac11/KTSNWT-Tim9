package com.ktsnwt.project.team9.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ktsnwt.project.team9.model.Comment;

@Repository
public interface ICommentRepository extends JpaRepository<Comment, Long> {

	Page<Comment> findByCulturalOfferId(Pageable pageable, Long id);

}
