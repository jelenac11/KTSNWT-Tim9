package com.ktsnwt.project.team9.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.JoinColumn;

@Getter
@Setter
@NoArgsConstructor
@Entity
@DiscriminatorValue("RU")
public class RegisteredUser extends User {

	private static final long serialVersionUID = 1L;

	@OneToMany(mappedBy = "grader", cascade = CascadeType.ALL)
	private Set<Mark> marks;
	
	@OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
	private Set<Comment> comments;
	
	@ManyToMany(cascade=CascadeType.ALL)  
    @JoinTable(name="subscribed", joinColumns=@JoinColumn(name="user_id"), inverseJoinColumns=@JoinColumn(name="culturalOffer_id"))  
	private Set<CulturalOffer> subscribed;
	
	@Column
	private boolean verified;
	
	public RegisteredUser(Long id) {
		super(id);
	}

	public RegisteredUser(Long id, String username, String email, String password, String firstName, String lastName, Set<Mark> marks, Set<Comment> comments, Set<CulturalOffer> subscribed, boolean verified) {
		super(id, username, email, password, firstName, lastName);
		this.marks = marks;
		this.comments = comments;
		this.subscribed = subscribed;
		this.verified = verified;
	}

	public RegisteredUser(String username, String email, String password, String firstName, String lastName) {
		super(username, email, password, firstName, lastName);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		RegisteredUser other = (RegisteredUser) obj;
		if (comments == null) {
			if (other.comments != null)
				return false;
		} else if (!comments.equals(other.comments))
			return false;
		if (marks == null) {
			if (other.marks != null)
				return false;
		} else if (!marks.equals(other.marks))
			return false;
		if (subscribed == null) {
			if (other.subscribed != null)
				return false;
		} else if (!subscribed.equals(other.subscribed))
			return false;
		if (verified != other.verified)
			return false;
		return true;
	}

}
