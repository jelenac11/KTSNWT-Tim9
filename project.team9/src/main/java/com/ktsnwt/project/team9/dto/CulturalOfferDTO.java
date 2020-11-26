package com.ktsnwt.project.team9.dto;

import java.util.Set;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CulturalOfferDTO {

	private Long id;

	@NotEmpty(message = "Name cannot be null or empty.")
	private String name;
	
	private String description;
	
	private String imageURL;
	
	@Max(value = 5, message = "Average mark should not be greater than 5.")
	private double averageMark;
	
	private boolean active;
	
	@NotNull(message = "Geolocation cannot be null.")
	private GeolocationDTO geolocation;
	
	@NotNull(message = "Category cannot be null.")
	private Long category;
	
	private Set<Long> news;
	
	private Set<Long> comments;
	
	private Set<Long> marks;
	
	private Long admin;
}
