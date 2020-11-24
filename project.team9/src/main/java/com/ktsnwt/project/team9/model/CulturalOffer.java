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
import javax.persistence.OneToOne;

@Entity
public class CulturalOffer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "culturalOffer_id")
	private Long id;

	@Column(unique = false, nullable = false)
	private String name;
	
	@Column(unique = false, nullable = true)
	private String description;
	
	@Column
	private double averageMark;
	@Column
	private boolean active;
	
	
	@OneToOne(cascade=CascadeType.ALL, fetch=FetchType.EAGER, optional = false)
	@JoinColumn(name="geolocation_id")
	private Geolocation geolocation;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "category_id")
	private Category category;
	
	@OneToMany(mappedBy = "culturalOffer", cascade = CascadeType.ALL)
	private Set<News> news;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "comment_id")
	private Set<Image> images;
	
	@OneToMany(mappedBy = "culturalOffer" ,cascade = CascadeType.ALL)
	private Set<Comment> comments;
	
	@OneToMany(mappedBy = "culturalOffer", cascade = CascadeType.ALL)
	private Set<Mark> marks;

	public CulturalOffer() {
		super();
	}

	public CulturalOffer(String name, String description, Geolocation geolocation, Category category, Set<News> news,
			Set<Image> images, Set<Comment> comments, Set<Mark> marks, boolean active,
			double averageMark) {
		super();
		this.name = name;
		this.description = description;
		this.geolocation = geolocation;
		this.category = category;
		this.news = news;
		this.images = images;
		this.comments = comments;
		this.marks = marks;
		this.active = active;
		this.averageMark = averageMark;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Geolocation getGeolocation() {
		return geolocation;
	}

	public void setGeolocation(Geolocation geolocation) {
		this.geolocation = geolocation;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Set<News> getNews() {
		return news;
	}

	public void setNews(Set<News> news) {
		this.news = news;
	}

	public Set<Image> getImages() {
		return images;
	}

	public void setImages(Set<Image> images) {
		this.images = images;
	}

	public Set<Comment> getComments() {
		return comments;
	}

	public void setComments(Set<Comment> comments) {
		this.comments = comments;
	}

	public Set<Mark> getMarks() {
		return marks;
	}

	public void setMarks(Set<Mark> marks) {
		this.marks = marks;
	}

	public Long getId() {
		return id;
	}

	public double getAverageMark() {
		return averageMark;
	}

	public void setAverageMark(double averageMark) {
		this.averageMark = averageMark;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
	
	
	
}
