package com.ktsnwt.project.team9.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@AllArgsConstructor
@Getter
@Setter
public class UserDTO {

	private Long id;
	
	@NotEmpty(message = "Username cannot be null or empty.")
	private String username;
	
	@NotEmpty(message = "Email cannot be null or empty.")
	@Email(message = "Email format is not valid.")
	private String email;
	
	@NotEmpty(message = "Password cannot be null or empty.")
	private String password;
	
	@NotEmpty(message = "First name cannot be null or empty.")
	private String firstName;
	
	@NotEmpty(message = "Last name cannot be null or empty.")
	private String lastName;
}
