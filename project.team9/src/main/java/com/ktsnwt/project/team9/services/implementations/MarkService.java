package com.ktsnwt.project.team9.services.implementations;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.Mark;
import com.ktsnwt.project.team9.model.RegisteredUser;
import com.ktsnwt.project.team9.repositories.IMarkRepository;
import com.ktsnwt.project.team9.services.interfaces.IMarkService;

@Service
public class MarkService implements IMarkService {

	@Autowired
	private IMarkRepository markRepository;
	
	@Autowired
	private CulturalOfferService culturalOfferService;
	
	@Autowired
<<<<<<< Updated upstream
	private RegisteredUserService rUserService;
	
	@Override
	public Iterable<Mark> getAll() {
		return markRepository.findAll();
	}
=======
	private IRegisteredUser rUserRepository;
>>>>>>> Stashed changes

	@Override
	public Mark getById(Long id) {
		return markRepository.findById(id).orElse(null);
	}

	@Override
	public Mark create(Mark entity) throws Exception {
		RegisteredUser user = rUserService.getById(entity.getGrader().getId());
		if (user == null) {
			throw new NoSuchElementException("Grader doesn't exist.");
		}
		CulturalOffer culturalOffer = culturalOfferService.getById(entity.getCulturalOffer().getId());
		if (culturalOffer == null) {
			throw new NoSuchElementException("Cultural offer doesn't exist.");
		}
		return markRepository.save(entity);
	}

	@Override
	public Mark update(Long id, Mark entity) throws Exception {
		Mark mark = markRepository.findByGraderAndCulturalOfferId(id, entity.getCulturalOffer().getId());
		if (mark == null) {
			throw new NoSuchElementException("Mark doesn't exist.");
		}
		RegisteredUser user = rUserService.getById(entity.getGrader().getId());
		if (user == null) {
			throw new NoSuchElementException("Grader doesn't exist.");
		}
		CulturalOffer culturalOffer = culturalOfferService.getById(entity.getCulturalOffer().getId());
		if (culturalOffer == null) {
			throw new NoSuchElementException("Cultural offer doesn't exist.");
		}
		mark.setValue(entity.getValue());
		return markRepository.save(mark);
	}

	public Mark findByUserIdAndCulturalOfferId(Long userId, Long offerId) {
		return markRepository.findByGraderAndCulturalOfferId(userId, offerId);
	}

	@Override
	public Iterable<Mark> getAll() {
		return null;
	}
	
	@Override
	public boolean delete(Long id) throws Exception {
		return false;
	}
	
}
