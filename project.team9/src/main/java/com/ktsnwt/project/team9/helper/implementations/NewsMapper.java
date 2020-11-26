package com.ktsnwt.project.team9.helper.implementations;

import org.springframework.stereotype.Component;
import com.ktsnwt.project.team9.dto.NewsDTO;
import com.ktsnwt.project.team9.helper.interfaces.IMapper;
import com.ktsnwt.project.team9.model.News;

@Component
public class NewsMapper implements IMapper<News, NewsDTO> {

	@Override
	public News toEntity(NewsDTO dto) {
		return new News();
	}

	@Override
	public NewsDTO toDto(News entity) {
		return new NewsDTO();
	}
}
