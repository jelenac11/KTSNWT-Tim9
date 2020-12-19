package com.ktsnwt.project.team9.controller.integration;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import com.ktsnwt.project.team9.constants.GeolocationConstants;
import com.ktsnwt.project.team9.dto.GeolocationDTO;
import com.ktsnwt.project.team9.helper.implementations.CustomPageImplementation;
import com.ktsnwt.project.team9.model.Geolocation;
import com.ktsnwt.project.team9.services.implementations.GeolocationService;
import javassist.NotFoundException;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:test.properties")
public class GeolocationControllerIntegrationTest {

	@Autowired
	private TestRestTemplate restTemplate;

	@Autowired
	private GeolocationService geolocationService;
	
	/*
	 * private String accessToken;
	 * 
	 * public void login(String username, String password) {
	 * ResponseEntity<UserTokenStateDTO> responseEntity =
	 * restTemplate.postForEntity("/auth/login", new UserLoginDTO(username,
	 * password), UserTokenStateDTO.class); accessToken = "Bearer " +
	 * responseEntity.getBody().getAccessToken(); }
	 */

	@Test
	public void testGetAllGeolocations_ShouldReturnAllGeolocations() {
		// login("admin",
		// "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918");
		// HttpHeaders headers = new HttpHeaders();
		// headers.add("Authorization", accessToken);
		// HttpEntity<Object> httpEntity = new HttpEntity<Object>(headers);
		int size = ((List<Geolocation>) geolocationService.getAll()).size();

		ResponseEntity<GeolocationDTO[]> responseEntity = restTemplate.getForEntity("/api/geolocations",
				GeolocationDTO[].class);

		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		assertEquals(size, responseEntity.getBody().length);
	}

	@Test
	public void testGetAllGeolocations_WithPageable_ShouldReturnFirst10Geolocations() {
		Pageable pageable = PageRequest.of(0, 10);
		int size = geolocationService.getAll(pageable).getNumberOfElements();
		ParameterizedTypeReference<CustomPageImplementation<GeolocationDTO>> type = new ParameterizedTypeReference<CustomPageImplementation<GeolocationDTO>>() {
		};

		ResponseEntity<CustomPageImplementation<GeolocationDTO>> responseEntity = restTemplate
				.exchange("/api/geolocations/by-page?page=0&size=10", HttpMethod.GET, null, type);

		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		assertNotNull(responseEntity.getBody());
		assertEquals(size, responseEntity.getBody().getNumberOfElements());
	}

	@Test
	public void testGetAllGeolocations_WithNonExistingPageable_ShouldReturnEmptyCollection() {
		Pageable pageable = PageRequest.of(3, 10);
		int size = geolocationService.getAll(pageable).getNumberOfElements();
		ParameterizedTypeReference<CustomPageImplementation<GeolocationDTO>> type = new ParameterizedTypeReference<CustomPageImplementation<GeolocationDTO>>() {
		};

		ResponseEntity<CustomPageImplementation<GeolocationDTO>> responseEntity = restTemplate
				.exchange("/api/geolocations/by-page?page=3&size=10", HttpMethod.GET, null, type);

		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		assertNotNull(responseEntity.getBody());
		assertEquals(size, responseEntity.getBody().getNumberOfElements());
	}

	@Test
	public void testGetGeolocation_WithExistingId_ShouldReturnGeolocationDTO() throws NotFoundException {
		ResponseEntity<GeolocationDTO> responseEntity = restTemplate.getForEntity("/api/geolocations/1",
				GeolocationDTO.class);

		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		assertEquals("Neka lokacija 1", responseEntity.getBody().getLocation());
	}

	@Test
	public void testGetGeolocation_WithNonExistingId_ShouldReturnNotFound() {
		ResponseEntity<GeolocationDTO> responseEntity = restTemplate.getForEntity("/api/geolocations/55",
				GeolocationDTO.class);

		assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
	}

	@Test
	public void testCreateGeolocation_WithValidParameters_ShouldReturnCreatedGeolocation() throws NotFoundException {
		int length = ((List<Geolocation>) geolocationService.getAll()).size();
		HttpEntity<Object> httpEntity = new HttpEntity<Object>(GeolocationConstants.GEOLOCATIONNEW);

		ResponseEntity<GeolocationDTO> responseEntity = restTemplate.postForEntity("/api/geolocations", httpEntity,
				GeolocationDTO.class);

		assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
		assertEquals(GeolocationConstants.GEOLOCATIONNEW.getLocation(), responseEntity.getBody().getLocation());
		assertEquals(length + 1, ((List<Geolocation>) geolocationService.getAll()).size());
		
		geolocationService.delete(22L);
	}

	@Test
	public void testCreateGeolocation_WithExistingLatAndLon_ShouldReturnBadRequest() throws NotFoundException {
		HttpEntity<Object> httpEntity = new HttpEntity<Object>(GeolocationConstants.GEOLOCATION1);

		ResponseEntity<GeolocationDTO> responseEntity = restTemplate.postForEntity("/api/geolocations", httpEntity,
				GeolocationDTO.class);

		assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
	}

	@Test
	public void testCreateGeolocation_WithEmptyLocation_ShouldReturnBadRequest() throws NotFoundException {
		HttpEntity<Object> httpEntity = new HttpEntity<Object>(new GeolocationDTO("", "", 5, 5));

		ResponseEntity<GeolocationDTO> responseEntity = restTemplate.postForEntity("/api/geolocations", httpEntity,
				GeolocationDTO.class);

		assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
	}

	@Test
	public void testCreateGeolocation_WithNullLocation_ShouldReturnBadRequest() throws NotFoundException {
		HttpEntity<Object> httpEntity = new HttpEntity<Object>(new GeolocationDTO("", null, 5, 5));

		ResponseEntity<GeolocationDTO> responseEntity = restTemplate.postForEntity("/api/geolocations", httpEntity,
				GeolocationDTO.class);

		assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
	}

	@Test
	public void testDeleteGeolocation_WithExistingId_ShouldReturnTrue() throws NotFoundException {
		int length = ((List<Geolocation>) geolocationService.getAll()).size();
		Geolocation geolocation = geolocationService.getById(GeolocationConstants.IDFORDELETE);

		ResponseEntity<Boolean> responseEntity = restTemplate.exchange(
				"/api/geolocations/" + GeolocationConstants.IDFORDELETE, HttpMethod.DELETE,
				new HttpEntity<Object>(null), Boolean.class);

		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		assertTrue(responseEntity.getBody());
		assertEquals(length - 1, ((List<Geolocation>) geolocationService.getAll()).size());

		geolocationService.create(geolocation);
	}

	@Test
	public void testDeleteGeolocation_WithNonExistingId_ShouldReturnNotFound() throws NotFoundException {
		ResponseEntity<Boolean> responseEntity = restTemplate.exchange("/api/geolocations/55", HttpMethod.DELETE,
				new HttpEntity<Object>(null), Boolean.class);

		assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
	}
}
