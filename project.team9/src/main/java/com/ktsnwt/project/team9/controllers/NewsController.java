package com.ktsnwt.project.team9.controllers;


import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ktsnwt.project.team9.dto.NewsDTO;
import com.ktsnwt.project.team9.helper.implementations.NewsMapper;
import com.ktsnwt.project.team9.model.News;
import com.ktsnwt.project.team9.model.RegisteredUser;
import com.ktsnwt.project.team9.services.implementations.NewsService;

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping(value = "/api/news", produces = MediaType.APPLICATION_JSON_VALUE)
public class NewsController {
	
	
	@Autowired
	private NewsService newsService;

	@Autowired
	private NewsMapper newsMapper;

	@PreAuthorize("permitAll()")
	@GetMapping
	public ResponseEntity<Iterable<NewsDTO>> getAllNewss() {
		Set<NewsDTO> newssDTO = newsMapper.toDTOList(newsService.getAll());
		return new ResponseEntity<Iterable<NewsDTO>>(newssDTO, HttpStatus.OK);
	}
	


	@PreAuthorize("permitAll()")
	@GetMapping(value= "/by-page")
	public ResponseEntity<Page<NewsDTO>> getAllCulturalOffers(Pageable pageable){
		Page<News> page = newsService.findAll(pageable);
        Set<NewsDTO> newssDTO = newsMapper.toDTOList(page.toList());
        Page<NewsDTO> pageNewsDTO = new PageImpl<NewsDTO>(newssDTO.stream().collect(Collectors.toList()),page.getPageable(),page.getTotalElements());
        return new ResponseEntity<Page<NewsDTO>>(pageNewsDTO, HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<NewsDTO> getNews(@PathVariable Long id) {

		News news = newsService.getById(id);
		if (news == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<NewsDTO>(newsMapper.toDto(news), HttpStatus.OK);
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<NewsDTO> createNews(@Valid @RequestBody NewsDTO NewsDTO) {

		try {
			return new ResponseEntity<NewsDTO>(
					newsMapper
							.toDto(newsService.create(newsMapper.toEntity(NewsDTO))),
					HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<NewsDTO> updateNews(@PathVariable Long id,
			@Valid @RequestBody NewsDTO NewsDTO) {

		try {
			return new ResponseEntity<NewsDTO>(
					newsMapper
							.toDto(newsService.update(id, newsMapper.toEntity(NewsDTO))),
					HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Boolean> deleteNews(@PathVariable Long id) {
		try {
			return new ResponseEntity<Boolean>(newsService.delete(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Boolean>(HttpStatus.NOT_FOUND);
		}
	}
	@PreAuthorize("permitAll()")
	@PutMapping(value = "/subscribe/{userID}/{coID}")
	public ResponseEntity<Boolean> subscribe(@PathVariable Long userID, @PathVariable Long coID){
		try {
			return new ResponseEntity<Boolean>(newsService.subscribe(userID, coID), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Boolean>(HttpStatus.NOT_FOUND);
		}
	}
	@PreAuthorize("permitAll()")
	@PutMapping(value = "/unsubscribe/{userID}/{coID}")
	public ResponseEntity<Boolean> unsubscribe(@PathVariable Long userID, @PathVariable Long coID){
		try {
			return new ResponseEntity<Boolean>(newsService.unsubscribe(userID, coID), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Boolean>(HttpStatus.NOT_FOUND);
		}
	}
	@PreAuthorize("permitAll()")
	@GetMapping(value = "/subscribed-news/{userID}")
	public ResponseEntity<Page<NewsDTO>> getSubscribedNews(@PathVariable Long userID, Pageable pageable) {
		
		Page<News> page = newsService.getSubscribedNews(userID, pageable);
        Set<NewsDTO> newssDTO = newsMapper.toDTOList(page.toList());
        Page<NewsDTO> pageNewsDTO = new PageImpl<NewsDTO>(newssDTO.stream().collect(Collectors.toList()),page.getPageable(),page.getTotalElements());

		return new ResponseEntity<Page<NewsDTO>>(pageNewsDTO, HttpStatus.OK);
	}
}
