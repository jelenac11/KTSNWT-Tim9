
package com.ktsnwt.project.team9.services.implementations;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import com.ktsnwt.project.team9.model.News;
import com.ktsnwt.project.team9.model.RegisteredUser;
import com.ktsnwt.project.team9.model.VerificationToken;

@Component
public class MailService {

	@Autowired
    private JavaMailSender emailSender;
	
	@Autowired
	private VerificationTokenService verificationTokenService;
	
	@Async
	public void sendMailNews(String to, News news) {
		
		SimpleMailMessage message = new SimpleMailMessage(); 
        message.setFrom("noreply.kts.l9@gmail.com");
        message.setTo(to); 
        message.setSubject("News about cultural offer you subscribed"); 
        message.setText("There is new event for cultural offer: " +
        		news.getCulturalOffer().getName() + "\n\n"
        				+ "Checkout in your application!!!");
        emailSender.send(message);	
		
	}
	
	@Async
	public void sendActivationalLink(RegisteredUser user) throws MailException, InterruptedException {
		String token = UUID.randomUUID().toString();
		VerificationToken vtoken = new VerificationToken();
		vtoken.setId(null);
		vtoken.setToken(token);
		vtoken.setUser(user);
		verificationTokenService.saveToken(vtoken);
		String confirmationUrl = "/auth/confirm-registration/" + token;
		SimpleMailMessage email = new SimpleMailMessage();
		email.setTo("jelenacupac99@gmail.com");
		email.setSubject("Confirm Registration");
		email.setText("Hi " + user.getFirstName() + ",\nThanks for getting started with CulturalContentTeam9! Click below to confirm your registration:\n" + 
				"\nhttp://localhost:8081" + confirmationUrl + "\nThanks,\nTeam 9\n");
		emailSender.send(email);
	}
	
}
