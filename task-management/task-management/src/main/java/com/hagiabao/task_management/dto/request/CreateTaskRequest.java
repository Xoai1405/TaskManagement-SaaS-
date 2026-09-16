package com.hagiabao.task_management.dto.request;

import java.time.LocalDateTime;
import java.util.List;

import com.hagiabao.task_management.entity.Priority;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateTaskRequest(
    @NotBlank(message = "Tiêu đề không được để trống") 
    String title,
    
    @NotNull(message = "Người tạo task không được để trống") 
    Long createdBy,
    
    @NotNull(message = "Độ ưu tiên không được để trống") 
    Priority priority,
    
    LocalDateTime deadline,
    
    List<Long> assigneeIds
) {}