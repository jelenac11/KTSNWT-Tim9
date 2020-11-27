package com.ktsnwt.project.team9.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GeolocationDTO {

	private Long id;
	
	@NotEmpty(message = "Location cannot be null or empty.")
	private String location;
	
	@NotNull(message = "Lat cannot be null.")
	private double lat;
	
	@NotNull(message = "Lon cannot be null.")
	private double lon;
}
