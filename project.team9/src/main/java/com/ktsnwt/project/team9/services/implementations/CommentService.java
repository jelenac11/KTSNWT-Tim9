package com.ktsnwt.project.team9.services.implementations;

import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.Comment;
import com.ktsnwt.project.team9.services.interfaces.ICommentService;

@Service
public class CommentService implements ICommentService {

	@Override
	public Iterable<Comment> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Comment getById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Comment create(Comment entity) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(Long id) throws Exception {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Comment update(Long id, Comment entity) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
}
