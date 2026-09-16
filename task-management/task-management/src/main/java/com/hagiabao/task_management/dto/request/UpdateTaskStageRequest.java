package com.hagiabao.task_management.dto.request;

import com.hagiabao.task_management.entity.Stage;

import jakarta.validation.constraints.NotNull;

public record UpdateTaskStageRequest(
    @NotNull(message = "Trạng thái stage không được để trống")
    Stage stage
) {}