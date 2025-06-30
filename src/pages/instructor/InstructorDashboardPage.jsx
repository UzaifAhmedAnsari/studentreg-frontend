// src/pages/instructor/InstructorDashboardPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
// import { BookCopy, Plus } from 'lucide-react'; // Lucide-react imports hata diye gaye hain

// SVG Icons
const BookCopyIcon = ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 14.5a.5.5 0 0 0 .5.5H8a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5H3.5a.5.5 0 0 0-.5.5v6.5Z"/><path d="M12 2a.5.5 0 0 0-.5.5V18a.5.5 0 0 0 .5.5H20a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H12Z"/></svg>
);
const PlusIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 5v14"/><path d="M5 12h14"/></svg>
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


const InstructorDashboardPage = () => {
    const { user } = useAuth();
    const [courseCount, setCourseCount] = useState(0);

    useEffect(() => {
        const fetchCourses = async () => {
            if (user) {
                try {
                    const { data } = await api.get('/courses');
                    // Ensure course.instructor exists before accessing _id
                    const myCourses = data.filter(course => course.instructor?._id === user._id); 
                    setCourseCount(myCourses.length);
                } catch (error) {
                    console.error("Could not fetch course count", error);
                }
            }
        };
        fetchCourses();
    }, [user]);


    return (
        <div>
            <h2 className="text-3xl font-bold text-heading mb-6">Instructor Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Courses Created" value={courseCount} icon={<BookCopyIcon size={24} />} />
                {/* You can add more stats here, like total student enrollments */}
            </div>
            
            <div className="bg-surface p-6 rounded-lg shadow">
                 <h3 className="text-xl font-bold text-heading mb-4">Quick Actions</h3>
                 <div className="flex space-x-4">
                    <Link to="/instructor/courses/new">
                        <Button variant="primary" className="flex items-center">
                            <PlusIcon size={20} className="mr-2"/> {/* SVG PlusIcon use kiya */}
                            Create New Course
                        </Button>
                    </Link>
                     <Link to="/instructor/courses">
                        <Button variant="ghost" className="border border-gray-300">
                            Manage All Courses
                        </Button>
                    </Link>
                 </div>
            </div>
        </div>
    );
};

export default InstructorDashboardPage;
