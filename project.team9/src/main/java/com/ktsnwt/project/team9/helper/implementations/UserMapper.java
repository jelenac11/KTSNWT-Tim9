package com.ktsnwt.project.team9.helper.implementations;

import org.springframework.stereotype.Component;
import com.ktsnwt.project.team9.dto.UserDTO;
import com.ktsnwt.project.team9.helper.interfaces.IMapper;
import com.ktsnwt.project.team9.model.User;

@Component
public class UserMapper implements IMapper<User, UserDTO> {

	@Override
	public User toEntity(UserDTO dto) {
		System.out.println("iz mapera");
		System.out.println(dto.getId());
		return new User(dto.getId(), dto.getUsername(), dto.getEmail(), dto.getPassword(), dto.getFirstName(), dto.getLastName());
	}

	@Override
	public UserDTO toDto(User entity) {
		return new UserDTO(entity.getId(), entity.getUsername(), entity.getEmail(), entity.getPassword(), entity.getFirstName(), entity.getLastName());
	}
}
