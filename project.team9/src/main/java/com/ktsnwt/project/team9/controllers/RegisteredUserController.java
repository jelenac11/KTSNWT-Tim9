package com.ktsnwt.project.team9.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Iterable<UserResDTO>> getAllRegisteredUser() {
		List<UserResDTO> registeredUsersDTO = registeredUserMapper.toResDTOList(registeredUserService.getAll());
		return new ResponseEntity<>(registeredUsersDTO, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value= "/by-page", method = RequestMethod.GET)
	public ResponseEntity<Page<UserResDTO>> getAllRegisteredUsers(Pageable pageable){
		Page<RegisteredUser> page = registeredUserService.findAll(pageable);
        List<UserResDTO> registeredUserDTOs = registeredUserMapper.toResDTOList(page.toList());
        Page<UserResDTO> pageRUserDTOs = new PageImpl<>(registeredUserDTOs,page.getPageable(),page.getTotalElements());
        return new ResponseEntity<Page<UserResDTO>>(pageRUserDTOs, HttpStatus.OK);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_REGISTERED_USER')")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<UserResDTO> getRegisteredUser(@PathVariable Long id) {
		RegisteredUser registeredUser = registeredUserService.getById(id);
		if (registeredUser == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(registeredUserMapper.toResDTO(registeredUser), HttpStatus.OK);
	}

	@PreAuthorize("permitAll()")
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserResDTO> createRegistredUser(@Valid @RequestBody RegisteredUserDTO registeredUserDTO) {
		try {
			return new ResponseEntity<>(registeredUserMapper.toResDTO(registeredUserService.create(registeredUserMapper.toEntity(registeredUserDTO))), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_REGISTERED_USER')")
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserResDTO> updateRegisteredUser(@PathVariable Long id, @Valid @RequestBody RegisteredUserDTO registeredUserDTO) {
		try {
			return new ResponseEntity<>(registeredUserMapper.toResDTO(registeredUserService.update(id, registeredUserMapper.toEntity(registeredUserDTO))), HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> deleteRegisteredUser(@PathVariable Long id) {
		try {
			return new ResponseEntity<>(registeredUserService.delete(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
}
