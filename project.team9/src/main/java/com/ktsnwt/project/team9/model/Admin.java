package com.ktsnwt.project.team9.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

@Entity
@DiscriminatorValue("AD")
public class Admin extends User {

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "culturalOffer_id")
	private Set<CulturalOffer> culturalOffers;
	
	@Column
	private boolean active;

	public Admin() {
		super();
	}

	public Admin(Set<CulturalOffer> culturalOffers, boolean active) {
		super();
		this.culturalOffers = culturalOffers;
		this.active = active;
	}

	public Admin(String username, String email, String password, String firstName, String lastName,
			Set<CulturalOffer> culturalOffers, boolean active) {
		super(username, email, password, firstName, lastName);
		this.culturalOffers = culturalOffers;
		this.active = active;
	}

	public Set<CulturalOffer> getCulturalOffers() {
		return culturalOffers;
	}

	public void setCulturalOffers(Set<CulturalOffer> culturalOffers) {
		this.culturalOffers = culturalOffers;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
	
	
}
