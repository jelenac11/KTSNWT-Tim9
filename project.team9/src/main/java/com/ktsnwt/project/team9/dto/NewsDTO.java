package com.ktsnwt.project.team9.dto;

import java.util.Set;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class NewsDTO {

	private Long ID;
	
	private String content;
	
	@NotNull(message = "News date cannot be empty.")
	private long date;

	private boolean active;

	private Set<String> images;
	
	@NotNull(message = "ID  of CulturalOffer cannot be null or empty.")
	private Long culturalOfferID;
	
}
