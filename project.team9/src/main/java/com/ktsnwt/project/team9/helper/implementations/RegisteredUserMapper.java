package com.ktsnwt.project.team9.helper.implementations;

import java.util.ArrayList;
import java.util.List;


import org.springframework.stereotype.Component;

import com.ktsnwt.project.team9.dto.UserDTO;
import com.ktsnwt.project.team9.dto.response.UserResDTO;
import com.ktsnwt.project.team9.model.RegisteredUser;

@Component
public class RegisteredUserMapper { // implements IMapper<RegisteredUser, RegisteredUserDTO> {

	public RegisteredUser toEntity(UserDTO user) {
		return new RegisteredUser(user.getUsername(), user.getEmail(), user.getPassword(), user.getFirstName(), user.getLastName());
	}
	
	/*@Override
	public RegisteredUser toEntity(RegisteredUserDTO dto) {
		return new RegisteredUser(dto.getUsername(), dto.getEmail(), dto.getPassword(), dto.getFirstName(),
				dto.getLastName(), Optional.ofNullable(dto.getMarks()).orElse(new HashSet<Long>()).stream()
				.map(i -> new Mark(i)).collect(Collectors.toSet()), Optional.ofNullable(dto.getComments()).orElse(new HashSet<Long>()).stream()
				.map(i -> new Comment(i)).collect(Collectors.toSet()), Optional.ofNullable(dto.getCulturalOffers()).orElse(new HashSet<Long>()).stream()
						.map(i -> new CulturalOffer(i)).collect(Collectors.toSet()), dto.isVerified());
		return null;
	}

	@Override
	public RegisteredUserDTO toDto(RegisteredUser entity) {
		return new RegisteredUserDTO(entity.getId(), entity.getUsername(), entity.getEmail(), entity.getPassword(),
				entity.getFirstName(), entity.getLastName(),  Optional.ofNullable(entity.getMarks())
				.orElse(new HashSet<Mark>()).stream().map(i -> i.getId()).collect(Collectors.toSet()), Optional.ofNullable(entity.getComments())
				.orElse(new HashSet<Comment>()).stream().map(i -> i.getId()).collect(Collectors.toSet()),  Optional.ofNullable(entity.getSubscribed())
				.orElse(new HashSet<CulturalOffer>()).stream().map(i -> i.getId()).collect(Collectors.toSet()), entity.isVerified());
		return null;
	}*/
	
	public UserResDTO toResDTO(RegisteredUser entity) {
		return new UserResDTO(entity.getId(), entity.getUsername(), entity.getEmail(), entity.getPassword(), entity.getFirstName(), entity.getLastName());
	}

	public List<UserResDTO> toResDTOList(Iterable<RegisteredUser> entities) {
		List<UserResDTO> dtos = new ArrayList<UserResDTO>();
		for(RegisteredUser entity : entities) {
			dtos.add(toResDTO(entity));
		}
		return dtos;
	}

	public List<UserResDTO> toDTOResList(List<RegisteredUser> entities) {
		List<UserResDTO> dtos = new ArrayList<>();
		for(RegisteredUser entity : entities) {
			dtos.add(toResDTO(entity));
		}
		return dtos;
	}
	
}
