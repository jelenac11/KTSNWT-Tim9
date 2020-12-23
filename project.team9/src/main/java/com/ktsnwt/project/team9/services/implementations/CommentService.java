package com.ktsnwt.project.team9.services.implementations;


import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ktsnwt.project.team9.helper.implementations.FileService;
import com.ktsnwt.project.team9.model.Comment;
import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.Image;
import com.ktsnwt.project.team9.repositories.ICommentRepository;
import com.ktsnwt.project.team9.services.interfaces.ICommentService;

@Service
public class CommentService implements ICommentService {

	@Autowired
	private ICommentRepository commentRepository;
	
	@Autowired
	private ImageService imageService;
	
	@Autowired
	private FileService fileService;
	
	@Autowired
	private CulturalOfferService culturalOfferService;
	
	
	@Override
	public Iterable<Comment> getAll() {
		return commentRepository.findAll();
	}

	@Override
	public Comment getById(Long id) {
		Optional<Comment> c = commentRepository.findById(id);
		if (!c.isPresent()) {
			return null;
		}
		return c.get();
	}

	public Comment create(Comment entity, MultipartFile file) throws Exception {
		entity.setApproved(false);
		CulturalOffer culturalOffer = culturalOfferService.getById(entity.getCulturalOffer().getId());
		if (culturalOffer == null) {
			throw new NoSuchElementException("Cultural offer doesn't exist.");
		}
		if (file != null) {
			String imagePath = fileService.saveImage(file, "comment"+entity.getAuthor().getId() + entity.getDate());
			System.out.println(imagePath);
			Image image = imageService.create(new Image(imagePath));
			entity.setImageUrl(image);
		} else {
			entity.setImageUrl(null);
		}
		return commentRepository.save(entity);
	}

	@Override
	public boolean delete(Long id) throws Exception {
		Comment c = getById(id);
		if (c == null) {
			throw new NoSuchElementException("Comment doesn't exist");
		}
		if (c.getImageUrl() != null) {
			fileService.deleteImageFromFile(c.getImageUrl().getUrl());
		}
		commentRepository.delete(id);
		return true;
	}

	@Override
	public Comment update(Long id, Comment entity) throws Exception {
		return null;
	}

	@Override
	public Comment create(Comment entity) throws Exception {
		return null;
	}

	public Page<Comment> findAllByCOID(Pageable pageable, Long id) {
		return commentRepository.findByCulturalOfferIdAndApproved(id, true, pageable); 
	}

	public Page<Comment> findAllByNotApprovedByAdminId(Pageable pageable, Long id) {
		return commentRepository.findByApprovedFalseAndCulturalOfferUserId(id, pageable);
	}

	public Comment approveComment(Long id, boolean approve) throws Exception {
		Comment c = getById(id);
		if (c == null) {
			throw new NoSuchElementException("Comment doesn't exist");
		}
		if (!approve) {
			delete(id);
			return null;
		}
		c.setApproved(approve);
		commentRepository.save(c);
		return c;
	}
}
