import { useState } from "react";
import { Plus } from "lucide-react";

function Team() {
  const team = [
    { id: 1, name: "Backend Team" },
    { id: 2, name: "Frontend Team" },
  ];

  const memberTeam = [
    {
      id: 1,
      avatar: "HB",
      name: "Hà Gia Bảo",
      email: "hagiabao@gmail.com",
      role: "ADMIN",
      id_team: 1,
      status: "ACTIVE",
    },
    {
      id: 2,
      avatar: "QH",
      name: "Quốc Huy",
      email: "quochuy@gmail.com",
      role: "LEADER",
      id_team: 1,
      status: "ACTIVE",
    },
    {
      id: 3,
      avatar: "ĐA",
      name: "Đức Anh",
      email: "ducanh@gmail.com",
      role: "MEMBER",
      id_team: 1,
      status: "INACTIVE",
    },
    {
      id: 4,
      avatar: "MA",
      name: "Minh Anh",
      email: "minhanh@gmail.com",
      role: "MEMBER",
      id_team: 2,
      status: "ACTIVE",
    },
    {
      id: 5,
      avatar: "TT",
      name: "Thu Trang",
      email: "thutrang@gmail.com",
      role: "VIEWER",
      id_team: 2,
      status: "INVITE",
    },
  ];

  const [selectedTeamId, setSelectedTeamId] = useState(1);

  const filterTeamMemberByTeamId = memberTeam.filter(
    (member) => member.id_team === selectedTeamId,
  );

  const currentTeam = team.find((t) => t.id === selectedTeamId);

  // Helper đổi màu Badge Role
  const renderRoleBadge = (role) => {
    const roleStyles = {
      ADMIN: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
      LEADER: "bg-amber-50 text-amber-700 border-amber-200/60",
      MEMBER: "bg-slate-100 text-slate-600 border-slate-200/60",
      VIEWER: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    };

    const roleLabels = {
      ADMIN: "Admin",
      LEADER: "Leader",
      MEMBER: "Member",
      VIEWER: "Viewer",
    };

    return (
      <span
        className={`text-xs font-semibold px-3 py-1 rounded-full border ${
          roleStyles[role] || "bg-slate-100 text-slate-600 border-slate-200/60"
        }`}
      >
        {roleLabels[role] || role}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. TIÊU ĐỀ */}
      <h1 className="page-title mb-0">Quản lý team</h1>

      {/* 2. CÁC NÚT TAB CHỌN TEAM & BUTTON THÊM TEAM */}
      <div className="flex items-center gap-3">
        {team.map((t) => {
          const isActive = t.id === selectedTeamId;
          const memberCount = memberTeam.filter(
            (m) => m.id_team === t.id,
          ).length;

          return (
            <button
              key={t.id}
              onClick={() => setSelectedTeamId(t.id)}
              className={isActive ? "team-tab-active" : "team-tab"}
            >
              <span>{t.name}</span>
              <span
                className={isActive ? "team-tab-count-active" : "team-tab-count"}
              >
                {memberCount}
              </span>
            </button>
          );
        })}

        {/* Nút tròn Thêm team (+) */}
        <button className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold transition-colors cursor-pointer">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* 3. KHUNG HIỂN THỊ THÀNH VIÊN */}
      <div className="dash-card p-6 space-y-6">
        {/* Header khung thành viên */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="card-title text-xl">{currentTeam?.name}</h3>
            <p className="text-xs text-slate-400 mt-1">
              Chỉ thành viên đã có trong workspace mới thêm được vào team
            </p>
          </div>

          <button className="btn-primary">
            <Plus className="w-4 h-4" /> Thêm vào team
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
                <div className="avatar-mango w-11 h-11 text-sm">
                  {member.avatar}
                </div>

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
