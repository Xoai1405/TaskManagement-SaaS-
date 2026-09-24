import { useState } from "react";

function Team() {
  const team = [
    { id: 1, name: "Backend Team" },
    { id: 2, name: "Frontend Team" },
  ];

  const memberTeam = [
    { id: 1, avatar: "HB", name: "Hà Gia Bảo", email: "hagiabao@gmail.com", role: "ADMIN", id_team: 1, status: "ACTIVE" },
    { id: 2, avatar: "QH", name: "Quốc Huy", email: "quochuy@gmail.com", role: "LEADER", id_team: 1, status: "ACTIVE" },
    { id: 3, avatar: "ĐA", name: "Đức Anh", email: "ducanh@gmail.com", role: "MEMBER", id_team: 1, status: "INACTIVE" },
    { id: 4, avatar: "MA", name: "Minh Anh", email: "minhanh@gmail.com", role: "MEMBER", id_team: 2, status: "ACTIVE" },
    { id: 5, avatar: "TT", name: "Thu Trang", email: "thutrang@gmail.com", role: "VIEWER", id_team: 2, status: "INVITE" },
  ];

  const [selectedTeamId, setSelectedTeamId] = useState(1);

  // Lọc danh sách thành viên thuộc team đang chọn
  const filterTeamMemberByTeamId = memberTeam.filter(
    (member) => member.id_team === selectedTeamId
  );

  // Lấy tên team đang chọn
  const currentTeam = team.find((t) => t.id === selectedTeamId);

  // Helper đổi màu Badge Role
  const renderRoleBadge = (role) => {
    const roleStyles = {
      ADMIN: "bg-indigo-50 text-indigo-700",
      LEADER: "bg-amber-50 text-amber-700",
      MEMBER: "bg-slate-100 text-slate-600",
      VIEWER: "bg-emerald-50 text-emerald-700",
    };

    const roleLabels = {
      ADMIN: "Admin",
      LEADER: "Leader",
      MEMBER: "Member",
      VIEWER: "Viewer",
    };

    return (
      <span
        className={`text-xs font-semibold px-3 py-1 rounded-full ${
          roleStyles[role] || "bg-slate-100 text-slate-600"
        }`}
      >
        {roleLabels[role] || role}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. TIÊU ĐỀ */}
      <h2 className="text-2xl font-bold text-slate-900">Quản lý team</h2>

      {/* 2. CÁC NÚT TAB CHỌN TEAM & BUTTON THÊM TEAM */}
      <div className="flex items-center gap-3">
        {team.map((t) => {
          // CHECK ISACTIVE BÊN TRONG HÀM MAP NÀY MỚI ĐÚNG
          const isActive = t.id === selectedTeamId;
          const memberCount = memberTeam.filter((m) => m.id_team === t.id).length;

          return (
            <button
              key={t.id}
              onClick={() => setSelectedTeamId(t.id)}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{t.name}</span>
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  isActive
                    ? "bg-slate-700 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {memberCount}
              </span>
            </button>
          );
        })}

        {/* Nút tròn Thêm team (+) */}
        <button className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold transition-colors">
          +
        </button>
      </div>

      {/* 3. KHUNG HIỂN THỊ THÀNH VIÊN (CARD NỀN TRẮNG BỌC NGOÀI) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
        
        {/* Header khung thành viên */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {currentTeam?.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Chỉ thành viên đã có trong workspace mới thêm được vào team
            </p>
          </div>

          <button className="flex items-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-3.5 py-2 rounded-xl text-sm transition-colors">
            + Thêm vào team
          </button>
        </div>

        {/* Lưới các Thẻ Thành Viên (2 Cột) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filterTeamMemberByTeamId.map((member) => (
            <div
              key={member.id}
              className="p-4 rounded-2xl border border-slate-200/80 bg-white flex items-center justify-between hover:border-slate-300 transition-all"
            >
              {/* Bên trái: Avatar + Tên + Email */}
              <div className="flex items-center gap-3.5">
                {/* Khối Avatar Tròn */}
                <div className="w-11 h-11 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {member.avatar}
                </div>

                {/* Khối Thông tin */}
                <div>
                  <p className="font-bold text-slate-800 text-sm">
                    {member.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {member.email}
                  </p>
                </div>
              </div>

              {/* Bên phải: Badge Vai trò */}
              <div>{renderRoleBadge(member.role)}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Team;