package com.ktsnwt.project.team9.services.implementations;

import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.Admin;
import com.ktsnwt.project.team9.repositories.IAdminRepository;
import com.ktsnwt.project.team9.services.interfaces.IAdminService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminService implements IAdminService {
	
	private IAdminRepository adminRepository;

	@Override
	public Iterable<Admin> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Admin getById(Long id) {
		return adminRepository.findById(id).orElse(null);
	}

	@Override
	public Admin create(Admin entity) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(Long id) throws Exception {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Admin update(Long id, Admin entity) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	
}
