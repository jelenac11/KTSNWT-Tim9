package com.ktsnwt.project.team9.helper.implementations;

import java.util.HashSet;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.ktsnwt.project.team9.dto.AdminDTO;
import com.ktsnwt.project.team9.helper.interfaces.IMapper;
import com.ktsnwt.project.team9.model.Admin;
import com.ktsnwt.project.team9.model.CulturalOffer;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class AdminMapper implements IMapper<Admin, AdminDTO> {

	@Override
	public Admin toEntity(AdminDTO dto) {
		return new Admin(dto.getId(), dto.getUsername(), dto.getEmail(), dto.getPassword(), dto.getFirstName(),
				dto.getLastName(), Optional.ofNullable(dto.getCulturalOffers()).orElse(new HashSet<Long>()).stream()
						.map(i -> new CulturalOffer(i)).collect(Collectors.toSet()),
				dto.getActive());
	}

	@Override
	public AdminDTO toDto(Admin entity) {
		return new AdminDTO(entity.getId(), entity.getUsername(), entity.getEmail(), entity.getPassword(),
				entity.getFirstName(), entity.getLastName(), Optional.ofNullable(entity.getCulturalOffers())
						.orElse(new HashSet<CulturalOffer>()).stream().map(i -> i.getId()).collect(Collectors.toSet()),
				entity.isActive());
	}
}
