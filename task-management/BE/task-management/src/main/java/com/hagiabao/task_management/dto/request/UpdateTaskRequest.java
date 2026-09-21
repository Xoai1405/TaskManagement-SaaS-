package com.hagiabao.task_management.dto.request;

import java.time.LocalDateTime;
import java.util.List;

import com.hagiabao.task_management.entity.Priority;

public record UpdateTaskRequest(
    String title,
    Priority priority,
    LocalDateTime deadline,
    List<Long> assigneeIds
) {}