package com.hagiabao.task_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hagiabao.task_management.dto.request.CreateTeamRequest;
import com.hagiabao.task_management.dto.response.TeamResponse;
import com.hagiabao.task_management.entity.Team;
import com.hagiabao.task_management.repository.TeamRepository;
import com.hagiabao.task_management.repository.WorkspaceRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor 
public class TeamService {
    private final TeamRepository teamRepo;
    private final WorkspaceRepository workspaceRepo;
    public List<TeamResponse> getAllTeam(Long workspaceId) {
        workspaceRepo.findById(workspaceId).orElseThrow(()-> new RuntimeException("Workspace không tồn tại!"));

        List<TeamResponse> res = new ArrayList<>();
        List<Team> temp = teamRepo.findByWorkspaceId(workspaceId);
        for(Team x: temp) {
            res.add(new TeamResponse(x.getId(),x.getName()));
        }   

        return res;
    }
    @Transactional 
    public TeamResponse CreateTeam( CreateTeamRequest request, Long workspaceId) {
        workspaceRepo.findById(workspaceId).orElseThrow(()-> new RuntimeException("Workspace không tồn tại!"));

       Team newTeam = new Team();
       newTeam.setName(request.name());
       newTeam.setWorkspaceId(workspaceId);
       newTeam = teamRepo.save(newTeam);

       return new TeamResponse(newTeam.getId(),newTeam.getName());


    }
}
