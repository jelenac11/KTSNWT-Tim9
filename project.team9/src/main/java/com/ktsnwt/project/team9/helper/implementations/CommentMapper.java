package com.ktsnwt.project.team9.helper.implementations;

import org.springframework.stereotype.Component;
import com.ktsnwt.project.team9.dto.CommentDTO;
import com.ktsnwt.project.team9.helper.interfaces.IMapper;
import com.ktsnwt.project.team9.model.Comment;

@Component
public class CommentMapper implements IMapper<Comment, CommentDTO> {

	@Override
	public Comment toEntity(CommentDTO dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CommentDTO toDto(Comment entity) {
		// TODO Auto-generated method stub
		return null;
	}
}
