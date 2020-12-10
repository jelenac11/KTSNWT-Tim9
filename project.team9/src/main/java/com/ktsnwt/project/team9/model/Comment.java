package com.ktsnwt.project.team9.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Comment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_id")
	private Long id;

	@Column(unique = false, nullable = false)
	private boolean approved;
	
	@Column(unique = false, nullable = false)
	private long date;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "user_id")
	private RegisteredUser author;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "culturalOffer_id")
	private CulturalOffer culturalOffer;
	
	@Column(columnDefinition = "text", unique = false, nullable = true)
	private String text;
	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name="image_id")
	private Image imageUrl;

	public Comment() {
		super();
	}
	
	public Comment(Long id) {
		super();
		this.id = id;
	}

	public Comment(Long id, boolean approved, long date, RegisteredUser author, CulturalOffer culturalOffer, String text, Image imageUrl) {
		super();
		this.id = id;
		this.approved = approved;
		this.date = date;
		this.author = author;
		this.culturalOffer = culturalOffer;
		this.text = text;
		this.imageUrl = imageUrl;
	}

	public boolean isApproved() {
		return approved;
	}

	public void setApproved(boolean approved) {
		this.approved = approved;
	}

	public long getDate() {
		return date;
	}

	public void setDate(long date) {
		this.date = date;
	}

	public RegisteredUser getAuthor() {
		return author;
	}

	public void setAuthor(RegisteredUser author) {
		this.author = author;
	}

	public CulturalOffer getCulturalOffer() {
		return culturalOffer;
	}

	public void setCulturalOffer(CulturalOffer culturalOffer) {
		this.culturalOffer = culturalOffer;
	}

	public Long getId() {
		return id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Image getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(Image imageUrl) {
		this.imageUrl = imageUrl;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	
}