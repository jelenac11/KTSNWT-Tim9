package com.ktsnwt.project.team9.controller.integration;

import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.MethodMode;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import com.ktsnwt.project.team9.constants.CommentConstants;
import com.ktsnwt.project.team9.dto.UserLoginDTO;
import com.ktsnwt.project.team9.dto.response.CommentResDTO;
import com.ktsnwt.project.team9.dto.response.UserTokenStateDTO;
import com.ktsnwt.project.team9.helper.implementations.CustomPageImplementation;
import com.ktsnwt.project.team9.model.Comment;
import com.ktsnwt.project.team9.services.implementations.CommentService;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:test.properties")
public class CommentControllerIntegrationTest {

	@Autowired
	CommentService commentService;
	
	@Autowired
	private TestRestTemplate restTemplate;
	
	private String accessToken;
	
	public void login(String username, String password) {
		ResponseEntity<UserTokenStateDTO> responseEntity = restTemplate.postForEntity("/auth/login", new UserLoginDTO(username, password), UserTokenStateDTO.class); 
		accessToken = "Bearer " + responseEntity.getBody().getAccessToken(); 
	}
	
	@Test
	public void testGetAllCommentsForCulturalOffer_WithAllCorrectValues_ShouldReturnCommentPage() {
		login(CommentConstants.ADMIN_EMAIL, CommentConstants.PASSWORD);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", accessToken);
        HttpEntity<Object> httpEntity = new HttpEntity<Object>(headers);
        
        Pageable pageable = PageRequest.of(CommentConstants.PAGE, CommentConstants.PAGE_SIZE);
		int size = commentService.findAllByCOID(pageable, CommentConstants.CULTURAL_OFFER_ID).getNumberOfElements();
        ParameterizedTypeReference<CustomPageImplementation<CommentResDTO>> type = new ParameterizedTypeReference<CustomPageImplementation<CommentResDTO>>() {
		};
		
        ResponseEntity<CustomPageImplementation<CommentResDTO>> responseEntity = restTemplate.exchange("/api/comments/cultural-offer/" + CommentConstants.CULTURAL_OFFER_ID + "?page=" + CommentConstants.PAGE+ "&size=" + CommentConstants.PAGE_SIZE, HttpMethod.GET, httpEntity, type);

		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		assertEquals(size, responseEntity.getBody().getNumberOfElements());
	}
	
	@Test
	public void testGetAllCommentsForCulturalOffer_WithNonExistingPageAndExistingCOId_ShouldReturnEmptyCommentPage() {
		login(CommentConstants.ADMIN_EMAIL, CommentConstants.PASSWORD);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", accessToken);
        HttpEntity<Object> httpEntity = new HttpEntity<Object>(headers);
        
        ParameterizedTypeReference<CustomPageImplementation<CommentResDTO>> type = new ParameterizedTypeReference<CustomPageImplementation<CommentResDTO>>() {
		};
		
        ResponseEntity<CustomPageImplementation<CommentResDTO>> responseEntity = restTemplate.exchange("/api/comments/cultural-offer/" + CommentConstants.CULTURAL_OFFER_ID + "?page=" + CommentConstants.NON_EXISTING_PAGE+ "&size=" + CommentConstants.PAGE_SIZE, HttpMethod.GET, httpEntity, type);

		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		assertEquals(0, responseEntity.getBody().getNumberOfElements());
	}
	
	@Test
	public void testGetAllCommentsForCulturalOffer_WithNonExistingCOId_ShouldReturnEmptyCommentPage() {
		login(CommentConstants.ADMIN_EMAIL, CommentConstants.PASSWORD);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", accessToken);
        HttpEntity<Object> httpEntity = new HttpEntity<Object>(headers);
        
        ParameterizedTypeReference<CustomPageImplementation<CommentResDTO>> type = new ParameterizedTypeReference<CustomPageImplementation<CommentResDTO>>() {
		};
		
        ResponseEntity<CustomPageImplementation<CommentResDTO>> responseEntity = restTemplate.exchange("/api/comments/cultural-offer/" + CommentConstants.NON_EXISTING_CULTURAL_OFFER_ID + "?page=" + CommentConstants.PAGE+ "&size=" + CommentConstants.PAGE_SIZE, HttpMethod.GET, httpEntity, type);

		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		assertEquals(0, responseEntity.getBody().getNumberOfElements());
	}
	
	@Test
	public void testGetAllNotApprovedCommentsForCulturalOffers_WithAllCorrectValues_ShouldReturnCommentPage() {
		login(CommentConstants.ADMIN_EMAIL_WITH_NOT_APPROVED_COMMENTS, CommentConstants.PASSWORD);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", accessToken);
        HttpEntity<Object> httpEntity = new HttpEntity<Object>(headers);
        
        Pageable pageable = PageRequest.of(CommentConstants.PAGE, CommentConstants.PAGE_SIZE);
		int size = commentService.findAllByNotApprovedByAdminId(pageable, CommentConstants.ADMIN_ID_WITH_NOT_APPROVED_COMMENTS).getNumberOfElements();
        ParameterizedTypeReference<CustomPageImplementation<CommentResDTO>> type = new ParameterizedTypeReference<CustomPageImplementation<CommentResDTO>>() {
		};
		
        ResponseEntity<CustomPageImplementation<CommentResDTO>> responseEntity = restTemplate.exchange("/api/comments/not-approved-comments?page=" + CommentConstants.PAGE+ "&size=" + CommentConstants.PAGE_SIZE, HttpMethod.GET, httpEntity, type);

		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		assertEquals(size, responseEntity.getBody().getNumberOfElements());
        
	}
	
