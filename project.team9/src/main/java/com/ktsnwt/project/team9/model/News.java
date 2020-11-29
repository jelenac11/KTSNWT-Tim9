package com.ktsnwt.project.team9.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class News {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Long id;

	@Column(unique = false, nullable = false)
	private String content;

	@Column(unique = false, nullable = false)
	private long date;

	@Column
	private boolean active;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "image_id")
	private Set<Image> images;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "culturalOffer_id")
	private CulturalOffer culturalOffer;

	public News() {
		super();
	}

	public News(Long id) {
		super();
		this.id = id;
	}

	public News(String content, long date, Set<Image> images, CulturalOffer culturalOffer, boolean active) {
		super();
		this.content = content;
		this.date = date;
		this.images = images;
		this.culturalOffer = culturalOffer;
		this.active = active;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public long getDate() {
		return date;
	}

	public void setDate(long date) {
		this.date = date;
	}

	public Set<Image> getImages() {
		return images;
	}

	public void setImages(Set<Image> images) {
		this.images = images;
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

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

}
