package com.ktsnwt.project.team9.services.implementations;

import java.util.Optional;

import javax.persistence.EntityExistsException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.Geolocation;
import com.ktsnwt.project.team9.repositories.IGeolocationRepository;
import com.ktsnwt.project.team9.services.interfaces.IGeolocationService;

import javassist.NotFoundException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GeolocationService implements IGeolocationService {

	private IGeolocationRepository geolocationRepository;

	@Override
	public Iterable<Geolocation> getAll() {
		return geolocationRepository.findAll();
	}

	public Page<Geolocation> getAll(Pageable pageable) {
		return geolocationRepository.findAll(pageable);
	}

	@Override
	public Geolocation getById(Long id) {
		Optional<Geolocation> geolocation = geolocationRepository.findById(id);
		if (!geolocation.isPresent()) {
			return null;
		}
		return geolocation.get();
	}

	public Geolocation findByLatAndLon(double lat, double lon) {
		Optional<Geolocation> geolocation = geolocationRepository.findByLatAndLon(lat, lon);
		if (!geolocation.isPresent()) {
			return null;
		}
		return geolocation.get();
	}

	@Override
	public Geolocation create(Geolocation entity) {
		Geolocation geolocation = findByLatAndLon(entity.getLat(), entity.getLon());
		if (geolocation != null) {
			throw new EntityExistsException("Geolocation with given lat and lon already exists.");
		}
		return geolocationRepository.save(entity);
	}

	@Override
	public boolean delete(Long id) throws NotFoundException {
		Geolocation geolocation = getById(id);
		if (geolocation == null) {
			throw new NotFoundException("Geolocation with given id doesn't exist.");
		}
		geolocationRepository.deleteById(id);
		return true;
	}

	@Override
	public Geolocation update(Long id, Geolocation entity) throws NotFoundException {
		Geolocation existingGeolocation = getById(id);
		if (existingGeolocation == null) {
			throw new NotFoundException("Geolocation doesn't exist.");
		}
		existingGeolocation.setLat(entity.getLat());
		existingGeolocation.setLon(entity.getLon());
		existingGeolocation.setLocation(entity.getLocation());
		return geolocationRepository.save(entity);
	}
}
