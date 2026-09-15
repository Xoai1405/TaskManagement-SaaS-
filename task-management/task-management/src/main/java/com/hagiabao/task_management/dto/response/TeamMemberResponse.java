package com.hagiabao.task_management.dto.response;

import com.hagiabao.task_management.entity.Role;

import jakarta.validation.constraints.Email;
public record TeamMemberResponse(
    Long userId,
    @Email 
    String email,
    Role role
) {
    
}
