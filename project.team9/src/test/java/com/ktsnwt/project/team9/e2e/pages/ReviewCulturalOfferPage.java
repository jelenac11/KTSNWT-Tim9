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
public class ReviewCulturalOfferPage {

	private WebDriver driver;
	
	@FindBy(id = "individual_culturalOffer_name")
	private WebElement name;
	
	@FindBy(xpath = "//bar-rating/div/div/div[4]")
	private WebElement star;
	
	@FindBy(xpath = "//bar-rating/div/div/div[1]")
	private WebElement star2;
	
	@FindBy(xpath = "//bar-rating/div/div/div[@class='br-unit br-selected ng-star-inserted']")
	private WebElement starRated;
	
	public ReviewCulturalOfferPage(WebDriver driver) {
		this.driver = driver;
	}
	
	public void ensureIsDisplayedName() {
        (new WebDriverWait(driver, 30)).until(ExpectedConditions.visibilityOfElementLocated(By.id("individual_culturalOffer_name")));
    }
	
	public void ensureIsDisplayedStar() {
        (new WebDriverWait(driver, 30)).until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//bar-rating/div/div/div[4]")));
    }
	
	public void ensureIsDisplayedStarRated() {
        (new WebDriverWait(driver, 30)).until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//bar-rating/div/div/div[@class='br-unit br-selected ng-star-inserted']")));
    }
	
}
