// src/pages/instructor/ManageCoursesPage.jsx
import { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import Spinner from '../../components/common/Spinner';
import Modal from '../../components/common/Modal'; 
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
// SVG Icons
const PlusIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 5v14"/><path d="M5 12h14"/></svg>
);
const EditIcon = ({ size = 18, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);
const Trash2Icon = ({ size = 18, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
);
const UsersIcon = ({ size = 18, className = '' }) => ( // Naya icon students dekhne ke liye
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);


import toast from 'react-hot-toast';

const ManageCoursesPage = () => {
    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [courseToDelete, setCourseToDelete] = useState(null); 

    const fetchMyCourses = useCallback(async () => {
        setLoading(true);
        if (!user) return;
        try {
            const { data } = await api.get('/courses');
            setMyCourses(data.filter(course => course.instructor?._id === user._id));
        } catch (error) {
            toast.error("Failed to fetch courses.");
            console.error("Fetch courses error:", error);
        } finally {
            setLoading(false);
        }
    }, [user]);
    
    useEffect(() => {
        fetchMyCourses();
    }, [fetchMyCourses]);

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
            fetchMyCourses();
        } catch (error) {
            toast.error('Failed to delete course.');
            console.error("Delete course error:", error);
        } finally {
            setCourseToDelete(null); 
        }
    };

    if (loading) return <Spinner />;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-heading">Manage My Courses</h2>
                <Link to="/instructor/courses/new">
                    <Button variant="primary" className="flex items-center">
                        <PlusIcon size={20} className="mr-2" />
                        Create New Course
                    </Button>
                </Link>
            </div>
            <div className="bg-surface rounded-lg shadow overflow-hidden">
                <ul className="divide-y divide-gray-200">
                    {myCourses.length > 0 ? myCourses.map(course => (
                        <li key={course._id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                            <div>
                                <h3 className="text-lg font-semibold text-heading">{course.title}</h3>
                                <p className="text-sm text-body">ID: {course._id}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                {/* Edit Course Button */}
                                <Link to={`/instructor/courses/edit/${course._id}`}>
                                    <Button variant="ghost" className="p-2"><EditIcon size={18} /></Button>
                                </Link>
                                {/* View Enrollments Button */}
                                <Link to={`/instructor/courses/${course._id}/enrollments`}> {/* Naya route */}
                                    <Button variant="ghost" className="p-2" title="View Enrollments">
                                        <UsersIcon size={18} className="text-blue-600"/> {/* Students icon */}
                                    </Button>
                                </Link>
                                {/* Delete Course Button */}
                                <Button variant="ghost" className="p-2" onClick={() => confirmDelete(course._id)}>
                                    <Trash2Icon size={18} className="text-red-600"/>
                                </Button>
                            </div>
                        </li>
                    )) : (
                        <p className="p-4 text-center text-body">You haven't created any courses yet.</p>
                    )}
                </ul>
            </div>

            {/* Confirmation Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Confirm Deletion"
            >
                <p className="text-body mb-4">Are you sure you want to delete this course? This action cannot be undone.</p>
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

export default ManageCoursesPage;
