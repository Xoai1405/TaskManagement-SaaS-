package com.hagiabao.task_management.dto.request;

import jakarta.validation.constraints.NotNull;

public record UpdateSubtaskStatusRequest(
    @NotNull(message = "Trạng thái completed không được để trống")
    Boolean isCompleted
) {}