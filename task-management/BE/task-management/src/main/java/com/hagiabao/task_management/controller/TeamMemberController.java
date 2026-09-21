package com.hagiabao.task_management.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hagiabao.task_management.dto.request.AddUserToTeamRequest;
import com.hagiabao.task_management.dto.request.ChangeRoleMemberRequest;
import com.hagiabao.task_management.dto.response.TeamMemberResponse;
import com.hagiabao.task_management.dto.response.UserResponse;
import com.hagiabao.task_management.service.TeamMemberService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;



@RestController 
@RequestMapping ("/api/v1/workspaces/{workspaceId}/teams/{teamId}/members")
@RequiredArgsConstructor
public class TeamMemberController {
    private final TeamMemberService teamMemberSer; 


    @PostMapping()
    public ResponseEntity<UserResponse> AddUserToTeam(@RequestBody @Valid AddUserToTeamRequest request, @PathVariable Long workspaceId,@PathVariable  Long teamId) {

        return ResponseEntity.status(HttpStatus.CREATED).body( teamMemberSer.AddUserToTeam(request, workspaceId, teamId) );
    }
   
    @PatchMapping("/{userId}")
    public ResponseEntity<TeamMemberResponse> ChangeRoleMember(@RequestBody ChangeRoleMemberRequest request,@PathVariable Long teamId, @PathVariable Long workspaceId, @PathVariable Long userId)
    {
        return ResponseEntity.status(HttpStatus.OK).body(teamMemberSer.ChangeRoleMember(request, teamId, workspaceId, userId));
    }
    
    

}
