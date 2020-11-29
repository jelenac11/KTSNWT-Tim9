package com.ktsnwt.project.team9.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Image {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Long id;
	
	@Column(unique = false, nullable = false)
	private String url;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = true)
	private News news;
	
	public Image() {
		
	}
	
	public Image(Long id) {
		this.id = id;
	}
	
	public Image(String url) {
		this.url = url;
	}
	
	public Image(String url, News news) {
		this.url = url;
		this.news = news;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public News getNews() {
		return news;
	}

	public void setNews(News news) {
		this.news = news;
	}

}