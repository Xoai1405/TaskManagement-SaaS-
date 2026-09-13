package com.hagiabao.task_management.dto.response;

import com.hagiabao.task_management.entity.Role;


public record  UserResponse(
    Long id, 
    String email,
    Role role
) {
    
}
