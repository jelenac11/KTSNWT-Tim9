package com.ktsnwt.project.team9.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ktsnwt.project.team9.model.News;

public interface INewsRepository extends JpaRepository<News, Long> {

}
