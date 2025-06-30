// src/pages/admin/AdminDashboardPage.jsx
import { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Spinner from '../../components/common/Spinner';
// lucide-react imports hata diye gaye hain, ab icons inline SVGs hain

// SVG Icons
const UsersIcon = ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const UserCheckIcon = ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 11V3L15 2l-3 3 3 3 7-1"/><path d="m15 11 3 3-3 3"/></svg>
);
const BookCopyIcon = ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 14.5a.5.5 0 0 0 .5.5H8a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5H3.5a.5.5 0 0 0-.5.5v6.5Z"/><path d="M12 2a.5.5 0 0 0-.5.5V18a.5.5 0 0 0 .5.5H20a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H12Z"/></svg>
);
const CheckSquareIcon = ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>
);


const StatCard = ({ title, value, icon }) => (
    <Card className="p-6">
        <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-primary mr-4">{icon}</div>
            <div>
                <p className="text-sm font-medium text-body">{title}</p>
                <p className="text-2xl font-bold text-heading">{value}</p>
            </div>
        </div>
    </Card>
);

const AdminDashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/admin/stats');
                setStats(data);
            } catch (error) {
                console.error("Could not fetch admin stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <Spinner />;
    if (!stats) return <p className="text-center text-body">Could not load dashboard statistics.</p>;

    return (
        <div>
            <h2 className="text-3xl font-bold text-heading mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={stats.users.total} icon={<UsersIcon size={24} />} />
                <StatCard title="Total Students" value={stats.users.students} icon={<UserCheckIcon size={24} />} />
                <StatCard title="Total Courses" value={stats.courses} icon={<BookCopyIcon size={24} />} />
                <StatCard title="Total Registrations" value={stats.registrations} icon={<CheckSquareIcon size={24} />} />
            </div>
        </div>
    );
};

export default AdminDashboardPage;
