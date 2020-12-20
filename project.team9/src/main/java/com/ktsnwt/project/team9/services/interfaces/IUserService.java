package com.ktsnwt.project.team9.services.interfaces;

import java.util.List;

import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.RegisteredUser;
import com.ktsnwt.project.team9.model.User;

public interface IUserService extends IService<User, Long> {
	List<RegisteredUser> getSubscribed(CulturalOffer culturalOffer);

	User findByEmail(String email);

	User findByUsername(String username);

	User changeProfile(User entity) throws Exception;
}
