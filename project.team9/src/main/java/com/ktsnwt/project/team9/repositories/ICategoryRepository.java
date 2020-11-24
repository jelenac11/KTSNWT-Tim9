package com.ktsnwt.project.team9.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ktsnwt.project.team9.model.Category;

public interface ICategoryRepository extends JpaRepository<Category, Long> {

}
