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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.ktsnwt.project.team9.dto.CulturalOfferDTO;
import com.ktsnwt.project.team9.dto.response.CulturalOfferResDTO;
import com.ktsnwt.project.team9.helper.implementations.CulturalOfferMapper;
import com.ktsnwt.project.team9.helper.implementations.CustomPageImplementation;
import com.ktsnwt.project.team9.helper.implementations.FileService;
import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.User;
import com.ktsnwt.project.team9.services.implementations.CulturalOfferService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping(value = "/api/cultural-offers", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
@CrossOrigin(origins = "https://localhost:4200", maxAge = 3600)
@PreAuthorize("hasRole('ROLE_ADMIN')")
//@PreAuthorize("permitAll()")
public class CulturalOfferController {

	private CulturalOfferService culturalOfferService;

	private CulturalOfferMapper culturalOfferMapper;

	private FileService fileService;

	@PreAuthorize("permitAll()")
	@GetMapping(value = "/by-page")
	public ResponseEntity<Page<CulturalOfferResDTO>> getAllCulturalOffers(Pageable pageable) {
		Page<CulturalOffer> page = culturalOfferService.findAll(pageable);
		return new ResponseEntity<>(createCustomPage(transformFromListToPage(page)), HttpStatus.OK);
	}

	@PreAuthorize("permitAll()")
	@GetMapping(value = "/category/{id}")
	public ResponseEntity<Page<CulturalOfferResDTO>> getCulturalOffersByCategoryId(Pageable pageable,
			@PathVariable Long id) {
		Page<CulturalOffer> page = culturalOfferService.getByCategoryId(id, pageable);
		return new ResponseEntity<>(createCustomPage(transformFromListToPage(page)), HttpStatus.OK);
	}

	@PreAuthorize("permitAll()")
	@GetMapping(value = "/category/{id}/find-by-name/{name}")
	public ResponseEntity<Page<CulturalOfferResDTO>> findCulturalOfferByCategoryIdAndName(Pageable pageable,
			@PathVariable Long id, @PathVariable String name) {
		Page<CulturalOffer> page = culturalOfferService.findByCategoryIdAndNameContains(id, name, pageable);

		return new ResponseEntity<>(createCustomPage(transformFromListToPage(page)), HttpStatus.OK);
	}

	@PreAuthorize("permitAll()")
	@GetMapping(value = "/find-by-name/{name}")
	public ResponseEntity<Page<CulturalOfferResDTO>> findCulturalOfferByName(Pageable pageable,
			@PathVariable String name) {
		Page<CulturalOffer> page = culturalOfferService.findByNameContains(name, pageable);

		return new ResponseEntity<>(createCustomPage(transformFromListToPage(page)), HttpStatus.OK);
	}

	@PreAuthorize("permitAll()")
	@GetMapping(value = "/{id}")
	public ResponseEntity<CulturalOfferResDTO> getCulturalOffer(@PathVariable Long id) {

		CulturalOffer culturalOffer = culturalOfferService.getById(id);
		if (culturalOffer == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		CulturalOfferResDTO culturalOfferResDTO = culturalOfferMapper.toDTORes(culturalOffer);
		try {
			culturalOfferResDTO.setImage(fileService.uploadImageAsBase64(culturalOfferResDTO.getImage()));
		} catch (IOException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>(culturalOfferResDTO, HttpStatus.OK);
	}

	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<CulturalOfferResDTO> createCulturalOffer(
			@RequestPart("culturalOfferDTO") @Valid @NotNull CulturalOfferDTO culturalOfferDTO,
			@RequestPart("file") MultipartFile file) {
		try {
			if (file == null || file.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
			User current = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			culturalOfferDTO.setAdmin(current.getId());
			CulturalOfferResDTO culturalOfferResDTO = culturalOfferMapper
					.toDTORes(culturalOfferService.create(culturalOfferMapper.toEntity(culturalOfferDTO), file));

			culturalOfferResDTO.setImage(fileService.uploadImageAsBase64(culturalOfferResDTO.getImage()));

			return new ResponseEntity<>(culturalOfferResDTO, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<CulturalOfferResDTO> updateCulturalOffer(@PathVariable Long id,
			@RequestPart("culturalOfferDTO") @Valid @NotNull CulturalOfferDTO culturalOfferDTO,
			@RequestPart("file") MultipartFile file) {

		try {
			CulturalOfferResDTO culturalOfferResDTO = culturalOfferMapper
					.toDTORes(culturalOfferService.update(id, culturalOfferMapper.toEntity(culturalOfferDTO), file));

			culturalOfferResDTO.setImage(fileService.uploadImageAsBase64(culturalOfferResDTO.getImage()));

			return new ResponseEntity<>(culturalOfferResDTO, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Boolean> deleteCulturalOffer(@PathVariable Long id) {
		try {
			return new ResponseEntity<>(culturalOfferService.delete(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	@PreAuthorize("hasRole('ROLE_REGISTERED_USER')")
	@GetMapping(value = "/subscribed/{userID}")
	public ResponseEntity<Page<CulturalOfferResDTO>> getSubscribedCulturalOffer(@PathVariable Long userID, Pageable pageable) {
		
		Page<CulturalOffer> page = culturalOfferService.getSubscribedCulturalOffer(userID, pageable);
		return new ResponseEntity<Page<CulturalOfferResDTO>>(createCustomPage(customTransform(page)), HttpStatus.OK);
	}

	private Page<CulturalOfferResDTO> transformFromListToPage(Page<CulturalOffer> page) {
		List<CulturalOfferResDTO> culturalOffersResDTO = culturalOfferMapper.toDTOResList(page.toList());
		culturalOffersResDTO.stream().forEach(i -> {
			try {
				i.setImage(fileService.uploadImageAsBase64(i.getImage()));
			} catch (IOException e) {
				e.printStackTrace();
			}
		});
		return new PageImpl<>(culturalOffersResDTO, page.getPageable(), page.getTotalElements());
	}
	
	private Page<CulturalOfferResDTO> customTransform(Page<CulturalOffer> page) {
		List<CulturalOfferResDTO> culturalOffersResDTO = culturalOfferMapper.toDTOResList(page.toList());
		return new PageImpl<>(culturalOffersResDTO, page.getPageable(), page.getTotalElements());
	}

	private CustomPageImplementation<CulturalOfferResDTO> createCustomPage(Page<CulturalOfferResDTO> page) {
		return new CustomPageImplementation<>(page.getContent(), page.getNumber(), page.getSize(),
				page.getTotalElements(), null, page.isLast(), page.getTotalPages(), null, page.isFirst(),
				page.getNumberOfElements());
	}
}
