package com.ktsnwt.project.team9.helper.interfaces;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;


public abstract class SetMapper<ENTITY,DTO> implements IMapper<ENTITY, DTO> {

	public Set<DTO> toDTOList(Collection<ENTITY> entities){
		return entities.stream().map(entity -> this.toDto(entity)).collect(Collectors.toSet());
	}
}
