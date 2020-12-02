package com.ktsnwt.project.team9.services.implementations;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.Admin;
import com.ktsnwt.project.team9.model.User;
import com.ktsnwt.project.team9.repositories.IAdminRepository;
import com.ktsnwt.project.team9.repositories.IUserRepository;
import com.ktsnwt.project.team9.services.interfaces.IAdminService;

@Service
public class AdminService implements IAdminService {
	
	@Autowired
	private IAdminRepository adminRepository;
	
	@Autowired
	private IUserRepository userRepository;

	public Page<Admin> findAll(Pageable pageable) {
		return adminRepository.findAll(pageable);
	}
	
	@Override
	public Iterable<Admin> getAll() {
		return adminRepository.findAll();
	}

	@Override
	public Admin getById(Long id) {
		return adminRepository.findById(id).orElse(null);
	}

	@Override
	public Admin create(Admin entity) throws Exception {
		entity.setActive(true);
		User usernameUser = userRepository.findByUsername(entity.getUsername());
		if (usernameUser != null) {
			throw new Exception("User with this username already exists.");
		}
		User emailUser = userRepository.findByEmail(entity.getEmail());
		if (emailUser != null) {
			throw new Exception("User with this email already exists.");
		}
		return adminRepository.save(entity);
	}

	@Override
	public boolean delete(Long id) throws Exception {
		Admin existingAdmin = adminRepository.findById(id).orElse(null);
		if (existingAdmin == null) {
			throw new NoSuchElementException("Admin with given id doesn't exist.");
		}
		existingAdmin.setActive(false);
		if (!existingAdmin.getCulturalOffers().isEmpty()) {
			throw new Exception("Admin has cultural offers so he can't be deleted.");
		}
		adminRepository.deleteById(id);
		return true;
	}

	@Override
	public Admin update(Long id, Admin entity) throws Exception {
		Admin admin = adminRepository.findById(id).orElseGet(null);
		if (admin == null) {
			throw new NoSuchElementException("Admin doesn't exist.");
		}
		if (!entity.getEmail().equals(admin.getEmail())) {
			User emailUser = userRepository.findByEmail(entity.getEmail());
			if (emailUser != null) {
				throw new Exception("User with this email already exists.");
			}
		}
		if (!entity.getUsername().equals(admin.getUsername())) {
			User usernameUser = userRepository.findByUsername(entity.getUsername());
			if (usernameUser != null) {
				throw new Exception("User with this username already exists.");
			}
		}
		admin.setUsername(entity.getUsername());
		admin.setEmail(entity.getEmail());
		admin.setFirstName(entity.getFirstName());
		admin.setLastName(entity.getLastName());
		admin.setActive(entity.isActive());
		return adminRepository.save(admin);

	}

	
}
