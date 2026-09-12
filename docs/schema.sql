DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS workspaces CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS workspace_members CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS task_assignments CASCADE;
DROP TABLE IF EXISTS assets CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS user_notifications CASCADE;

create table users (
	id BIGSERIAL primary key,
	email varchar(255) UNIQUE not null,
	password varchar(255) not null,
	address varchar(255),
	name varchar(255) not null
);

create table workspaces(
	id BIGSERIAL primary key,
	name varchar(255) not null
);

create table teams(
	id BIGSERIAL primary key,
	name varchar(255) not null,
	workspace_id BIGINT not null,

	constraint fk_team_workspace foreign key (workspace_id) references workspaces(id) on delete cascade
);

create table team_members (
	user_id BIGINT not null,
	team_id BIGINT not null,
	role varchar (20) default 'Member' check (role in ('Member','Leader')),
	primary key(user_id,team_id),
	constraint fk_teamMember_user foreign key (user_id) references users(id) on delete cascade,
	constraint fk_teamMember_team foreign key (team_id) references teams(id) on delete cascade
);

create table workspace_members(
	workspace_id BIGINT not null,
	user_id BIGINT not null,
	role varchar(20) check (role in ('Manager','Member')),
	
	primary key(workspace_id, user_id),
	constraint fk_workSpaceMember_workspace foreign key(workspace_id) references workspaces(id) on delete cascade,
	constraint fk_workSpaceMember_user foreign key(user_id) references users(id) on delete cascade
);

create table tasks(
	id BIGSERIAL primary key,
	title varchar(255) not null,
	stage varchar(20) default 'TODO' check (stage in ('TODO','IN PROGRESS','COMPLETED')),
	start_date timestamp default current_timestamp,
	deadline timestamp,
	priority_level varchar(20) default 'MEDIUM' check(priority_level in('HIGH','MEDIUM','LOW')),
	deleted_at timestamp ,
	team_id BIGINT ,
	workspace_id BIGINT not null,
	created_by BIGINT not null,
	parent_task_id BIGINT,

	constraint fk_task_team foreign key (team_id) references teams(id) on delete cascade,
	constraint fk_task_workspace foreign key (workspace_id) references workspaces(id) on delete cascade,
	constraint fk_task_userCreate foreign key (created_by) references users(id) on delete cascade,
	constraint fk_task_parentTask foreign key (parent_task_id) references tasks(id) on delete cascade
);

create table task_assignments (
	user_id BIGINT not null,
	task_id BIGINT not null,
		
	primary key(user_id,task_id),
	constraint fk_taskAssignment_user foreign key (user_id) references users(id) on delete cascade,
	constraint fk_taskAssignment_task foreign key (task_id) references tasks(id) on delete cascade

);

create table assets (
	id BIGSERIAL primary key,
	file_url varchar(255) not null,
	user_id BIGINT not null, 
	task_id BIGINT not null,
	
	constraint fk_asset_user foreign key (user_id) references users(id) on delete cascade,
	constraint fk_asset_task foreign key (task_id) references tasks(id) on delete cascade
);

create table comments(
	id BIGSERIAL primary key,
	content varchar(255) not null,
	created_at timestamp default current_timestamp,
	user_id BIGINT not null, 
	task_id BIGINT not null,
	
	constraint fk_comment_user foreign key (user_id) references users(id) on delete cascade,
	constraint fk_comment_task foreign key (task_id) references tasks(id) on delete cascade
);

create table notifications(
	id BIGSERIAL primary key,
	message varchar(255) not null,
	created_at timestamp default current_timestamp
);

create table user_notifications (
	notification_id BIGINT not null,
	user_id BIGINT not null,
	is_read boolean not null default FALSE, 
	
	primary key(notification_id, user_id),
	constraint fk_userNotification_notification foreign key (notification_id) references notifications(id) on delete cascade,
	constraint fk_userNotification_user foreign key (user_id) references users(id) on delete cascade
);

