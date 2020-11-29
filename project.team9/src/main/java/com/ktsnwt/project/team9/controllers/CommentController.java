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

import com.ktsnwt.project.team9.dto.CommentDTO;
import com.ktsnwt.project.team9.helper.implementations.CommentMapper;
import com.ktsnwt.project.team9.model.Comment;
import com.ktsnwt.project.team9.services.implementations.CommentService;


@RestController
@RequestMapping(value = "/api/comments", produces = MediaType.APPLICATION_JSON_VALUE)
public class CommentController {
	
	@Autowired
	private CommentService commentService;
	private CommentMapper commentMapper;
	
	public CommentController() {
		commentMapper = new CommentMapper();
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Iterable<CommentDTO>> getAllComments() {
		List<CommentDTO> commentsDTO = commentMapper.toDTOList(commentService.getAll());
		return new ResponseEntity<>(commentsDTO, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<CommentDTO> getAdmin(@PathVariable Long id) {
		Comment comment = commentService.getById(id);
		if (comment == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(commentMapper.toDto(comment), HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CommentDTO> createComment(@Valid @RequestBody CommentDTO commentDTO) {
		try {
			return new ResponseEntity<>(commentMapper.toDto(commentService.create(commentMapper.toEntity(commentDTO))), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CommentDTO> updateComment(@PathVariable Long id, @Valid @RequestBody CommentDTO commentDTO) {
		try {
			return new ResponseEntity<>(commentMapper.toDto(commentService.update(id, commentMapper.toEntity(commentDTO))), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> deleteComment(@PathVariable Long id) {
		try {
			return new ResponseEntity<>(commentService.delete(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
