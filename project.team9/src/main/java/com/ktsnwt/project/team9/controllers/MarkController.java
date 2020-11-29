package com.ktsnwt.project.team9.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ktsnwt.project.team9.dto.MarkDTO;
import com.ktsnwt.project.team9.helper.implementations.MarkMapper;
import com.ktsnwt.project.team9.model.Mark;
import com.ktsnwt.project.team9.services.implementations.MarkService;

@RestController
@RequestMapping(value = "/api/marks", produces = MediaType.APPLICATION_JSON_VALUE)
public class MarkController {
	
	@Autowired
	private MarkService markService;
	private MarkMapper markMapper;

	public MarkController() {
		markMapper = new MarkMapper();
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Iterable<MarkDTO>> getAllMarks() {
		List<MarkDTO> marksDTO = markMapper.toDTOList(markService.getAll());
		return new ResponseEntity<>(marksDTO, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<MarkDTO> getMark(@PathVariable Long id) {
		Mark mark = markService.getById(id);
		if (mark == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(markMapper.toDto(mark), HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MarkDTO> createMark(@Valid @RequestBody MarkDTO markDTO) {
		try {
			return new ResponseEntity<>(markMapper.toDto(markService.create(markMapper.toEntity(markDTO))), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MarkDTO> updateMark(@PathVariable Long id, @Valid @RequestBody MarkDTO markDTO) {
		try {
			return new ResponseEntity<>(markMapper.toDto(markService.update(id, markMapper.toEntity(markDTO))), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> deleteComment(@PathVariable Long id) {
		try {
			return new ResponseEntity<>(markService.delete(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
