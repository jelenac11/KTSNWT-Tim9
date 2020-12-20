package com.ktsnwt.project.team9.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
<<<<<<< Updated upstream
=======
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
>>>>>>> Stashed changes
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ktsnwt.project.team9.dto.AdminDTO;
import com.ktsnwt.project.team9.helper.implementations.AdminMapper;
import com.ktsnwt.project.team9.model.Admin;
import com.ktsnwt.project.team9.services.implementations.AdminService;

@RestController
@RequestMapping(value = "/api/admins", produces = MediaType.APPLICATION_JSON_VALUE)
public class AdminController {

	@Autowired
	private AdminService adminService;
	private AdminMapper adminMapper;

	public AdminController() {
		adminMapper = new AdminMapper();
	}

<<<<<<< Updated upstream
	@RequestMapping(method = RequestMethod.GET)
=======
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping
>>>>>>> Stashed changes
	public ResponseEntity<Iterable<AdminDTO>> getAllAdmins() {
		List<AdminDTO> adminsDTO = adminMapper.toDTOList(adminService.getAll());
		return new ResponseEntity<>(adminsDTO, HttpStatus.OK);
	}

<<<<<<< Updated upstream
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
=======
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping(value = "/by-page")
	public ResponseEntity<Page<UserResDTO>> getAllAdmins(Pageable pageable) {
		Page<Admin> page = adminService.findAll(pageable);
		return new ResponseEntity<>(transformListToPage(page), HttpStatus.OK);
	}

	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping(value = "/search/{value}")
	public ResponseEntity<Page<UserResDTO>> searchAdmins(Pageable pageable, @PathVariable String value) {
		Page<Admin> page = adminService.searchAdmins(pageable, value);
		return new ResponseEntity<>(transformListToPage(page), HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping(value = "/{id}")
>>>>>>> Stashed changes
	public ResponseEntity<AdminDTO> getAdmin(@PathVariable Long id) {
		Admin admin = adminService.getById(id);
		if (admin == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(adminMapper.toDto(admin), HttpStatus.OK);
	}

<<<<<<< Updated upstream
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<AdminDTO> createAdmin(@Valid @RequestBody AdminDTO adminDTO) {
=======
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createAdmin(@Valid @RequestBody AdminDTO adminDTO) {
>>>>>>> Stashed changes
		try {
			return new ResponseEntity<>(adminMapper.toDto(adminService.create(adminMapper.toEntity(adminDTO))), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

<<<<<<< Updated upstream
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<AdminDTO> updateAdmin(@PathVariable Long id, @Valid @RequestBody AdminDTO adminDTO) {
		try {
			return new ResponseEntity<>(adminMapper.toDto(adminService.update(id, adminMapper.toEntity(adminDTO))), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> deleteAdmin(@PathVariable Long id) {
=======
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<?> deleteAdmin(@PathVariable Long id) {
>>>>>>> Stashed changes
		try {
			return new ResponseEntity<>(adminService.delete(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
<<<<<<< Updated upstream
=======

	private Page<UserResDTO> transformListToPage(Page<Admin> page) {
		List<UserResDTO> adminsResDTO = adminMapper.toDTOResList(page.toList());
		return new PageImpl<>(adminsResDTO, page.getPageable(), page.getTotalElements());
	}

>>>>>>> Stashed changes
}
