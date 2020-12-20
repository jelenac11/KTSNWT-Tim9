package com.ktsnwt.project.team9.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ktsnwt.project.team9.dto.RegisteredUserDTO;
import com.ktsnwt.project.team9.dto.response.UserResDTO;
import com.ktsnwt.project.team9.helper.implementations.RegisteredUserMapper;
import com.ktsnwt.project.team9.model.RegisteredUser;
import com.ktsnwt.project.team9.services.implementations.RegisteredUserService;

@RestController
@RequestMapping(value = "/api/registered-users", produces = MediaType.APPLICATION_JSON_VALUE)
public class RegisteredUserController {
	
	@Autowired
	private RegisteredUserService registeredUserService;
	private RegisteredUserMapper registeredUserMapper;
	
	public RegisteredUserController() {
		registeredUserMapper = new RegisteredUserMapper();
  }

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping
	public ResponseEntity<Iterable<UserResDTO>> getAllRegisteredUser() {
		List<UserResDTO> registeredUsersDTO = registeredUserMapper.toResDTOList(registeredUserService.getAll());
		return new ResponseEntity<>(registeredUsersDTO, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping(value= "/by-page")
	public ResponseEntity<Page<UserResDTO>> getAllRegisteredUsers(Pageable pageable){
		Page<RegisteredUser> page = registeredUserService.findAll(pageable);
		return new ResponseEntity<>(transformListToPage(page), HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping(value = "/search/{value}")
	public ResponseEntity<Page<UserResDTO>> searchRegUsers(Pageable pageable, @PathVariable String value) {
		Page<RegisteredUser> page = registeredUserService.searchRegUsers(pageable, value);
		return new ResponseEntity<>(transformListToPage(page), HttpStatus.OK);
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_REGISTERED_USER')")
	@GetMapping(value = "/{id}")
	public ResponseEntity<UserResDTO> getRegisteredUser(@PathVariable Long id) {
		RegisteredUser registeredUser = registeredUserService.getById(id);
		if (registeredUser == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(registeredUserMapper.toResDTO(registeredUser), HttpStatus.OK);
	}

	@PreAuthorize("permitAll()")
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserResDTO> createRegistredUser(@Valid @RequestBody RegisteredUserDTO registeredUserDTO) {
		try {
			return new ResponseEntity<>(registeredUserMapper.toResDTO(registeredUserService.create(registeredUserMapper.toEntity(registeredUserDTO))), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	private Page<UserResDTO> transformListToPage(Page<RegisteredUser> page) {
		List<UserResDTO> adminsResDTO = registeredUserMapper.toDTOResList(page.toList());
		return new PageImpl<>(adminsResDTO, page.getPageable(), page.getTotalElements());
	}

	
}
