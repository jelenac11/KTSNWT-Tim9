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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ktsnwt.project.team9.dto.CommentDTO;
import com.ktsnwt.project.team9.dto.response.CommentResDTO;
import com.ktsnwt.project.team9.helper.implementations.CommentMapper;
import com.ktsnwt.project.team9.helper.implementations.FileService;
import com.ktsnwt.project.team9.model.Comment;
import com.ktsnwt.project.team9.model.User;
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
	@RequestMapping(value= "/cultural-offer/{id}", method = RequestMethod.GET)
	public ResponseEntity<Page<CommentResDTO>> getAllCommentsForCulturalOffer(@PathVariable Long id, Pageable pageable){
		Page<Comment> page = commentService.findAllByCOID(pageable, id);
        List<CommentResDTO> commentDTOs = commentMapper.toResDTOList(page.toList());
        commentDTOs.stream().forEach(i->{
        	if (!i.getImageUrl().equals("")) {
				try {
					i.setImageUrl(fileService.uploadImageAsBase64(i.getImageUrl()));
				}catch (Exception e) {
					
				}
			}
		});
        Page<CommentResDTO> pageCommentDTOs = new PageImpl<>(commentDTOs, page.getPageable(), page.getTotalElements());
        return new ResponseEntity<Page<CommentResDTO>>(pageCommentDTOs, HttpStatus.OK);
	}
	
	
	@PreAuthorize("hasRole('ROLE_REGISTERED_USER')")
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> createComment(@RequestPart("commentDTO") @Valid @NotNull CommentDTO commentDTO, @RequestPart(value = "file", required = false) MultipartFile file) {
		try {
			if ((file == null || file.isEmpty()) && commentDTO.getText().equals("")) {
				return new ResponseEntity<>("Comment must have image or text", HttpStatus.BAD_REQUEST);
			}
			User current = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			commentDTO = commentMapper.toDto(commentService.create(commentMapper.dtoToEntity(commentDTO, current.getId()), file));
			return new ResponseEntity<>(commentDTO, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

}
