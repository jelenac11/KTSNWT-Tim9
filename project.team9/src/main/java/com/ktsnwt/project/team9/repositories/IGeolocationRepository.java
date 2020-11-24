package com.ktsnwt.project.team9.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ktsnwt.project.team9.model.Geolocation;

public interface IGeolocationRepository extends JpaRepository<Geolocation, Long> {

}
