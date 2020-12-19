package com.ktsnwt.project.team9.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.ktsnwt.project.team9.helper.implementations.FileService;
import com.ktsnwt.project.team9.model.Comment;
import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.Image;
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
	private ImageService imageService;
	
	private FileService fileService;
	
	public CommentService() {
		fileService = new FileService();
	}
	
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

	public Comment create(Comment entity, MultipartFile file) throws Exception {
		entity.setApproved(true);
		CulturalOffer culturalOffer = culturalOfferRepository.findById(entity.getCulturalOffer().getId()).orElse(null);
		if (culturalOffer == null) {
			throw new Exception("Cultural offer doesn't exist.");
		}
		if (file != null) {
			String imagePath = fileService.saveImage(file, "comment"+entity.getAuthor().getId() + entity.getDate());
			Image image = imageService.create(new Image(imagePath));
			entity.setImageUrl(image);
		} else {
			entity.setImageUrl(null);
		}
		return commentRepository.save(entity);
	}

	@Override
	public boolean delete(Long id) throws Exception {
		return false;
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
}
