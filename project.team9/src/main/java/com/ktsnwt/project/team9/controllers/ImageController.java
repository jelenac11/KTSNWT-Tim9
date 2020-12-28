package com.ktsnwt.project.team9.controllers;

import java.io.IOException;
import java.util.UUID;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ktsnwt.project.team9.helper.implementations.FileService;

@RestController
@RequestMapping(value = "/api/images", produces = MediaType.APPLICATION_JSON_VALUE)
public class ImageController {

	@Autowired
	private FileService fileService;
	
	@PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public String upload(@RequestParam("file") MultipartFile file) throws IllegalStateException, IOException {
		String uniqueID = UUID.randomUUID().toString();
		
		return fileService.saveImage(file, uniqueID + "_" +file.getOriginalFilename());
	}
	
	@DeleteMapping(value = "/delete")
	public String deleteImage(@RequestBody String file) throws IllegalStateException, IOException {
		System.out.println("OVDE" + file);
		fileService.deleteImageFromFile("src/main/resources/uploadedImages/" + file);
		return "OK";
	}

}
