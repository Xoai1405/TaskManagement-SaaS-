import React, { useState } from "react";
import { Plus, MessageSquare, CheckSquare } from "lucide-react";
import TaskDetail from "./TaskDetail";

function Kanban() {
  // Dữ liệu mẫu chuẩn cấu trúc cho Bảng Kanban
  const listTask = [
    {
      id: 1,
      title: "Thiết kế API đăng nhập JWT",
      description: "Xây dựng endpoint auth với Access Token & Refresh Token",
      status: "Hoàn thành",
      priority: "Cao",
      assignee: ["HB"],
      deadline: "12/09/2026",
      subtasks: { done: 4, total: 4 },
      commentsCount: 3,
    },
    {
      id: 2,
      title: "Xây dựng module Workspace & Team",
      description: "Tạo schema DB và CRUD cho Workspace",
      status: "Đang thực hiện",
      priority: "Trung bình",
      assignee: ["QH"],
      deadline: "20/09/2026",
      subtasks: { done: 0, total: 1 },
      commentsCount: 2,
    },
    {
      id: 3,
      title: "Viết unit test cho TaskService",
      description: "Đạt coverage tối thiểu 80% cho Service layer",
      status: "Đang thực hiện",
      priority: "Cao",
      assignee: ["HB", "QH"],
      deadline: "28/09/2026",
      subtasks: { done: 2, total: 4 },
      commentsCount: 2,
    },
    {
      id: 4,
      title: "Thiết kế ERD cho Notification",
      description: "Xác định bảng thông báo realtime",
      status: "Cần làm",
      priority: "Thấp",
      assignee: ["MA"],
      deadline: "02/10/2026",
      subtasks: null,
      commentsCount: 1,
    },
    {
      id: 5,
      title: "Xây dựng module Subtask",
      description: "Thêm API quản lý công việc con",
      status: "Cần làm",
      priority: "Trung bình",
      assignee: ["ĐA"],
      deadline: "05/10/2026",
      subtasks: { done: 0, total: 3 },
      commentsCount: 0,
    },
    {
      id: 6,
      title: "Tích hợp WebSocket realtime",
      description: "Cấu hình Socket.io cho tính năng chat & thông báo",
      status: "Cần làm",
      priority: "Cao",
      assignee: ["QH"],
      deadline: "12/10/2026",
      subtasks: null,
      commentsCount: 0,
    },
  ];

  const [selectedTask, setSelectedTask] = useState(null);

  // Mảng định nghĩa các cột trên Bảng
  const COLUMNS = [
    { name: "Cần làm", dotColor: "bg-slate-400", titleColor: "col-title-todo" },
    {
      name: "Đang thực hiện",
      dotColor: "bg-indigo-600",
      titleColor: "col-title-doing",
    },
    {
      name: "Hoàn thành",
      dotColor: "bg-emerald-500",
      titleColor: "col-title-done",
    },
  ];

  // Helper Render Badge Ưu tiên (Sử dụng class từ index.css)
  const renderPriorityBadge = (priority) => {
    const priorityMap = {
      Cao: { badge: "badge-priority-high", dot: "dot-priority-high" },
      "Trung bình": {
        badge: "badge-priority-medium",
        dot: "dot-priority-medium",
      },
      Thấp: { badge: "badge-priority-low", dot: "dot-priority-low" },
    };
    const current = priorityMap[priority] || priorityMap["Thấp"];
    return (
      <span className={current.badge}>
        <span className={current.dot}></span>
        {priority}
      </span>
    );
  };

  // Helper Render Avatar người phụ trách
  const renderAssignees = (assignees) => {
    const list = Array.isArray(assignees) ? assignees : [assignees];
    const bgColors = [
      "bg-[#1E293B]",
      "bg-[#DC2626]",
      "bg-[#D97706]",
      "bg-[#059669]",
      "bg-[#2563EB]",
    ];

    return (
      <div className="flex items-center justify-end -space-x-1.5">
        {list.map((name, idx) => (
          <div
            key={idx}
            className={`w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white ${
              bgColors[idx % bgColors.length]
            }`}
          >
            {name}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* HEADER BẢNG KANBAN */}
      <div className="flex justify-between items-center">
        <h1 className="page-title mb-0">Bảng Kanban</h1>
        <button className="btn-primary">
          <Plus className="w-4 h-4" /> Công việc mới
        </button>
      </div>

      {/* KHU VỰC CÁC CỘT KANBAN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {COLUMNS.map((col) => {
          const columnTasks = listTask.filter(
            (task) => task.status === col.name,
          );

          return (
            <div
              key={col.name}
              className="bg-slate-100/60 p-4 rounded-2xl border border-slate-200/60 min-h-[500px]"
            >
              {/* HEADER CỘT */}
              <div className="flex justify-between items-center mb-4 px-1">
                <div className="flex items-center gap-2.5 font-bold text-sm">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`}
                  ></span>
                  <span className={col.titleColor}>{col.name}</span>
                  <span className="w-5 h-5 rounded-full bg-white text-slate-600 text-xs font-semibold flex items-center justify-center shadow-xs">
                    {columnTasks.length}
                  </span>
                </div>

                <button className="text-slate-400 hover:text-slate-600 p-1 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* DANH SÁCH THẺ TASK */}
              <div className="space-y-3">
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3"
                  >
                    <p className="task-title leading-snug">{task.title}</p>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center gap-2.5">
                        {renderPriorityBadge(task.priority)}

                        {task.subtasks && (
                          <span className="flex items-center gap-1 text-slate-400 text-[11px] font-medium">
                            <CheckSquare className="w-3.5 h-3.5 text-slate-400" />
                            {task.subtasks.done}/{task.subtasks.total}
                          </span>
                        )}

                        {task.commentsCount > 0 && (
                          <span className="flex items-center gap-1 text-slate-400 text-[11px] font-medium">
                            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                            {task.commentsCount}
                          </span>
                        )}
                      </div>

                      {renderAssignees(task.assignee)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL CHI TIẾT TASK */}
      {selectedTask && (
        <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
}

export default Kanban;
