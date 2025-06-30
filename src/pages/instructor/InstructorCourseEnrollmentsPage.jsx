// src/pages/instructor/InstructorCourseEnrollmentsPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import Spinner from '../../components/common/Spinner';
import Card from '../../components/common/Card';
import toast from 'react-hot-toast';

const InstructorCourseEnrollmentsPage = () => {
    const { id } = useParams(); // Course ID URL se liya
    const [courseTitle, setCourseTitle] = useState('');
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                // Course details fetch karein (title dikhane ke liye)
                const courseRes = await api.get(`/courses/${id}`);
                setCourseTitle(courseRes.data.title);

                // Course ke enrollments fetch karein
                const enrollmentsRes = await api.get(`/courses/${id}/registrations`);
                setEnrollments(enrollmentsRes.data);
            } catch (error) {
                toast.error("Failed to fetch enrollments.");
                console.error("Fetch enrollments error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEnrollments();
    }, [id]);

    if (loading) return <Spinner />;

    return (
        <div>
            <h2 className="text-3xl font-bold text-heading mb-6">Enrollments for: {courseTitle}</h2>
            <Link to="/instructor/courses" className="text-primary hover:underline mb-4 inline-block">
                &larr; Back to Manage Courses
            </Link>

            {enrollments.length === 0 ? (
                <p className="p-4 text-center text-body">No students enrolled in this course yet.</p>
            ) : (
                <div className="bg-surface rounded-lg shadow overflow-hidden mt-4">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Student Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Student Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Registered On
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {enrollments.map((registration) => (
                                <tr key={registration._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {registration.student?.name || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {registration.student?.email || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(registration.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InstructorCourseEnrollmentsPage;
