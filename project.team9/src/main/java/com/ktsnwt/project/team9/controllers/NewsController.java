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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ktsnwt.project.team9.dto.NewsDTO;
import com.ktsnwt.project.team9.helper.implementations.NewsMapper;
import com.ktsnwt.project.team9.model.News;
import com.ktsnwt.project.team9.services.implementations.NewsService;

@RestController
@RequestMapping(value = "/api/news", produces = MediaType.APPLICATION_JSON_VALUE)
public class NewsController {
	
	
	@Autowired
	private NewsService newsService;

	@Autowired
	private NewsMapper newsMapper;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Iterable<NewsDTO>> getAllNewss() {
		Set<NewsDTO> newssDTO = newsMapper.toDTOList(newsService.getAll());
		return new ResponseEntity<Iterable<NewsDTO>>(newssDTO, HttpStatus.OK);
	}
	
	
	@RequestMapping(value= "/by-page", method = RequestMethod.GET)
	public ResponseEntity<Page<NewsDTO>> getAllCulturalOffers(Pageable pageable){
		Page<News> page = newsService.findAll(pageable);
        Set<NewsDTO> newssDTO = newsMapper.toDTOList(page.toList());
        Page<NewsDTO> pageNewsDTO = new PageImpl<NewsDTO>(newssDTO.stream().collect(Collectors.toList()),page.getPageable(),page.getTotalElements());
        return new ResponseEntity<Page<NewsDTO>>(pageNewsDTO, HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<NewsDTO> getNews(@PathVariable Long id) {

		News news = newsService.getById(id);
		if (news == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<NewsDTO>(newsMapper.toDto(news), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
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

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
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

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> deleteNews(@PathVariable Long id) {
		try {
			return new ResponseEntity<Boolean>(newsService.delete(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Boolean>(HttpStatus.NOT_FOUND);
		}
	}
}
