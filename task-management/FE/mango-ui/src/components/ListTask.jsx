import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import TaskDetail from "./TaskDetail";
import { taskApi } from "../api/taskApi";
import TaskAssignees from "./TaskAssignee";
import CreateTask from "./CreateTask";
function ListTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSerchTerm] = useState("");
  const [selectedStatus, setSetlectedStatus] = useState("");
  const [selectedPriority, setSetlectedPriority] = useState("");

  const [selectedTask, setSelectedTask] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const currentUser = { id: 101, name: "Quốc Huy" };
  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        setLoading(true);
        const data = await taskApi.getAllTaskInTeam();
        setTasks(data);
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi không xác định!");
      } finally {
        setLoading(false);
      }
    };
    fetchTaskList();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-slate-500">
        Đang tải danh sách công việc...
      </div>
    );
  }

  // Hiển thị khi có lỗi
  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Lỗi: {error}. Vui lòng kiểm tra lại kết nối Backend Spring Boot!
      </div>
    );
  }
  const listTask = tasks;

  const filteredTasks = listTask.filter((task) => {
    return (
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedStatus === "" || task.stage === selectedStatus) &&
      (selectedPriority === "" || task.priorityLevel === selectedPriority)
    );
  });

  // Helper render Badge Trạng thái bằng Class Design System
  
  const renderStatusBadge = (status) => {
    const changeStatusAlias = {
      COMPLETED: "Hoàn thành",
      IN_PROGRESS: "Đang thực hiện",

      TODO: "Cần làm",
      OVERDUE: "Quá hạn"
    }

    const mapClass = {
      "Hoàn thành": "badge badge-done",
      "Đang thực hiện": "badge badge-in-progress",
      "Cần làm": "badge badge-todo",
      "Quá hạn": "badge badge-overdue",
    };
    return (
      <span className={mapClass[changeStatusAlias[status]] || "badge badge-todo"}>{changeStatusAlias[status]}</span>
    );
  };

  // Helper render Badge Ưu tiên bằng Class Design System
  const renderPriorityBadge = (priority) => {
    const changePriorityAlias = {
      HIGH: "Cao",
      MEDIUM: "Trung bình",
      LOW: "Thấp"
    }

    const mapStyle = {
      "Cao": { badge: "badge-priority-high", dot: "dot-priority-high" },
      "Trung bình": {
        badge: "badge-priority-medium",
        dot: "dot-priority-medium",
      },
      "Thấp": { badge: "badge-priority-low", dot: "dot-priority-low" },
    };
    const current = mapStyle[changePriorityAlias[priority]] || mapStyle["Thấp"];
    return (
      <span className={current.badge}>
        <span className={current.dot}></span>
        {changePriorityAlias[priority]}
      </span>
    );
  };

  // Helper render Avatar
  const renderAssignees = (assignees) => {
    const list = Array.isArray(assignees) ? assignees : [assignees];
    return (
      <div className="flex items-center justify-center -space-x-2">
        {list.map((name, idx) => (
          <div
            key={idx}
            className="avatar-mango w-7 h-7 text-[11px] ring-2 ring-white"
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
        <h1 className="page-title mb-0">Công việc</h1>
        <button className="btn-primary" onClick={() => setIsCreateModalOpen(true)}>
          <span>+</span> Công việc mới
        </button>
      </div>

      {/* KHỐI 2: TÌM KIẾM & BỘ LỌC */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Ô Tìm kiếm */}
        <div className="md:col-span-6 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-mango-500 focus:ring-1 focus:ring-mango-500 transition-all placeholder:text-slate-400"
            type="text"
            placeholder="Tìm theo tên công việc..."
            value={searchTerm}
            onChange={(e) => {
              setSerchTerm(e.target.value);
            }}
          />
        </div>

        {/* Combobox Trạng thái */}
        <select
          value={selectedStatus}
          onChange={(e) => {
            setSetlectedStatus(e.target.value);
          }}
          className="md:col-span-3 select-field"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="COMPLETED">Hoàn thành</option>
          <option value="IN_PROGRESS">Đang thực hiện</option>
          <option value="TODO">Cần làm</option>
          <option value="OVERDUE">Quá hạn</option>
        </select>

        {/* Combobox Ưu tiên */}
        <select
          value={selectedPriority}
          onChange={(e) => {
            setSetlectedPriority(e.target.value);
          }}
          className="md:col-span-3 select-field"
        >
          <option value="">Tất cả ưu tiên</option>
          <option value="HIGH">Cao</option>
          <option value="MEDIUM">Trung bình</option>
          <option value="LOW">Thấp</option>
        </select>
      </div>

      {/* KHỐI 3: DANH SÁCH TASK (BẢNG) */}
      <div className="table-container">
        {/* Header Bảng */}
        <div className="table-header">
          <div>Công việc</div>
          <div className="text-center">Trạng thái</div>
          <div className="text-center">Ưu tiên</div>
          <div className="text-center">Phụ trách</div>
          <div className="text-center">Hạn chót</div>
        </div>

        {/* Danh sách dòng Task */}
        <div>
          {filteredTasks.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-slate-600 font-semibold text-sm">
                Không tìm thấy công việc nào phù hợp
              </p>
              <p className="text-slate-400 text-xs mt-1">
                Thử thay đổi từ khóa tìm kiếm hoặc bỏ chọn bộ lọc xem sao nhé!
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const parentTask = task.parentTaskId
                ? listTask.find((t) => t.id === task.parentTaskId)
                : null;

              return (
                <button
                  onClick={() => setSelectedTask(task)}
                  key={task.taskId}
                  className="table-row group"
                >
                  {/* Tên Task & Subtask info */}
                  <div className="pr-4 min-w-0">
                    <p className="task-title truncate">{task.title}</p>
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
                    {renderStatusBadge(task.stage)}
                  </div>

                  {/* Ưu tiên */}
                  <div className="text-center">
                    {renderPriorityBadge(task.priorityLevel)}
                  </div>

                  {/* Phụ trách */}
                  <TaskAssignees taskId={task.taskId} />

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
        <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}

      {isCreateModalOpen && (
        <CreateTask
          currentUser={currentUser}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={() => {
            setIsCreateModalOpen(false);
            
          }}
        />
      )}
    </div>
  );
}

export default ListTask;
