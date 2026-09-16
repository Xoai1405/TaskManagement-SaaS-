package com.hagiabao.task_management.dto.request;

import com.hagiabao.task_management.entity.Role;

public record  ChangeRoleMemberRequest (
    Role role
) {
    
}
