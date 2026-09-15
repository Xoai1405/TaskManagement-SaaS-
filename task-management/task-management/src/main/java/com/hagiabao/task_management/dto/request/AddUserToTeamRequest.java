package com.hagiabao.task_management.dto.request;

import com.hagiabao.task_management.entity.Role;

import jakarta.validation.constraints.NotNull;

public record AddUserToTeamRequest(
    @NotNull
    Long userId,
    @NotNull
    Role role
) {
    
}
