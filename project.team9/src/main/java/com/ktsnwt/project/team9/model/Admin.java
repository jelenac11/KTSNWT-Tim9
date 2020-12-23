package com.ktsnwt.project.team9.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("AD")
@Getter
@Setter
@NoArgsConstructor
public class Admin extends User {

	private static final long serialVersionUID = 1L;

	@OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
	private Set<CulturalOffer> culturalOffers;

	@Column
	private boolean active;
	
	public Admin(Long id) {
		super(id);
	}

	public Admin(Set<CulturalOffer> culturalOffers, boolean active) {
		super();
		this.culturalOffers = culturalOffers;
		this.active = active;
	}

	public Admin(String username, String email, String firstName, String lastName) {
		super(username, email, firstName, lastName);
	}
	
	public Admin(String username, String email, String password, String firstName, String lastName,
			Set<CulturalOffer> culturalOffers, boolean active) {
		super(username, email, password, firstName, lastName);
		this.culturalOffers = culturalOffers;
		this.active = active;
	}

	public Admin(Long id, String username, String email, String password, String firstName, String lastName,
			Set<CulturalOffer> culturalOffers, boolean active) {
		super(id, username, email, password, firstName, lastName);
		this.culturalOffers = culturalOffers;
		this.active = active;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		return true;
	}

}
