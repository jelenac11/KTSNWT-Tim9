package com.ktsnwt.project.team9.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ktsnwt.project.team9.model.Geolocation;

@Repository
public interface IGeolocationRepository extends JpaRepository<Geolocation, Long> {

	Optional<Geolocation> findByLatAndLon(double lat, double lon);
}
