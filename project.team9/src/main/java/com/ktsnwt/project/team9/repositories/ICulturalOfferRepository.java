package com.ktsnwt.project.team9.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ktsnwt.project.team9.model.CulturalOffer;

@Repository
public interface ICulturalOfferRepository extends JpaRepository<CulturalOffer, Long> {

	CulturalOffer findByName(String name);

	Page<CulturalOffer> getByCategoryId(Long id, Pageable pageable);

	Page<CulturalOffer> findByCategoryIdAndNameContainingIgnoreCase(Long id, String name, Pageable pageable);

	Page<CulturalOffer> findByNameContainingIgnoreCase(String name, Pageable pageable);

	Page<CulturalOffer> findBySubscribedUsersId(Long userID, Pageable pageable);
}
