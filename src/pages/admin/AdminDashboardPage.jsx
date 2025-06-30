    // frontend/src/pages/admin/AdminDashboardPage.jsx
    import { useEffect, useState } from 'react';
    import { useNavigate } from 'react-router-dom'; // useNavigate import kiya
    import api from '../../services/api';
    import Card from '../../components/common/Card';
    import Spinner from '../../components/common/Spinner';

    // SVG Icons
    const UsersIcon = ({ size = 28, className = '' }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    );
    const BookIcon = ({ size = 28, className = '' }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
    );
    const CheckSquareIcon = ({ size = 28, className = '' }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
    );
    const UserCheckIcon = ({ size = 28, className = '' }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 10v6"/><path d="M19 13h6"/></svg>
    ); // New icon for instructors

    const AdminDashboardPage = () => {
      const [stats, setStats] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const navigate = useNavigate(); // useNavigate hook use kiya

      useEffect(() => {
        const fetchStats = async () => {
          try {
            const response = await api.get('/admin/dashboard-stats');
            setStats(response.data);
          } catch (err) {
            setError('Failed to fetch dashboard stats.');
            console.error('Error fetching admin dashboard stats:', err);
          } finally {
            setLoading(false);
          }
        };
        fetchStats();
      }, []);

      const handleCardClick = (path) => {
        navigate(path);
      };

      if (loading) return <div className="flex justify-center items-center h-64"><Spinner size="lg" /></div>;
      if (error) return <div className="text-center text-accent text-lg">{error}</div>;
      if (!stats) return <div className="text-center text-body text-lg">No stats available.</div>;

      const dashboardCards = [
        { title: 'Total Users', value: stats.totalUsers, icon: <UsersIcon />, path: '/admin/users' },
        { title: 'Total Students', value: stats.totalStudents, icon: <UsersIcon />, path: '/admin/users?role=Student' },
        { title: 'Total Instructors', value: stats.totalInstructors, icon: <UserCheckIcon />, path: '/admin/users?role=Instructor' }, // New card for instructors
        { title: 'Total Courses', value: stats.totalCourses, icon: <BookIcon />, path: '/admin/courses' },
        { title: 'Total Registrations', value: stats.totalRegistrations, icon: <CheckSquareIcon />, path: '/admin/registrations' }, // Assuming /admin/registrations exists or will be created
      ];

      return (
        <div className="p-6">
          <h2 className="text-3xl font-extrabold text-heading mb-8">Admin Dashboard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dashboardCards.map((card) => (
              <Card
                key={card.title}
                className="p-6 text-center cursor-pointer hover:bg-primary-lightest transition-colors duration-200" // Cursor and hover effect
                onClick={() => handleCardClick(card.path)} // Click handler
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full flex items-center justify-center shadow-soft">
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-heading mb-2">{card.value}</h3>
                <p className="text-lg text-body">{card.title}</p>
              </Card>
            ))}
          </div>
        </div>
      );
    };

    export default AdminDashboardPage;
    