package com.ktsnwt.project.team9.helper.interfaces;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.ktsnwt.project.team9.dto.CategoryDTO;


public abstract class ListMapper<ENTITY,DTO> implements IMapper<ENTITY, DTO> {

	public List<DTO> toDTOList(Collection<ENTITY> entities){
		return entities.stream().map(entity -> this.toDto(entity)).collect(Collectors.toList());
	}
}
