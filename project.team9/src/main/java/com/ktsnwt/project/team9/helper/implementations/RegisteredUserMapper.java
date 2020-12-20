package com.ktsnwt.project.team9.helper.implementations;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.ktsnwt.project.team9.dto.RegisteredUserDTO;
<<<<<<< Updated upstream
=======
import com.ktsnwt.project.team9.dto.UserDTO;
import com.ktsnwt.project.team9.dto.response.UserResDTO;
>>>>>>> Stashed changes
import com.ktsnwt.project.team9.helper.interfaces.IMapper;
import com.ktsnwt.project.team9.model.Comment;
import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.Mark;
import com.ktsnwt.project.team9.model.RegisteredUser;

@Component
public class RegisteredUserMapper implements IMapper<RegisteredUser, RegisteredUserDTO> {

<<<<<<< Updated upstream
	@Override
	public RegisteredUser toEntity(RegisteredUserDTO dto) {
		return new RegisteredUser(dto.getId(), dto.getUsername(), dto.getEmail(), dto.getPassword(), dto.getFirstName(),
				dto.getLastName(), Optional.ofNullable(dto.getMarks()).orElse(new HashSet<Long>()).stream()
				.map(i -> new Mark(i)).collect(Collectors.toSet()), Optional.ofNullable(dto.getComments()).orElse(new HashSet<Long>()).stream()
				.map(i -> new Comment(i)).collect(Collectors.toSet()), Optional.ofNullable(dto.getCulturalOffers()).orElse(new HashSet<Long>()).stream()
						.map(i -> new CulturalOffer(i)).collect(Collectors.toSet()), dto.isVerified());
=======
	public RegisteredUser toEntity(UserDTO user) {
		return new RegisteredUser(user.getUsername(), user.getEmail(), user.getPassword(), user.getFirstName(), user.getLastName());
	}
	
	@Override
	public RegisteredUser toEntity(RegisteredUserDTO dto) {
		return new RegisteredUser(dto.getUsername(), dto.getEmail(), dto.getPassword(), dto.getFirstName(), dto.getLastName());
>>>>>>> Stashed changes
	}

	@Override
	public RegisteredUserDTO toDto(RegisteredUser entity) {
		return new RegisteredUserDTO(entity.getUsername(), entity.getEmail(), entity.getPassword(),
				entity.getFirstName(), entity.getLastName(),  Optional.ofNullable(entity.getMarks())
				.orElse(new HashSet<Mark>()).stream().map(i -> i.getId()).collect(Collectors.toSet()), Optional.ofNullable(entity.getComments())
				.orElse(new HashSet<Comment>()).stream().map(i -> i.getId()).collect(Collectors.toSet()),  Optional.ofNullable(entity.getSubscribed())
				.orElse(new HashSet<CulturalOffer>()).stream().map(i -> i.getId()).collect(Collectors.toSet()), entity.isVerified());
<<<<<<< Updated upstream
=======
	}
	
	public UserResDTO toResDTO(RegisteredUser entity) {
		return new UserResDTO(entity.getId(), entity.getUsername(), entity.getEmail(), entity.getPassword(), entity.getFirstName(), entity.getLastName());
	}

	public List<UserResDTO> toResDTOList(Iterable<RegisteredUser> entities) {
		List<UserResDTO> dtos = new ArrayList<>();
		for(RegisteredUser entity : entities) {
			dtos.add(toResDTO(entity));
		}
		return dtos;
>>>>>>> Stashed changes
	}

	public List<RegisteredUserDTO> toDTOList(Iterable<RegisteredUser> entities) {
		List<RegisteredUserDTO> dtos = new ArrayList<RegisteredUserDTO>();
		for(RegisteredUser entity : entities) {
			dtos.add(toDto(entity));
		}
		return dtos;
	}
}
