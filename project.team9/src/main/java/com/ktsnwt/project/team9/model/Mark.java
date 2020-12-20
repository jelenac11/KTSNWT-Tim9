package com.ktsnwt.project.team9.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Mark implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Long id;

	@Column(unique = false, nullable = false)
	private int value;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id")
	private RegisteredUser grader;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "culturalOffer_id")
	private CulturalOffer culturalOffer;

	public Mark() {
		super();
	}
	
	public Mark(Long id) {
		super();
		this.id = id;
	}
	
	public Mark(int value, RegisteredUser grader, CulturalOffer culturalOffer) {
		super();
		this.value = value;
		this.grader = grader;
		this.culturalOffer = culturalOffer;
	}

	public Mark(Long id, int value, RegisteredUser grader, CulturalOffer culturalOffer) {
		super();
		this.id = id;
		this.value = value;
		this.grader = grader;
		this.culturalOffer = culturalOffer;
	}
	
	public RegisteredUser getGrader() {
		return grader;
	}

	public void setGrader(RegisteredUser grader) {
		this.grader = grader;
	}

	public CulturalOffer getCulturalOffer() {
		return culturalOffer;
	}

	public void setCulturalOffer(CulturalOffer culturalOffer) {
		this.culturalOffer = culturalOffer;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}

	public Long getId() {
		return id;
	}
	
	
}
