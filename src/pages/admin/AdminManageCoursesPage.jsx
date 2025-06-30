// src/pages/admin/AdminManageCoursesPage.jsx
import { useState, useEffect } from 'react';
import api from '../../services/api';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal'; 
// import { Trash2 } from 'lucide-react'; // Lucide-react import hata diya
import toast from 'react-hot-toast';

// SVG Icon for Trash2
const Trash2Icon = ({ size = 18, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
);

const AdminManageCoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [courseToDelete, setCourseToDelete] = useState(null); 

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/courses');
            setCourses(data);
        } catch (error) {
            toast.error("Failed to fetch courses.");
            console.error("Admin fetch courses error:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchCourses();
    }, []);

    const confirmDelete = (courseId) => {
        setCourseToDelete(courseId);
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        if (!courseToDelete) return;

        setIsModalOpen(false); 
        try {
            await api.delete(`/courses/${courseToDelete}`);
            toast.success('Course deleted successfully.');
            fetchCourses();
        } catch (error) {
            toast.error('Failed to delete course.');
            console.error("Admin delete course error:", error);
        } finally {
            setCourseToDelete(null); 
        }
    };

    if (loading) return <Spinner />;

    return (
        <div>
            <h2 className="text-3xl font-bold text-heading mb-6">Manage All Courses</h2>
             <div className="bg-surface rounded-lg shadow overflow-hidden">
                <ul className="divide-y divide-gray-200">
                    {courses.length > 0 ? courses.map(course => (
                        <li key={course._id} className="p-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold text-heading">{course.title}</h3>
                                <p className="text-sm text-body">Instructor: {course.instructor?.name || 'N/A'}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" onClick={() => confirmDelete(course._id)}>
                                    <Trash2Icon size={18} className="text-red-600"/> {/* SVG Trash2Icon use kiya */}
                                </Button>
                            </div>
                        </li>
                    )) : (
                        <p className="p-4 text-center text-body">No courses found in the system.</p>
                    )}
                </ul>
            </div>

            {/* Confirmation Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Confirm Deletion"
            >
                <p className="text-body mb-4">Are you sure you want to permanently delete this course? This action cannot be undone.</p>
                <div className="flex justify-end space-x-4">
                    <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default AdminManageCoursesPage;
