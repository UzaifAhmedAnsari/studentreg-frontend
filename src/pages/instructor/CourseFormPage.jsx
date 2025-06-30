// src/pages/instructor/CourseFormPage.jsx
import { useState, useEffect } from 'react'; // FIXED: Removed unused 'React' import
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Spinner from '../../components/common/Spinner';

const CourseFormPage = () => {
    // ... (rest of component logic)
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(isEditing);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (isEditing) {
            const fetchCourse = async () => {
                try {
                    const { data } = await api.get(`/courses/${id}`);
                    setTitle(data.title);
                    setDescription(data.description);
                } catch (error) {
                    toast.error('Could not fetch course data.');
                    console.error("Fetch course data error:", error); // FIXED: Used the 'error' variable
                    navigate('/instructor/courses');
                } finally {
                    setLoading(false);
                }
            };
            fetchCourse();
        }
    }, [id, isEditing, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const courseData = { title, description };

        try {
            if (isEditing) {
                await api.put(`/courses/${id}`, courseData);
                toast.success('Course updated successfully!');
            } else {
                await api.post('/courses', courseData);
                toast.success('Course created successfully!');
            }
            navigate('/instructor/courses');
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.error("Submit course error:", error); // FIXED: Used the 'error' variable
        } finally {
            setSubmitting(false);
        }
    };
    // ... (rest of component JSX)
    if (loading) return <Spinner />;

    return (
        <div>
            <h2 className="text-3xl font-bold text-heading mb-6">
                {isEditing ? 'Edit Course' : 'Create a New Course'}
            </h2>
            <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-lg shadow space-y-6 max-w-2xl">
                <Input
                    id="title"
                    label="Course Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <div>
                     <label htmlFor="description" className="block text-sm font-medium text-heading">Description</label>
                     <textarea
                        id="description"
                        rows={6}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        required
                     />
                </div>
                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="ghost" onClick={() => navigate('/instructor/courses')}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={submitting}>
                        {submitting ? 'Saving...' : 'Save Course'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CourseFormPage;