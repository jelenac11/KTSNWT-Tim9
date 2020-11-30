package com.ktsnwt.project.team9.services.implementations;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.Geolocation;
import com.ktsnwt.project.team9.repositories.IGeolocationRepository;
import com.ktsnwt.project.team9.services.interfaces.IGeolocationService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GeolocationService implements IGeolocationService {

	private IGeolocationRepository geolocationRepository;
	
	@Override
	public Iterable<Geolocation> getAll() {
		return geolocationRepository.findAll();
	}
	
	public Page<Geolocation> getAll(Pageable pageable){
		return geolocationRepository.findAll(pageable);
	}

	@Override
	public Geolocation getById(Long id) {
		return geolocationRepository.findById(id).orElse(null);
	}
	
	public Geolocation findByLatAndLon(double lat, double lon) {
		return geolocationRepository.findByLatAndLon(lat, lon).orElse(null);
	}

	@Override
	public Geolocation create(Geolocation entity) throws Exception {
		Geolocation geolocation = findByLatAndLon(entity.getLat(), entity.getLon());
		if(geolocation!=null) {
			throw new Exception("Geolocation with given lat and lon already exists.");
		}
		return geolocationRepository.save(entity);
	}

	@Override
	public boolean delete(Long id) throws Exception {
		Geolocation geolocation = getById(id);
		if(geolocation==null) {
			throw new Exception("Geolocation with given id doesn't exist.");
		}
		geolocationRepository.deleteById(id);
		return true;
	}

	@Override
	public Geolocation update(Long id, Geolocation entity) throws Exception {
		Geolocation existingGeolocation = getById(id);
		if(existingGeolocation==null) {
			throw new Exception("Geolocation doesn't exist.");
		}
		existingGeolocation.setLat(entity.getLat());
		existingGeolocation.setLon(entity.getLon());
		existingGeolocation.setLocation(entity.getLocation());
		return geolocationRepository.save(entity);
	}
}
