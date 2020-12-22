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

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Geolocation other = (Geolocation) obj;
		if (Double.doubleToLongBits(lat) != Double.doubleToLongBits(other.lat))
			return false;
		if (location == null) {
			if (other.location != null)
				return false;
		} else if (!location.equals(other.location))
			return false;
		if (Double.doubleToLongBits(lon) != Double.doubleToLongBits(other.lon))
			return false;
		if (placeId == null) {
			if (other.placeId != null)
				return false;
		} else if (!placeId.equals(other.placeId))
			return false;
		return true;
	}

}
