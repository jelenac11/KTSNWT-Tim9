package com.ktsnwt.project.team9.controllers;

import java.util.List;
import java.util.NoSuchElementException;

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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ktsnwt.project.team9.dto.CommentDTO;
import com.ktsnwt.project.team9.dto.response.CommentResDTO;
import com.ktsnwt.project.team9.helper.implementations.CommentMapper;
import com.ktsnwt.project.team9.helper.implementations.CustomPageImplementation;
import com.ktsnwt.project.team9.helper.implementations.FileService;
import com.ktsnwt.project.team9.model.Comment;
import com.ktsnwt.project.team9.model.User;
import com.ktsnwt.project.team9.services.implementations.CommentService;


@RestController
@RequestMapping(value = "/api/comments", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "https://localhost:4200", maxAge = 3600, allowedHeaders = "*")
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
	@GetMapping(value= "/cultural-offer/{id}")
	public ResponseEntity<Page<CommentResDTO>> getAllCommentsForCulturalOffer(@PathVariable Long id, Pageable pageable){
		Page<Comment> page = commentService.findAllByCOID(pageable, id);
        List<CommentResDTO> commentDTOs = addImage(commentMapper.toResDTOList(page.toList()));
        Page<CommentResDTO> pageCommentDTOs = new PageImpl<>(commentDTOs, page.getPageable(), page.getTotalElements());
        return new ResponseEntity<>(createCustomPage(pageCommentDTOs), HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping(value= "/not-approved-comments")
	public ResponseEntity<Page<CommentResDTO>> getAllNotApprovedCommentsForCulturalOffers(Pageable pageable){
		User current = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Page<Comment> page = commentService.findAllByNotApprovedByAdminId(pageable, current.getId());
        List<CommentResDTO> commentDTOs = addImage(commentMapper.toResDTOList(page.toList()));
        Page<CommentResDTO> pageCommentDTOs = new PageImpl<>(commentDTOs, page.getPageable(), page.getTotalElements());
        return new ResponseEntity<>(createCustomPage(pageCommentDTOs), HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_REGISTERED_USER')")
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> createComment(@RequestPart("commentDTO") @Valid @NotNull CommentDTO commentDTO, @RequestPart(value = "file", required = false) MultipartFile file) {
		try {
			if ((file == null || file.isEmpty()) && commentDTO.getText().equals("")) {
				return new ResponseEntity<>("Comment must have image or text", HttpStatus.BAD_REQUEST);
			}
			User current = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			Comment res = commentService.create(commentMapper.dtoToEntity(commentDTO, current.getId()), file);
			CommentResDTO resDTO = commentMapper.toResDTO(commentService.getById(res.getId()));
			return new ResponseEntity<>(resDTO, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping(value= "/approve/{id}")
	public ResponseEntity<String> approveComment(@PathVariable Long id) {
		try {
			commentService.approveComment(id, true);
			return new ResponseEntity<>("Comment successfully approved", HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>("Comment doesn't exist", HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping(value= "/decline/{id}")
	public ResponseEntity<String> declineComment(@PathVariable Long id) {
		try {
			commentService.approveComment(id, false);
			return new ResponseEntity<>("Comment successfully declined", HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>("Comment doesn't exist", HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	private List<CommentResDTO> addImage(List<CommentResDTO> commentDTOs) {
		commentDTOs.stream().forEach(i->{
        	if (i.getImageUrl() != null && !i.getImageUrl().equals("")) {
				try {
					i.setImageUrl(fileService.uploadImageAsBase64(i.getImageUrl()));
				}catch (Exception e) {
					System.err.println(e.getMessage());
				}
    		}
		});
		return commentDTOs;
	}
	
	private Page<CommentResDTO> createCustomPage(Page<CommentResDTO> page) {
		return new CustomPageImplementation<>(page.getContent(), page.getNumber(), page.getSize(),
				page.getTotalElements(), null, page.isLast(), page.getTotalPages(), null, page.isFirst(),
				page.getNumberOfElements());
	}

}
