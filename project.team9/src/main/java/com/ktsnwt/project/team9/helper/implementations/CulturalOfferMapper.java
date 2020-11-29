package com.ktsnwt.project.team9.helper.implementations;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;
import com.ktsnwt.project.team9.dto.CulturalOfferDTO;
import com.ktsnwt.project.team9.helper.interfaces.IMapper;
import com.ktsnwt.project.team9.model.Admin;
import com.ktsnwt.project.team9.model.Category;
import com.ktsnwt.project.team9.model.Comment;
import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.Mark;
import com.ktsnwt.project.team9.model.News;

import lombok.AllArgsConstructor;


@Component
@AllArgsConstructor
public class CulturalOfferMapper implements IMapper<CulturalOffer, CulturalOfferDTO> {

	private GeolocationMapper geolocationMapper;

	@Override
	public CulturalOffer toEntity(CulturalOfferDTO dto) {
		return new CulturalOffer(dto.getId(), dto.getName(), dto.getDescription(), dto.getImageURL(),
				dto.getAverageMark(), dto.isActive(), geolocationMapper.toEntity(dto.getGeolocation()),
				new Category(dto.getCategory()),
				Optional.ofNullable(dto.getNews()).orElse(new HashSet<Long>()).stream().map(i -> new News(i)).collect(Collectors.toSet()), null,
				Optional.ofNullable(dto.getMarks()).orElse(new HashSet<Long>()).stream().map(i -> new Mark(i)).collect(Collectors.toSet()), new Admin(dto.getAdmin()));
	}

	@Override
	public CulturalOfferDTO toDto(CulturalOffer entity) {
		return new CulturalOfferDTO(entity.getId(), entity.getName(), entity.getDescription(), entity.getImageURL(),
				entity.getAverageMark(), entity.isActive(), geolocationMapper.toDto(entity.getGeolocation()),
				entity.getCategory().getId(),
				Optional.ofNullable(entity.getNews()).orElse(new HashSet<News>()).stream().map(i -> i.getId()).collect(Collectors.toSet()), 
				Optional.ofNullable(entity.getComments()).orElse(new HashSet<Comment>()).stream().map(i -> i.getId()).collect(Collectors.toSet()),
				Optional.ofNullable(entity.getMarks()).orElse(new HashSet<Mark>()).stream().map(i -> i.getId()).collect(Collectors.toSet()), entity.getAdmin().getId());
	}
	
	public List<CulturalOfferDTO> toDTOList(Iterable<CulturalOffer> entities){
		List<CulturalOfferDTO> dtos = new ArrayList<CulturalOfferDTO>();
		for(CulturalOffer entity : entities) {
			dtos.add(toDto(entity));
		}
		return dtos;
	}
}
