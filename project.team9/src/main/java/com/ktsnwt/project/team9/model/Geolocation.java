package com.ktsnwt.project.team9.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
//Ovim se obezbedjuje da kombinacija kolona bude jedinstvena
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = 
                                        { "lat", "lon" }) })
public class Geolocation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "geolocation_id")
	private Long id;

	@Column(nullable = false)
	private String location;
	
	@Column(nullable = false)
	private long lat;
	
	@Column(nullable = false)
	private long lon;

	public Geolocation() {
		super();
	}

	public Geolocation(String location, long lat, long lon) {
		super();
		this.location = location;
		this.lat = lat;
		this.lon = lon;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public long getLat() {
		return lat;
	}

	public void setLat(long lat) {
		this.lat = lat;
	}

	public long getLon() {
		return lon;
	}

	public void setLon(long lon) {
		this.lon = lon;
	}

	public Long getId() {
		return id;
	}
	
	
	
}
