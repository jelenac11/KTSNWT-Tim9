package com.ktsnwt.project.team9.dto.response;

import java.util.Set;
import com.ktsnwt.project.team9.dto.CategoryDTO;
import com.ktsnwt.project.team9.dto.GeolocationDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CulturalOfferResDTO {

	private Long id;

	private String name;

	private String description;

	private String image;

	private double averageMark;

	private boolean active;

	private GeolocationDTO geolocation;

	private CategoryDTO category;

	private Set<Long> news;

	private Set<Long> comments;

	private Set<Long> marks;

	private Long admin;

	public CulturalOfferResDTO() {
		super();
	}

}
