import { useState } from "react";
import { Search, Plus } from "lucide-react";

function Member() {
  const [searchTerm, setSearchTerm] = useState("");

  const memberTeam = [
    { id: 1, avatar: "HB", name: "Hà Gia Bảo", email: "hagiabao@gmail.com", role: "ADMIN", status: "ACTIVE", bg: "bg-[#1E293B]" },
    { id: 2, avatar: "QH", name: "Quốc Huy", email: "quochuy@gmail.com", role: "LEADER", status: "ACTIVE", bg: "bg-[#DC2626]" },
    { id: 4, avatar: "MA", name: "Minh Anh", email: "minhanh@gmail.com", role: "MEMBER", status: "ACTIVE", bg: "bg-[#D97706]" },
    { id: 5, avatar: "TT", name: "Thu Trang", email: "thutrang@gmail.com", role: "VIEWER", status: "INVITE", bg: "bg-[#334155]" },
    { id: 3, avatar: "ĐA", name: "Đức Anh", email: "ducanh@gmail.com", role: "MEMBER", status: "INACTIVE", bg: "bg-[#059669]" },
  ];

  // Helper render Trạng thái (Chấm màu + Chữ)
  const renderStatus = (status) => {
    const config = {
      ACTIVE: { text: "Đang hoạt động", dot: "bg-emerald-500" },
      INVITE: { text: "Đã mời", dot: "bg-amber-500" },
      INACTIVE: { text: "Ngừng hoạt động", dot: "bg-rose-500" },
    };
    const current = config[status] || config.ACTIVE;

    return (
      <div className="flex items-center gap-2 font-medium text-slate-700">
        <span className={`w-2 h-2 rounded-full ${current.dot}`}></span>
        <span>{current.text}</span>
      </div>
    );
  };

  // Lọc danh sách theo từ khóa tìm kiếm
  const filteredMembers = memberTeam.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* KHỐI 1: TIÊU ĐỀ & NÚT THÊM THÀNH VIÊN */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Thành viên workspace
        </h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Thêm thành viên
        </button>
      </div>

      {/* KHỐI 2: Ô TÌM KIẾM (ĐÃ THÊM relative) */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
        <input
          className="w-full bg-white border border-slate-200/90 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
          type="text"
          placeholder="Tìm thành viên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* KHỐI 3: BẢNG DANH SÁCH THÀNH VIÊN */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        
        {/* HEADER CỦA BẢNG */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-100 text-xs font-bold text-slate-500">
          <div className="col-span-4">Thành viên</div>
          <div className="col-span-4">Email</div>
          <div className="col-span-2">Vai trò</div>
          <div className="col-span-2">Trạng thái</div>
        </div>

        {/* CÁC DÒNG THÀNH VIÊN */}
        <div className="divide-y divide-slate-100">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 items-center text-sm hover:bg-slate-50/50 transition-colors"
            >
              {/* Cột 1: Avatar + Tên */}
              <div className="col-span-4 flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full text-white font-bold text-xs flex items-center justify-center flex-shrink-0 ${member.bg}`}
                >
                  {member.avatar}
                </div>
                <span className="font-bold text-slate-800">{member.name}</span>
              </div>

              {/* Cột 2: Email */}
              <div className="col-span-4 text-slate-500 font-medium">
                {member.email}
              </div>

              {/* Cột 3: Select Vai Trò */}
              <div className="col-span-2">
                <select
                  defaultValue={member.role}
                  className="bg-white border border-indigo-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full outline-none cursor-pointer focus:border-indigo-500 transition-all"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="LEADER">Leader</option>
                  <option value="MEMBER">Member</option>
                  <option value="VIEWER">Viewer</option>
                </select>
              </div>

              {/* Cột 4: Trạng thái */}
              <div className="col-span-2">{renderStatus(member.status)}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Member;