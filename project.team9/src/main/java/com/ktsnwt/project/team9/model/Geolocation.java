package com.ktsnwt.project.team9.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor 
@NoArgsConstructor
//Ovim se obezbedjuje da kombinacija kolona bude jedinstvena
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "lat", "lon" }) })
public class Geolocation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "geolocation_id")
	private Long id;
	
	@Column(nullable = false)
	private String placeId;

	@Column(nullable = false)
	private String location;

	@Column(nullable = false)
	private double lat;

	@Column(nullable = false)
	private double lon;
	
	public Geolocation( String placeId, String location, double lat, double lon) {
		super();
		this.placeId = placeId;
		this.location = location;
		this.lat = lat;
		this.lon = lon;
	}

}
