package com.hagiabao.task_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hagiabao.task_management.dto.response.TaskAssigneeResponse;
import com.hagiabao.task_management.entity.TaskAssignment;
import com.hagiabao.task_management.entity.User;
import com.hagiabao.task_management.repository.TaskAssignmentRepository;
import com.hagiabao.task_management.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class TaskAssignmentService {
    final private TaskRepository taskRepo;
    final private TaskAssignmentRepository taskAssignmentRepo;
    
    
    public List<TaskAssigneeResponse> getAssignee(Long taskId){
        taskRepo.findById(taskId).orElseThrow(()->new RuntimeException("Task không tồn tại!"));

        List<TaskAssignment> listTask = taskAssignmentRepo.findByTask_Id(taskId);
        List<TaskAssigneeResponse> res = new ArrayList<>();
        for(TaskAssignment x: listTask)
        {
            User assignee = x.getUser();
            res.add (new TaskAssigneeResponse(assignee.getId(),assignee.getFullName(),assignee.getEmail()));
        }
        return res;
    }
}
