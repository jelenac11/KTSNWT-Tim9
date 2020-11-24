package com.ktsnwt.project.team9.model;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("IMG")
public class Image extends Comment {
	
	@Column(unique = true, nullable = false)
	private String url;
	
	public Image() {
		super();
	}

	public Image(String url) {
		super();
		this.url = url;
	}

	public Image(boolean approved, long date, RegisteredUser author, CulturalOffer culturalOffer, String url) {
		super(approved, date, author, culturalOffer);
		this.url = url;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
}
