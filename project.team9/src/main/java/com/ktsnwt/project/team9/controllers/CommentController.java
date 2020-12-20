package com.ktsnwt.project.team9.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
<<<<<<< Updated upstream
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
=======
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
	
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
=======

	@PreAuthorize("permitAll()")
	@GetMapping(value= "/cultural-offer/{id}")
	public ResponseEntity<Page<CommentResDTO>> getAllCommentsForCulturalOffer(@PathVariable Long id, Pageable pageable){
		Page<Comment> page = commentService.findAllByCOID(pageable, id);
        List<CommentResDTO> commentDTOs = commentMapper.toResDTOList(page.toList());
        commentDTOs = addImage(commentDTOs);
        Page<CommentResDTO> pageCommentDTOs = new PageImpl<>(commentDTOs, page.getPageable(), page.getTotalElements());
        return new ResponseEntity<>(pageCommentDTOs, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping(value= "/not-approved-comments")
	public ResponseEntity<Page<CommentResDTO>> getAllNotApprovedCommentsForCulturalOffers(Pageable pageable){
		User current = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Page<Comment> page = commentService.findAllByNotApprovedByAdminId(pageable, current.getId());
        List<CommentResDTO> commentDTOs = commentMapper.toResDTOList(page.toList());
        commentDTOs = addImage(commentDTOs);
        Page<CommentResDTO> pageCommentDTOs = new PageImpl<>(commentDTOs, page.getPageable(), page.getTotalElements());
        return new ResponseEntity<>(pageCommentDTOs, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_REGISTERED_USER')")
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> createComment(@RequestPart("commentDTO") @Valid @NotNull CommentDTO commentDTO, @RequestPart(value = "file", required = false) MultipartFile file) {
>>>>>>> Stashed changes
		try {
			return new ResponseEntity<>(commentMapper.toDto(commentService.create(commentMapper.toEntity(commentDTO))), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
<<<<<<< Updated upstream
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CommentDTO> updateComment(@PathVariable Long id, @Valid @RequestBody CommentDTO commentDTO) {
=======
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping(value= "/approve/{id}")
	public ResponseEntity<String> approveComment(@PathVariable Long id) {
>>>>>>> Stashed changes
		try {
			return new ResponseEntity<>(commentMapper.toDto(commentService.update(id, commentMapper.toEntity(commentDTO))), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
<<<<<<< Updated upstream
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> deleteComment(@PathVariable Long id) {
=======

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping(value= "/decline/{id}")
	public ResponseEntity<String> declineComment(@PathVariable Long id) {
>>>>>>> Stashed changes
		try {
			return new ResponseEntity<>(commentService.delete(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
<<<<<<< Updated upstream
=======
	
	private List<CommentResDTO> addImage(List<CommentResDTO> commentDTOs) {
		commentDTOs.stream().forEach(i->{
        	if (i.getImageUrl() != null && !i.getImageUrl().equals("")) {
				try {
					i.setImageUrl(fileService.uploadImageAsBase64(i.getImageUrl()));
				}catch (Exception e) {
					System.out.println(e.getMessage());
				}
    		}
		});
		return commentDTOs;
	}

>>>>>>> Stashed changes
}
