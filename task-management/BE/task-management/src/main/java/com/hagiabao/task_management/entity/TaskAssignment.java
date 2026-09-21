package com.hagiabao.task_management.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table (name="task_assignments", uniqueConstraints=@UniqueConstraint (columnNames = {"user_id","task_id"}))
@NoArgsConstructor 
@AllArgsConstructor 
@Setter 
@Getter 
public class TaskAssignment {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn (name="user_id", nullable=false)
    private User user;

    @ManyToOne 
    @JoinColumn (name="task_id",nullable=false)
    private Task task;
}
