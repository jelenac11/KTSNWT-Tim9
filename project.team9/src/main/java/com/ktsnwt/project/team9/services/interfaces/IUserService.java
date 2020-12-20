package com.ktsnwt.project.team9.services.interfaces;

import com.ktsnwt.project.team9.model.User;

public interface IUserService extends IService<User, Long> {

<<<<<<< Updated upstream
=======
	List<RegisteredUser> getSubscribed(CulturalOffer culturalOffer);

	User findByEmail(String email);

	User findByUsername(String username);

	User changeProfile(User entity);

>>>>>>> Stashed changes
}
