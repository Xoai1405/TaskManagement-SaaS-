package com.hagiabao.task_management.dto.response;

import java.time.LocalDateTime;

import com.hagiabao.task_management.entity.Priority;
import com.hagiabao.task_management.entity.Stage;


public record TaskResponse(
    Long taskId, 
    String title,
    String description,
     Stage stage ,
     LocalDateTime createdAt,
     LocalDateTime deadline,
     Priority priorityLevel,
     LocalDateTime deletedAt,
     Long parentTaskId,
     Long createdBy


) {
    
}
