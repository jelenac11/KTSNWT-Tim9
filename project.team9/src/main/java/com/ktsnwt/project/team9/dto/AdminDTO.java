package com.ktsnwt.project.team9.dto;

import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminDTO extends UserDTO {

	private Set<Long> culturalOffers;
	
	private Boolean active;
	
	public AdminDTO(Long id, String username, String email, String password, String firstName, String lastName, Set<Long> culturalOffers, Boolean active) {
		super(id, username, email, password, firstName, lastName);
		this.culturalOffers = culturalOffers;
		this.active = active;
	}
}
