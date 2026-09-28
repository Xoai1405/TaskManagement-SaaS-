package com.hagiabao.task_management.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hagiabao.task_management.dto.request.CreateSubtaskRequest;
import com.hagiabao.task_management.dto.request.CreateTaskRequest;
import com.hagiabao.task_management.dto.request.UpdateSubtaskStatusRequest;
import com.hagiabao.task_management.dto.request.UpdateTaskRequest;
import com.hagiabao.task_management.dto.request.UpdateTaskStageRequest;
import com.hagiabao.task_management.dto.response.SubtaskResponse;
import com.hagiabao.task_management.dto.response.TaskResponse;
import com.hagiabao.task_management.entity.Role;
import com.hagiabao.task_management.entity.Stage;
import com.hagiabao.task_management.entity.Task;
import com.hagiabao.task_management.entity.TaskAssignment;
import com.hagiabao.task_management.entity.Team;
import com.hagiabao.task_management.entity.User;
import com.hagiabao.task_management.repository.TaskAssignmentRepository;
import com.hagiabao.task_management.repository.TaskRepository;
import com.hagiabao.task_management.repository.TeamMemberRepository;
import com.hagiabao.task_management.repository.TeamRepository;
import com.hagiabao.task_management.repository.UserRepository;
import com.hagiabao.task_management.repository.WorkspaceMemberRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class TaskService {
    private final TaskRepository taskRepo;
    private final TeamRepository teamRepo;
    private final TeamMemberRepository teamMemberRepo;
    private final UserRepository userRepo;
    private final TaskAssignmentRepository taskAssignmentRepo;
    private final WorkspaceMemberRepository wspMemberRepo;

    public List<TaskResponse>getAllTaskInTeam(Long teamId){
        teamRepo.findById(teamId).orElseThrow(()->new RuntimeException("Team không tồn tại!"));

        List<Task> taskList = taskRepo.findByTeamIdAndDeletedAtIsNull(teamId);
        List<TaskResponse> res = new ArrayList<>();

        for(Task x: taskList) {
            res.add(new TaskResponse(x.getId(),
            x.getTitle(),
            x.getDescription(),
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
    if (request.parentTaskId() != null) {
        Task parentTask = taskRepo.findById(request.parentTaskId())
            .orElseThrow(() -> new RuntimeException("Task cha không tồn tại!"));
        task.setParentTask(parentTask);
    }

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
        savedTask.getDescription(),
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
        updatedTask.getDescription(),
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
            updatedTask.getDescription(),
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
    public void softDeleteTask(Long teamId, Long taskId) {
        Task task = taskRepo.findById(taskId)
                .filter(t -> t.getTeam().getId().equals(teamId) && t.getDeletedAt() == null)
                .orElseThrow(() -> new RuntimeException("Task không tồn tại hoặc đã bị xóa!"));

        task.setDeletedAt(LocalDateTime.now());
        taskRepo.save(task);
    }

    //Lấy danh sách Subtask của Task
    @Transactional(readOnly = true)
    public List<SubtaskResponse> getSubtasks(Long teamId, Long taskId) {
        // Kiểm tra task cha có tồn tại không
        taskRepo.findById(taskId)
                .filter(t -> t.getTeam().getId().equals(teamId) && t.getDeletedAt() == null)
                .orElseThrow(() -> new RuntimeException("Task cha không tồn tại!"));

        return taskRepo.findByParentTaskIdAndDeletedAtIsNull(taskId).stream()
                .map(sub -> new SubtaskResponse(
                        sub.getId(),
                        sub.getTitle(),
                        sub.getDescription(),
                        sub.getStage() == Stage.COMPLETED
                ))
                .toList();
    }

    //Tạo subtask cho 1 task
    public boolean checkUserPermission(Long worspaceId, Long currentUserId, Long teamId, Long taskId)
    {
        boolean isWorkspaceAdmin=wspMemberRepo.existsByWorkspaceIdAndUserIdAndRole(worspaceId, currentUserId, Role.ADMIN);
        if (isWorkspaceAdmin) return true;

        boolean isTeamLeader =teamMemberRepo
        .existsByTeamIdAndUserIdAndRole(teamId, currentUserId, Role.LEADER);
        if (isTeamLeader) return true;
        
         return taskAssignmentRepo.existsByTaskIdAndUserId(taskId, currentUserId);
    }

    @Transactional 
    public SubtaskResponse createSubtask(CreateSubtaskRequest request,Long teamId, Long taskId, Long currentUserId){
            Task parentTask = taskRepo.findByIdAndTeamIdAndDeletedAtIsNull(taskId, teamId)
        .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy task cha"));

        Team team = teamRepo.findById(teamId).orElseThrow(()->new EntityNotFoundException("Team không tồn tai!"));
        boolean hasPermission = checkUserPermission(team.getWorkspace().getId(), currentUserId, teamId, taskId);
        if (!hasPermission) throw new AccessDeniedException("Bạn không có quyền tạo subtask");
       User currentUser = userRepo.findById(currentUserId).orElseThrow(()-> new RuntimeException("User không tồn tại!"));
        Task subtask = new Task();
        subtask.setTitle(request.title());
        subtask.setParentTask(parentTask);
        subtask.setTeam(parentTask.getTeam());
        subtask.setWorkspace(parentTask.getWorkspace());
        subtask.setStage(Stage.TODO);
        subtask.setCreatedBy(currentUser);

        Task savedSubtask = taskRepo.save(subtask);

        return new SubtaskResponse(
        savedSubtask.getId(),
        savedSubtask.getTitle(),
        savedSubtask.getDescription(),
        savedSubtask.getStage() == Stage.COMPLETED
        
            );
    }

    // Cập nhật trạng thái hoàn thành Subtask (Tick/Untick)
    @Transactional
    public SubtaskResponse updateSubtaskStatus(Long teamId, Long taskId, Long subtaskId, UpdateSubtaskStatusRequest request) {
        Task subtask = taskRepo.findById(subtaskId)
                .filter(t -> t.getParentTask() != null 
                        && t.getParentTask().getId().equals(taskId) 
                        && t.getTeam().getId().equals(teamId) 
                        && t.getDeletedAt() == null)
                .orElseThrow(() -> new RuntimeException("Subtask không tồn tại trong Task này!"));

        subtask.setStage(Boolean.TRUE.equals(request.isCompleted()) ? Stage.COMPLETED : Stage.TODO);
        Task savedSubtask = taskRepo.save(subtask);

        return new SubtaskResponse(
                savedSubtask.getId(),
                savedSubtask.getTitle(),
                savedSubtask.getDescription(),
                savedSubtask.getStage() == Stage.COMPLETED
        );
    }

    //Xóa Subtask (Soft delete)
    @Transactional
    public void deleteSubtask(Long teamId, Long taskId, Long subtaskId) {
        Task subtask = taskRepo.findById(subtaskId)
                .filter(t -> t.getParentTask() != null 
                        && t.getParentTask().getId().equals(taskId) 
                        && t.getTeam().getId().equals(teamId) 
                        && t.getDeletedAt() == null)
                .orElseThrow(() -> new RuntimeException("Subtask không tồn tại!"));

        subtask.setDeletedAt(LocalDateTime.now());
        taskRepo.save(subtask);
    }

}
