package com.ktsnwt.project.team9.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ktsnwt.project.team9.dto.UserDTO;
import com.ktsnwt.project.team9.dto.UserLoginDTO;
import com.ktsnwt.project.team9.dto.response.UserTokenStateDTO;
import com.ktsnwt.project.team9.helper.implementations.RegisteredUserMapper;
import com.ktsnwt.project.team9.helper.implementations.UserMapper;
import com.ktsnwt.project.team9.model.Authority;
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

	private UserMapper userMapper;

	public AuthenticationController() {
		userMapper = new UserMapper();
	}

	@PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody UserLoginDTO authenticationRequest) {
		Authentication authentication = null;
		try {
			authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getEmail(), authenticationRequest.getPassword()));
		} catch (Exception e) {
			return new ResponseEntity<>("Incorrect email or password.", HttpStatus.UNAUTHORIZED);
		}

		// Kreiraj token za tog korisnika
		User user = (User) authentication.getPrincipal();
		@SuppressWarnings("unchecked")
		List<Authority> auth = (List<Authority>) user.getAuthorities();

		RegisteredUser regUser = registeredUserService.findByEmail(user.getEmail());
		if (regUser != null) {
			if (!regUser.isVerified()) {
				return new ResponseEntity<>("Account is not activated.", HttpStatus.BAD_REQUEST);
			}
		}
		// Ubaci korisnika u trenutni security kontekst
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = tokenUtils.generateToken(user.getEmail(), auth.get(0).getName()); // prijavljujemo se na sistem sa
																						// email adresom
		int expiresIn = tokenUtils.getExpiredIn();

		// Vrati token kao odgovor na uspesnu autentifikaciju
		return ResponseEntity.ok(new UserTokenStateDTO(jwt, (long) expiresIn));
	}

	@PostMapping(value = "/sign-up", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> addUser(@Valid @RequestBody UserDTO userRequest) throws Exception {

		User existEmail = this.userDetailsService.findByEmail(userRequest.getEmail());
		if (existEmail != null) {
			return new ResponseEntity<>("Email already exists.", HttpStatus.CONFLICT);
		}

		User existUser = this.userDetailsService.findByUsername(userRequest.getUsername());
		if (existUser != null) {
			return new ResponseEntity<>("Username already exists.", HttpStatus.CONFLICT);
		}

		RegisteredUser newUser = null;
		try {
			newUser = registeredUserService.create(registeredUserMapper.toEntity(userRequest));
		} catch (Exception e) {
			return new ResponseEntity<>(e.toString(), HttpStatus.BAD_REQUEST);
		}

		mailService.sendActivationalLink(newUser);
		return new ResponseEntity<>(registeredUserMapper.toResDTO(newUser), HttpStatus.CREATED);
	}

	@PostMapping(value = "/forgot-password", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> forgotPassword(@RequestBody PasswordReset passwordReset) throws Exception {

		User user = this.userDetailsService.findByEmail(passwordReset.email);
		if (user == null) {
			return new ResponseEntity<>("User with given email doesn't exist.", HttpStatus.BAD_REQUEST);
		}
		userDetailsService.forgotPassword(passwordReset.email);
		return new ResponseEntity<>("Password reset successfully.", HttpStatus.OK);
	}

	@PostMapping(value = "/change-password", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> changePassword(@Valid @RequestBody PasswordChanger passwordChanger) {
		try {
			userDetailsService.changePassword(passwordChanger.oldPassword, passwordChanger.newPassword);
		} catch (Exception e) {
			return new ResponseEntity<>("Incorrect old password", HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>("Password changed successfully", HttpStatus.OK);
	}

	static class PasswordReset {
		public String email;
	}

	static class PasswordChanger {
		public String oldPassword;
		public String newPassword;
	}

	@GetMapping(value = "/confirm-registration/{token}")
	public ResponseEntity<?> potvrdaReg(@PathVariable("token") String url) {
		authorityService.confirmRegistration(url);
		return new ResponseEntity<>("Account activated.", HttpStatus.OK);
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_REGISTERED_USER')")
	@RequestMapping(value = "/current-user", method = RequestMethod.GET)
	public ResponseEntity<?> currentUser() {
		User current = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return new ResponseEntity<>(userMapper.toResDTO(current), HttpStatus.OK);
	}

}
