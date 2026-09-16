package com.hagiabao.task_management.service;

import org.springframework.stereotype.Service;

import com.hagiabao.task_management.dto.request.AddUserToTeamRequest;
import com.hagiabao.task_management.dto.request.ChangeRoleMemberRequest;
import com.hagiabao.task_management.dto.response.TeamMemberResponse;
import com.hagiabao.task_management.dto.response.UserResponse;
import com.hagiabao.task_management.entity.Team;
import com.hagiabao.task_management.entity.TeamMember;
import com.hagiabao.task_management.entity.User;
import com.hagiabao.task_management.repository.TeamMemberRepository;
import com.hagiabao.task_management.repository.TeamRepository;
import com.hagiabao.task_management.repository.UserRepository;
import com.hagiabao.task_management.repository.WorkspaceRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class TeamMemberService {
    private final UserRepository userRepo;
    private final TeamRepository teamRepo;
    private final TeamMemberRepository teamMemberRepo;
    private final WorkspaceRepository workspaceRepo;

    @Transactional
    public UserResponse AddUserToTeam(AddUserToTeamRequest request, Long workspaceId, Long teamId){
         workspaceRepo.findById(workspaceId).orElseThrow(()->new RuntimeException("Workspace không tồn tại!"));
        Team team =teamRepo.findById(teamId).orElseThrow(()->new RuntimeException("Team không tồn tại!"));
        User user = userRepo.findById(request.userId()).orElseThrow();

        TeamMember teamMember = new TeamMember();
        teamMember.setTeam(team);
        teamMember.setUser(user);
        teamMember.setRole(request.role());
        teamMember=teamMemberRepo.save(teamMember);

        return new UserResponse(teamMember.getUser().getId(),teamMember.getUser().getEmail(),teamMember.getRole());
            
        }

    @Transactional 
    public TeamMemberResponse ChangeRoleMember(ChangeRoleMemberRequest request, Long teamId, Long workspaceId, Long userId) {
        workspaceRepo.findById(workspaceId).orElseThrow(()->new RuntimeException("Workspace không tồn tại!"));
        userRepo.findById(userId).orElseThrow(()->new RuntimeException("User không tồn tại!"));
        teamRepo.findById(teamId).orElseThrow(()-> new RuntimeException("Team không tồn tại!"));


        TeamMember teamMember = teamMemberRepo.findByUserIdAndTeamId(userId, teamId).orElseThrow(()-> new RuntimeException("Member này không tồn tại trong team!"));

        teamMember.setRole(request.role());

        teamMemberRepo.save(teamMember);

        return new TeamMemberResponse(userId, teamId, request.role());
    }
}
