package com.ktsnwt.project.team9.helper.implementations;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.ktsnwt.project.team9.dto.MarkDTO;
import com.ktsnwt.project.team9.helper.interfaces.IMapper;
import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.Mark;
import com.ktsnwt.project.team9.model.RegisteredUser;

@Component
public class MarkMapper implements IMapper<Mark, MarkDTO> {

	@Override
	public Mark toEntity(MarkDTO dto) {
		return new Mark(dto.getId(), dto.getValue(), new RegisteredUser((long) 0), new CulturalOffer(dto.getCulturalOffer()));
	}
	
	public Mark dtoToEntity(MarkDTO dto, Long id) {
		return new Mark(dto.getId(), dto.getValue(), new RegisteredUser(id), new CulturalOffer(dto.getCulturalOffer()));
	}

	@Override
	public MarkDTO toDto(Mark entity) {
		return new MarkDTO(entity.getId(), entity.getValue(), entity.getCulturalOffer().getId());
	}
	
	public List<MarkDTO> toDTOList(Iterable<Mark> entities){
		List<MarkDTO> dtos = new ArrayList<>();
		for(Mark entity : entities) {
			dtos.add(toDto(entity));
		}
		return dtos;
	}
}
