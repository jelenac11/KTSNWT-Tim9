package com.ktsnwt.project.team9.services.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ktsnwt.project.team9.model.Comment;

public interface ICommentService extends IService<Comment, Long> {

	public Page<Comment> findAllByCOID(Pageable pageable, Long id);
}
