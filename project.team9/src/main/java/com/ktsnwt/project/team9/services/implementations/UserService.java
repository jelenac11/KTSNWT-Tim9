package com.ktsnwt.project.team9.services.implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.RegisteredUser;
import com.ktsnwt.project.team9.model.User;
import com.ktsnwt.project.team9.repositories.IRegisteredUser;
import com.ktsnwt.project.team9.services.interfaces.IUserService;

@Service
public class UserService implements IUserService {

	
	@Autowired
	private IRegisteredUser userRepo;
	
	
	@Override
	public Iterable<User> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User getById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User create(User entity) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(Long id) throws Exception {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public User update(Long id, User entity) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<RegisteredUser> getSubscribed(CulturalOffer co) {
		return userRepo.findBySubscribed(co);
	}
}
