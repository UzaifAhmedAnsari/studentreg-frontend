// src/pages/student/MyCoursesPage.jsx
import { useState, useEffect } from 'react';
import api from '../../services/api';
import Spinner from '../../components/common/Spinner';
import Card from '../../components/common/Card';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'; // toast import kiya

const MyCoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const { data } = await api.get('/registrations/my-courses');
                setCourses(data);
            } catch (error) {
                toast.error("Failed to fetch enrolled courses."); // Error toast
                console.error("Failed to fetch courses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyCourses();
    }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <h2 className="text-3xl font-bold text-heading mb-6">My Enrolled Courses</h2>
      {courses.length === 0 ? (
        <p className="text-body">You are not registered for any courses yet. <Link to="/courses" className="text-primary hover:underline">Browse courses</Link> to get started!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
                <Link to={`/courses/${course._id}`} key={course._id}>
                    <Card className="hover:shadow-lg transition-shadow">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-heading">{course.title}</h3>
                            <p className="text-sm text-body mt-1">by {course.instructor?.name || 'N/A'}</p> {/* Optional chaining add kiya */}
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;
