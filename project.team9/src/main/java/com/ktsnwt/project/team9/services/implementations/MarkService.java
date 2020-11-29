package com.ktsnwt.project.team9.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.Mark;
import com.ktsnwt.project.team9.model.RegisteredUser;
import com.ktsnwt.project.team9.repositories.ICulturalOfferRepository;
import com.ktsnwt.project.team9.repositories.IMarkRepository;
import com.ktsnwt.project.team9.repositories.IRegisteredUser;
import com.ktsnwt.project.team9.services.interfaces.IMarkService;

@Service
public class MarkService implements IMarkService {

	@Autowired
	private IMarkRepository markRepository;
	
	@Autowired
	private ICulturalOfferRepository culturalOfferRepository;
	
	@Autowired
	private IRegisteredUser rUserRepository;
	
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
		RegisteredUser user = rUserRepository.findById(entity.getGrader().getId()).orElse(null);
		if (user == null) {
			throw new Exception("Author doesn't exist.");
		}
		CulturalOffer culturalOffer = culturalOfferRepository.findById(entity.getCulturalOffer().getId()).orElse(null);
		if (culturalOffer == null) {
			throw new Exception("Cultural offer doesn't exist.");
		}
		return markRepository.save(entity);
	}

	@Override
	public boolean delete(Long id) throws Exception {
		Mark mark = markRepository.findById(id).orElse(null);
		if (mark == null) {
			throw new Exception("Mark doesn't exist.");
		}
		markRepository.deleteById(id);
		return true;
	}

	@Override
	public Mark update(Long id, Mark entity) throws Exception {
		Mark mark = markRepository.findById(id).orElse(null);
		if (mark == null) {
			throw new Exception("Mark doesn't exist.");
		}
		RegisteredUser user = rUserRepository.findById(entity.getGrader().getId()).orElse(null);
		if (user == null) {
			throw new Exception("Author doesn't exist.");
		}
		CulturalOffer culturalOffer = culturalOfferRepository.findById(entity.getCulturalOffer().getId()).orElse(null);
		if (culturalOffer == null) {
			throw new Exception("Cultural offer doesn't exist.");
		}
		mark.setValue(entity.getValue());
		mark.setGrader(entity.getGrader());
		mark.setCulturalOffer(entity.getCulturalOffer());
		return markRepository.save(mark);
	}
}
