package com.ktsnwt.project.team9.controllers;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ktsnwt.project.team9.dto.CommentDTO;
import com.ktsnwt.project.team9.helper.implementations.CommentMapper;
import com.ktsnwt.project.team9.helper.implementations.FileService;
import com.ktsnwt.project.team9.model.Comment;
import com.ktsnwt.project.team9.services.implementations.CommentService;


@RestController
@RequestMapping(value = "/api/comments", produces = MediaType.APPLICATION_JSON_VALUE)
public class CommentController {
	
	@Autowired
	private CommentService commentService;
	private CommentMapper commentMapper;
	private FileService fileService;
	
	public CommentController() {
		commentMapper = new CommentMapper();
		fileService = new FileService();
	}
	
	@PreAuthorize("permitAll()")
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Iterable<CommentDTO>> getAllComments() {
		List<CommentDTO> commentsDTO = commentMapper.toDTOList(commentService.getAll());
		commentsDTO.stream().forEach(i->{
			if (!StringUtils.isEmpty(i.getImageUrl())) {
				try {
					i.setImageUrl(fileService.uploadImageAsBase64(i.getImageUrl()));
				}catch (Exception e) {
					
				}
			}
		});
		return new ResponseEntity<>(commentsDTO, HttpStatus.OK);
	}
	
	@PreAuthorize("permitAll()")
	@RequestMapping(value= "/by-page", method = RequestMethod.GET)
	public ResponseEntity<Page<CommentDTO>> getAllComments(Pageable pageable){
		Page<Comment> page = commentService.findAll(pageable);
        List<CommentDTO> commentDTOs = commentMapper.toDTOList(page.toList());
        commentDTOs.stream().forEach(i->{
        	if (!StringUtils.isEmpty(i.getImageUrl())) {
				try {
					i.setImageUrl(fileService.uploadImageAsBase64(i.getImageUrl()));
				}catch (Exception e) {
					
				}
			}
		});
        Page<CommentDTO> pageCommentDTOs = new PageImpl<>(commentDTOs,page.getPageable(),page.getTotalElements());
        return new ResponseEntity<Page<CommentDTO>>(pageCommentDTOs, HttpStatus.OK);
	}
	
	@PreAuthorize("permitAll()")
	@RequestMapping(value= "/cultural-offer/{id}", method = RequestMethod.GET)
	public ResponseEntity<Page<CommentDTO>> getAllCommentsForCulturalOffer(@PathVariable Long id, Pageable pageable){
		Page<Comment> page = commentService.findAllByCOID(pageable, id);
        List<CommentDTO> commentDTOs = commentMapper.toDTOList(page.toList());
        commentDTOs.stream().forEach(i->{
        	if (!StringUtils.isEmpty(i.getImageUrl())) {
				try {
					i.setImageUrl(fileService.uploadImageAsBase64(i.getImageUrl()));
				}catch (Exception e) {
					
				}
			}
		});
        Page<CommentDTO> pageCommentDTOs = new PageImpl<>(commentDTOs,page.getPageable(),page.getTotalElements());
        return new ResponseEntity<Page<CommentDTO>>(pageCommentDTOs, HttpStatus.OK);
	}
	
	@PreAuthorize("permitAll()")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<CommentDTO> getComment(@PathVariable Long id) {
		Comment comment = commentService.getById(id);
		if (comment == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		CommentDTO dto = commentMapper.toDto(comment);
		try {
			if (dto.getImageUrl() != null) {
				dto.setImageUrl(fileService.uploadImageAsBase64(dto.getImageUrl()));
			}
		} catch (IOException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(commentMapper.toDto(comment), HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_REGISTERED_USER')")
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<CommentDTO> createComment(@RequestPart("commentDTO") @Valid @NotNull CommentDTO commentDTO, @RequestPart(value = "file", required = false) MultipartFile file) {
		try {
			commentDTO = commentMapper.toDto(commentService.create(commentMapper.toEntity(commentDTO), file));
			if (file != null && !file.isEmpty()) {
				commentDTO.setImageUrl(fileService.uploadImageAsBase64(commentDTO.getImageUrl()));
			}
			return new ResponseEntity<>(commentDTO, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
/*	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<CommentDTO> updateComment(@PathVariable Long id, @RequestPart("commentDTO") @Valid @NotNull CommentDTO commentDTO, @RequestPart("file") MultipartFile file) {
		try {
			commentDTO = commentMapper.toDto(commentService.update(id, commentMapper.toEntity(commentDTO), file));
			if (file != null && !file.isEmpty()) {
				commentDTO.setImageUrl(fileService.uploadImageAsBase64(commentDTO.getImageUrl()));
			}
			return new ResponseEntity<>(commentDTO, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}*/

	@PreAuthorize("hasRole('ROLE_REGISTERED_USER')")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> deleteComment(@PathVariable Long id) {
		try {
			return new ResponseEntity<>(commentService.delete(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
