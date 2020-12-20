package com.ktsnwt.project.team9.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ktsnwt.project.team9.dto.MarkDTO;
import com.ktsnwt.project.team9.helper.implementations.MarkMapper;
import com.ktsnwt.project.team9.model.Mark;
import com.ktsnwt.project.team9.model.User;
import com.ktsnwt.project.team9.services.implementations.MarkService;

@RestController
@RequestMapping(value = "/api/marks", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowedHeaders = "*")
public class MarkController {
	
	@Autowired
	private MarkService markService;
	private MarkMapper markMapper;

	public MarkController() {
		markMapper = new MarkMapper();
	}
	
	@PreAuthorize("hasRole('ROLE_REGISTERED_USER')")
	@GetMapping(value = "/{id}")
	public ResponseEntity<MarkDTO> getMarkForCulturalOffer(@PathVariable Long id) {
		User current = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Mark mark = markService.findByUserIdAndCulturalOfferId(current.getId(), id);
		if (mark == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(markMapper.toDto(mark), HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_REGISTERED_USER')")
	@PostMapping(value = "/rate", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MarkDTO> createMark(@Valid @RequestBody MarkDTO markDTO) {
		User current = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		try {
			return new ResponseEntity<>(markMapper.toDto(markService.create(markMapper.dtoToEntity(markDTO, current.getId()))), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PreAuthorize("hasRole('ROLE_REGISTERED_USER')")
	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MarkDTO> updateMark(@Valid @RequestBody MarkDTO markDTO) {
		User current = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		try {
			return new ResponseEntity<>(markMapper.toDto(markService.update(current.getId(), markMapper.dtoToEntity(markDTO, current.getId()))), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
}
