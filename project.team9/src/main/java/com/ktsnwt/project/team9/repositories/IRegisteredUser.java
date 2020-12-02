package com.ktsnwt.project.team9.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.RegisteredUser;

@Repository
public interface IRegisteredUser extends JpaRepository<RegisteredUser, Long> {
	
	
	List<RegisteredUser> findBySubscribed(CulturalOffer subscribed);
}
