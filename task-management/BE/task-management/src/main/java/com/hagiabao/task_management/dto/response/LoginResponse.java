package com.hagiabao.task_management.dto.response;

public record LoginResponse(
        String token,
        Long id,
        String fullName,
        String email
) {}