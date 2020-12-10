package com.ktsnwt.project.team9.dto;


import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MarkDTO {

	private Long id;
	
	@NotNull(message = "Mark cannot be null.")
	@Max(value = 5, message = "Mark should not be greater than 5.")
	private int value;
	
	private Long grader;
	
	@NotNull(message = "Cultural offer cannot be null.")
	private Long culturalOffer;
}
