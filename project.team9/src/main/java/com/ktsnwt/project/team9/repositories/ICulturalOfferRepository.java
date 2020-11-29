package com.ktsnwt.project.team9.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ktsnwt.project.team9.model.CulturalOffer;

@Repository
public interface ICulturalOfferRepository extends JpaRepository<CulturalOffer, Long> {
	
	CulturalOffer findByName(String name);
}
