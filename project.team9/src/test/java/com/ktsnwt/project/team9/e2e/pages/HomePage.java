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
	
	@FindBy(id = "signup-navigation")
	private WebElement signUpPage;

	@FindBy(id = "home_page_more_button_3")
	private WebElement more;
	
	@FindBy(id = "mat-tab-label-0-1")
	private WebElement festivalsTab;
	
	@FindBy(xpath = "//div[@id='search_div_home_page']/app-search/div/mat-form-field/div/div/div[3]/input")
	private WebElement search;

	public HomePage(WebDriver driver) {
		this.driver = driver;
	}
	
	public void ensureIsDisplayedCulturalOfferNavigation() {
        (new WebDriverWait(driver, 30)).until(ExpectedConditions.visibilityOfElementLocated(By.id("culturalOffers_navigation")));
    }
	
	public void ensureIsDisplayedSignUpNavigation() {
        (new WebDriverWait(driver, 30)).until(ExpectedConditions.visibilityOfElementLocated(By.id("signup-navigation")));
    }

	public void ensureIsDisplayedMoreButton() {
        (new WebDriverWait(driver, 30)).until(ExpectedConditions.visibilityOfElementLocated(By.id("home_page_more_button_3")));
    }
	
	public void ensureIsDisplayedFestivalsTab() {
        (new WebDriverWait(driver, 30)).until(ExpectedConditions.visibilityOfElementLocated(By.id("mat-tab-label-0-1")));
    }
	
	public void ensureIsDisplayedSearch() {
        (new WebDriverWait(driver, 30)).until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@id='search_div_home_page']/app-search/div/mat-form-field/div/div/div[3]/input")));
    }
}
