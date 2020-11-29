package com.ktsnwt.project.team9.services.implementations;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.Image;
import com.ktsnwt.project.team9.model.News;
import com.ktsnwt.project.team9.repositories.IImageRepository;
import com.ktsnwt.project.team9.repositories.INewsRepository;
import com.ktsnwt.project.team9.services.interfaces.IImageService;

@Service
public class ImageService implements IImageService {

	
	@Autowired
	private IImageRepository imageRepository;
	
	@Autowired
	private INewsRepository newsRepository;
	
	@Override
	public Collection<Image> getAll() {
		return imageRepository.findAll();
	}

	@Override
	public Image getById(Long id) {
		return imageRepository.findById(id).orElse(null);
	}

	@Override
	public Image create(Image entity) throws Exception {
		return imageRepository.save(entity);
	}

	@Override
	public boolean delete(Long id) throws Exception {
		imageRepository.deleteById(id);
		return false;
	}

	@Override
	public Image update(Long id, Image entity) throws Exception {
		Image image = imageRepository.findById(id).orElse(null);
		if (image == null) {
			throw new Exception("Image with given id doesn't exist.");
		}
		
		//Delete from previouse news
		News prevNews = image.getNews();
		prevNews.getImages().remove(image);
		
		
		image.setUrl(entity.getUrl());
		
		//Add in new news
		News news = newsRepository.findById(entity.getId()).orElse(null);
		image.setNews(news);
		news.getImages().add(image);
		
		return imageRepository.save(image);
	}
}
