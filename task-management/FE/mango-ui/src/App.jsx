import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#FFF7E8] text-[#5A3200]">
      {/* Header cố định ở trên cùng */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Vùng nội dung biến đổi theo Tab */}
      <main className="p-8 max-w-[1600px] mx-auto">
        {activeTab === 'dashboard' && <Dashboard></Dashboard>}
        {activeTab === 'tasks' && <div>Màn hình 2: Danh sách Công việc (Task List)</div>}
        {activeTab === 'kanban' && <div>Màn hình 3: Bảng Kanban</div>}
        {activeTab === 'teams' && <div>Màn hình 4: Quản lý Team</div>}
        {activeTab === 'members' && <div>Màn hình 5: Thành viên Workspace</div>}
      </main>
    </div>
  );
}