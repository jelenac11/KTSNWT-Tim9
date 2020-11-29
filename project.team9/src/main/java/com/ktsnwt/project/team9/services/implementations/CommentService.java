package com.ktsnwt.project.team9.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.Comment;
import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.RegisteredUser;
import com.ktsnwt.project.team9.repositories.ICommentRepository;
import com.ktsnwt.project.team9.repositories.ICulturalOfferRepository;
import com.ktsnwt.project.team9.repositories.IRegisteredUser;
import com.ktsnwt.project.team9.services.interfaces.ICommentService;

@Service
public class CommentService implements ICommentService {

	@Autowired
	private ICommentRepository commentRepository;
	
	@Autowired
	private IRegisteredUser rUserRepository;
	
	@Autowired
	private ICulturalOfferRepository culturalOfferRepository;
	
	@Override
	public Iterable<Comment> getAll() {
		return commentRepository.findAll();
	}

	@Override
	public Comment getById(Long id) {
		return commentRepository.findById(id).orElse(null);
	}

	@Override
	public Comment create(Comment entity) throws Exception {
		entity.setApproved(false);
		RegisteredUser user = rUserRepository.findById(entity.getAuthor().getId()).orElse(null);
		if (user == null) {
			throw new Exception("Author doesn't exist.");
		}
		CulturalOffer culturalOffer = culturalOfferRepository.findById(entity.getCulturalOffer().getId()).orElse(null);
		if (culturalOffer == null) {
			throw new Exception("Cultural offer doesn't exist.");
		}
		return commentRepository.save(entity);
	}

	@Override
	public boolean delete(Long id) throws Exception {
		Comment comment = commentRepository.findById(id).orElse(null);
		if (comment == null) {
			throw new Exception("Comment doesn't exist.");
		}
		commentRepository.deleteById(id);
		return true;
	}

	@Override
	public Comment update(Long id, Comment entity) throws Exception {
		Comment comment = commentRepository.findById(id).orElse(null);
		if (comment == null) {
			throw new Exception("Comment doesn't exist.");
		}
		RegisteredUser user = rUserRepository.findById(entity.getAuthor().getId()).orElse(null);
		if (user == null) {
			throw new Exception("Author doesn't exist.");
		}
		CulturalOffer culturalOffer = culturalOfferRepository.findById(entity.getCulturalOffer().getId()).orElse(null);
		if (culturalOffer == null) {
			throw new Exception("Cultural offer doesn't exist.");
		}
		comment.setApproved(entity.isApproved());
		comment.setAuthor(entity.getAuthor());
		comment.setCulturalOffer(entity.getCulturalOffer());
		comment.setText(entity.getText());
		comment.setImageUrl(entity.getImageUrl());
		comment.setDate(entity.getDate());
		return commentRepository.save(comment);
	}
}
