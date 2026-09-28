package com.hagiabao.task_management.dto.response;

public record SubtaskResponse(
    Long subtaskId,
    String title,
    String description,
    Boolean isCompleted
) {}