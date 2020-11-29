package com.ktsnwt.project.team9.helper.implementations;

import org.springframework.stereotype.Component;
import com.ktsnwt.project.team9.dto.RegisteredUserDTO;
import com.ktsnwt.project.team9.helper.interfaces.IMapper;
import com.ktsnwt.project.team9.model.RegisteredUser;

@Component
public class RegisteredUserMapper implements IMapper<RegisteredUser, RegisteredUserDTO> {

	@Override
	public RegisteredUser toEntity(RegisteredUserDTO dto) {
		return new RegisteredUser();
	}

	@Override
	public RegisteredUserDTO toDto(RegisteredUser entity) {
		return new RegisteredUserDTO();
	}
}
