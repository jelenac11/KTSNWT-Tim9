package com.ktsnwt.project.team9.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_id")
	private Long id;

	@Column(unique = false, nullable = false)
	private boolean approved;
	
	@Column(unique = false, nullable = false)
	private long date;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id")
	private RegisteredUser author;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "culturalOffer_id")
	private CulturalOffer culturalOffer;
	
	@Column(columnDefinition = "text", unique = false, nullable = true)
	private String text;
	
	@OneToOne(fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name="image_id")
	private Image imageUrl;
	
	public Comment(Long id) {
		super();
		this.id = id;
	}

	public Comment(RegisteredUser registeredUser, CulturalOffer culturalOffer, String text, long time) {
		this.author = registeredUser;
		this.culturalOffer = culturalOffer;
		this.text = text;
		this.date = time;
	}
	
}