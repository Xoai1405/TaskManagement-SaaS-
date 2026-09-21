package com.hagiabao.task_management.dto.response;

import java.time.LocalDateTime;

import com.hagiabao.task_management.entity.Stage;
import com.hagiabao.task_management.entity.Priority;


public record TaskResponse(
    Long taskId, 
    String title,
     Stage stage ,
     LocalDateTime createdAt,
     LocalDateTime deadline,
     Priority priorityLevel,
     LocalDateTime deletedAt,
     Long parentTaskId,
     Long createdBy


) {
    
}
