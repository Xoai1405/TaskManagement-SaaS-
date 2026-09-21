package com.hagiabao.task_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hagiabao.task_management.entity.Team;
@Repository 
public interface  TeamRepository extends JpaRepository<Team, Long>{
    List<Team> findByWorkspaceId (Long workspaceId);
}
