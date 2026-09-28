package com.hagiabao.task_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hagiabao.task_management.entity.Workspace;

@Repository 
public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {
}