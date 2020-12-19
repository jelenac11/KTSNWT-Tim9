package com.ktsnwt.project.team9.helper.implementations;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.stereotype.Component;
import com.ktsnwt.project.team9.dto.CulturalOfferDTO;
import com.ktsnwt.project.team9.dto.response.CulturalOfferResDTO;
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
	private CategoryMapper categoryMapper;
	
	@Override
	public CulturalOffer toEntity(@Valid CulturalOfferDTO dto) {
		return new CulturalOffer(dto.getName(), dto.getDescription(), geolocationMapper.toEntity(dto.getGeolocation()),
				new Category(dto.getCategory()), new Admin(dto.getAdmin()));
	}

	public CulturalOfferResDTO toDTORes(CulturalOffer entity) {
		return new CulturalOfferResDTO(entity.getId(), entity.getName(), entity.getDescription(), entity.getImage().getUrl(),
				entity.getAverageMark(), entity.isActive(), geolocationMapper.toDto(entity.getGeolocation()),
				categoryMapper.toDto(entity.getCategory()),
				Optional.ofNullable(entity.getNews()).orElse(new HashSet<>()).stream().map(this::transformNewsToId).collect(Collectors.toSet()), 
				Optional.ofNullable(entity.getComments()).orElse(new HashSet<>()).stream().map(this::transformCommentToId).collect(Collectors.toSet()),
				Optional.ofNullable(entity.getMarks()).orElse(new HashSet<>()).stream().map(this::transformMarkToId).collect(Collectors.toSet()), entity.getAdmin().getId());
	}

	public List<CulturalOfferResDTO> toDTOResList(Iterable<CulturalOffer> entities) {
		List<CulturalOfferResDTO> dtos = new ArrayList<>();
		for(CulturalOffer entity : entities) {
			dtos.add(toDTORes(entity));
		}
		return dtos;
	}

	@Override
	public CulturalOfferDTO toDto(CulturalOffer entity) {
		return null;
	}
	
	private Long transformNewsToId(News entity) {
		return entity.getId();
	}
	private Long transformCommentToId(Comment entity) {
		return entity.getId();
	}
	private Long transformMarkToId(Mark entity) {
		return entity.getId();
	}
}
