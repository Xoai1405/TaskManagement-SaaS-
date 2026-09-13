package com.hagiabao.task_management.service;

import org.springframework.stereotype.Service;

import com.hagiabao.task_management.dto.request.CreateWorkspaceRequest;
import com.hagiabao.task_management.dto.response.WorkspaceResponse;
import com.hagiabao.task_management.entity.Role;
import com.hagiabao.task_management.entity.Status;
import com.hagiabao.task_management.entity.User;
import com.hagiabao.task_management.entity.Workspace;
import com.hagiabao.task_management.entity.WorkspaceMember;
import com.hagiabao.task_management.repository.UserRepository;
import com.hagiabao.task_management.repository.WorkspaceMemberRepository;
import com.hagiabao.task_management.repository.WorkspaceRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor
public class WorkspaceService {
    private final WorkspaceRepository workspaceRepository;
    private final UserRepository userRepository;
    private final WorkspaceMemberRepository workspaceMemberRepository;

@Transactional
    public WorkspaceResponse createWorkspace(CreateWorkspaceRequest request, Long userId) {


        Workspace ws=new Workspace();
        ws.setName(request.name());

        //luu ws vao database
        Workspace savedWs= workspaceRepository.save(ws);

        //set user la admin
        WorkspaceMember wsm=new WorkspaceMember(); 
       User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User không tồn tại!"));
        wsm.setWorkspace(ws);
        wsm.setUser(user);
        
        wsm.setRole(Role.ADMIN);
        wsm.setStatus(Status.ACTIVE);

        workspaceMemberRepository.save(wsm);

        return new WorkspaceResponse(savedWs.getId(),savedWs.getName());
    }
}