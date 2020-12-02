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
	
	public Page<Comment> findAll(Pageable pageable) {
		return commentRepository.findAll(pageable);
	}
	
	@Override
	public Iterable<Comment> getAll() {
		return commentRepository.findAll();
	}

	@Override
	public Comment getById(Long id) {
		return commentRepository.findById(id).orElse(null);
	}

	public Comment create(Comment entity, MultipartFile file) throws Exception {
		entity.setApproved(false);
		RegisteredUser user = rUserRepository.findById(entity.getAuthor().getId()).orElse(null);
		if (user == null) {
			throw new Exception("Author doesn't exist.");
		}
		CulturalOffer culturalOffer = culturalOfferRepository.findById(entity.getCulturalOffer().getId()).orElse(null);
		if (culturalOffer == null) {
			throw new Exception("Cultural offer doesn't exist.");
		}
		if (StringUtils.isEmpty(entity.getText()) && StringUtils.isEmpty(entity.getImageUrl())) {
			throw new Exception("Both text and image can't be empty.");
		}
		entity.setAuthor(user);
		entity.setCulturalOffer(culturalOffer);
		if (!file.isEmpty()) {
			String imagePath = fileService.saveImage(file, "comment"+user.getId());
			System.out.println("******************************?" + imagePath);
			System.out.println(new Image(imagePath));
			Image image = imageService.create(new Image(imagePath));
			System.out.println("*******************************");
			entity.setImageUrl(image);
			System.out.println("*******************************");
		} else {
			entity.setImageUrl(null);
		}
		return commentRepository.save(entity);
	}

	@Override
	public boolean delete(Long id) throws Exception {
		Comment comment = commentRepository.findById(id).orElse(null);
		if (comment == null) {
			throw new Exception("Comment doesn't exist.");
		}
		if (comment.getImageUrl() != null) {
			fileService.deleteImageFromFile(comment.getImageUrl().getUrl());
		}
		commentRepository.deleteById(id);
		return true;
	}

	/*public Comment update(Long id, Comment entity, MultipartFile newImage) throws Exception {
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
		comment.setAuthor(user);
		comment.setCulturalOffer(culturalOffer);
		comment.setText(entity.getText());
		if(!newImage.isEmpty()) {
			fileService.uploadNewImage(newImage, comment.getImageUrl().getUrl());
		}
		comment.setDate(entity.getDate());
		return commentRepository.save(comment);
	}*/

	@Override
	public Comment update(Long id, Comment entity) throws Exception {
		return null;
	}

	@Override
	public Comment create(Comment entity) throws Exception {
		return null;
	}
}
