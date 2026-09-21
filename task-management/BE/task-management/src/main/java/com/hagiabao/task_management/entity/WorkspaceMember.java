package com.hagiabao.task_management.entity;

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
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@AllArgsConstructor 
@NoArgsConstructor 
@Entity 
@Table (name="workspace_members", 
    uniqueConstraints={
        @UniqueConstraint (columnNames={"user_id","workspace_id"})
    }
)
public class WorkspaceMember {
    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne (fetch=FetchType.LAZY) 
    @JoinColumn (name="workspace_id", nullable=false)
    private Workspace workspace;

    @ManyToOne (fetch=FetchType.LAZY)
    @JoinColumn (name="user_id", nullable=false)
    private User user;

    @Column (nullable=false)
    @Enumerated (EnumType.STRING)
    private Role role;
    
    @Column (nullable=false)
    @Enumerated (EnumType.STRING)
    private Status status;
}
