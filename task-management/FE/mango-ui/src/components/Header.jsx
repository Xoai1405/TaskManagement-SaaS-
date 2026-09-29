import React from "react";
import {
  LayoutDashboard,
  ListTodo,
  Kanban,
  Users,
  UserCheck,
  Bell,
  ChevronDown,
} from "lucide-react";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
export default function Header({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth();
  const navTabs = [
    { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { id: "tasks", label: "Công việc", icon: ListTodo },
    { id: "kanban", label: "Bảng Kanban", icon: Kanban },
    { id: "teams", label: "Team", icon: Users },
    { id: "members", label: "Thành viên", icon: UserCheck },
  ];

  return (
    <header className="bg-[#FFEED2] border-t-[7px] border-[#E87500] shadow-sm">
      {/* ================= HÀNG 1: TOP BAR ================= */}
      <div className="px-8 pt-4 pb-3 flex items-center justify-between">
        {/* Khối Trái: Logo Mango & Nút Workspace */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2.5 font-black text-mango-900">
            <span className="text-3xl leading-none">🥭</span>
            <span className="font-black text-2xl tracking-tight">Mango</span>
          </div>

          {/* Nút Đồ án tốt nghiệp */}
          <button className="flex items-center space-x-2.5 bg-mango-600 hover:bg-[#b04f00] text-white px-3.5 py-1.5 rounded-xl font-medium shadow-sm transition">
            <span className="bg-[#FFC233] text-mango-900 font-black text-xs px-2 py-0.5 rounded-md shadow-xs">
              ĐA
            </span>
            <span className="text-sm font-bold">Đồ án tốt nghiệp</span>
            <ChevronDown size={18} className="text-[#FFC233]" />
          </button>
        </div>

        {/* Khối Phải: Notification & User Profile */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-mango-900 hover:bg-[#E87500]/10 rounded-xl transition relative">
            <Bell size={20} className="text-mango-600" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#E87500] ring-2 ring-[#FFEED2] rounded-full"></span>
          </button>

          <div className="flex items-center space-x-2.5 pl-3 border-l border-mango-600/20">
            <div className="w-8 h-8 rounded-full bg-mango-900 text-[#FFC233] flex items-center justify-center font-bold text-xs ring-2 ring-mango-600/30">
              {user.email[0].toUpperCase()}
            </div>
            <div className="text-left text-xs">
              <p className="font-bold text-mango-900 leading-tight">
                {user.email}
              </p>
            </div>
            <button
              onClick={logout}
              title="Đăng xuất"
              className="p-2 rounded-xl hover:bg-[#E87500]/10"
            >
              <LogOut size={18} className="text-mango-600" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= HÀNG 2: TABS NAVIGATION ================= */}
      <div className="px-8 flex items-center space-x-2 pt-1">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-t-2xl text-sm font-bold transition-all duration-150 ${
                isActive
                  ? "bg-[#FFF7E8] text-mango-900 shadow-[0_-2px_8px_rgba(90,50,0,0.04)] translate-y-px"
                  : "text-mango-900/70 hover:text-mango-900/70 hover:bg-[#E87500]/10"
              }`}
            >
              <Icon
                size={18}
                className={isActive ? "text-mango-600" : "text-mango-900/80"}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
