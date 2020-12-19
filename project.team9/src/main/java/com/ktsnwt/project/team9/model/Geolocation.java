package com.ktsnwt.project.team9.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
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

	public Geolocation() {
		super();
	}

	public Geolocation(Long id, String placeId, String location, double lat, double lon) {
		super();
		this.id = id;
		this.placeId = placeId;
		this.location = location;
		this.lat = lat;
		this.lon = lon;
	}
}
