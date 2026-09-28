package com.hagiabao.task_management.dto.response;

import com.hagiabao.task_management.entity.Role;

public record UserInTeamResponse(
    Long id,
    String fullName, 
    String email,
    Role role
) {
    
}
