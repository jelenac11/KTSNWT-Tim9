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
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class CulturalOffer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "culturalOffer_id")
	private Long id;

	@Column(unique = false, nullable = false)
	private String name;
	

	@Column(columnDefinition = "text", unique = false, nullable = true)
	private String description;
	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name="image_id")
	private Image image;
	
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
	
	@OneToMany(mappedBy = "culturalOffer")
	private Set<Comment> comments;
	
	@OneToMany(mappedBy = "culturalOffer", cascade = CascadeType.ALL)
	private Set<Mark> marks;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id")
	private Admin admin;
	
	@ManyToMany(mappedBy = "subscribed", fetch = FetchType.LAZY)
	private Set<RegisteredUser> subscribedUsers;

	public CulturalOffer(Long id) {
		super();
		this.id = id;
	}

	public CulturalOffer(String name, String description, Geolocation geolocation, Category category, Admin admin) {
		super();
		this.name = name;
		this.description = description;
		this.geolocation = geolocation;
		this.category = category;
		this.admin = admin;
	}
}
