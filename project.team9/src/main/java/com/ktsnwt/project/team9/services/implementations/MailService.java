
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
import com.ktsnwt.project.team9.model.User;
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
		String confirmationUrl = "/confirm-registration/" + token;
		SimpleMailMessage email = new SimpleMailMessage();
		email.setTo("jelenacupac99@gmail.com");
		email.setSubject("Confirm Registration");
		email.setText("Hi " + user.getFirstName() + ",\n\nThanks for getting started with CulturalContentTeam9! Click below to confirm your registration:\n" + 
				"\nhttp://localhost:4200" + confirmationUrl + "\nThanks,\nTeam 9\n");
		emailSender.send(email);
	}
	
	@Async
	public void sendForgottenPassword(User user, String newPassword) throws MailException, InterruptedException {
		SimpleMailMessage email = new SimpleMailMessage();
		email.setTo("aleksa.goljovic4@gmail.com");
		email.setSubject("Password Reset");
		email.setText("Hi " + user.getFirstName() + ",\n\nYour new password is: " + newPassword + ".\n\n\nTeam 9");
		emailSender.send(email);
	}
	
	@Async
	public void sendMail(String to, String subject, String text) {
		SimpleMailMessage message = new SimpleMailMessage(); 
        message.setFrom("noreply.kts.l9@gmail.com");
        message.setTo("aleksa.goljovic4@gmail.com"); 
        message.setSubject(subject); 
        message.setText(text);
        emailSender.send(message);	
	}
}
