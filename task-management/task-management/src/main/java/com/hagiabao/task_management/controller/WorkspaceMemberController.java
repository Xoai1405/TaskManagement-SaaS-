package com.hagiabao.task_management.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hagiabao.task_management.dto.request.AddUserToWorkspaceRequest;
import com.hagiabao.task_management.dto.request.ChangeStatusMemberRequest;
import com.hagiabao.task_management.dto.response.UserResponse;
import com.hagiabao.task_management.dto.response.WorkspaceMemberResponse;
import com.hagiabao.task_management.repository.UserRepository;
import com.hagiabao.task_management.service.WorkspaceMemberService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping ("/api/v1/workspaces")
@RequiredArgsConstructor 
public class WorkspaceMemberController {
    private final UserRepository userRepository;
private final WorkspaceMemberService workspaceMemberService;

    @PostMapping("/{workspaceId}/members")
    public ResponseEntity<UserResponse> AddUserToWorkspace(@Valid @RequestBody AddUserToWorkspaceRequest user, @PathVariable Long workspaceId) {
        if(!userRepository.existsByEmail(user.email()))
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        UserResponse res = workspaceMemberService.AddUserToWorkspace(user, workspaceId);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PatchMapping ("/{workspaceId}/members/{userId}/status") 
    public ResponseEntity<WorkspaceMemberResponse> changeStatusMember(@Valid @RequestBody ChangeStatusMemberRequest request ,@PathVariable Long workspaceId, @PathVariable Long userId)
    {
        WorkspaceMemberResponse res = workspaceMemberService.ChangeStatusMember(request, workspaceId, userId);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
    
}
