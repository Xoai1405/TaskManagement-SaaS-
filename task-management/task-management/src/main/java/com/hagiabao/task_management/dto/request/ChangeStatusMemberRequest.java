package com.hagiabao.task_management.dto.request;

import jakarta.validation.constraints.NotNull;
import com.hagiabao.task_management.entity.Status;
public record ChangeStatusMemberRequest (
    @NotNull 
    Status status
){
    
}
