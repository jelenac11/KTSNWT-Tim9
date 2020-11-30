package com.ktsnwt.project.team9.controllers;

import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ktsnwt.project.team9.dto.CategoryDTO;
import com.ktsnwt.project.team9.helper.implementations.CategoryMapper;
import com.ktsnwt.project.team9.model.Category;
import com.ktsnwt.project.team9.services.implementations.CategoryService;

@RestController
@RequestMapping(value = "/api/categories", produces = MediaType.APPLICATION_JSON_VALUE)
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private CategoryMapper categoryMapper;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Iterable<CategoryDTO>> getAllCategorys() {
		Set<CategoryDTO> categorysDTO = categoryMapper.toDTOList(categoryService.getAll());
		return new ResponseEntity<Iterable<CategoryDTO>>(categorysDTO, HttpStatus.OK);
	}
	
	@RequestMapping(value= "/by-page", method = RequestMethod.GET)
	public ResponseEntity<Page<CategoryDTO>> getAllCulturalOffers(Pageable pageable){
		Page<Category> page = categoryService.findAll(pageable);
        Set<CategoryDTO> categoryDTO = categoryMapper.toDTOList(page.toList());
        Page<CategoryDTO> pageCategoryDTO = new PageImpl<CategoryDTO>(categoryDTO.stream().collect(Collectors.toList()),page.getPageable(),page.getTotalElements());
        return new ResponseEntity<Page<CategoryDTO>>(pageCategoryDTO, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<CategoryDTO> getCategory(@PathVariable Long id) {

		Category category = categoryService.getById(id);
		if (category == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<CategoryDTO>(categoryMapper.toDto(category), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CategoryDTO> createCategory(@Valid @RequestBody CategoryDTO CategoryDTO) {

		try {
			return new ResponseEntity<CategoryDTO>(
					categoryMapper
							.toDto(categoryService.create(categoryMapper.toEntity(CategoryDTO))),
					HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long id,
			@Valid @RequestBody CategoryDTO CategoryDTO) {

		try {
			return new ResponseEntity<CategoryDTO>(
					categoryMapper
							.toDto(categoryService.update(id, categoryMapper.toEntity(CategoryDTO))),
					HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> deleteCategory(@PathVariable Long id) {
		try {
			return new ResponseEntity<Boolean>(categoryService.delete(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Boolean>(HttpStatus.NOT_FOUND);
		}
	}
}
