// src/pages/public/CoursesPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/courses');
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <h1 className="text-4xl font-bold text-heading mb-8">Explore Our Courses</h1>
      {courses.length === 0 ? (
        <p className="text-center text-body">No courses available at the moment.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course._id} className="flex flex-col">
              <div className="p-6 flex-grow">
                <p className="text-sm text-primary font-semibold">
                  By {course.instructor?.name || 'N/A'} {/* Optional chaining add kiya */}
                </p>
                <h2 className="text-2xl font-bold text-heading mt-2">{course.title}</h2>
                <p className="mt-2 text-body flex-grow">{course.description.substring(0, 100)}...</p>
              </div>
              <div className="p-6 bg-gray-50">
                 <Link to={`/courses/${course._id}`}>
                    <Button variant="primary" className="w-full">View Details</Button>
                 </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
