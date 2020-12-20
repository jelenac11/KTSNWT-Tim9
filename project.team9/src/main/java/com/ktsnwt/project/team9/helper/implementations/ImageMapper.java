package com.ktsnwt.project.team9.helper.implementations;

import org.springframework.stereotype.Component;
import com.ktsnwt.project.team9.dto.ImageDTO;
import com.ktsnwt.project.team9.helper.interfaces.SetMapper;
import com.ktsnwt.project.team9.model.Image;

@Component
public class ImageMapper extends SetMapper<Image, ImageDTO> {

	@Override
	public Image toEntity(ImageDTO dto) {
		return new Image(dto.getUrl());
	}

	@Override
	public ImageDTO toDto(Image entity) {
		return new ImageDTO(entity.getUrl());
	}
}
