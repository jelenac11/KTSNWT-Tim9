package com.ktsnwt.project.team9.services.implementations;

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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Geolocation getById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Geolocation create(Geolocation entity) throws Exception {
		Geolocation geolocation = geolocationRepository.findByLatAndLon(entity.getLat(), entity.getLon()).orElse(null);
		if(geolocation!=null) {
			throw new Exception("Geolocation with given lat and lon already exists.");
		}
		return geolocationRepository.save(entity);
	}

	@Override
	public boolean delete(Long id) throws Exception {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Geolocation update(Long id, Geolocation entity) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	
	public Geolocation findByLatAndLon(double lat, double lon) {
		return geolocationRepository.findByLatAndLon(lat, lon).orElse(null);
	}
}
