package com.hagiabao.task_management.dto.request;

import com.hagiabao.task_management.entity.Role;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record  AddUserToWorkspaceRequest (
    @NotBlank @Email 
    String email,
    @NotNull
    
    Role role
) {
    
}
