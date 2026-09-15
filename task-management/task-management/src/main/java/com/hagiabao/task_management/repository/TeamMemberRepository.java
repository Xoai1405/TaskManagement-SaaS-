package com.hagiabao.task_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hagiabao.task_management.entity.TeamMember;
@Repository 
public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {
    
}
