import React, { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import { teamMemberApi } from "../api/teamMemberApi"; 

const sampleMembers = [
  { id: 1, name: "Hà Gia Bảo", avatar: "HB" },
  { id: 2, name: "Quốc Huy", avatar: "QH" },
  { id: 3, name: "Minh Anh", avatar: "MA" },
  { id: 4, name: "Thu Trang", avatar: "TT" },
  { id: 5, name: "Đức Anh", avatar: "ĐA" },
];

export default function CreateTask({ onClose, onSuccess }) {
  // State lưu thông tin người tạo task lấy từ API
  const [creatorInfo, setCreatorInfo] = useState(null);
  const [loadingCreator, setLoadingCreator] = useState(true);

  // State lưu danh sách thành viên
  const [members, setMembers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stage: "TODO",
    priorityLevel: "MEDIUM",
    deadline: "",
    assigneeIds: [],
  });

  // Gọi API lấy thông tin user hiện tại & set mock data
  useEffect(() => {
    const fetchCreatorInfo = async () => {
      try {
        setLoadingCreator(true);
        const data = await teamMemberApi.getUserandRole();
        setCreatorInfo(data);
      } catch (err) {
        console.error("Lỗi lấy thông tin người tạo:", err);
      } finally {
        setMembers(sampleMembers); 
        setLoadingCreator(false);
      }
    };

    fetchCreatorInfo();
  }, []);

  // Hàm lấy 2 chữ cái đầu làm Avatar
  const getInitials = (fullName) => {
    if (!fullName) return "U";
    const words = fullName.trim().split(" ");
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Chọn hoặc bỏ chọn người phụ trách
  const handleToggleAssignee = (memberId) => {
    setFormData((prev) => {
      const exists = prev.assigneeIds.includes(memberId);
      if (exists) {
        return {
          ...prev,
          assigneeIds: prev.assigneeIds.filter((id) => id !== memberId),
        };
      } else {
        return {
          ...prev,
          assigneeIds: [...prev.assigneeIds, memberId],
        };
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-2xl relative space-y-5 border border-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* KHỐI 1: HEADER */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-3">
          <div>
            <h3 className="card-title text-lg text-slate-800">Tạo công việc mới</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Điền thông tin bên dưới rồi bấm "Tạo công việc" để thêm vào danh sách
            </p>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* KHỐI 2: TÊN VÀ MÔ TẢ */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tên công việc</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Nhập tên công việc..."
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-mango-500 focus:ring-1 focus:ring-mango-500 transition-all placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mô tả</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả ngắn gọn nội dung công việc..."
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:border-mango-500 focus:ring-1 focus:ring-mango-500 transition-all placeholder:text-slate-400 resize-none"
            />
          </div>
        </div>

        {/* KHỐI 3: TRẠNG THÁI & MỨC ĐỘ ƯU TIÊN */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Trạng thái</label>
            <select name="stage" value={formData.stage} onChange={handleChange} className="select-field w-full text-slate-700">
              <option value="TODO">Cần làm</option>
              <option value="IN_PROGRESS">Đang thực hiện</option>
              <option value="COMPLETED">Hoàn thành</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mức độ ưu tiên</label>
            <select name="priorityLevel" value={formData.priorityLevel} onChange={handleChange} className="select-field w-full text-slate-700">
              <option value="HIGH">Cao</option>
              <option value="MEDIUM">Trung bình</option>
              <option value="LOW">Thấp</option>
            </select>
          </div>
        </div>

        {/* KHỐI 4: HẠN CHÓT & NGƯỜI TẠO CÔNG VIỆC */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Hạn chót</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-mango-500 text-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Người tạo công việc</label>
            
            {loadingCreator ? (
              <div className="h-[52px] bg-slate-100 rounded-2xl animate-pulse" />
            ) : (
              <div className="flex items-center justify-between p-2.5 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:border-slate-300 transition-all">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="avatar-mango w-10 h-10 text-xs">
                    {getInitials(creatorInfo?.fullName)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate leading-tight">
                      {creatorInfo?.fullName || "Chưa cập nhật"}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5" title={creatorInfo?.email || "No email"}>
                      {creatorInfo?.email || "No email"}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-indigo-50/80 text-indigo-600 text-xs font-medium border border-indigo-100 shrink-0 ml-2">
                  {creatorInfo?.role || "Member"}
                </span>
              </div>
            )}
          </div>
        </div>
        {/* KHỐI 5: NGƯỜI PHỤ TRÁCH */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Người phụ trách</label>
          
          {/* Badge danh sách người đã chọn */}
          {formData.assigneeIds.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.assigneeIds.map((id) => {
                const member = members.find((m) => m.id === id);
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-mango-500/10 text-mango-900 text-xs font-medium border border-mango-500/20"
                  >
                    <span className="w-4 h-4 rounded-full bg-mango-600 text-white flex items-center justify-center text-[9px] font-bold">
                      {member?.avatar || getInitials(member?.name)}
                    </span>
                    {member?.name || id}
                    <button
                      type="button"
                      onClick={() => handleToggleAssignee(id)}
                      className="hover:text-rose-500 ml-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          {/* Danh sách chọn thành viên */}
          <div className="border border-slate-200 rounded-xl max-h-36 overflow-y-auto divide-y divide-slate-100 bg-white">
            {members.length === 0 ? (
              <p className="text-xs text-slate-400 p-3 text-center">Không tìm thấy thành viên nào</p>
            ) : (
              members.map((member) => {
                const isSelected = formData.assigneeIds.includes(member.id);
                return (
                  <div
                    key={member.id}
                    onClick={() => handleToggleAssignee(member.id)}
                    className={`flex items-center justify-between p-2.5 cursor-pointer transition-colors hover:bg-slate-50 ${
                      isSelected ? "bg-mango-500/10" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="avatar-mango w-7 h-7 text-xs">
                        {member.avatar || getInitials(member.name)}
                      </div>
                      <p className="text-xs font-semibold text-slate-800">{member.name}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-mango-600" />}
                  </div>
                );
              })
            )}
          </div>
        </div>

        

        {/* KHỐI 6: NÚT ACTION */}
        <div className="flex justify-end items-center gap-3 border-t border-slate-100 pt-4 mt-6">
          <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
            Hủy
          </button>
          <button type="button" className="btn-primary py-2 px-4 text-xs font-semibold">
            ✓ Tạo công việc
          </button>
        </div>

      </div>
    </div>
  );
}