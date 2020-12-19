package com.ktsnwt.project.team9.dto;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CommentDTO {
	
	@NotNull(message = "Cultural offer cannot be null.")
	private Long culturalOffer;
	
	private String text;
}
