package com.hagiabao.task_management.dto.response;

public record UserRegisterResponse(
    Long id,
    String fullName,
    String email
) {
    
}
