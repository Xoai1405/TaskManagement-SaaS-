package com.hagiabao.task_management.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hagiabao.task_management.dto.request.CreateTaskRequest;
import com.hagiabao.task_management.dto.request.UpdateTaskRequest;
import com.hagiabao.task_management.dto.request.UpdateTaskStageRequest;
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

@Transactional
public TaskResponse updateTaskInfo(Long teamId, Long taskId, UpdateTaskRequest request) {
    // 1. Kiểm tra Task có tồn tại trong Team và chưa bị xóa mềm không
    Task task = taskRepo.findById(taskId)
            .filter(t -> t.getTeam().getId().equals(teamId) && t.getDeletedAt() == null)
            .orElseThrow(() -> new RuntimeException("Task không tồn tại trong Team này!"));

    // 2. Cập nhật các trường thông tin nếu được truyền lên
    if (request.title() != null && !request.title().isBlank()) {
        task.setTitle(request.title());
    }
    if (request.priority() != null) {
        task.setPriorityLevel(request.priority());
    }
    if (request.deadline() != null) {
        task.setDeadline(request.deadline());
    }

    // 3. Cập nhật danh sách phân công công việc (nếu client có truyền assigneeIds)
    if (request.assigneeIds() != null) {
    // 1. Xóa phân công cũ
    taskAssignmentRepo.deleteByTaskId(taskId);
    
    // 2. Ép Hibernate đẩy lệnh DELETE xuống DB ngay lập tức
    taskAssignmentRepo.flush();

    // 3. Tạo và lưu phân công mới
    if (!request.assigneeIds().isEmpty()) {
        List<User> newAssignees = userRepo.findAllById(request.assigneeIds());
        List<TaskAssignment> newAssignments = newAssignees.stream()
                .map(user -> new TaskAssignment(null, user, task))
                .toList();
        taskAssignmentRepo.saveAll(newAssignments);
    }
}

    Task updatedTask = taskRepo.save(task);

    // 4. Trả về DTO
    return new TaskResponse(
        updatedTask.getId(),
        updatedTask.getTitle(),
        updatedTask.getStage(),
        updatedTask.getCreatedAt(),
        updatedTask.getDeadline(),
        updatedTask.getPriorityLevel(),
        updatedTask.getDeletedAt(),
        updatedTask.getParentTask() != null ? updatedTask.getParentTask().getId() : null,
        updatedTask.getCreatedBy().getId()
    );
    }

    @Transactional
    public TaskResponse updateTaskStage(Long teamId, Long taskId, UpdateTaskStageRequest request) {
        Task task = taskRepo.findById(taskId)
                .filter(t -> t.getTeam().getId().equals(teamId) && t.getDeletedAt() == null)
                .orElseThrow(() -> new RuntimeException("Task không tồn tại trong Team này!"));

        task.setStage(request.stage());
        Task updatedTask = taskRepo.save(task);

        return new TaskResponse(
            updatedTask.getId(),
            updatedTask.getTitle(),
            updatedTask.getStage(),
            updatedTask.getCreatedAt(),
            updatedTask.getDeadline(),
            updatedTask.getPriorityLevel(),
            updatedTask.getDeletedAt(),
            updatedTask.getParentTask() != null ? updatedTask.getParentTask().getId() : null,
            updatedTask.getCreatedBy().getId()
        );
    }

}
