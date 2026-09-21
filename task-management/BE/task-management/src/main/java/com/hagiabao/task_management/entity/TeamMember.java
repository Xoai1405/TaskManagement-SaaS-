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

@Entity 
@Table(name="team_members", uniqueConstraints=@UniqueConstraint (columnNames = {"user_id","team_id"}))
@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
public class TeamMember {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne (fetch=FetchType.LAZY)
    @JoinColumn(nullable=false, name="user_id")
    private User user;

    @JoinColumn(nullable=false,name="team_id")
    @ManyToOne (fetch=FetchType.LAZY)
    private Team team;

    @Column (nullable=false)
    @Enumerated (EnumType.STRING)
    Role role;
}
