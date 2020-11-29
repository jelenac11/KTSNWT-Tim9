package com.ktsnwt.project.team9.services.implementations;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.News;
import com.ktsnwt.project.team9.repositories.ICulturalOfferRepository;
import com.ktsnwt.project.team9.repositories.IImageRepository;
import com.ktsnwt.project.team9.repositories.INewsRepository;
import com.ktsnwt.project.team9.services.interfaces.INewsService;

@Service
public class NewsService implements INewsService {
	
	
	@Autowired
	private INewsRepository newsRepository;
	
	@Autowired
	private ICulturalOfferRepository culturalOfferRepository;
	
	@Autowired
	private IImageRepository imageRepository;
	

	@Override
	public Collection<News> getAll() {
		return newsRepository.findAll();
	}

	@Override
	public News getById(Long id) {
		return newsRepository.findById(id).orElse(null);
	}

	@Override
	public News create(News entity) throws Exception {
		Long id = entity.getCulturalOffer().getId();
		CulturalOffer culturalOffer = culturalOfferRepository.findById(id).orElse(null);
		if(culturalOffer == null)
			throw new Exception("There is no cultural offer with that ID");
		
		entity.setCulturalOffer(culturalOffer);
		
		entity.getImages().forEach(img -> img.setNews(entity));
		
		return newsRepository.save(entity);
	}

	@Override
	public boolean delete(Long id) throws Exception {
		News existingNews = newsRepository.findById(id).orElse(null);
		if (existingNews == null) {
			throw new Exception("News with given id doesn't exist.");
		}
		newsRepository.deleteById(id);
		return true;
	}

	@Override
	public News update(Long id, News entity) throws Exception {
		News existingNews = newsRepository.findById(id).orElse(null);
		if (existingNews == null) {
			throw new Exception("News with given id doesn't exist.");
		}
		
		existingNews.getImages().forEach(img -> {
			img.setNews(null);
			imageRepository.deleteById(img.getId());
			});
		
		existingNews.setContent(entity.getContent());
		existingNews.setActive(entity.isActive());
		existingNews.setDate(entity.getDate());
		existingNews.setImages(entity.getImages());
		
		
		
		CulturalOffer culturalOffer = culturalOfferRepository.findById(
				entity.getCulturalOffer().getId()).orElse(null);
		if(culturalOffer == null)
			throw new Exception("There is no cultural offer with that ID");
		
		existingNews.setCulturalOffer(culturalOffer);
		
		existingNews.getImages().forEach(img -> img.setNews(existingNews));
		
		
		return newsRepository.save(existingNews);
	}
}
