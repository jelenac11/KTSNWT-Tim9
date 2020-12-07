package com.ktsnwt.project.team9.controllers;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ktsnwt.project.team9.dto.RegisteredUserDTO;
import com.ktsnwt.project.team9.dto.UserLoginDTO;
import com.ktsnwt.project.team9.dto.UserTokenStateDTO;
import com.ktsnwt.project.team9.helper.implementations.RegisteredUserMapper;
import com.ktsnwt.project.team9.model.RegisteredUser;
import com.ktsnwt.project.team9.model.User;
import com.ktsnwt.project.team9.security.TokenUtils;
import com.ktsnwt.project.team9.services.implementations.AuthorityService;
import com.ktsnwt.project.team9.services.implementations.MailService;
import com.ktsnwt.project.team9.services.implementations.RegisteredUserService;
import com.ktsnwt.project.team9.services.implementations.UserService;

@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

	@Autowired
	private TokenUtils tokenUtils;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserService userDetailsService;

	@Autowired
	private RegisteredUserService registeredUserService;
	
	@Autowired
	private RegisteredUserMapper registeredUserMapper;

	@Autowired
	private AuthorityService authorityService;
	
	@Autowired
	private MailService mailService;
	
	@PostMapping(value = "/sign-up", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addUser(@RequestBody RegisteredUserDTO userRequest) throws Exception {

        User existEmail = this.userDetailsService.findByEmail(userRequest.getEmail());
        if (existEmail != null) {
            return new ResponseEntity<>("Email already exists.", HttpStatus.BAD_REQUEST);
        }
        
        User existUser = this.userDetailsService.findByUsername(userRequest.getUsername());
        if (existUser != null) {
        	return new ResponseEntity<>("Username already exists.", HttpStatus.BAD_REQUEST);
        }

        RegisteredUser newUser = null;
        try {
        	newUser = registeredUserService.create(registeredUserMapper.toEntity(userRequest));
        } catch (Exception e) {
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
        
        mailService.sendActivationalLink(newUser);
        return new ResponseEntity<>(registeredUserMapper.toDto(newUser), HttpStatus.CREATED);
    }
	
	@GetMapping(value = "/confirm-registration/{token}")
	public void potvrdaReg(@PathVariable("token") String url) {
		authorityService.confirmRegistration(url);
	}
	
}
