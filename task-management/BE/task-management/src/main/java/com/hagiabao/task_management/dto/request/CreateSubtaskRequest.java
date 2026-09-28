package com.hagiabao.task_management.dto.request;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.validation.constraints.NotBlank;

public record CreateSubtaskRequest(
    @NotBlank(message = "Tên subtask không được để trống")
     String title,

    
     String description,
    
    LocalDateTime deadline,

    List<Long> assigneeIds
) {
    
}
