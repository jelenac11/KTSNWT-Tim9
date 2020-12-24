package com.ktsnwt.project.team9.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ktsnwt.project.team9.dto.GeolocationDTO;
import com.ktsnwt.project.team9.helper.implementations.CustomPageImplementation;
import com.ktsnwt.project.team9.helper.implementations.GeolocationMapper;
import com.ktsnwt.project.team9.model.Geolocation;
import com.ktsnwt.project.team9.services.implementations.GeolocationService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(value = "/api/geolocations", produces = MediaType.APPLICATION_JSON_VALUE)
@PreAuthorize("hasRole('ROLE_ADMIN')")
//@PreAuthorize("permitAll()")
@AllArgsConstructor
public class GeolocationController {

	private GeolocationService geolocationService;

	private GeolocationMapper geolocationMapper;

	@GetMapping
	public ResponseEntity<List<GeolocationDTO>> getAllGeolocations() {
		List<GeolocationDTO> geolocationDTO = geolocationMapper.toDTOList(geolocationService.getAll());
		return new ResponseEntity<>(geolocationDTO, HttpStatus.OK);
	}

	@GetMapping(value = "/by-page")
	public ResponseEntity<CustomPageImplementation<GeolocationDTO>> getAllGeolocations(Pageable pageable) {
		Page<Geolocation> page = geolocationService.getAll(pageable);
		List<GeolocationDTO> geolocationDTOs = geolocationMapper.toDTOList(page.toList());
		Page<GeolocationDTO> pageGeolocationDTOs = new PageImpl<>(geolocationDTOs, page.getPageable(),
				page.getTotalElements());
		CustomPageImplementation<GeolocationDTO> customPageImplementation = new CustomPageImplementation<>(
				pageGeolocationDTOs.getContent(), pageGeolocationDTOs.getNumber(), pageGeolocationDTOs.getSize(),
				pageGeolocationDTOs.getTotalElements(), null, pageGeolocationDTOs.isLast(),
				pageGeolocationDTOs.getTotalPages(), null, pageGeolocationDTOs.isFirst(),
				pageGeolocationDTOs.getNumberOfElements());
		return new ResponseEntity<>(customPageImplementation, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<GeolocationDTO> getGeolocation(@PathVariable Long id) {
		Geolocation geolocation = geolocationService.getById(id);
		if (geolocation == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(geolocationMapper.toDto(geolocation), HttpStatus.OK);
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<GeolocationDTO> createGeolocation(@Valid @RequestBody GeolocationDTO geolocationDTO) {
		try {
			return new ResponseEntity<>(
					geolocationMapper.toDto(geolocationService.create(geolocationMapper.toEntity(geolocationDTO))),
					HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Boolean> deleteGeolocation(@PathVariable Long id) {
		try {
			return new ResponseEntity<>(geolocationService.delete(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
