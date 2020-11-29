package com.ktsnwt.project.team9.controllers;

import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ktsnwt.project.team9.dto.ImageDTO;
import com.ktsnwt.project.team9.helper.implementations.ImageMapper;
import com.ktsnwt.project.team9.model.Image;
import com.ktsnwt.project.team9.services.implementations.ImageService;

@RestController
@RequestMapping(value = "/api/images", produces = MediaType.APPLICATION_JSON_VALUE)
public class ImageController {
	@Autowired
	private ImageService imageService;

	@Autowired
	private ImageMapper imageMapper;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Iterable<ImageDTO>> getAllImages() {
		Set<ImageDTO> imagesDTO = imageMapper.toDTOList(imageService.getAll());
		return new ResponseEntity<Iterable<ImageDTO>>(imagesDTO, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<ImageDTO> getImage(@PathVariable Long id) {

		Image image = imageService.getById(id);
		if (image == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<ImageDTO>(imageMapper.toDto(image), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ImageDTO> createImage(@Valid @RequestBody ImageDTO ImageDTO) {

		try {
			return new ResponseEntity<ImageDTO>(
					imageMapper
							.toDto(imageService.create(imageMapper.toEntity(ImageDTO))),
					HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ImageDTO> updateImage(@PathVariable Long id,
			@Valid @RequestBody ImageDTO ImageDTO) {

		try {
			return new ResponseEntity<ImageDTO>(
					imageMapper
							.toDto(imageService.update(id, imageMapper.toEntity(ImageDTO))),
					HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> deleteImage(@PathVariable Long id) {
		try {
			return new ResponseEntity<Boolean>(imageService.delete(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Boolean>(HttpStatus.NOT_FOUND);
		}
	}

}
