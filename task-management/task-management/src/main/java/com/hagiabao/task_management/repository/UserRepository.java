package com.hagiabao.task_management.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hagiabao.task_management.entity.User;

@Repository 
public interface   UserRepository extends  JpaRepository<User, Long> {
    Optional<User> findfindByEmail(String email);
    boolean existsByEmail(String email);
}
