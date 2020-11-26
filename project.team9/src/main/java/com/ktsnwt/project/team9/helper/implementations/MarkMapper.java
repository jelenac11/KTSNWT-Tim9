package com.ktsnwt.project.team9.helper.implementations;

import org.springframework.stereotype.Component;
import com.ktsnwt.project.team9.dto.MarkDTO;
import com.ktsnwt.project.team9.helper.interfaces.IMapper;
import com.ktsnwt.project.team9.model.Mark;

@Component
public class MarkMapper implements IMapper<Mark, MarkDTO> {

	@Override
	public Mark toEntity(MarkDTO dto) {
		return new Mark();
	}

	@Override
	public MarkDTO toDto(Mark entity) {
		return new MarkDTO();
	}
}
