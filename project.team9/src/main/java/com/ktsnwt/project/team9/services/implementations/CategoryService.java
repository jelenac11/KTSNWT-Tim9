package com.ktsnwt.project.team9.services.implementations;

import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.Category;
import com.ktsnwt.project.team9.repositories.ICategoryRepository;
import com.ktsnwt.project.team9.services.interfaces.ICategoryService;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class CategoryService implements ICategoryService {
	
	private ICategoryRepository categoryRepository;

	@Override
	public Iterable<Category> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Category getById(Long id) {
		return categoryRepository.findById(id).orElse(null);
	}

	@Override
	public Category create(Category entity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(Long id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Category update(Long id, Category entity) {
		// TODO Auto-generated method stub
		return null;
	}
}
