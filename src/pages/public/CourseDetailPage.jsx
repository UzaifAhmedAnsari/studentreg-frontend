// src/pages/public/CourseDetailPage.jsx
import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useParams, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner'; // Spinner import kiya
import toast from 'react-hot-toast';

const CourseDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null); // Course state null set kiya
  const [loading, setLoading] = useState(true); // Loading state add kiya
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/courses/${id}`);
        setCourse(data);
      } catch (error) {
        toast.error('Failed to fetch course details.');
        console.error("Course fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]); // ID change hone par dobara fetch karein

  const handleRegister = async () => {
    if (!user) {
      toast.error('You must be logged in to register for a course.');
      return;
    }

    setIsRegistering(true);
    try {
      await api.post('/registrations', { courseId: id });
      toast.success('Successfully registered for the course!');
    } catch (error) {
      toast.error('Registration failed: ' + (error.response?.data?.message || 'Server error.'));
    } finally {
      setIsRegistering(false);
    }
  };

  if (loading) {
    return <Spinner />; // Loading state mein Spinner dikhayein
  }

  if (!course) {
    return <p className="text-center text-body">Course not found.</p>; // Agar course nahi mila
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-surface rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-extrabold text-heading">{course.title}</h1>
        <p className="text-lg text-body mt-2">
          Taught by <span className="font-semibold text-primary">{course.instructor?.name || 'Unknown Instructor'}</span>
        </p>
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-heading">Course Description</h2>
          <p className="mt-4 text-body leading-relaxed">{course.description}</p>
        </div>
        <div className="mt-8">
          <Button
            onClick={handleRegister}
            variant="primary"
            className="w-full md:w-auto text-lg px-8 py-3"
            disabled={isRegistering}
          >
            {isRegistering ? 'Registering...' : 'Register for this Course'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
