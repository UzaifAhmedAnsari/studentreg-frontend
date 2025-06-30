// src/layouts/DashboardLayout.jsx
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/layout/DashboardSidebar';
import DashboardHeader from '../components/layout/DashboardHeader'; // Yeh import sahi hona chahiye

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-background font-inter antialiased">
      <DashboardSidebar />
      <div className="flex-grow flex flex-col">
        <DashboardHeader />
        <main className="flex-grow p-6 md:p-8 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
