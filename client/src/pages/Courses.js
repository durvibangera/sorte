import { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  ChevronLeftIcon,
  PhotoIcon,
  LinkIcon,
  DocumentIcon,
  AcademicCapIcon,
  MapPinIcon,
  CalendarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchCourses, createCourse, fetchTasksByCourse, createTask, updateCourse, deleteCourse } from '../api';

function CourseView({ course, onBack }) {
  const [activeTab, setActiveTab] = useState('todo');
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const tabs = [
    { id: 'todo', label: 'To-do', color: 'bg-blue-100' },
    { id: 'files', label: 'Files', color: 'bg-green-100' },
    { id: 'studysets', label: 'Study Sets', color: 'bg-purple-100' },
    { id: 'links', label: 'Links', color: 'bg-pink-100' }
  ];

  // Fetch tasks for this course when component mounts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const response = await fetchTasksByCourse(course._id);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to load tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [course._id]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const taskData = {
        title: newTask.title,
        dueDate: newTask.dueDate,
        description: newTask.description,
        courseId: course._id
      };
      
      const response = await createTask(taskData);
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', dueDate: '', description: '' });
      setShowTaskForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCourse = async (formData) => {
    try {
      setLoading(true);
      const response = await updateCourse(course._id, formData);
      // Update the course in the parent component
      onBack(response.data);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating course:', error);
      setError('Failed to update course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      setLoading(true);
      await deleteCourse(courseId);
      onBack(null); // Return to courses list
    } catch (error) {
      console.error('Error deleting course:', error);
      setError('Failed to delete course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`bg-${course.color}-100 dark:bg-${course.color}-900/20 rounded-t-xl p-8`}>
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white mb-4 transition-colors"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Back
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-serif mb-4 text-gray-900 dark:text-white">{course.name}</h1>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <AcademicCapIcon className="h-5 w-5 mr-2" />
                <span>Instructor: {course.instructor}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPinIcon className="h-5 w-5 mr-2" />
                <span>Location: {course.location}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="border border-gray-800 dark:border-gray-200 rounded-lg px-4 py-2 hover:bg-white/10 dark:hover:bg-black/10 transition-colors text-gray-800 dark:text-gray-200"
          >
            Edit Course
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm transition-colors duration-200">
        <div className="flex border-b dark:border-gray-700">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`flex-1 px-4 py-3 text-center border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'todo' && (
            <div>
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              
              {loading ? (
                <div className="text-center py-6">Loading...</div>
              ) : !showTaskForm ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    📋
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {tasks.length === 0 ? 'No tasks to accomplish' : `${tasks.length} tasks`}
                  </p>
                  <button 
                    onClick={() => setShowTaskForm(true)}
                    className="bg-yellow-400 dark:bg-yellow-500 text-black dark:text-white px-4 py-2 rounded-lg hover:bg-yellow-500 dark:hover:bg-yellow-600 transition-colors"
                  >
                    + Task
                  </button>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">Add New Task</h3>
                  <form onSubmit={handleAddTask} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Task Title
                      </label>
                      <input
                        type="text"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description (Optional)
                      </label>
                      <textarea
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white h-24 resize-none"
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowTaskForm(false)}
                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-black dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                        disabled={loading}
                      >
                        {loading ? 'Adding...' : 'Add Task'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {tasks.length > 0 && !showTaskForm && (
                <div className="mt-6 space-y-4">
                  {tasks.map(task => (
                    <div 
                      key={task._id}
                      className={`${course.color} dark:bg-opacity-20 rounded-xl p-4 transition-all hover:shadow-md`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <button 
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                                ${task.completed 
                                  ? 'border-green-500 bg-green-500 text-white dark:border-green-400 dark:bg-green-400' 
                                  : 'border-gray-500 dark:border-gray-400 hover:bg-white/50 dark:hover:bg-black/20'
                                }`}
                              onClick={async () => {
                                try {
                                  await toggleTaskCompletion(task._id);
                                  setTasks(tasks.map(t =>
                                    t._id === task._id ? { ...t, completed: !t.completed } : t
                                  ));
                                } catch (error) {
                                  console.error('Error toggling task:', error);
                                }
                              }}
                            >
                              {task.completed && <CheckCircleIcon className="h-5 w-5" />}
                            </button>
                            <h3 className={`font-medium ${
                              task.completed 
                                ? 'line-through text-gray-400 dark:text-gray-500' 
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              {task.title}
                            </h3>
                          </div>
                          {task.description && (
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
                          )}
                          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">⋯</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'files' && (
            <div className="text-center py-12">
              <DocumentIcon className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">No files found</p>
              <button className="bg-yellow-400 dark:bg-yellow-500 text-black dark:text-white px-4 py-2 rounded-lg hover:bg-yellow-500 dark:hover:bg-yellow-600 transition-colors">
                + File
              </button>
            </div>
          )}
          {activeTab === 'links' && (
            <div className="text-center py-12">
              <LinkIcon className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">No links found</p>
              <button className="bg-yellow-400 dark:bg-yellow-500 text-black dark:text-white px-4 py-2 rounded-lg hover:bg-yellow-500 dark:hover:bg-yellow-600 transition-colors">
                + Link
              </button>
            </div>
          )}
          {activeTab === 'studysets' && (
            <div className="text-center py-12">
              <AcademicCapIcon className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">No study sets found</p>
              <button className="bg-yellow-400 dark:bg-yellow-500 text-black dark:text-white px-4 py-2 rounded-lg hover:bg-yellow-500 dark:hover:bg-yellow-600 transition-colors">
                + Study Set
              </button>
            </div>
          )}
        </div>
      </div>

      <EditCourseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditCourse}
        onDelete={handleDeleteCourse}
        course={course}
        loading={loading}
      />
    </div>
  );
}

function CreateCourseModal({ isOpen, onClose, onSave, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    instructor: '',
    location: '',
    color: 'yellow'
  });

  const colors = [
    { name: 'yellow', class: 'bg-yellow-100' },
    { name: 'blue', class: 'bg-blue-100' },
    { name: 'green', class: 'bg-green-100' },
    { name: 'purple', class: 'bg-purple-100' },
    { name: 'pink', class: 'bg-pink-100' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-card rounded-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-serif mb-6 text-gray-900 dark:text-white">Create New Course</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Course Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Instructor
              </label>
              <input
                type="text"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Folder Color
              </label>
              <div className="flex space-x-2">
                {colors.map(color => (
                  <button
                    key={color.name}
                    type="button"
                    className={`w-10 h-10 rounded-xl ${color.class} dark:bg-opacity-20 ${
                      formData.color === color.name ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800' : ''
                    }`}
                    onClick={() => setFormData({ ...formData, color: color.name })}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditCourseModal({ isOpen, onClose, onSave, onDelete, course, loading }) {
  const [formData, setFormData] = useState({
    name: course?.name || '',
    instructor: course?.instructor || '',
    location: course?.location || '',
    color: course?.color || 'yellow'
  });

  const colors = [
    { name: 'yellow', class: 'bg-yellow-100' },
    { name: 'blue', class: 'bg-blue-100' },
    { name: 'green', class: 'bg-green-100' },
    { name: 'purple', class: 'bg-purple-100' },
    { name: 'pink', class: 'bg-pink-100' }
  ];

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name,
        instructor: course.instructor,
        location: course.location,
        color: course.color
      });
    }
  }, [course]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-card rounded-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-serif mb-6 text-gray-900 dark:text-white">Edit Course</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Course Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Instructor
              </label>
              <input
                type="text"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Folder Color
              </label>
              <div className="flex space-x-2">
                {colors.map(color => (
                  <button
                    key={color.name}
                    type="button"
                    className={`w-10 h-10 rounded-xl ${color.class} dark:bg-opacity-20 ${
                      formData.color === color.name ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800' : ''
                    }`}
                    onClick={() => setFormData({ ...formData, color: color.name })}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
                  onDelete(course._id);
                }
              }}
              className="px-4 py-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              Delete Course
            </button>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function Courses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load courses on component mount
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const response = await fetchCourses();
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCourse = async (formData) => {
    try {
      setLoading(true);
      const response = await createCourse(formData);
      setCourses([...courses, response.data]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating course:', error);
      setError('Failed to create course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (selectedCourse) {
    return <CourseView course={selectedCourse} onBack={setSelectedCourse} />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-serif text-gray-900 dark:text-white">Courses</h1>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-black dark:bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Course</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Search Bar */}
      <div className="max-w-2xl">
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search a course"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Course Grid */}
      {loading && courses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Loading courses...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            📚
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">No courses yet. Create your first course!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <button
              key={course._id}
              className={`bg-${course.color}-100 dark:bg-${course.color}-900/20 rounded-xl p-6 text-left cursor-pointer transition-all hover:scale-[0.98] hover:shadow-lg group`}
              onClick={() => setSelectedCourse(course)}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-medium text-gray-800 dark:text-white">{course.name}</h3>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 dark:text-gray-400">
                  ⋯
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                  <AcademicCapIcon className="h-4 w-4 mr-2" />
                  {course.instructor}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  {course.location}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <CreateCourseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateCourse}
        loading={loading}
      />
    </div>
  );
}

export default Courses; 