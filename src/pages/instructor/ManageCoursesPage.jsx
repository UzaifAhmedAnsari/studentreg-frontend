    // frontend/src/pages/instructor/InstructorManageCoursesPage.jsx
    import { useEffect, useState } from 'react';
    import api from '../../services/api';
    import Spinner from '../../components/common/Spinner';
    import Button from '../../components/common/Button';
    import Modal from '../../components/common/Modal';
    import Input from '../../components/common/Input';
    import { toast } from 'react-hot-toast';

    // SVG Icons for Add/Delete
    const PlusIcon = ({ size = 20, className = '' }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 5v14"/><path d="M5 12h14"/></svg>
    );
    const TrashIcon = ({ size = 20, className = '' }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
    );
    const EditIcon = ({ size = 20, className = '' }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    );

    const InstructorManageCoursesPage = () => {
      const [courses, setCourses] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isEditMode, setIsEditMode] = useState(false);
      const [currentCourse, setCurrentCourse] = useState({
        title: '',
        description: '',
        price: '',
        imageUrl: '',
        category: '',
        modules: [],
      });

      const fetchCourses = async () => {
        try {
          const response = await api.get('/courses'); // All courses, then filter by user if needed
          // For instructor, only show their courses
          const userStored = localStorage.getItem('user');
          const userInfo = userStored ? JSON.parse(userStored) : null;
          if (userInfo && userInfo.id) {
            setCourses(response.data.filter(course => course.user === userInfo.id));
          } else {
            setCourses([]); // No user, no courses
          }
        } catch (err) {
          setError('Failed to fetch courses.');
          console.error('Error fetching courses:', err);
          toast.error('Failed to load courses.');
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchCourses();
      }, []);

      const handleAddCourseClick = () => {
        setIsEditMode(false);
        setCurrentCourse({
          title: '',
          description: '',
          price: '',
          imageUrl: '',
          category: '',
          modules: [],
        });
        setIsModalOpen(true);
      };

      const handleEditCourseClick = (course) => {
        setIsEditMode(true);
        setCurrentCourse(course);
        setIsModalOpen(true);
      };

      const handleDeleteCourse = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
          try {
            await api.delete(`/courses/${courseId}`);
            toast.success('Course deleted successfully!');
            fetchCourses();
          } catch (err) {
            toast.error('Failed to delete course.');
            console.error('Error deleting course:', err);
          }
        }
      };

      const handleCourseSubmit = async (e) => {
        e.preventDefault();
        try {
          if (isEditMode) {
            await api.put(`/courses/${currentCourse._id}`, currentCourse);
            toast.success('Course updated successfully!');
          } else {
            await api.post('/courses', currentCourse);
            toast.success('Course created successfully!');
          }
          setIsModalOpen(false);
          fetchCourses();
        } catch (err) {
          toast.error('Failed to save course.');
          console.error('Error saving course:', err.response?.data || err);
        }
      };

      // Module and Lecture Management Handlers
      const handleAddModule = () => {
        setCurrentCourse(prev => ({
          ...prev,
          modules: [...prev.modules, { title: '', lectures: [] }]
        }));
      };

      const handleModuleChange = (index, field, value) => {
        const updatedModules = [...currentCourse.modules];
        updatedModules[index][field] = value;
        setCurrentCourse(prev => ({ ...prev, modules: updatedModules }));
      };

      const handleRemoveModule = (index) => {
        const updatedModules = currentCourse.modules.filter((_, i) => i !== index);
        setCurrentCourse(prev => ({ ...prev, modules: updatedModules }));
      };

      const handleAddLecture = (moduleIndex) => {
        const updatedModules = [...currentCourse.modules];
        updatedModules[moduleIndex].lectures.push({ title: '', videoUrl: '', content: '', resources: [] });
        setCurrentCourse(prev => ({ ...prev, modules: updatedModules }));
      };

      const handleLectureChange = (moduleIndex, lectureIndex, field, value) => {
        const updatedModules = [...currentCourse.modules];
        updatedModules[moduleIndex].lectures[lectureIndex][field] = value;
        setCurrentCourse(prev => ({ ...prev, modules: updatedModules }));
      };

      const handleRemoveLecture = (moduleIndex, lectureIndex) => {
        const updatedModules = [...currentCourse.modules];
        updatedModules[moduleIndex].lectures = updatedModules[moduleIndex].lectures.filter((_, i) => i !== lectureIndex);
        setCurrentCourse(prev => ({ ...prev, modules: updatedModules }));
      };

      const handleAddResource = (moduleIndex, lectureIndex) => {
        const updatedModules = [...currentCourse.modules];
        updatedModules[moduleIndex].lectures[lectureIndex].resources.push('');
        setCurrentCourse(prev => ({ ...prev, modules: updatedModules }));
      };

      const handleResourceChange = (moduleIndex, lectureIndex, resourceIndex, value) => {
        const updatedModules = [...currentCourse.modules];
        updatedModules[moduleIndex].lectures[lectureIndex].resources[resourceIndex] = value;
        setCurrentCourse(prev => ({ ...prev, modules: updatedModules }));
      };

      const handleRemoveResource = (moduleIndex, lectureIndex, resourceIndex) => {
        const updatedModules = [...currentCourse.modules];
        updatedModules[moduleIndex].lectures[lectureIndex].resources = updatedModules[moduleIndex].lectures[lectureIndex].resources.filter((_, i) => i !== resourceIndex);
        setCurrentCourse(prev => ({ ...prev, modules: updatedModules }));
      };


      if (loading) return <div className="flex justify-center items-center h-64"><Spinner size="lg" /></div>;
      if (error) return <div className="text-center text-accent text-lg">{error}</div>;

      return (
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold text-heading">Manage Your Courses</h2>
            <Button onClick={handleAddCourseClick} variant="primary">
              <PlusIcon className="mr-2"/> Add New Course
            </Button>
          </div>

          {courses.length === 0 ? (
            <div className="text-center text-body text-lg">You haven't created any courses yet.</div>
          ) : (
            <div className="bg-surface rounded-lg shadow-medium overflow-hidden">
              <table className="min-w-full divide-y divide-border-light">
                <thead className="bg-primary-lightest">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Modules</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-surface divide-y divide-border-light">
                  {courses.map((course) => (
                    <tr key={course._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-body">{course.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-body">{course.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-body">${course.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-body">{course.modules.length}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="ghost" onClick={() => handleEditCourseClick(course)} className="text-primary hover:text-primary-dark mr-2">
                          <EditIcon />
                        </Button>
                        <Button variant="danger" onClick={() => handleDeleteCourse(course._id)} className="hover:bg-red-600">
                          <TrashIcon />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Course Creation/Edit Modal */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEditMode ? 'Edit Course' : 'Create New Course'}>
            <form onSubmit={handleCourseSubmit} className="space-y-6">
              <Input
                label="Course Title"
                id="title"
                value={currentCourse.title}
                onChange={(e) => setCurrentCourse({ ...currentCourse, title: e.target.value })}
                required
              />
              <Input
                label="Description"
                id="description"
                value={currentCourse.description}
                onChange={(e) => setCurrentCourse({ ...currentCourse, description: e.target.value })}
                required
              />
              <Input
                label="Price ($)"
                id="price"
                type="number"
                value={currentCourse.price}
                onChange={(e) => setCurrentCourse({ ...currentCourse, price: parseFloat(e.target.value) || 0 })}
                required
              />
              <Input
                label="Image URL (Optional)"
                id="imageUrl"
                value={currentCourse.imageUrl}
                onChange={(e) => setCurrentCourse({ ...currentCourse, imageUrl: e.target.value })}
              />
              <Input
                label="Category (Optional)"
                id="category"
                value={currentCourse.category}
                onChange={(e) => setCurrentCourse({ ...currentCourse, category: e.target.value })}
              />

              {/* Modules Section */}
              <div className="border border-border-light rounded-lg p-4 space-y-4">
                <h3 className="text-lg font-semibold text-heading">Course Modules</h3>
                {currentCourse.modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="border border-border-light rounded-lg p-3 space-y-3 bg-primary-lightest/50">
                    <div className="flex justify-between items-center">
                      <Input
                        label={`Module ${moduleIndex + 1} Title`}
                        id={`module-title-${moduleIndex}`}
                        value={module.title}
                        onChange={(e) => handleModuleChange(moduleIndex, 'title', e.target.value)}
                        required
                        className="flex-grow mr-2"
                      />
                      <Button variant="danger" onClick={() => handleRemoveModule(moduleIndex)} className="p-2">
                        <TrashIcon />
                      </Button>
                    </div>

                    {/* Lectures Section */}
                    <div className="border border-border-light rounded-lg p-3 space-y-3 bg-surface">
                      <h4 className="text-md font-semibold text-heading">Lectures</h4>
                      {module.lectures.map((lecture, lectureIndex) => (
                        <div key={lectureIndex} className="border border-border-light rounded-lg p-3 space-y-2 bg-primary-lightest/30">
                          <div className="flex justify-between items-center">
                            <Input
                              label={`Lecture ${lectureIndex + 1} Title`}
                              id={`lecture-title-${moduleIndex}-${lectureIndex}`}
                              value={lecture.title}
                              onChange={(e) => handleLectureChange(moduleIndex, lectureIndex, 'title', e.target.value)}
                              required
                              className="flex-grow mr-2"
                            />
                            <Button variant="danger" onClick={() => handleRemoveLecture(moduleIndex, lectureIndex)} className="p-2">
                              <TrashIcon />
                            </Button>
                          </div>
                          <Input
                            label="Video URL (Optional)"
                            id={`lecture-video-${moduleIndex}-${lectureIndex}`}
                            value={lecture.videoUrl}
                            onChange={(e) => handleLectureChange(moduleIndex, lectureIndex, 'videoUrl', e.target.value)}
                          />
                          <Input
                            label="Content (Optional)"
                            id={`lecture-content-${moduleIndex}-${lectureIndex}`}
                            value={lecture.content}
                            onChange={(e) => handleLectureChange(moduleIndex, lectureIndex, 'content', e.target.value)}
                          />
                          {/* Resources Section */}
                          <div className="space-y-2">
                            <h5 className="text-sm font-semibold text-heading">Resources</h5>
                            {lecture.resources.map((resource, resourceIndex) => (
                              <div key={resourceIndex} className="flex items-center space-x-2">
                                <Input
                                  label={`Resource ${resourceIndex + 1} URL`}
                                  id={`resource-${moduleIndex}-${lectureIndex}-${resourceIndex}`}
                                  value={resource}
                                  onChange={(e) => handleResourceChange(moduleIndex, lectureIndex, resourceIndex, e.target.value)}
                                  className="flex-grow"
                                />
                                <Button variant="danger" onClick={() => handleRemoveResource(moduleIndex, lectureIndex, resourceIndex)} className="p-2">
                                  <TrashIcon size={16} />
                                </Button>
                              </div>
                            ))}
                            <Button variant="ghost" onClick={() => handleAddResource(moduleIndex, lectureIndex)} className="text-primary text-sm p-1">
                              <PlusIcon size={16} className="mr-1"/> Add Resource
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button variant="ghost" onClick={() => handleAddLecture(moduleIndex)} className="text-primary text-sm p-1">
                        <PlusIcon size={16} className="mr-1"/> Add Lecture
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="secondary" onClick={handleAddModule} className="w-full">
                  <PlusIcon className="mr-2"/> Add Module
                </Button>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary">{isEditMode ? 'Update Course' : 'Create Course'}</Button>
              </div>
            </form>
          </Modal>
        </div>
      );
    };

    export default ManageCoursesPage;
    