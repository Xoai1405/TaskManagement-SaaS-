package com.hagiabao.task_management.dto.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
public record  CreateWorkspaceRequest (
    @NotBlank(message = "Tên Workspace không được để trống")
    @Size(max = 50, message = "Tên Workspace không được vượt quá 50 ký tự")
    String name
){}
    

