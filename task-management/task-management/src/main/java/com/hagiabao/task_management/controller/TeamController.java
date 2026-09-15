package com.hagiabao.task_management.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hagiabao.task_management.dto.request.CreateTeamRequest;
import com.hagiabao.task_management.dto.response.TeamResponse;
import com.hagiabao.task_management.service.TeamService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;



@RestController 
@RequestMapping ("/api/v1/workspaces/{workspaceId}/teams")
@RequiredArgsConstructor 
public class TeamController {
    private final TeamService teamService;

    @GetMapping()
    public ResponseEntity<List<TeamResponse>> getAllTeam(@PathVariable Long workspaceId) {
        List<TeamResponse> res = teamService.getAllTeam(workspaceId);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping()
    public ResponseEntity<TeamResponse> CreateTeam(@Valid @RequestBody  CreateTeamRequest request, @PathVariable Long workspaceId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(teamService.CreateTeam(request, workspaceId));
    }
    
    
}
