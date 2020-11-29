package com.ktsnwt.project.team9.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToOne;

@Entity
@DiscriminatorValue("TXT")
public class Text extends Comment {
	
	@Column(unique = false, nullable = true)
	private String content;
	
	@OneToOne(cascade=CascadeType.ALL, fetch=FetchType.EAGER, optional = true)
	private Image image;

	public Text() {
		super();
	}

	public Text(String content, Image image) {
		super();
		this.content = content;
		this.image = image;
	}

	public Text(boolean approved, long date, RegisteredUser author, CulturalOffer culturalOffer, String content,
			Image image) {
		super(approved, date, author, culturalOffer);
		this.content = content;
		this.image = image;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Image getImage() {
		return image;
	}

	public void setImage(Image image) {
		this.image = image;
	}
	
}
