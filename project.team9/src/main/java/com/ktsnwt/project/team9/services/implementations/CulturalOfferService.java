package com.ktsnwt.project.team9.services.implementations;

import java.io.IOException;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ktsnwt.project.team9.helper.implementations.FileService;
import com.ktsnwt.project.team9.model.Admin;
import com.ktsnwt.project.team9.model.Category;
import com.ktsnwt.project.team9.model.Comment;
import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.Geolocation;
import com.ktsnwt.project.team9.model.Image;
import com.ktsnwt.project.team9.model.RegisteredUser;
import com.ktsnwt.project.team9.repositories.ICulturalOfferRepository;
import com.ktsnwt.project.team9.services.interfaces.ICulturalOfferService;

import javassist.NotFoundException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CulturalOfferService implements ICulturalOfferService {

	private ICulturalOfferRepository culturalOfferRepository;

	private CategoryService categoryService;

	private GeolocationService geolocationService;

	private AdminService adminService;

	private ImageService imageService;

	private FileService fileService;
	
	private CommentService commentService;

	public Page<CulturalOffer> findAll(Pageable pageable) {
		return culturalOfferRepository.findAll(pageable);
	}

	@Override
	@Transactional
	public Iterable<CulturalOffer> getAll() {
		return culturalOfferRepository.findAll();
	}

	@Override
	public CulturalOffer getById(Long id) {
		Optional<CulturalOffer> culturalOffer = culturalOfferRepository.findById(id);
		if(!culturalOffer.isPresent()) {
			return null;
		}
		return culturalOffer.get();
	}

	@Override
	public CulturalOffer create(CulturalOffer entity) throws Exception {
		return null;
	}

	@Transactional
	@Override
	public boolean delete(Long id) throws Exception {
		CulturalOffer existingCulturalOffer = getById(id);
		if (existingCulturalOffer == null) {
			throw new NotFoundException("Cultural offer with given id doesn't exist.");
		}
		for (RegisteredUser registeredUser : existingCulturalOffer.getSubscribedUsers()) {
			registeredUser.getSubscribed().remove(existingCulturalOffer);
		}
		existingCulturalOffer.getSubscribedUsers().clear();
		fileService.deleteImageFromFile(existingCulturalOffer.getImage().getUrl());
		for(Comment comment: existingCulturalOffer.getComments()) {
			commentService.delete(comment.getId());
		}
		culturalOfferRepository.deleteById(id);
		return true;
	}
	
	@Override
	public CulturalOffer update(Long id, CulturalOffer entity) throws NotFoundException {
		return null;
	}

	@Transactional
	public CulturalOffer update(Long id, CulturalOffer entity, MultipartFile newImage) throws NotFoundException, IOException {
		CulturalOffer existingCulturalOffer = getById(id);
		if (existingCulturalOffer == null) {
			throw new NotFoundException("Cultural offer with given id doesn't exist.");
		}
		Category category = categoryService.getById(entity.getCategory().getId());
		if (category == null) {
			throw new NotFoundException("Category doesn't exist.");
		}
		existingCulturalOffer.setCategory(category);
		existingCulturalOffer.setDescription(entity.getDescription());
		Geolocation geolocation = geolocationService.findByLatAndLon(existingCulturalOffer.getGeolocation().getLat(),
				existingCulturalOffer.getGeolocation().getLon());
		geolocation.setLat(entity.getGeolocation().getLat());
		geolocation.setLon(entity.getGeolocation().getLon());
		geolocation.setLocation(entity.getGeolocation().getLocation());
		existingCulturalOffer.setGeolocation(geolocation);
		if(!newImage.isEmpty()) {
			fileService.uploadNewImage(newImage, existingCulturalOffer.getImage().getUrl());
		}
		return culturalOfferRepository.save(existingCulturalOffer);
	}

	@Transactional
	public CulturalOffer create(CulturalOffer entity, MultipartFile file) throws Exception {
		entity.setActive(true);
		Category category = categoryService.getById(entity.getCategory().getId());
		if (category == null) {
			throw new NotFoundException("Category doesn't exist.");
		}
		entity.setCategory(category);
		Geolocation geolocation = geolocationService.create(entity.getGeolocation());
		entity.setGeolocation(geolocation);
		Admin admin = adminService.getById(entity.getAdmin().getId());
		entity.setAdmin(admin);
		String imagePath = fileService.saveImage(file, entity.getName());
		Image image = imageService.create(new Image(imagePath));
		entity.setImage(image);
		return culturalOfferRepository.save(entity);

	}

	public Page<CulturalOffer> getByCategoryId(Long id, Pageable pageable) {
		return culturalOfferRepository.getByCategoryId(id, pageable);
	}

	public Page<CulturalOffer> findByCategoryIdAndNameContains(Long id, String name, Pageable pageable) {
		return culturalOfferRepository.findByCategoryIdAndNameContainingIgnoreCase(id, name, pageable);
	}

	public Page<CulturalOffer> findByNameContains(String name, Pageable pageable) {
		return culturalOfferRepository.findByNameContainingIgnoreCase(name, pageable);
	}

	public Page<CulturalOffer> getSubscribedCulturalOffer(Long userID, Pageable pageable) {
		return culturalOfferRepository.findBySubscribedUsersId(userID, pageable);
	}
}
