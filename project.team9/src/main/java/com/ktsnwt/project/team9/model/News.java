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

	@Column(columnDefinition = "text", unique = false, nullable = false)
	private String content;

	@Column(unique = false, nullable = false)
	private long date;

	@Column
	private boolean active;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "news_id")
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

<<<<<<< Updated upstream
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
=======
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		News other = (News) obj;
		if (active != other.active)
			return false;
		if (content == null) {
			if (other.content != null)
				return false;
		} else if (!content.equals(other.content))
			return false;
		if (culturalOffer == null) {
			if (other.culturalOffer != null)
				return false;
		} else if (!culturalOffer.equals(other.culturalOffer))
			return false;
		if (date != other.date)
			return false;
		if (images == null) {
			if (other.images != null)
				return false;
		} else if (!images.equals(other.images))
			return false;
		return true;
>>>>>>> Stashed changes
	}

}
