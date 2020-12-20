package com.ktsnwt.project.team9.dto;

import java.util.Set;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RegisteredUserDTO extends UserDTO{
	
	private Set<Long> marks;
	private Set<Long> culturalOffers;
	private Set<Long> comments;
	private boolean verified;
	
	public RegisteredUserDTO(String username, String email, String password, String firstName, String lastName, Set<Long> marks, Set<Long> culturalOffers, Set<Long> comments, boolean verified) {
		super(username, email, password, firstName, lastName);
		this.marks = marks;
		this.culturalOffers = culturalOffers;
		this.comments = comments;
		this.verified = verified;
	}
}
