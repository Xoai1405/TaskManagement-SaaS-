package com.hagiabao.task_management.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hagiabao.task_management.dto.request.CreateTaskRequest;
import com.hagiabao.task_management.dto.request.UpdateTaskRequest;
import com.hagiabao.task_management.dto.request.UpdateTaskStageRequest;
import com.hagiabao.task_management.dto.response.TaskResponse;
import com.hagiabao.task_management.service.TaskService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController 
@RequestMapping ("/api/v1/teams/{teamId}/tasks")
@RequiredArgsConstructor 
public class TaskController {
    private final TaskService taskSer;

    @GetMapping()
    public ResponseEntity<List<TaskResponse>> getAllTaskInTeam(@PathVariable Long teamId) {
        return ResponseEntity.status(HttpStatus.OK).body(taskSer.getAllTaskInTeam(teamId));
    }
    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
        @PathVariable Long teamId,
        @Valid @RequestBody CreateTaskRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(taskSer.createTask(teamId, request));
    }
    
    @PatchMapping("/{taskId}")
    public ResponseEntity<TaskResponse> updateTaskInfo(
        @PathVariable Long teamId,
        @PathVariable Long taskId,
        @RequestBody UpdateTaskRequest request) {
        return ResponseEntity.ok(taskSer.updateTaskInfo(teamId, taskId, request));
    }

    @PatchMapping("/{taskId}/stage")
    public ResponseEntity<TaskResponse> updateTaskStage(
        @PathVariable Long teamId,
        @PathVariable Long taskId,
        @Valid @RequestBody UpdateTaskStageRequest request) {
        return ResponseEntity.ok(taskSer.updateTaskStage(teamId, taskId, request));
    }
    
}
