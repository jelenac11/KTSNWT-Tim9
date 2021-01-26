package com.ktsnwt.project.team9.services.implementations;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.News;
import com.ktsnwt.project.team9.model.RegisteredUser;
import com.ktsnwt.project.team9.repositories.INewsRepository;
import com.ktsnwt.project.team9.services.interfaces.INewsService;

@Service
public class NewsService implements INewsService {
	
	
	@Autowired
	private INewsRepository newsRepository;
	
	@Autowired
	private CulturalOfferService culturalOfferService;
	
	@Autowired
	private RegisteredUserService userService;
	
	@Autowired
	private MailService mailService;

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
		CulturalOffer culturalOffer = culturalOfferService.getById(id);
		if(culturalOffer == null)
			throw new Exception("There is no cultural offer with that ID");
		
		entity.setCulturalOffer(culturalOffer);
		
		entity.getImages().forEach(img -> img.setNews(entity));
		
		
		for(RegisteredUser us : userService.getSubscribed(culturalOffer)) {
			
			mailService.sendMail(us.getEmail(),
					"News about cultural offer you subscribed",
					"There is new event for cultural offer: " +
							entity.getCulturalOffer().getName() + "\n\n"
			        				+ "Checkout in your application!!!");
		}
		
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
		
		existingNews.setContent(entity.getContent());
		existingNews.setActive(entity.isActive());
		existingNews.setDate(entity.getDate());
		existingNews.setImages(entity.getImages());
		existingNews.setTitle(entity.getTitle());
		
		
		
		CulturalOffer culturalOffer = culturalOfferService.getById(
				entity.getCulturalOffer().getId());
		if(culturalOffer == null)
			throw new Exception("There is no cultural offer with that ID");
		
		existingNews.setCulturalOffer(culturalOffer);
		
		existingNews.getImages().forEach(img -> img.setNews(existingNews));
		
		
		return newsRepository.save(existingNews);
	}

	public Page<News> findAll(Pageable pageable) {
		return newsRepository.findAll(pageable);
	}

	@Transactional
	public Boolean subscribe(Long userID, Long coID) throws Exception {
		RegisteredUser ru = userService.getById(userID);
		CulturalOffer co = culturalOfferService.getById(coID);
		
		if(ru == null) 
			throw new Exception("There is no registred user with that ID");
		else if(co == null)
			throw new Exception("There is no cultural offer with that ID");
		
		return ru.getSubscribed().add(co) && co.getSubscribedUsers().add(ru);
	}
	
	@Transactional
	public Boolean unsubscribe(Long userID, Long coID) throws Exception {
		RegisteredUser ru = userService.getById(userID);
		CulturalOffer co = culturalOfferService.getById(coID);
		
		if(ru == null) 
			throw new Exception("There is no registred user with that ID");
		else if(co == null)
			throw new Exception("There is no cultural offer with that ID");
		
		return ru.getSubscribed().remove(co) && co.getSubscribedUsers().remove(ru);
	}

	public Page<News> getSubscribedNews(Long id, Pageable pageable) {
		return newsRepository.findSubscribedNews(id,pageable);
	}
	
	public Page<News> getSubscribedNews(Long id, Long categoryID, Pageable pageable) {
		return newsRepository.findSubscribedNews(id, categoryID, pageable);
	}

	public Page<News> findAllByCulturalOffer(Long id, Pageable pageable) {
		return newsRepository.findByCulturalOfferId(id, pageable);
	}
	
}
