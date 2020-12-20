package com.ktsnwt.project.team9.controllers;

import org.springframework.http.MediaType;
<<<<<<< Updated upstream
import org.springframework.web.bind.annotation.RequestMapping;
=======
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
>>>>>>> Stashed changes
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/images", produces = MediaType.APPLICATION_JSON_VALUE)
public class ImageController {
<<<<<<< Updated upstream
=======
	@Autowired
	private ImageService imageService;

	@Autowired
	private ImageMapper imageMapper;

	@GetMapping
	public ResponseEntity<Iterable<ImageDTO>> getAllImages() {
		Set<ImageDTO> imagesDTO = imageMapper.toDTOList(imageService.getAll());
		return new ResponseEntity<Iterable<ImageDTO>>(imagesDTO, HttpStatus.OK);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<ImageDTO> getImage(@PathVariable Long id) {

		Image image = imageService.getById(id);
		if (image == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<ImageDTO>(imageMapper.toDto(image), HttpStatus.OK);
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
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

	@PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
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

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Boolean> deleteImage(@PathVariable Long id) {
		try {
			return new ResponseEntity<Boolean>(imageService.delete(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Boolean>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	@PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public String handleFileUpload(@RequestParam("file") MultipartFile file) throws IllegalStateException, IOException {

		
		String uniqueID = UUID.randomUUID().toString();
		String path = new File(".").getCanonicalPath();
		
		File fileSave = new File(path + "\\src\\main\\resources\\static\\" + 
				uniqueID + "_" +file.getOriginalFilename());
		file.transferTo(fileSave);
		
		
		
		return fileSave.getName();
	}
>>>>>>> Stashed changes

}
