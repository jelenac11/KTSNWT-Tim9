package com.ktsnwt.project.team9.helper.implementations;


import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.ktsnwt.project.team9.dto.CommentDTO;
import com.ktsnwt.project.team9.helper.interfaces.IMapper;
import com.ktsnwt.project.team9.model.Comment;
import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.RegisteredUser;

@Component
public class CommentMapper implements IMapper<Comment, CommentDTO> {

	@Override
	public Comment toEntity(CommentDTO dto) {
		return new Comment(dto.getId(), dto.isApproved(), dto.getDateTime(), new RegisteredUser(dto.getAuthor()), new CulturalOffer(dto.getCulturalOffer()),
				dto.getText(), dto.getImageUrl());
	}

	@Override
	public CommentDTO toDto(Comment entity) {
		return new CommentDTO(entity.getId(), entity.isApproved(), entity.getDate(), entity.getAuthor().getId(),
				entity.getCulturalOffer().getId(), entity.getText(), entity.getImageUrl());
	}
	
	public List<CommentDTO> toDTOList(Iterable<Comment> entities) {
		List<CommentDTO> dtos = new ArrayList<CommentDTO>();
		for(Comment entity : entities) {
			dtos.add(toDto(entity));
		}
		return dtos;
	}
}
