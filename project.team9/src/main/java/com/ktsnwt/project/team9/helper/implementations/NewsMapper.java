package com.ktsnwt.project.team9.helper.implementations;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import com.ktsnwt.project.team9.dto.NewsDTO;
import com.ktsnwt.project.team9.helper.interfaces.SetMapper;
import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.Image;
import com.ktsnwt.project.team9.model.News;

@Component
public class NewsMapper extends SetMapper<News, NewsDTO> {

	@Override
	public News toEntity(NewsDTO dto) {
		return new News(dto.getContent(), dto.getDate(), 
				dto.getImages().stream().map(url -> new Image(url)).collect(Collectors.toSet()),
				new CulturalOffer(dto.getCulturalOfferID()) ,
				dto.isActive());
	}

	@Override
	public NewsDTO toDto(News entity) {
		
		return new NewsDTO(entity.getId(),
				entity.getContent(), entity.getDate(), entity.isActive(), 
				entity.getImages().stream().map( image -> image.getUrl()).collect(Collectors.toSet()),
				entity.getCulturalOffer().getId());
	}
	
	
}
