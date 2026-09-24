import React from "react";
import {
  X,
  AlignLeft,
  CheckSquare,
  Paperclip,
  MessageSquare,
  Plus,
  Calendar,
  Users,
  Tag,
  Clock,
  Send,
} from "lucide-react";

function TaskDetail({ task, onClose }) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
      {/* Container Modal */}
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-xl relative max-h-[90vh] overflow-y-auto border border-slate-100">
        
        {/* KHỐI 1: HEADER & NÚT ĐÓNG */}
        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md inline-block mb-2">
              Chi tiết công việc
            </span>
            <h2 className="card-title text-xl leading-snug">
              {task.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* KHỐI 2: LƯỚI CHI TIẾT TASK */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
          
          {/* --- CỘT TRÁI (3/5): NỘI DUNG CHÍNH --- */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* 1. Mô tả */}
            <div>
              <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm mb-2">
                <AlignLeft className="w-4 h-4 text-slate-500" />
                <span>Mô tả công việc</span>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-sm text-slate-600 leading-relaxed min-h-[70px]">
                {task.description || (
                  <span className="text-slate-400 italic">Chưa có mô tả chi tiết cho công việc này...</span>
                )}
              </div>
            </div>

            {/* 2. Subtask */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                  <CheckSquare className="w-4 h-4 text-slate-500" />
                  <span>Danh sách subtask</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                    0/2
                  </span>
                </div>
                <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Thêm subtask
                </button>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-3 p-2.5 bg-white border border-slate-200/80 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer text-sm text-slate-700">
                  <input type="checkbox" className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                  <span>Xác minh yêu cầu kỹ thuật</span>
                </label>
                <label className="flex items-center gap-3 p-2.5 bg-white border border-slate-200/80 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer text-sm text-slate-700">
                  <input type="checkbox" className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                  <span>Tạo API endpoint thử nghiệm</span>
                </label>
              </div>
            </div>

            {/* 3. Tệp đính kèm */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                  <Paperclip className="w-4 h-4 text-slate-500" />
                  <span>Tệp đính kèm</span>
                </div>
                <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Tải lên
                </button>
              </div>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50/50 transition-colors cursor-pointer">
                <p className="text-xs text-slate-400">Kéo thả tệp vào đây hoặc nhấn để đính kèm</p>
              </div>
            </div>

            {/* 4. Bình luận */}
            <div>
              <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm mb-3">
                <MessageSquare className="w-4 h-4 text-slate-500" />
                <span>Thảo luận</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Viết bình luận..."
                  className="input-field shadow-none"
                />
                <button className="btn-primary p-2.5">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* --- CỘT PHẢI (2/5): THUỘC TÍNH SIDEBAR --- */}
          <div className="lg:col-span-2 space-y-4 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
            
            {/* Trạng thái */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> Trạng thái
              </label>
              <select
                defaultValue={task.status}
                className="select-field w-full text-slate-700"
              >
                <option value="Cần làm">Cần làm</option>
                <option value="Đang thực hiện">Đang thực hiện</option>
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Quá hạn">Quá hạn</option>
              </select>
            </div>

            {/* Mức độ ưu tiên */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Mức độ ưu tiên
              </label>
              <select
                defaultValue={task.priority}
                className="select-field w-full text-slate-700"
              >
                <option value="Cao">Cao</option>
                <option value="Trung bình">Trung bình</option>
                <option value="Thấp">Thấp</option>
              </select>
            </div>

            {/* Deadline */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Hạn chót
              </label>
              <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 font-medium">
                {task.deadline}
              </div>
            </div>

            {/* Người phụ trách */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Người phụ trách
              </label>
              <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex items-center gap-2">
                {Array.isArray(task.assignee) ? (
                  task.assignee.map((name, idx) => (
                    <span key={idx} className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                      {name}
                    </span>
                  ))
                ) : (
                  <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                    {task.assignee}
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default TaskDetail;