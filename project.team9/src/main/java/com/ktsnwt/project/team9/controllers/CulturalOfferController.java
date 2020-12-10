package com.ktsnwt.project.team9.controllers;

import java.io.IOException;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.ktsnwt.project.team9.dto.CulturalOfferDTO;
import com.ktsnwt.project.team9.helper.implementations.CulturalOfferMapper;
import com.ktsnwt.project.team9.helper.implementations.FileService;
import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.services.implementations.CulturalOfferService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping(value = "/api/cultural-offers", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
//@PreAuthorize("hasRole('ROLE_ADMIN')")
@PreAuthorize("permitAll()")
public class CulturalOfferController {

	private CulturalOfferService culturalOfferService;

	private CulturalOfferMapper culturalOfferMapper;

	private FileService fileService;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Iterable<CulturalOfferDTO>> getAllCulturalOffers() {
		List<CulturalOfferDTO> culturalOffersDTO = culturalOfferMapper.toDTOList(culturalOfferService.getAll());
		culturalOffersDTO.stream().forEach(i->{
			try {
				i.setImage(fileService.uploadImageAsBase64(i.getImage()));
			}catch (Exception e) {
				
			}
		});
		return new ResponseEntity<Iterable<CulturalOfferDTO>>(culturalOffersDTO, HttpStatus.OK);
	}

	@RequestMapping(value = "/by-page", method = RequestMethod.GET)
	public ResponseEntity<Page<CulturalOfferDTO>> getAllCulturalOffers(Pageable pageable) {
		Page<CulturalOffer> page = culturalOfferService.findAll(pageable);
		List<CulturalOfferDTO> culturalOfferDTOs = culturalOfferMapper.toDTOList(page.toList());
		culturalOfferDTOs.stream().forEach(i->{
			try {
				i.setImage(fileService.uploadImageAsBase64(i.getImage()));
			}catch (Exception e) {
				
			}
		});
		Page<CulturalOfferDTO> pageCulturalOfferDTOs = new PageImpl<>(culturalOfferDTOs, page.getPageable(),
				page.getTotalElements());
		return new ResponseEntity<Page<CulturalOfferDTO>>(pageCulturalOfferDTOs, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<CulturalOfferDTO> getCulturalOffer(@PathVariable Long id) {

		CulturalOffer culturalOffer = culturalOfferService.getById(id);
		if (culturalOffer == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		CulturalOfferDTO culturalOfferDTO = culturalOfferMapper.toDto(culturalOffer);
		try {
			culturalOfferDTO.setImage(fileService.uploadImageAsBase64(culturalOfferDTO.getImage()));
		} catch (IOException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<CulturalOfferDTO>(culturalOfferDTO, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<CulturalOfferDTO> createCulturalOffer(
			@RequestPart("culturalOfferDTO") @Valid @NotNull CulturalOfferDTO culturalOfferDTO, @RequestPart("file") MultipartFile file) {
		try {
			if (file == null || file.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
			culturalOfferDTO = culturalOfferMapper
					.toDto(culturalOfferService.create(culturalOfferMapper.toEntity(culturalOfferDTO), file));
			
			culturalOfferDTO.setImage(fileService.uploadImageAsBase64(culturalOfferDTO.getImage()));

			return new ResponseEntity<CulturalOfferDTO>(culturalOfferDTO, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<CulturalOfferDTO> updateCulturalOffer(@PathVariable Long id,
			@RequestPart("culturalOfferDTO") @Valid @NotNull CulturalOfferDTO culturalOfferDTO, @RequestPart("file") MultipartFile file) {

		try {
			culturalOfferDTO = culturalOfferMapper
					.toDto(culturalOfferService.update(id, culturalOfferMapper.toEntity(culturalOfferDTO), file));

			culturalOfferDTO.setImage(fileService.uploadImageAsBase64(culturalOfferDTO.getImage()));

			return new ResponseEntity<CulturalOfferDTO>(culturalOfferDTO, HttpStatus.OK);
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
