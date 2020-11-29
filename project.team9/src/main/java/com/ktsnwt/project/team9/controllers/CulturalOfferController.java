package com.ktsnwt.project.team9.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.ktsnwt.project.team9.dto.CulturalOfferDTO;
import com.ktsnwt.project.team9.helper.implementations.CulturalOfferMapper;
import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.services.implementations.CulturalOfferService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(value = "/api/cultural-offers", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class CulturalOfferController {

	private CulturalOfferService culturalOfferService;

	private CulturalOfferMapper culturalOfferMapper;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Iterable<CulturalOfferDTO>> getAllCulturalOffers() {
		List<CulturalOfferDTO> culturalOffersDTO = culturalOfferMapper.toDTOList(culturalOfferService.getAll());
		return new ResponseEntity<Iterable<CulturalOfferDTO>>(culturalOffersDTO, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<CulturalOfferDTO> getCulturalOffer(@PathVariable Long id) {

		CulturalOffer culturalOffer = culturalOfferService.getById(id);
		if (culturalOffer == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<CulturalOfferDTO>(culturalOfferMapper.toDto(culturalOffer), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CulturalOfferDTO> createCulturalOffer(@Valid @RequestBody CulturalOfferDTO culturalOfferDTO) {

		try {
			return new ResponseEntity<CulturalOfferDTO>(
					culturalOfferMapper
							.toDto(culturalOfferService.create(culturalOfferMapper.toEntity(culturalOfferDTO))),
					HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CulturalOfferDTO> updateCulturalOffer(@PathVariable Long id,
			@Valid @RequestBody CulturalOfferDTO culturalOfferDTO) {

		try {
			return new ResponseEntity<CulturalOfferDTO>(
					culturalOfferMapper
							.toDto(culturalOfferService.update(id, culturalOfferMapper.toEntity(culturalOfferDTO))),
					HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> deleteCulturalOffer(@PathVariable Long id) {
		try {
			return new ResponseEntity<Boolean>(culturalOfferService.delete(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Boolean>(HttpStatus.NOT_FOUND);
		}
	}
}
