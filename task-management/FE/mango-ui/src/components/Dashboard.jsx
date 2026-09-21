import React from "react";

function Dashboard() {
  const recentTasks = [
    { id: 1, title: "Thiết kế API đăng nhập JWT", team: "Backend Team", status: "Hoàn thành", statusType: "done", avatar: "HB" },
    { id: 2, title: "Xây dựng module Workspace", team: "Backend Team", status: "Đang thực hiện", statusType: "in-progress", avatar: "QH" },
    { id: 3, title: "Thiết kế màn hình Kanban", team: "Frontend Team", status: "Chưa bắt đầu", statusType: "todo", avatar: "MA" },
    { id: 4, title: "Viết unit test TaskService", team: "Backend Team", status: "Đang thực hiện", statusType: "in-progress", avatar: "HB" },
  ];

  return (
    <div>
      {/* Tiêu đề trang */}
      <h1 className="page-title">Tổng quan</h1>

      {/* KHỐI 1 */}
      <div className="dash-card flex items-center justify-between gap-10">
        <div className="pr-10 border-r border-slate-200 shrink-0">
          <p className="stat-label">Tổng số công việc</p>
          <p className="stat-hero-number mt-1">24</p>
        </div>

        <div className="flex-1 space-y-5">
          {/* Thanh tiến độ */}
          <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1 p-0.5">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: "37.5%" }}></div>
            <div className="h-full bg-indigo-600 rounded-full" style={{ width: "33.3%" }}></div>
            <div className="h-full bg-slate-300 rounded-full" style={{ width: "29.2%" }}></div>
          </div>

          {/* 3 chỉ số */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <p className="stat-label">Hoàn thành</p>
              </div>
              <p className="stat-sub-number mt-1">9</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
                <p className="stat-label">Đang thực hiện</p>
              </div>
              <p className="stat-sub-number mt-1">8</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-400"></span>
                <p className="stat-label">Chưa bắt đầu</p>
              </div>
              <p className="stat-sub-number mt-1">7</p>
            </div>
          </div>
        </div>
      </div>

      {/* GRID 2 KHỐI BÊN DƯỚI */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
        
        {/* KHỐI 2 */}
        <div className="dash-card lg:col-span-3">
          <h3 className="card-title mb-4">Công việc gần đây</h3>

          <div className="divide-y divide-slate-100">
            {recentTasks.map((task) => (
              <div className="flex items-center justify-between py-3.5" key={task.id}>
                <div>
                  <p className="task-title">{task.title}</p>
                  <div className="flex items-center space-x-3 mt-1.5 text-sm">
                    <span className="text-slate-400 font-medium">{task.team}</span>
                    <span className={`px-3 py-0.5 rounded-full font-bold text-xs ${
                      task.statusType === 'done' ? 'bg-emerald-100 text-emerald-700' :
                      task.statusType === 'in-progress' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#5A3200] text-[#FFC233] flex items-center justify-center font-bold text-sm ring-2 ring-[#C95A00]/20 shrink-0">
                  {task.avatar}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KHỐI 3 */}
        <div className="dash-card lg:col-span-2 flex flex-col h-full">
          <h3 className="card-title">Phân bố theo độ ưu tiên</h3>

          <div className="flex-1 flex items-center justify-around py-6">
            <div className="relative w-52 h-52 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-rose-500" strokeWidth="4" strokeDasharray="37, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-[#FFC233]" strokeWidth="4" strokeDasharray="33, 100" strokeDashoffset="-37" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-emerald-500" strokeWidth="4" strokeDasharray="30, 100" strokeDashoffset="-70" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>

              <div className="absolute text-center">
                <p className="text-4xl font-black text-[#5A3200] leading-none">24</p>
                <p className="text-xs font-bold text-slate-400 mt-1">công việc</p>
              </div>
            </div>

            <div className="space-y-4 min-w-[130px]">
              <div className="flex items-center justify-between text-base">
                <div className="flex items-center space-x-2.5 font-bold text-slate-700">
                  <span className="w-3.5 h-3.5 rounded-sm bg-rose-500"></span>
                  <span>Cao</span>
                </div>
                <span className="font-extrabold text-[#5A3200] text-lg">9</span>
              </div>
              <div className="flex items-center justify-between text-base">
                <div className="flex items-center space-x-2.5 font-bold text-slate-700">
                  <span className="w-3.5 h-3.5 rounded-sm bg-[#FFC233]"></span>
                  <span>Trung bình</span>
                </div>
                <span className="font-extrabold text-[#5A3200] text-lg">8</span>
              </div>
              <div className="flex items-center justify-between text-base">
                <div className="flex items-center space-x-2.5 font-bold text-slate-700">
                  <span className="w-3.5 h-3.5 rounded-sm bg-emerald-500"></span>
                  <span>Thấp</span>
                </div>
                <span className="font-extrabold text-[#5A3200] text-lg">7</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;