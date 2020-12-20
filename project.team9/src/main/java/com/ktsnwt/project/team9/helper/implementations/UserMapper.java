package com.ktsnwt.project.team9.helper.implementations;

import org.springframework.stereotype.Component;
import com.ktsnwt.project.team9.dto.UserDTO;
import com.ktsnwt.project.team9.helper.interfaces.IMapper;
import com.ktsnwt.project.team9.model.User;

@Component
public class UserMapper implements IMapper<User, UserDTO> {

	@Override
	public User toEntity(UserDTO dto) {
		return new User();
	}

	@Override
	public UserDTO toDto(User entity) {
<<<<<<< Updated upstream
		return new UserDTO(entity.getId(), entity.getUsername(), entity.getEmail(), entity.getPassword(), entity.getFirstName(), entity.getLastName());
=======
		return new UserDTO(entity.getUsername(), entity.getEmail(), entity.getPassword(), entity.getFirstName(), entity.getLastName());
	}
	
	public UserResDTO toResDTO(User entity) {
		return new UserResDTO(entity.getId(), entity.getUsername(), entity.getEmail(), entity.getPassword(), entity.getFirstName(), entity.getLastName());
>>>>>>> Stashed changes
	}
}
