package com.ktsnwt.project.team9.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ktsnwt.project.team9.model.Admin;

@Repository
public interface IAdminRepository extends JpaRepository<Admin, Long> {

}
