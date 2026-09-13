package com.hagiabao.task_management.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hagiabao.task_management.dto.request.CreateWorkspaceRequest;
import com.hagiabao.task_management.dto.response.WorkspaceResponse;
import com.hagiabao.task_management.service.WorkspaceService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController 
@RequestMapping ("api/v1/workspaces")
@RequiredArgsConstructor 
public class WorkspaceController {
    private final WorkspaceService workspaceService;

    @PostMapping
   public ResponseEntity<WorkspaceResponse> createWorkspace(@Valid @RequestBody CreateWorkspaceRequest request, @RequestParam Long userId) 
    {
        WorkspaceResponse response = workspaceService.createWorkspace(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
}
