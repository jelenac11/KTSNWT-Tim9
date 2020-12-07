package com.ktsnwt.project.team9.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.VerificationToken;
import com.ktsnwt.project.team9.repositories.VerificationTokenRepository;

@Service
public class VerificationTokenService {

	@Autowired
	private VerificationTokenRepository verificationTokenRepository;

	public VerificationToken findByToken(String token) {
		return verificationTokenRepository.findByToken(token);
	}

	public void saveToken(VerificationToken token) {
		verificationTokenRepository.save(token);
	}
}
