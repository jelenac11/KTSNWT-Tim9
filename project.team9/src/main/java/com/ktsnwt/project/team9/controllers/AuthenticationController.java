package com.ktsnwt.project.team9.controllers;

import java.util.HashMap;
import java.util.Map;

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
	
	@PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody UserLoginDTO authenticationRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
                        authenticationRequest.getPassword()));

        // Kreiraj token za tog korisnika
        User user = (User) authentication.getPrincipal();
       
        RegisteredUser regUser = registeredUserService.findByEmail(user.getEmail());
        if (regUser != null) {
        	if (!regUser.isVerified()) {
        		return new ResponseEntity<>("User is not verified.", HttpStatus.BAD_REQUEST);
        	}
        }
        // Ubaci korisnika u trenutni security kontekst
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenUtils.generateToken(user.getEmail()); // prijavljujemo se na sistem sa email adresom
        int expiresIn = tokenUtils.getExpiredIn();

        // Vrati token kao odgovor na uspesnu autentifikaciju
        return ResponseEntity.ok(new UserTokenStateDTO(jwt, expiresIn));
    }
	
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
