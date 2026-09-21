package com.hagiabao.task_management.service;

import org.springframework.stereotype.Service;

import com.hagiabao.task_management.dto.request.AddUserToWorkspaceRequest;
import com.hagiabao.task_management.dto.request.ChangeStatusMemberRequest;
import com.hagiabao.task_management.dto.response.UserResponse;
import com.hagiabao.task_management.dto.response.WorkspaceMemberResponse;
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
public class WorkspaceMemberService {
    private final UserRepository userRepo;
    private final WorkspaceMemberRepository workspaceMemberRepo;
    private final WorkspaceRepository workspaceRepo;
    
    @Transactional 
    public UserResponse AddUserToWorkspace(AddUserToWorkspaceRequest request, Long workspaceId) {
       
        User user = userRepo.findByEmail(request.email()).orElseThrow(() -> new RuntimeException("User không tồn tại!"));
        
       WorkspaceMember wsm=new WorkspaceMember();
       Workspace workspace = workspaceRepo.findById(workspaceId)
        .orElseThrow(() -> new RuntimeException("Workspace không tồn tại!"));
       wsm.setWorkspace(workspace);
       wsm.setUser(user);
       wsm.setRole(request.role());
       wsm.setStatus(Status.INVITE);
       workspaceMemberRepo.save(wsm);

        return new UserResponse(user.getId(),request.email(),request.role());
    }
    @Transactional
    public WorkspaceMemberResponse ChangeStatusMember(ChangeStatusMemberRequest request, Long workspaceId, Long userId){
        WorkspaceMember wsm = workspaceMemberRepo.findByUserIdAndWorkspaceId(userId, workspaceId).orElseThrow(()-> new RuntimeException("Workspace không tồn tại!"));
        
        wsm.setStatus(request.status());
        workspaceMemberRepo.save(wsm);
        return new WorkspaceMemberResponse(userId, workspaceId, request.status());
    }
}
