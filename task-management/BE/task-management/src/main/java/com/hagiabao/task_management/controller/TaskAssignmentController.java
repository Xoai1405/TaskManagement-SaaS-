package com.hagiabao.task_management.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hagiabao.task_management.dto.response.TaskAssigneeResponse;
import com.hagiabao.task_management.service.TaskAssignmentService;

import lombok.RequiredArgsConstructor;


@RestController 
@RequestMapping("/api/v1/tasks/{taskId}/assignees")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TaskAssignmentController {
    final private TaskAssignmentService taskAssignmentSer;
    @GetMapping()
    public ResponseEntity<List<TaskAssigneeResponse>> getAssignee(@PathVariable Long taskId) {

        List<TaskAssigneeResponse> res = taskAssignmentSer.getAssignee(taskId);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
    
}