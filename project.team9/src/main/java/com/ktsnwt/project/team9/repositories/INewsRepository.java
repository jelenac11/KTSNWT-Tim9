package com.ktsnwt.project.team9.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ktsnwt.project.team9.model.News;

@Repository
public interface INewsRepository extends JpaRepository<News, Long> {

}
