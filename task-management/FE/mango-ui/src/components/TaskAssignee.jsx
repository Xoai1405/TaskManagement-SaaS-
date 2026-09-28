import { useState, useEffect } from "react";
import { taskApi } from "../api/taskApi";

// 1. Helper lấy chữ cái đầu của Họ và Tên (VD: "Hà Gia Bảo" -> "HB")
const getInitials = (fullName) => {
  if (!fullName) return "??";
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  
  // Lấy chữ cái đầu của từ đầu tiên (Họ) và từ cuối cùng (Tên)
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// 2. Helper tạo bảng màu nền riêng cho từng Assignee theo ID
const getAvatarColor = (id) => {
  const colors = [
    "bg-slate-900 text-amber-400 border-indigo-200", 
    "bg-indigo-600 text-white border-white",
    "bg-emerald-600 text-white border-white",
    "bg-rose-500 text-white border-white",
    "bg-amber-500 text-white border-white",
    "bg-sky-600 text-white border-white",
    "bg-purple-600 text-white border-white",
    "bg-teal-600 text-white border-white",
  ];
  
  // Lấy dư theo độ dài mảng màu để id nào cũng có màu riêng
  const index = Math.abs(Number(id) || 0) % colors.length;
  return colors[index];
};

function TaskAssignees({ taskId }) {
  const [assignees, setAssignees] = useState([]);

  useEffect(() => {
    if (taskId) {
      taskApi.getAssigneesByTaskId(taskId)
        .then((data) => {
          setAssignees(data);
          console.log("Data Assignees của Task " + taskId + ":", data);
        })

        
        .catch((err) => console.error(err));
    }
  }, [taskId]);

  if (assignees.length === 0) return <span className="text-slate-400 flex items-center justify-center -space-x-2">Chưa có</span>;

  return (
    <div className="flex items-center justify-center -space-x-2">
      {assignees.map((user) => {
        const initials = getInitials(user.fullName);
        const colorClass = getAvatarColor(user.id);
        
        return (
          <div
            key={user.id}
            title={user.fullName} 
            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-bold select-none shadow-xs ${colorClass}`}
          >
            {initials}
          </div>
        );
      })}
    </div>
  );
}

export default TaskAssignees;