package com.hagiabao.task_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hagiabao.task_management.entity.TaskAssignment;

@Repository
public interface TaskAssignmentRepository extends JpaRepository<TaskAssignment, Long> {

    @Modifying
    @Query("DELETE FROM TaskAssignment ta WHERE ta.task.id = :taskId")
    void deleteByTaskId(@Param("taskId") Long taskId);

    List<TaskAssignment> findByTask_Id(Long taskId);
    boolean existsByTaskIdAndUserId(Long taskId, Long currentUserId);
    
}