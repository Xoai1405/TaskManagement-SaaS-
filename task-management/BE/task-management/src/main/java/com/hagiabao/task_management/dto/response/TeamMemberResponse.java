package com.hagiabao.task_management.dto.response;

import com.hagiabao.task_management.entity.Role;

public record TeamMemberResponse(
    Long userId,
    Long teamId,
    Role role
) {
    
}
