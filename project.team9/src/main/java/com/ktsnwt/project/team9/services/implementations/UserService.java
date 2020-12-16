package com.ktsnwt.project.team9.services.implementations;

import java.security.SecureRandom;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.RegisteredUser;
import com.ktsnwt.project.team9.model.User;
import com.ktsnwt.project.team9.repositories.IRegisteredUser;
import com.ktsnwt.project.team9.repositories.IUserRepository;
import com.ktsnwt.project.team9.services.interfaces.IUserService;

@Service
public class UserService implements IUserService, UserDetailsService {
	
	@Autowired
	private IRegisteredUser userRepo;
	
	@Autowired
    private IUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
	private MailService mailService;

    // Funkcija koja na osnovu username-a iz baze vraca objekat User-a
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // ako se ne radi nasledjivanje, paziti gde sve treba da se proveri email
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with email '%s'.", email));
        } else {
            return user;
        }
    }

    // Funkcija pomocu koje korisnik menja svoju lozinku
    public void changePassword(String oldPassword, String newPassword) throws Exception {

        // Ocitavamo trenutno ulogovanog korisnika
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        String username = "";
        try {
        	username = ((User) currentUser.getPrincipal()).getEmail();
        } catch (Exception e) {
        	throw new Exception(String.format("Invalid token."));
        }
        

        if (authenticationManager != null) {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, oldPassword));
        } else {
            return;
        }
        User user = (User) loadUserByUsername(username);

        // pre nego sto u bazu upisemo novu lozinku, potrebno ju je hesirati
        // ne zelimo da u bazi cuvamo lozinke u plain text formatu
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setLastPasswordResetDate(new Date().getTime());
        userRepository.save(user);
    }
    
    @Override
	public User changeProfile(User entity) throws Exception {
    	User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (!entity.getUsername().equals(user.getUsername())) {
			User usernameUser = userRepository.findByUsername(entity.getUsername());
			if (usernameUser != null) {
				throw new Exception("User with this username already exists.");
			}
		}
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User loggedIn = userRepository.findByUsername(auth.getName());
		if (loggedIn.getId() != user.getId()) {
			throw new Exception("You can not change someone elses profile.");
		}
		user.setUsername(entity.getUsername());
		user.setFirstName(entity.getFirstName());
		user.setLastName(entity.getLastName());
		return userRepository.save(user);
	}
	
	@Override
	public Iterable<User> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User getById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User create(User entity) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(Long id) throws Exception {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public User update(Long id, User entity) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<RegisteredUser> getSubscribed(CulturalOffer co) {
		return userRepo.findBySubscribed(co);
	}
	
	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	@Override
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	public void forgotPassword(String email) throws MailException, InterruptedException {
		User user = userRepository.findByEmail(email);
		String newPassword = generateRandomPassword();
		user.setPassword(passwordEncoder.encode(newPassword));
		user.setLastPasswordResetDate(new Date().getTime());
        userRepository.save(user);
        mailService.sendForgottenPassword(user, newPassword);
	}
	
	public String generateRandomPassword() {
		final String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		 
	    SecureRandom random = new SecureRandom();
	    StringBuilder sb = new StringBuilder();

	    for (int i = 0; i < 8; i++) {
	        int randomIndex = random.nextInt(chars.length());
	        sb.append(chars.charAt(randomIndex));
	    }

	    return sb.toString();
	}
	
}
