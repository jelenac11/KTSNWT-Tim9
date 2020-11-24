package com.ktsnwt.project.team9.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ktsnwt.project.team9.model.Text;

public interface ITextRepository extends JpaRepository<Text, Long> {

}
