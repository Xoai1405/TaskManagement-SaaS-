package com.hagiabao.task_management.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table (name="tasks")
@Getter 
@Setter
@NoArgsConstructor 
@AllArgsConstructor 
public class Task {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String title;

    @ManyToOne
    @JoinColumn (nullable=false, name="team_id")
    private Team team;

    @ManyToOne 
    @JoinColumn (nullable=false,name="workspace_id")
    private Workspace workspace;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @Column (nullable=false)
    @Enumerated(EnumType.STRING)
    private Stage stage;

   @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column( nullable = false, updatable = false)
    private LocalDateTime deadline;

    @Column (nullable=false,name="priority_level")
    @Enumerated(EnumType.STRING)
    private Priority priorityLevel;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_task_id")
    private Task parentTask;


}

