package com.ktsnwt.project.team9.helper.implementations;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;

import com.ktsnwt.project.team9.dto.CommentDTO;
import com.ktsnwt.project.team9.dto.response.CommentResDTO;
import com.ktsnwt.project.team9.helper.interfaces.IMapper;
import com.ktsnwt.project.team9.model.Comment;
import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.RegisteredUser;

@Component
public class CommentMapper implements IMapper<Comment, CommentDTO> {

	@Override
	public Comment toEntity(CommentDTO dto) {
		return null;
	}

	@Override
	public CommentDTO toDto(Comment entity) {
		return null;
	}
	
	public List<CommentDTO> toDTOList(Iterable<Comment> entities) {
		List<CommentDTO> dtos = new ArrayList<>();
		for(Comment entity : entities) {
			dtos.add(toDto(entity));
		}
		return dtos;
	}
	
	public CommentResDTO toResDTO(Comment entity) {
		if (entity.getImageUrl() != null) {
			return new CommentResDTO(entity.getId(), entity.getDate(), entity.getAuthor().getUsername(), entity.getCulturalOffer().getName(), entity.getText(), entity.getImageUrl().getUrl());
		}
		return new CommentResDTO(entity.getId(), entity.getDate(), entity.getAuthor().getUsername(), entity.getCulturalOffer().getName(), entity.getText(), null);
	}
	
	public List<CommentResDTO> toResDTOList(List<Comment> entities) {
		List<CommentResDTO> dtos = new ArrayList<>();
		for(Comment entity : entities) {
			dtos.add(toResDTO(entity));
		}
		return dtos;
	}
	
	public Comment dtoToEntity(CommentDTO dto, Long authorId) {
		return new Comment(new RegisteredUser(authorId), new CulturalOffer(dto.getCulturalOffer()), dto.getText(), (new Date()).getTime());
	}
}
