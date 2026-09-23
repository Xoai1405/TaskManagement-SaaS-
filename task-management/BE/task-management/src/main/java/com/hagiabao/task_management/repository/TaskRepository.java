package com.hagiabao.task_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hagiabao.task_management.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByTeamIdAndDeletedAtIsNull(Long teamId);
    List<Task> findByParentTaskIdAndDeletedAtIsNull(Long parentTaskId);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.dueDate < CURRENT_TIMESTAMP AND t.stage != 'COMPLETED'")
    long countOverdueTasks();
}
