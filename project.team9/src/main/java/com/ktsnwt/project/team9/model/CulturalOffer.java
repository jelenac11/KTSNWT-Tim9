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
public class CulturalOffer implements Serializable {
	
	private static final long serialVersionUID = 1L;

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

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CulturalOffer other = (CulturalOffer) obj;
		if (active != other.active)
			return false;
		if (admin == null) {
			if (other.admin != null)
				return false;
		} else if (!admin.equals(other.admin))
			return false;
		if (Double.doubleToLongBits(averageMark) != Double.doubleToLongBits(other.averageMark))
			return false;
		if (category == null) {
			if (other.category != null)
				return false;
		} else if (!category.equals(other.category))
			return false;
		if (comments == null) {
			if (other.comments != null)
				return false;
		} else if (!comments.equals(other.comments))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (geolocation == null) {
			if (other.geolocation != null)
				return false;
		} else if (!geolocation.equals(other.geolocation))
			return false;
		if (image == null) {
			if (other.image != null)
				return false;
		} else if (!image.equals(other.image))
			return false;
		if (marks == null) {
			if (other.marks != null)
				return false;
		} else if (!marks.equals(other.marks))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (news == null) {
			if (other.news != null)
				return false;
		} else if (!news.equals(other.news))
			return false;
		if (subscribedUsers == null) {
			if (other.subscribedUsers != null)
				return false;
		} else if (!subscribedUsers.equals(other.subscribedUsers))
			return false;
		return true;
	}

}
