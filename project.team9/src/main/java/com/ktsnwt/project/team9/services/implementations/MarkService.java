package com.ktsnwt.project.team9.services.implementations;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.Mark;
import com.ktsnwt.project.team9.model.RegisteredUser;
import com.ktsnwt.project.team9.repositories.ICulturalOfferRepository;
import com.ktsnwt.project.team9.repositories.IMarkRepository;
import com.ktsnwt.project.team9.services.interfaces.IMarkService;

@Service
public class MarkService implements IMarkService {

	@Autowired
	private IMarkRepository markRepository;
	
	@Autowired
	private CulturalOfferService culturalOfferService;
	
	@Autowired
	private ICulturalOfferRepository culturalOfferRepository;
	
	@Autowired
	private RegisteredUserService rUserService;
	
	@Override
	public Iterable<Mark> getAll() {
		return markRepository.findAll();
	}

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
		List<Mark> marks = markRepository.findByCulturalOfferId(culturalOffer.getId());
		double sum = 0;
		for (Mark mark : marks) {
			sum += mark.getValue();
		}
		sum += entity.getValue();
		culturalOffer.setAverageMark(sum/(marks.size() + 1));
		culturalOfferRepository.save(culturalOffer);
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
		List<Mark> marks = markRepository.findByCulturalOfferId(culturalOffer.getId());
		double sum = 0;
		for (Mark m : marks) {
			if (m.getGrader().getId() == mark.getGrader().getId()) {
				sum += entity.getValue();
			} else {
				sum += m.getValue();
			}
		}
		culturalOffer.setAverageMark(sum/marks.size());
		culturalOfferRepository.save(culturalOffer);
		return markRepository.save(mark);
	}

	@Override
	public boolean delete(Long id) throws Exception {
		return false;
	}

	public Mark findByUserIdAndCulturalOfferId(Long userId, Long offerId) {
		return markRepository.findByGraderAndCulturalOfferId(userId, offerId);
	}
	
}
