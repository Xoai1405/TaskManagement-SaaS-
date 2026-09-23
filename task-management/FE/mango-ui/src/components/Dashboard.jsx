import React, { useState } from "react";

// Component Badge hiển thị nhãn trạng thái có Dot + Nền nhạt
const StatusBadge = ({ statusType, text }) => {
  const styles = {
    done: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    "in-progress": "bg-indigo-50 text-indigo-700 border-indigo-200/60",
    todo: "bg-slate-100 text-slate-600 border-slate-200/60",
    overdue: "bg-rose-50 text-rose-700 border-rose-200/60",
  };

  const dotColors = {
    done: "bg-emerald-500",
    "in-progress": "bg-indigo-500",
    todo: "bg-slate-400",
    overdue: "bg-rose-500 animate-pulse",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[statusType] || styles.todo}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[statusType] || dotColors.todo}`}></span>
      {text}
    </span>
  );
};

function Dashboard() {
  // 1. STATE THỐNG KÊ SỐ LƯỢNG TASK 
  const [taskStats, setTaskStats] = useState({
    done: 9,
    inProgress: 5,
    todo: 7,
    overdue: 3,
  });

  // 2. STATE DANH SÁCH CÔNG VIỆC GẦN ĐÂY
  const [recentTasks, setRecentTasks] = useState([
    { id: 1, title: "Thiết kế API đăng nhập JWT", team: "Backend Team", status: "Hoàn thành", statusType: "done", avatar: "HB", isOverdue: false },
    { id: 2, title: "Xây dựng module Workspace", team: "Backend Team", status: "Đang thực hiện", statusType: "in-progress", avatar: "QH", isOverdue: true },
    { id: 3, title: "Thiết kế màn hình Kanban", team: "Frontend Team", status: "Chưa bắt đầu", statusType: "todo", avatar: "MA", isOverdue: true },
    { id: 4, title: "Viết unit test TaskService", team: "Backend Team", status: "Đang thực hiện", statusType: "in-progress", avatar: "HB", isOverdue: false },
  ]);

  // TỰ ĐỘNG TÍNH TỔNG SỐ TASK
  const totalTasks = taskStats.done + taskStats.inProgress + taskStats.todo + taskStats.overdue;

  // TỰ ĐỘNG TÍNH PHẦN TRĂM (%) CHO THANH TIẾN ĐỘ & NHÃN
  const calcPercent = (count) => {
    if (totalTasks === 0) return "0%";
    return `${((count / totalTasks) * 100).toFixed(1)}%`;
  };

  // Cấu hình 4 trạng thái để render tự động
  const statusList = [
    { key: "done", label: "Hoàn thành", count: taskStats.done, color: "bg-emerald-500", textColor: "text-slate-600" },
    { key: "inProgress", label: "Đang thực hiện", count: taskStats.inProgress, color: "bg-indigo-600", textColor: "text-slate-600" },
    { key: "todo", label: "Chưa bắt đầu", count: taskStats.todo, color: "bg-slate-400", textColor: "text-slate-600" },
    { key: "overdue", label: "Quá hạn", count: taskStats.overdue, color: "bg-rose-500", textColor: "text-rose-600 font-bold", isPulse: true },
  ];

  return (
    <div>
      <h1 className="page-title">Tổng quan</h1>

      {/* KHỐI 1: TỔNG QUAN SỐ LƯỢNG */}
      <div className="dash-card flex items-center justify-between gap-8">
        {/* Cột Tổng số */}
        <div className="pr-8 border-r border-slate-200 shrink-0">
          <p className="stat-label">Tổng số công việc</p>
          <p className="stat-hero-number mt-1">{totalTasks}</p>
        </div>

        <div className="flex-1 space-y-4">
          {/* THANH TIẾN ĐỘ - TỰ ĐỘNG DÃN THEO % */}
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1 p-0.5">
            {statusList.map((item) => (
              <div
                key={item.key}
                className={`h-full rounded-full ${item.color}`}
                style={{ width: calcPercent(item.count) }}
                title={`${item.label}: ${item.count}`}
              ></div>
            ))}
          </div>

          {/* NHÃN CHỮ BÊN DƯỚI - TỰ ĐỘNG CO DÃN BẰNG % CỦA THANH TIẾN ĐỘ */}
          <div className="flex w-full gap-1">
            {statusList.map((item) => {
              const widthPercent = calcPercent(item.count);
              return (
                <div key={item.key} style={{ width: widthPercent }} className="overflow-hidden">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color} ${item.isPulse ? 'animate-pulse' : ''} shrink-0`}></span>
                    <p className={`stat-label truncate ${item.textColor}`}>{item.label}</p>
                  </div>
                  <p className={`stat-sub-number mt-1 ${item.key === 'overdue' ? 'text-rose-600' : ''}`}>
                    {item.count}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* GRID 2 KHỐI BÊN DƯỚI */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
        
        {/* KHỐI 2: CÔNG VIỆC GẦN ĐÂY */}
        <div className="dash-card lg:col-span-3">
          <h3 className="card-title mb-3">Công việc gần đây</h3>

          <div className="divide-y divide-slate-100">
            {recentTasks.map((task) => (
              <div className="flex items-center justify-between py-3" key={task.id}>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="task-title">{task.title}</p>
                    {task.isOverdue && (
                      <StatusBadge statusType="overdue" text="Quá hạn" />
                    )}
                  </div>

                  <div className="flex items-center space-x-3 mt-1.5">
                    <span className="text-slate-400 text-xs font-medium">{task.team}</span>
                    <StatusBadge statusType={task.statusType} text={task.status} />
                  </div>
                </div>

                <div className="w-9 h-9 rounded-full bg-[#5A3200] text-[#FFC233] flex items-center justify-center font-bold text-xs ring-2 ring-[#C95A00]/20 shrink-0">
                  {task.avatar}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KHỐI 3: PHÂN BỐ THEO ĐỘ ƯU TIÊN */}
        <div className="dash-card lg:col-span-2 flex flex-col h-full">
          <h3 className="card-title">Phân bố theo độ ưu tiên</h3>

          <div className="flex-1 flex items-center justify-around py-4">
            <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-rose-500" strokeWidth="3.8" strokeDasharray="37, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-[#FFC233]" strokeWidth="3.8" strokeDasharray="33, 100" strokeDashoffset="-37" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-emerald-500" strokeWidth="3.8" strokeDasharray="30, 100" strokeDashoffset="-70" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>

              <div className="absolute text-center">
                <p className="text-3xl font-bold text-[#5A3200] leading-none">{totalTasks}</p>
                <p className="text-[11px] font-medium text-slate-400 mt-1">công việc</p>
              </div>
            </div>

            <div className="space-y-3 min-w-[120px]">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 font-semibold text-slate-700">
                  <span className="w-3 h-3 rounded-sm bg-rose-500"></span>
                  <span>Cao</span>
                </div>
                <span className="font-bold text-[#5A3200]">9</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 font-semibold text-slate-700">
                  <span className="w-3 h-3 rounded-sm bg-[#FFC233]"></span>
                  <span>Trung bình</span>
                </div>
                <span className="font-bold text-[#5A3200]">8</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 font-semibold text-slate-700">
                  <span className="w-3 h-3 rounded-sm bg-emerald-500"></span>
                  <span>Thấp</span>
                </div>
                <span className="font-bold text-[#5A3200]">7</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;