package com.ktsnwt.project.team9.e2e.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HomePage {

	private WebDriver driver;

	@FindBy(id = "culturalOffers_navigation")
	private WebElement culturalOffersPage;
	
	@FindBy(id = "home_page_more_button_2")
	private WebElement more;

	public HomePage(WebDriver driver) {
		this.driver = driver;
	}
	
	public void ensureIsDisplayedCulturalOfferNavigation() {
        (new WebDriverWait(driver, 30)).until(ExpectedConditions.visibilityOfElementLocated(By.id("culturalOffers_navigation")));
    }
	
	public void ensureIsDisplayedMoreButton() {
        (new WebDriverWait(driver, 30)).until(ExpectedConditions.visibilityOfElementLocated(By.id("home_page_more_button_2")));
    }
}
