package com.ktsnwt.project.team9.e2e.tests;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.PageFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.MethodMode;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import com.ktsnwt.project.team9.e2e.pages.HomePage;
import com.ktsnwt.project.team9.e2e.pages.SignUpPage;
import com.ktsnwt.project.team9.model.RegisteredUser;
import com.ktsnwt.project.team9.services.implementations.RegisteredUserService;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@TestPropertySource("classpath:test.properties")
public class AuthE2ETest {

	@Autowired
	private RegisteredUserService regService;
	
	public static final String BASE_URL = "https://localhost:4200";

	private WebDriver driver;
	
	private SignUpPage signUpPage;
	
	private HomePage homePage;
	
	@Before
	public void setUp() {
		System.setProperty("webdriver.chrome.driver", "src/test/resources/chromedriver.exe");
		driver = new ChromeDriver();

		driver.navigate().to(BASE_URL);

		driver.manage().window().maximize();

		signUpPage = PageFactory.initElements(driver, SignUpPage.class);
		homePage = PageFactory.initElements(driver, HomePage.class);
	}
	
	@Test
	@DirtiesContext(methodMode = MethodMode.AFTER_METHOD)
	public void signUp_WithValidParams_ShouldSuccess() {
		int size = ((List<RegisteredUser>) regService.getAll()).size();
		
		homePage.ensureIsDisplayedSignUpNavigation();
		
		assertEquals("https://localhost:4200/", driver.getCurrentUrl());
		
		homePage.getSignUpPage().click();
		
		signUpPage.ensureIsDisplayedEmail();
		
		assertEquals("https://localhost:4200/auth/sign-up", driver.getCurrentUrl());
		
		signUpPage.getFirstName().sendKeys("Marko");
		signUpPage.getLastName().sendKeys("Markovic");
		signUpPage.getUsername().sendKeys("markic98");
		signUpPage.getEmail().sendKeys("marko.markovic@gmail.com");
		signUpPage.getPassword().sendKeys("marko98");
		signUpPage.getSignUp().click();
		
		signUpPage.ensureIsDisplayedMessage();
		assertEquals("Activation link sent. Check your email.", signUpPage.getMessage().getText());
		assertEquals("https://localhost:4200/auth/sign-up", driver.getCurrentUrl());
		assertEquals(size + 1, ((List<RegisteredUser>) regService.getAll()).size());
		
		driver.close();
	}
	
	@Test
	public void signUp_WithExistingUsername_ShouldFail() {
		int size = ((List<RegisteredUser>) regService.getAll()).size();
		
		homePage.ensureIsDisplayedSignUpNavigation();
		
		assertEquals("https://localhost:4200/", driver.getCurrentUrl());
		
		homePage.getSignUpPage().click();
		
		signUpPage.ensureIsDisplayedEmail();
		
		assertEquals("https://localhost:4200/auth/sign-up", driver.getCurrentUrl());
		
		signUpPage.getFirstName().sendKeys("Marko");
		signUpPage.getLastName().sendKeys("Markovic");
		signUpPage.getUsername().sendKeys("user 20");
		signUpPage.getEmail().sendKeys("marko.markovic@gmail.com");
		signUpPage.getPassword().sendKeys("marko98");
		signUpPage.getSignUp().click();
		
		signUpPage.ensureIsDisplayedMessage();
		assertEquals("Username already exists.", signUpPage.getMessage().getText());
		assertEquals("https://localhost:4200/auth/sign-up", driver.getCurrentUrl());
		assertEquals(size, ((List<RegisteredUser>) regService.getAll()).size());
		
		driver.close();
	}
	
	@Test
	public void signUp_WithExistingEmail_ShouldFail() {
		int size = ((List<RegisteredUser>) regService.getAll()).size();
		
		homePage.ensureIsDisplayedSignUpNavigation();
		
		assertEquals("https://localhost:4200/", driver.getCurrentUrl());
		
		homePage.getSignUpPage().click();
		
		signUpPage.ensureIsDisplayedEmail();
		
		assertEquals("https://localhost:4200/auth/sign-up", driver.getCurrentUrl());
		
		signUpPage.getFirstName().sendKeys("Marko");
		signUpPage.getLastName().sendKeys("Markovic");
		signUpPage.getUsername().sendKeys("markic98");
		signUpPage.getEmail().sendKeys("email_adresa1@gmail.com");
		signUpPage.getPassword().sendKeys("marko98");
		signUpPage.getSignUp().click();
		
		signUpPage.ensureIsDisplayedMessage();
		assertEquals("Email already exists.", signUpPage.getMessage().getText());
		assertEquals("https://localhost:4200/auth/sign-up", driver.getCurrentUrl());
		assertEquals(size, ((List<RegisteredUser>) regService.getAll()).size());
		
		driver.close();
	}
	
	@Test
	public void signUp_WithInvalidEmail_ShouldFail() {
		int size = ((List<RegisteredUser>) regService.getAll()).size();
		
		homePage.ensureIsDisplayedSignUpNavigation();
		
		assertEquals("https://localhost:4200/", driver.getCurrentUrl());
		
		homePage.getSignUpPage().click();
		
		signUpPage.ensureIsDisplayedEmail();
		
		assertEquals("https://localhost:4200/auth/sign-up", driver.getCurrentUrl());
		
		signUpPage.getFirstName().sendKeys("Marko");
		signUpPage.getLastName().sendKeys("Markovic");
		signUpPage.getUsername().sendKeys("markic98");
		signUpPage.getEmail().sendKeys("email_adresa1gmail.com");
		signUpPage.getPassword().sendKeys("marko98");
		signUpPage.getSignUp().click();
		
		assertEquals(true, signUpPage.getEmailError().isDisplayed());
		assertEquals("https://localhost:4200/auth/sign-up", driver.getCurrentUrl());
		assertEquals(size, ((List<RegisteredUser>) regService.getAll()).size());
		
		driver.close();
	}
	
	@Test
	public void signUp_WithShortPassword_ShouldFail() {
		int size = ((List<RegisteredUser>) regService.getAll()).size();
		
		homePage.ensureIsDisplayedSignUpNavigation();
		
		assertEquals("https://localhost:4200/", driver.getCurrentUrl());
		
		homePage.getSignUpPage().click();
		
		signUpPage.ensureIsDisplayedEmail();
		
		assertEquals("https://localhost:4200/auth/sign-up", driver.getCurrentUrl());
		
		signUpPage.getFirstName().sendKeys("Marko");
		signUpPage.getLastName().sendKeys("Markovic");
		signUpPage.getUsername().sendKeys("markic98");
		signUpPage.getEmail().sendKeys("marko.markovic@gmail.com");
		signUpPage.getPassword().sendKeys("marko");
		signUpPage.getSignUp().click();
		
		assertEquals(true, signUpPage.getPasswordLenError().isDisplayed());
		assertEquals("https://localhost:4200/auth/sign-up", driver.getCurrentUrl());
		assertEquals(size, ((List<RegisteredUser>) regService.getAll()).size());
		
		driver.close();
	}
	
	
}
