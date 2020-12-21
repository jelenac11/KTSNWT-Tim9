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

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (active ? 1231 : 1237);
		result = prime * result + ((content == null) ? 0 : content.hashCode());
		result = prime * result + ((culturalOffer == null) ? 0 : culturalOffer.hashCode());
		result = prime * result + (int) (date ^ (date >>> 32));
		result = prime * result + ((images == null) ? 0 : images.hashCode());
		return result;
	}

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
	}

}
