package com.hagiabao.task_management.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hagiabao.task_management.dto.request.CreateWorkspaceRequest;
import com.hagiabao.task_management.dto.response.WorkspaceResponse;
import com.hagiabao.task_management.repository.UserRepository;
import com.hagiabao.task_management.service.WorkspaceService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.hagiabao.task_management.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController 
@RequestMapping ("/api/v1/workspaces")
@RequiredArgsConstructor 
@CrossOrigin(origins = "*")
public class WorkspaceController {
    private final WorkspaceService workspaceService;
     private final UserRepository userRepo; 

    @GetMapping()
    public ResponseEntity<List<WorkspaceResponse>> getAllWorkspace(Authentication authentication) {
        Long userId = getCurrentUserId(authentication);
        List<WorkspaceResponse> response = workspaceService.getAllWorkspaceResponse(userId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @PostMapping
   public ResponseEntity<WorkspaceResponse> createWorkspace(@Valid @RequestBody CreateWorkspaceRequest request, Authentication authentication) 
    {
        Long userId = getCurrentUserId(authentication);
        WorkspaceResponse response = workspaceService.createWorkspace(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    private Long getCurrentUserId(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User không tồn tại!"));
        return user.getId();
    }

    
    
    
}
