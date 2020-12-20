package com.ktsnwt.project.team9.services.implementations;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.Authority;
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
	
	@Autowired
    private AuthorityService authService;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
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
			throw new IllegalArgumentException("User with this username already exists.");
		}
		User emailUser = userRepository.findByEmail(entity.getEmail());
		if (emailUser != null) {
			throw new IllegalArgumentException("User with this email already exists.");
		}
		List<Authority> auth = authService.findByName("ROLE_REGISTERED_USER");
        entity.setAuthorities(auth);
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        entity.setLastPasswordResetDate(new Date().getTime());
		return registeredUserRepository.save(entity);
	}

	@Override
	public boolean delete(Long id) throws Exception {
		RegisteredUser registeredUser = registeredUserRepository.findById(id).orElse(null);
		if (registeredUser == null) {
			throw new NoSuchElementException("Registered user with given id doesn't exist.");
		}
		registeredUserRepository.deleteById(id);
		return true;
	}

	@Override
	public RegisteredUser update(Long id, RegisteredUser entity) throws Exception {
		return null;
	}

	public RegisteredUser findByEmail(String email) {
		return registeredUserRepository.findByEmail(email);
	}
	
	public RegisteredUser findByUsername(String username) {
		return registeredUserRepository.findByUsername(username);
	}

	public Page<RegisteredUser> searchRegUsers(Pageable pageable, String value) {
		return registeredUserRepository.findByUsernameOrEmailOrFirstNameOrLastNameContainingIgnoreCase('%' + value.toLowerCase() + '%', pageable);
	}
	
}
