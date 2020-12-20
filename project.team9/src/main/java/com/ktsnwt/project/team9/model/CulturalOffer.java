package com.ktsnwt.project.team9.model;

import java.io.Serializable;
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

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
<<<<<<< Updated upstream
public class CulturalOffer {
=======
@AllArgsConstructor
public class CulturalOffer implements Serializable {
>>>>>>> Stashed changes
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "culturalOffer_id")
	private Long id;

	@Column(unique = false, nullable = false)
	private String name;
	
	@Column(unique = false, nullable = true)
	private String description;
	
	@Column(unique = false, nullable = true)
	private String imageURL;
	
	@Column
	private double averageMark;
	
	@Column(unique = false, nullable = false)
	private boolean active;
	
	
	@OneToOne(cascade=CascadeType.ALL, fetch=FetchType.EAGER, optional = false)
	@JoinColumn(name="geolocation_id")
	private Geolocation geolocation;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "category_id")
	private Category category;
	
	@OneToMany(mappedBy = "culturalOffer", cascade = CascadeType.ALL)
	private Set<News> news;
	
	@OneToMany(mappedBy = "culturalOffer" ,cascade = CascadeType.ALL)
	private Set<Comment> comments;
	
	@OneToMany(mappedBy = "culturalOffer", cascade = CascadeType.ALL)
	private Set<Mark> marks;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id")
	private Admin admin;

	public CulturalOffer() {
		super();
	}

	public CulturalOffer(Long id) {
		super();
		this.id = id;
	}

	
	public CulturalOffer(Long id, String name, String description, String imageURL, double averageMark, boolean active,
			Geolocation geolocation, Category category, Set<News> news, Set<Comment> comments,
			Set<Mark> marks, Admin admin) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.imageURL = imageURL;
		this.averageMark = averageMark;
		this.active = active;
		this.geolocation = geolocation;
		this.category = category;
		this.news = news;
		this.comments = comments;
		this.marks = marks;
		this.admin = admin;
	}
}
