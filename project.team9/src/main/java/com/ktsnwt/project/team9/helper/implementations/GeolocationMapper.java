package com.ktsnwt.project.team9.helper.implementations;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import com.ktsnwt.project.team9.dto.GeolocationDTO;
import com.ktsnwt.project.team9.helper.interfaces.IMapper;
import com.ktsnwt.project.team9.model.Geolocation;

@Component
public class GeolocationMapper implements IMapper<Geolocation, GeolocationDTO> {

	@Override
	public Geolocation toEntity(GeolocationDTO dto) {
		return new Geolocation(dto.getId(), dto.getLocation(), dto.getLat(), dto.getLon());
	}

	@Override
	public GeolocationDTO toDto(Geolocation entity) {
		return new GeolocationDTO(entity.getId(), entity.getLocation(), entity.getLat(), entity.getLon());
	}
	
	public List<GeolocationDTO> toDTOList(Iterable<Geolocation> entities){
		List<GeolocationDTO> dtos = new ArrayList<GeolocationDTO>();
		for(Geolocation geolocation : entities) {
			dtos.add(toDto(geolocation));
		}
		return dtos;
	}
}
