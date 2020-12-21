package com.ktsnwt.project.team9.repository.integration;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import com.ktsnwt.project.team9.constants.RegisteredUserConstants;
import com.ktsnwt.project.team9.model.RegisteredUser;
import com.ktsnwt.project.team9.repositories.IRegisteredUser;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:test.properties")
public class RegisteredUserIntegrationTest {
	
	@Autowired
	IRegisteredUser registeredUserRepository;
	
	@Test
	public void testFindByEmail_WithExistingEmail_ShouldReturnRegisteredUser() {
		RegisteredUser user = registeredUserRepository.findByEmail(RegisteredUserConstants.EMAIL);
		
		assertEquals(RegisteredUserConstants.EMAIL, user.getEmail());
	}
	
	@Test
	public void testFindByEmail_WithNonExistingEmail_ShouldReturnNull() {
		RegisteredUser user = registeredUserRepository.findByEmail(RegisteredUserConstants.NON_EXISTING_EMAIL);
		
		assertEquals(null, user);
	}
	
	@Test
	public void testFindByUsername_WithExistingUsername_ShouldReturnRegisteredUser() {
		RegisteredUser user = registeredUserRepository.findByUsername(RegisteredUserConstants.USERNAME);
		
		assertEquals(RegisteredUserConstants.USERNAME, user.getUsername());
	}
	
	@Test
	public void testFindByUsername_WithNonExistingUsername_ShouldReturnNull() {
		RegisteredUser user = registeredUserRepository.findByUsername(RegisteredUserConstants.NON_EXISTING_USERNAME);
		
		assertEquals(null, user);
	}
	
	@Test
	public void testFindByUsernameOrEmailOrFirstNameOrLastNameContainingIgnoreCase_WithExistingPartUpperCase_ShouldReturnRegisteredUserPage() {
		Pageable pageable = PageRequest.of(RegisteredUserConstants.PAGE, RegisteredUserConstants.PAGE_SIZE);
		Page<RegisteredUser> userPage = registeredUserRepository.findByUsernameOrEmailOrFirstNameOrLastNameContainingIgnoreCase(RegisteredUserConstants.PART.toUpperCase(), pageable);
		
		assertEquals(5, userPage.getContent().size());
	}
	
	@Test
	public void testFindByUsernameOrEmailOrFirstNameOrLastNameContainingIgnoreCase_WithExistingPartLowerCase_ShouldReturnRegisteredUserPage() {
		Pageable pageable = PageRequest.of(RegisteredUserConstants.PAGE, RegisteredUserConstants.PAGE_SIZE);
		Page<RegisteredUser> userPage = registeredUserRepository.findByUsernameOrEmailOrFirstNameOrLastNameContainingIgnoreCase(RegisteredUserConstants.PART.toLowerCase(), pageable);
		
		assertEquals(5, userPage.getContent().size());
	}
	
	@Test
	public void testFindByUsernameOrEmailOrFirstNameOrLastNameContainingIgnoreCase_WithNonExistingPart_ShouldReturnRegisteredUserPageWithNoContent() {
		Pageable pageable = PageRequest.of(RegisteredUserConstants.PAGE, RegisteredUserConstants.PAGE_SIZE);
		Page<RegisteredUser> userPage = registeredUserRepository.findByUsernameOrEmailOrFirstNameOrLastNameContainingIgnoreCase(RegisteredUserConstants.NON_EXISTING_PART, pageable);
		
		assertEquals(0, userPage.getTotalElements());
	}

}