	@Test
	public void testGetAllNotApprovedCommentsForCulturalOffers_WithNonExistingPageButCorrectAdmin_ShouldReturnEmptyCommentPage() {
		login(CommentConstants.ADMIN_EMAIL_WITH_NOT_APPROVED_COMMENTS, CommentConstants.PASSWORD);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", accessToken);
        HttpEntity<Object> httpEntity = new HttpEntity<Object>(headers);
        
        ParameterizedTypeReference<CustomPageImplementation<CommentResDTO>> type = new ParameterizedTypeReference<CustomPageImplementation<CommentResDTO>>() {
		};
		
        ResponseEntity<CustomPageImplementation<CommentResDTO>> responseEntity = restTemplate.exchange("/api/comments/not-approved-comments?page=" + CommentConstants.NON_EXISTING_PAGE+ "&size=" + CommentConstants.PAGE_SIZE, HttpMethod.GET, httpEntity, type);

		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(0, responseEntity.getBody().getNumberOfElements());
	}
	
	@Test
	public void testGetAllNotApprovedCommentsForCulturalOffers_WithNotCorrectAdmin_ShouldReturnEmptyCommentPage() {
		login(CommentConstants.ADMIN_EMAIL, CommentConstants.PASSWORD);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", accessToken);
        HttpEntity<Object> httpEntity = new HttpEntity<Object>(headers);
        
        ParameterizedTypeReference<CustomPageImplementation<CommentResDTO>> type = new ParameterizedTypeReference<CustomPageImplementation<CommentResDTO>>() {
		};
		
        ResponseEntity<CustomPageImplementation<CommentResDTO>> responseEntity = restTemplate.exchange("/api/comments/not-approved-comments?page=" + CommentConstants.PAGE+ "&size=" + CommentConstants.PAGE_SIZE, HttpMethod.GET, httpEntity, type);

		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(0, responseEntity.getBody().getNumberOfElements());
	}
	
	@Test
	@DirtiesContext(methodMode = MethodMode.AFTER_METHOD)
	public void testApproveComment_WithAllCorrectValues_ShouldApproveComment() {
		login(CommentConstants.ADMIN_EMAIL_WITH_NOT_APPROVED_COMMENTS, CommentConstants.PASSWORD);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", accessToken);
        HttpEntity<Object> httpEntity = new HttpEntity<Object>(headers);
        
        ResponseEntity<String> responseEntity = restTemplate.exchange("/api/comments/approve/" + CommentConstants.COMMENT_ID_TO_APPROVE, HttpMethod.GET, httpEntity, String.class);
        Comment c = commentService.getById(CommentConstants.COMMENT_ID_TO_APPROVE);

		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		assertTrue(c.isApproved());
	}
	
	@Test
	public void testApproveComment_WithNonExistingCommentId_ShouldReturnNotFound() {
		login(CommentConstants.ADMIN_EMAIL_WITH_NOT_APPROVED_COMMENTS, CommentConstants.PASSWORD);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", accessToken);
        HttpEntity<Object> httpEntity = new HttpEntity<Object>(headers);
        
        ResponseEntity<String> responseEntity = restTemplate.exchange("/api/comments/approve/" + CommentConstants.NON_EXISTING_COMMENT_ID, HttpMethod.GET, httpEntity, String.class);

		assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
	}
	
	@Test
	@DirtiesContext(methodMode = MethodMode.AFTER_METHOD)
	public void testDeclineComment_WithAllCorrectValues_ShouldDeleteComment() {
		login(CommentConstants.ADMIN_EMAIL_WITH_NOT_APPROVED_COMMENTS, CommentConstants.PASSWORD);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", accessToken);
        HttpEntity<Object> httpEntity = new HttpEntity<Object>(headers);
        
        ResponseEntity<String> responseEntity = restTemplate.exchange("/api/comments/decline/" + CommentConstants.COMMENT_ID_TO_DECLINE, HttpMethod.GET, httpEntity, String.class);
        Comment c = commentService.getById(CommentConstants.COMMENT_ID_TO_DECLINE);

		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		assertNull(c);
	}
	
	@Test
	public void testDeclineComment_WithNonExistingCommentId_ShouldReturnNotFound() {
		login(CommentConstants.ADMIN_EMAIL_WITH_NOT_APPROVED_COMMENTS, CommentConstants.PASSWORD);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", accessToken);
        HttpEntity<Object> httpEntity = new HttpEntity<Object>(headers);
        
        ResponseEntity<String> responseEntity = restTemplate.exchange("/api/comments/decline/" + CommentConstants.NON_EXISTING_COMMENT_ID, HttpMethod.GET, httpEntity, String.class);

		assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
	}
	
}
