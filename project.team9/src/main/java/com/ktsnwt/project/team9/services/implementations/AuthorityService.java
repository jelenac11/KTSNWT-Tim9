package com.ktsnwt.project.team9.services.implementations;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.Authority;
import com.ktsnwt.project.team9.model.VerificationToken;
import com.ktsnwt.project.team9.repositories.IAuthorityRepository;
import com.ktsnwt.project.team9.repositories.IRegisteredUser;

@Service
public class AuthorityService {

	@Autowired
    private IAuthorityRepository authorityRepository;
	
	@Autowired
    private VerificationTokenService verificationTokenService;
	
	@Autowired
    private IRegisteredUser registeredUserRepository;

    public List<Authority> findById(Long id) {
        Authority auth = this.authorityRepository.getOne(id);
        List<Authority> auths = new ArrayList<>();
        auths.add(auth);
        return auths;
    }

    public List<Authority> findByName(String name) {
        Authority auth = this.authorityRepository.findByName(name);
        List<Authority> auths = new ArrayList<>();
        auths.add(auth);
        return auths;
    }

	public void confirmRegistration(String token) {
		VerificationToken vt = verificationTokenService.findByToken(token);
		if (vt != null) {
			vt.getUser().setVerified(true);
			registeredUserRepository.save(vt.getUser());
		}
	}
	
}
