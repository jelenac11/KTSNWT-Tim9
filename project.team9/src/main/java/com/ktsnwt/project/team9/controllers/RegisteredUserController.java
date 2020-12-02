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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ktsnwt.project.team9.dto.RegisteredUserDTO;
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

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Iterable<RegisteredUserDTO>> getAllRegisteredUser() {
		List<RegisteredUserDTO> registeredUsersDTO = registeredUserMapper.toDTOList(registeredUserService.getAll());
		return new ResponseEntity<>(registeredUsersDTO, HttpStatus.OK);
	}
	
	@RequestMapping(value= "/by-page", method = RequestMethod.GET)
	public ResponseEntity<Page<RegisteredUserDTO>> getAllRegisteredUsers(Pageable pageable){
		Page<RegisteredUser> page = registeredUserService.findAll(pageable);
        List<RegisteredUserDTO> registeredUserDTOs = registeredUserMapper.toDTOList(page.toList());
        Page<RegisteredUserDTO> pageRUserDTOs = new PageImpl<>(registeredUserDTOs,page.getPageable(),page.getTotalElements());
        return new ResponseEntity<Page<RegisteredUserDTO>>(pageRUserDTOs, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<RegisteredUserDTO> getRegisteredUser(@PathVariable Long id) {
		RegisteredUser registeredUser = registeredUserService.getById(id);
		if (registeredUser == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(registeredUserMapper.toDto(registeredUser), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RegisteredUserDTO> createRegistredUser(@Valid @RequestBody RegisteredUserDTO registeredUserDTO) {
		try {
			return new ResponseEntity<>(registeredUserMapper.toDto(registeredUserService.create(registeredUserMapper.toEntity(registeredUserDTO))), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RegisteredUserDTO> updateRegisteredUser(@PathVariable Long id, @Valid @RequestBody RegisteredUserDTO registeredUserDTO) {
		try {
			return new ResponseEntity<>(registeredUserMapper.toDto(registeredUserService.update(id, registeredUserMapper.toEntity(registeredUserDTO))), HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> deleteRegisteredUser(@PathVariable Long id) {
		try {
			return new ResponseEntity<>(registeredUserService.delete(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	

}
