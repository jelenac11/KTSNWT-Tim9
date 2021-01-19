package com.ktsnwt.project.team9.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ktsnwt.project.team9.model.News;

@Repository
public interface INewsRepository extends JpaRepository<News, Long> {

	@Query("SELECT n FROM News n JOIN n.culturalOffer co "
			+ " JOIN co.subscribedUsers us WHERE us.id = ?1")
	Page<News> findSubscribedNews(Long userID, Pageable pageable);
	
	@Query("SELECT n FROM News n JOIN n.culturalOffer co JOIN co.category c"
			+ " JOIN co.subscribedUsers us WHERE us.id = ?1 and c.id = ?2")
	Page<News> findSubscribedNews(Long userID, Long categoryID, Pageable pageable);

	Page<News> findByCulturalOfferId(Long id, Pageable pageable);

}
