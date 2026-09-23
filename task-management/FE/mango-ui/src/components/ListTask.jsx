import React, { useState } from "react";
import {
  LayoutDashboard,
  ListTodo,
  Kanban,
  Users,
  UserCheck,
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";
import TaskDetail from "./TaskDetail";
function ListTask() {
  const listTask = [
    {
      id: 1,
      title: "Thiết kế API đăng nhập JWT",
      description: "Mô tả task 1",
      status: "Hoàn thành",
      priority: "Cao",
      assignee: ["HB"],
      deadline: "12/09/2026",
      id_taskParent: null,
    },
    {
      id: 2,
      title: "Xây dựng module Workspace & Team",
      description: "Mô tả task 2",
      status: "Đang thực hiện",
      priority: "Trung bình",
      assignee: ["QH"],
      deadline: "20/09/2026",
      id_taskParent: null,
    },
    {
      id: 3,
      title: "Viết unit test cho TaskService",
      description: "Mô tả task 3",
      status: "Đang thực hiện",
      priority: "Cao",
      assignee: ["HB", "QH"],
      deadline: "28/09/2026",
      id_taskParent: null,
    },
    {
      id: 4,
      title: "Thiết kế ERD cho Notification",
      description: "Mô tả task 4",
      status: "Cần làm",
      priority: "Thấp",
      assignee: ["MA"],
      deadline: "02/10/2026",
      id_taskParent: null,
    },
    {
      id: 5,
      title: "Xây dựng module Subtask",
      description: "Mô tả task 5",
      status: "Cần làm",
      priority: "Trung bình",
      assignee: ["ĐA"],
      deadline: "05/10/2026",
      id_taskParent: 2,
    },
    {
      id: 6,
      title: "Tích hợp WebSocket realtime",
      description: "Mô tả task 6",
      status: "Cần làm",
      priority: "Cao",
      assignee: ["QH"],
      deadline: "12/10/2026",
      id_taskParent: null,
    },
    {
      id: 7,
      title: "Viết Swagger cho toàn bộ API",
      description: "Mô tả task 7",
      status: "Cần làm",
      priority: "Thấp",
      assignee: ["TT"],
      deadline: "15/10/2026",
      id_taskParent: null,
    },
  ];

  const [searchTerm, setSerchTerm] = useState("");
  const [selectedStatus, setSetlectedStatus]= useState("");
  const [selectedPriority, setSetlectedPriority]= useState("");

  const filteredTasks = listTask.filter((task) => {
    return (task.title.toLowerCase().includes(searchTerm.toLowerCase()) 
            &&(selectedStatus===""||task.status===selectedStatus)
            &&(selectedPriority===""||task.priority===selectedPriority));
  });

  const [selectedTask, setSelectedTask] = useState(null);

  // Helper render Badge Trạng thái
  const renderStatusBadge = (status) => {
    const styles = {
      "Hoàn thành": "bg-emerald-100 text-emerald-700",
      "Đang thực hiện": "bg-indigo-100 text-indigo-700",
      "Cần làm": "bg-slate-100 text-slate-600 border border-slate-200/80",
      "Quá hạn": "bg-rose-100 text-rose-700",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium inline-block text-center ${styles[status] || styles["Cần làm"]}`}
      >
        {status}
      </span>
    );
  };

  // Helper render Badge Ưu tiên
  const renderPriorityBadge = (priority) => {
    const styles = {
      Cao: { bg: "bg-rose-50 text-rose-600", dot: "bg-rose-500" },
      "Trung bình": { bg: "bg-amber-50 text-amber-600", dot: "bg-amber-500" },
      Thấp: { bg: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500" },
    };
    const current = styles[priority] || styles["Thấp"];
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${current.bg}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`}></span>
        {priority}
      </span>
    );
  };

  // Helper render Avatar (Hỗ trợ 1 hoặc nhiều người)
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
      <div className="flex items-center justify-center -space-x-2">
        {list.map((name, idx) => (
          <div
            key={idx}
            className={`w-7 h-7 rounded-full text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white ${
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
      {/* KHỐI 1: HEADER & TIÊU ĐỀ */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Công việc</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors">
          <span>+</span> Công việc mới
        </button>
      </div>

      {/* KHỐI 2: TÌM KIẾM & BỘ LỌC */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Ô Tìm kiếm */}
        <div className="md:col-span-6 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
            type="text"
            placeholder="Tìm theo tên công việc..."
            value={searchTerm}
            onChange={(e) => {
              setSerchTerm(e.target.value);
            }}
          />
        </div>

        {/* Combobox Trạng thái */}
        <select value={selectedStatus}
                onChange={(e)=> {
                    setSetlectedStatus(e.target.value)
                }} 
                className="md:col-span-3 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 transition-all">
          <option value="">Tất cả trạng thái</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Đang thực hiện">Đang thực hiện</option>
          <option value="Cần làm">Cần làm</option>
          <option value="Quá hạn">Quá hạn</option>
        </select>

        {/* Combobox Ưu tiên */}
        <select value={selectedPriority}
                onChange={(e)=> {
                    setSetlectedPriority(e.target.value)
                    
                }} 
                className="md:col-span-3 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 transition-all">
          <option value="">Tất cả ưu tiên</option>
          <option value="Cao">Cao</option>
          <option value="Trung bình">Trung bình</option>
          <option value="Thấp">Thấp</option>
        </select>
      </div>

      {/* KHỐI 3: DANH SÁCH TASK (BẢNG) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Header Bảng */}
        <div className="grid grid-cols-[1fr_140px_130px_120px_130px] items-center px-6 py-3.5 border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-slate-500">
          <div>Công việc</div>
          <div className="text-center">Trạng thái</div>
          <div className="text-center">Ưu tiên</div>
          <div className="text-center">Phụ trách</div>
          <div className="text-center">Hạn chót</div>
        </div>

        {/* Danh sách dòng Task */}
        <div className="divide-y divide-slate-100">
          {filteredTasks.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center justify-center">
              
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-slate-600 font-semibold text-sm">
                Không tìm thấy công việc nào phù hợp
              </p>

              {/* Gợi ý phụ cho người dùng */}
              <p className="text-slate-400 text-xs mt-1">
                Thử thay đổi từ khóa tìm kiếm hoặc bỏ chọn bộ lọc xem sao nhé!
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const parentTask = task.id_taskParent
                ? listTask.find((t) => t.id === task.id_taskParent)
                : null;

              return (
                <button
                  onClick={() => setSelectedTask(task)}
                  
                  key={task.id}
                  className="w-full grid grid-cols-[1fr_140px_130px_120px_130px] items-center px-6 py-4 hover:bg-slate-50/80 transition-colors text-left group"
                >
                  {/* Tên Task & Subtask info */}
                  <div className="pr-4 min-w-0">
                    <p className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors text-sm truncate">
                      {task.title}
                    </p>
                    {parentTask && (
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <span>↳</span> Subtask của:{" "}
                        <span className="text-slate-500 font-medium">
                          {parentTask.title}
                        </span>
                      </p>
                    )}
                  </div>

                  {/* Trạng thái */}
                  <div className="text-center">
                    {renderStatusBadge(task.status)}
                  </div>

                  {/* Ưu tiên */}
                  <div className="text-center">
                    {renderPriorityBadge(task.priority)}
                  </div>

                  {/* Phụ trách */}
                  <div className="text-center">
                    {renderAssignees(task.assignee)}
                  </div>

                  {/* Hạn chót */}
                  <div className="text-center text-xs font-medium text-slate-500">
                    {task.deadline}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
       {selectedTask && (
        <TaskDetail
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
   
  );
}

export default ListTask;
