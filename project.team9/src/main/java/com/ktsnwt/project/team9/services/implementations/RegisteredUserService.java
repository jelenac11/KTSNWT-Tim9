package com.ktsnwt.project.team9.services.implementations;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.Comment;
import com.ktsnwt.project.team9.model.RegisteredUser;
import com.ktsnwt.project.team9.model.User;
import com.ktsnwt.project.team9.repositories.IRegisteredUser;
import com.ktsnwt.project.team9.repositories.IUserRepository;
import com.ktsnwt.project.team9.services.interfaces.IRegisteredUserService;

@Service
public class RegisteredUserService implements IRegisteredUserService {

	@Autowired
	private IRegisteredUser registeredUserRepository;
	
	@Autowired
	private IUserRepository userRepository;
	
	public Page<RegisteredUser> findAll(Pageable pageable) {
		return registeredUserRepository.findAll(pageable);
	}
	
	@Override
	public Iterable<RegisteredUser> getAll() {
		return registeredUserRepository.findAll();
	}

	@Override
	public RegisteredUser getById(Long id) {
		return registeredUserRepository.findById(id).orElse(null);
	}

	@Override
	public RegisteredUser create(RegisteredUser entity) throws Exception {
		User usernameUser = userRepository.findByUsername(entity.getUsername());
		if (usernameUser != null) {
			throw new Exception("User with this username already exists.");
		}
		User emailUser = userRepository.findByEmail(entity.getEmail());
		if (emailUser != null) {
			throw new Exception("User with this email already exists.");
		}
		return registeredUserRepository.save(entity);
	}

	@Override
	public boolean delete(Long id) throws Exception {
		RegisteredUser registeredUser = registeredUserRepository.findById(id).orElse(null);
		if (registeredUser == null) {
			throw new Exception("Registered user with given id doesn't exist.");
		}
		registeredUserRepository.deleteById(id);
		return true;
	}

	@Override
	public RegisteredUser update(Long id, RegisteredUser entity) throws Exception {
		RegisteredUser registeredUser = registeredUserRepository.findById(id).orElse(null);
		if (registeredUser == null) {
			throw new NoSuchElementException("Registered user with given id doesn't exist.");
		}
		if (!entity.getEmail().equals(registeredUser.getEmail())) {
			User emailUser = userRepository.findByEmail(entity.getEmail());
			if (emailUser != null) {
				throw new Exception("User with this email already exists.");
			}
		}
		if (!entity.getUsername().equals(registeredUser.getUsername())) {
			User usernameUser = userRepository.findByUsername(entity.getUsername());
			if (usernameUser != null) {
				throw new Exception("User with this username already exists.");
			}
		}
		registeredUser.setUsername(entity.getUsername());
		registeredUser.setEmail(entity.getEmail());
		registeredUser.setFirstName(entity.getFirstName());
		registeredUser.setLastName(entity.getLastName());
		registeredUser.setVerified(entity.isVerified());
		return registeredUserRepository.save(registeredUser);
		
	}
}
