package com.hagiabao.task_management.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record  CreateTeamRequest (
    @NotBlank(message="Tên Team không để trống")
    @Size(max=50, message="Tên Team không được quá 50 kí tự!")
    String name
)
{}
