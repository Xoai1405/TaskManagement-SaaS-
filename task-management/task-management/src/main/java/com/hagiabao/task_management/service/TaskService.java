package com.hagiabao.task_management.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hagiabao.task_management.dto.request.CreateTaskRequest;
import com.hagiabao.task_management.dto.response.TaskResponse;
import com.hagiabao.task_management.entity.Stage;
import com.hagiabao.task_management.entity.Task;
import com.hagiabao.task_management.entity.TaskAssignment;
import com.hagiabao.task_management.entity.Team;
import com.hagiabao.task_management.entity.User;
import com.hagiabao.task_management.repository.TaskAssignmentRepository;
import com.hagiabao.task_management.repository.TaskRepository;
import com.hagiabao.task_management.repository.TeamRepository;
import com.hagiabao.task_management.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class TaskService {
    private final TaskRepository taskRepo;
    private final TeamRepository teamRepo;
    private final UserRepository userRepo;
    private final TaskAssignmentRepository taskAssignmentRepo;

    public List<TaskResponse>getAllTaskInTeam(Long teamId){
        teamRepo.findById(teamId).orElseThrow(()->new RuntimeException("Team không tồn tại!"));

        List<Task> taskList = taskRepo.findByTeamIdAndDeletedAtIsNull(teamId);
        List<TaskResponse> res = new ArrayList<>();

        for(Task x: taskList) {
            res.add(new TaskResponse(x.getId(),
            x.getTitle(),
            x.getStage(),
            x.getCreatedAt(),
            x.getDeadline(),
            x.getPriorityLevel(),
            x.getDeletedAt(),
            x.getParentTask() != null ? x.getParentTask().getId() : null,
            x.getCreatedBy().getId()));
        }

        return res;
    }

    @Transactional
public TaskResponse createTask(Long teamId, CreateTaskRequest request) {
    Team team = teamRepo.findById(teamId)
            .orElseThrow(() -> new RuntimeException("Team không tồn tại!"));

    User creator = userRepo.findById(request.createdBy())
            .orElseThrow(() -> new RuntimeException("User tạo task không tồn tại!"));

    // 1. Khởi tạo và lưu Task
    Task task = new Task();
    task.setTitle(request.title());
    task.setTeam(team);
    task.setWorkspace(team.getWorkspace());
    task.setCreatedBy(creator);
    task.setStage(Stage.TODO);
    task.setPriorityLevel(request.priority());
    task.setDeadline(request.deadline());
    task.setCreatedAt(LocalDateTime.now());

    Task savedTask = taskRepo.save(task);

    // 2. Lưu thông tin phân công công việc (TaskAssignment)
    if (request.assigneeIds() != null && !request.assigneeIds().isEmpty()) {
        List<User> assignees = userRepo.findAllById(request.assigneeIds());
        
        List<TaskAssignment> assignments = assignees.stream().map(user -> {
            TaskAssignment assignment = new TaskAssignment();
            assignment.setTask(savedTask);
            assignment.setUser(user);
            return assignment;
        }).toList();

        taskAssignmentRepo.saveAll(assignments);
    }

    // 3. Trả về Response
    return new TaskResponse(
        savedTask.getId(),
        savedTask.getTitle(),
        savedTask.getStage(),
        savedTask.getCreatedAt(),
        savedTask.getDeadline(),
        savedTask.getPriorityLevel(),
        savedTask.getDeletedAt(),
        null,
        savedTask.getCreatedBy().getId()
    );
}

}
