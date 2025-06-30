// src/components/layout/DashboardSidebar.jsx

import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../common/Button';

// SVG Icons
const LayoutDashboardIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
);
const BookIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
);
const DollarSignIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const UsersIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const BookCopyIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 14.5a.5.5 0 0 0 .5.5H8a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5H3.5a.5.5 0 0 0-.5.5v6.5Z"/><path d="M12 2a.5.5 0 0 0-.5.5V18a.5.5 0 0 0 .5.5H20a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H12Z"/></svg>
);
const LogOutIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="17 16 22 12 17 8"/><line x1="22" x2="10" y1="12" y2="12"/></svg>
);
const HomeIcon = ({ size = 20, className = '' }) => ( // Home icon add kiya
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);


const studentLinks = [
  { to: '/', icon: <HomeIcon />, text: 'Home' }, // Home link add kiya
  { to: '/student/dashboard', icon: <LayoutDashboardIcon />, text: 'Dashboard' },
  { to: '/student/my-courses', icon: <BookIcon />, text: 'My Courses' },
  { to: '/student/my-subscription', icon: <DollarSignIcon />, text: 'Subscription' },
];
const instructorLinks = [
  { to: '/', icon: <HomeIcon />, text: 'Home' }, // Home link add kiya
  { to: '/instructor/dashboard', icon: <LayoutDashboardIcon />, text: 'Dashboard' },
  { to: '/instructor/courses', icon: <BookCopyIcon />, text: 'Manage Courses' },
];
const adminLinks = [
  { to: '/', icon: <HomeIcon />, text: 'Home' }, // Home link add kiya
  { to: '/admin/dashboard', icon: <LayoutDashboardIcon />, text: 'Dashboard' },
  { to: '/admin/users', icon: <UsersIcon />, text: 'Manage Users' },
  { to: '/admin/courses', icon: <BookCopyIcon />, text: 'Manage Courses' },
];

const NavItem = ({ to, icon, text }) => (
    <NavLink to={to} end className={({isActive}) => `flex items-center px-4 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
        {icon}
        <span className="ml-4 font-medium">{text}</span>
    </NavLink>
);

const DashboardSidebar = () => {
    const { user, logout } = useAuth();
    
    let links = [];
    if (user) {
        switch(user.role) {
            case 'Student': links = studentLinks; break;
            case 'Instructor': links = instructorLinks; break;
            case 'Admin': links = adminLinks; break;
            default: links = [];
        }
    }

  return (
    <aside className="w-64 bg-surface border-r border-gray-200 flex flex-col">
        <div className="flex-grow p-4">
            <nav className="space-y-2">
                {links.map(link => <NavItem key={link.to} {...link} />)}
            </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
            <Button onClick={logout} variant="ghost" className="w-full justify-start text-gray-600 hover:bg-red-100 hover:text-red-600">
                {/* Logout icon aur text ko align karne ke liye flex container use kiya */}
                <div className="flex items-center"> 
                    <LogOutIcon size={20} className="mr-4"/>
                    Logout
                </div>
            </Button>
        </div>
    </aside>
  );
};

export default DashboardSidebar;
