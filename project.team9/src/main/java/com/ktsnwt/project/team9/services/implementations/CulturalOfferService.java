package com.ktsnwt.project.team9.services.implementations;

import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.Admin;
import com.ktsnwt.project.team9.model.Category;
import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.Geolocation;
import com.ktsnwt.project.team9.repositories.ICulturalOfferRepository;
import com.ktsnwt.project.team9.services.interfaces.ICulturalOfferService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CulturalOfferService implements ICulturalOfferService {

	private ICulturalOfferRepository culturalOfferRepository;

	private CategoryService categoryService;

	private GeolocationService geolocationService;

	private AdminService adminService;

	@Override
	public Iterable<CulturalOffer> getAll() {
		return culturalOfferRepository.findAll();
	}

	@Override
	public CulturalOffer getById(Long id) {
		return culturalOfferRepository.findById(id).orElse(null);
	}

	@Override
	public CulturalOffer create(CulturalOffer entity) throws Exception {
		entity.setActive(true);
		Category category = categoryService.getById(entity.getCategory().getId());
		if(category==null) {
			throw new Exception("Category doesn't exist.");
		}
		entity.setCategory(category);
		Geolocation geolocation = geolocationService.create(entity.getGeolocation());
		entity.setGeolocation(geolocation);
		Admin admin = adminService.getById(entity.getAdmin().getId());
		entity.setAdmin(admin);
		return culturalOfferRepository.save(entity);
	}

	@Override
	public boolean delete(Long id) throws Exception {
		CulturalOffer existingCulturalOffer = culturalOfferRepository.findById(id).orElse(null);
		if (existingCulturalOffer == null) {
			throw new Exception("Cultural offer with given id doesn't exist.");
		}
		culturalOfferRepository.deleteById(id);
		return true;
	}

	@Override
	public CulturalOffer update(Long id, CulturalOffer entity) throws Exception {
		CulturalOffer existingCulturalOffer = culturalOfferRepository.findById(id).orElse(null);
		if (existingCulturalOffer == null) {
			throw new Exception("Cultural offer with given id doesn't exist.");
		}
		Category category = categoryService.getById(entity.getCategory().getId());
		if(category==null) {
			throw new Exception("Category doesn't exist.");
		}
		existingCulturalOffer.setCategory(category);
		existingCulturalOffer.setDescription(entity.getDescription());
		Geolocation geolocation = geolocationService.findByLatAndLon(existingCulturalOffer.getGeolocation().getLat(),
				existingCulturalOffer.getGeolocation().getLon());
		geolocation.setLat(entity.getGeolocation().getLat());
		geolocation.setLon(entity.getGeolocation().getLon());
		geolocation.setLocation(entity.getGeolocation().getLocation());
		existingCulturalOffer.setGeolocation(geolocation);
		existingCulturalOffer.setImageURL(entity.getImageURL());

		return culturalOfferRepository.save(existingCulturalOffer);
	}
}
