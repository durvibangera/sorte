import { useState } from 'react';
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

function CourseView({ course, onBack }) {
  const [activeTab, setActiveTab] = useState('todo');
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
    description: ''
  });

  const tabs = [
    { id: 'todo', label: 'To-do', color: 'bg-blue-100' },
    { id: 'files', label: 'Files', color: 'bg-green-100' },
    { id: 'studysets', label: 'Study Sets', color: 'bg-purple-100' },
    { id: 'links', label: 'Links', color: 'bg-pink-100' }
  ];

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      id: Date.now(),
      ...newTask,
      completed: false,
      course: course.name,
      color: course.color
    };
    setTasks([...tasks, task]);
    setNewTask({ title: '', dueDate: '', description: '' });
    setShowTaskForm(false);
    // Note: In the future, this will be connected to backend and reflected on homepage
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${course.color} rounded-t-xl p-8`}>
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Back
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-serif mb-4">{course.name}</h1>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <AcademicCapIcon className="h-5 w-5 mr-2" />
                <span>Instructor: {course.instructor}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPinIcon className="h-5 w-5 mr-2" />
                <span>Location: {course.location}</span>
              </div>
            </div>
          </div>
          <button className="border border-gray-800 rounded-lg px-4 py-2 hover:bg-white/10 transition-colors">
            Edit Course
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="flex border-b">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`flex-1 px-4 py-3 text-center border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
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
              {!showTaskForm ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                    📋
                  </div>
                  <p className="text-gray-500 mb-4">
                    {tasks.length === 0 ? 'No tasks to accomplish' : `${tasks.length} tasks`}
                  </p>
                  <button 
                    onClick={() => setShowTaskForm(true)}
                    className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    + Task
                  </button>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-xl font-medium mb-4">Add New Task</h3>
                  <form onSubmit={handleAddTask} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Task Title
                      </label>
                      <input
                        type="text"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description (Optional)
                      </label>
                      <textarea
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowTaskForm(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Add Task
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {tasks.length > 0 && !showTaskForm && (
                <div className="mt-6 space-y-4">
                  {tasks.map(task => (
                    <div 
                      key={task.id}
                      className={`${course.color} rounded-xl p-4 transition-all hover:shadow-md`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <button 
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                                ${task.completed 
                                  ? 'border-green-500 bg-green-500 text-white' 
                                  : 'border-gray-500 hover:bg-white/50'
                                }`}
                              onClick={() => {
                                const updatedTasks = tasks.map(t =>
                                  t.id === task.id ? { ...t, completed: !t.completed } : t
                                );
                                setTasks(updatedTasks);
                              }}
                            >
                              {task.completed && <CheckCircleIcon className="h-5 w-5" />}
                            </button>
                            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                              {task.title}
                            </h3>
                          </div>
                          {task.description && (
                            <p className="mt-2 text-sm text-gray-600">{task.description}</p>
                          )}
                          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{task.dueDate}</span>
                            </div>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">⋯</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'files' && (
            <div className="text-center py-12">
              <DocumentIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">No files found</p>
              <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors">
                + File
              </button>
            </div>
          )}
          {activeTab === 'links' && (
            <div className="text-center py-12">
              <LinkIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">No links found</p>
              <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors">
                + Link
              </button>
            </div>
          )}
          {activeTab === 'studysets' && (
            <div className="text-center py-12">
              <AcademicCapIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">No study sets found</p>
              <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors">
                + Study Set
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CreateCourseModal({ isOpen, onClose, onSave }) {
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
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-serif mb-6">Create New Course</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instructor
              </label>
              <input
                type="text"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Folder Color
              </label>
              <div className="flex space-x-2">
                {colors.map(color => (
                  <button
                    key={color.name}
                    type="button"
                    className={`w-10 h-10 rounded-xl ${color.class} ${
                      formData.color === color.name ? 'ring-2 ring-offset-2 ring-blue-500' : ''
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
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Courses() {
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      name: 'MACHINE LEARNING', 
      color: 'bg-yellow-100',
      instructor: 'Kriti Srivastava',
      location: '51'
    }
  ]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCourse = (formData) => {
    const newCourse = {
      id: courses.length + 1,
      name: formData.name.toUpperCase(),
      color: `bg-${formData.color}-100`,
      instructor: formData.instructor,
      location: formData.location
    };
    setCourses([...courses, newCourse]);
    setIsCreateModalOpen(false);
  };

  if (selectedCourse) {
    return <CourseView course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-serif">Courses</h1>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Course</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl">
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search a course"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <button
            key={course.id}
            className={`${course.color} rounded-xl p-6 text-left cursor-pointer transition-all hover:scale-[0.98] hover:shadow-lg group`}
            onClick={() => setSelectedCourse(course)}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-medium text-gray-800">{course.name}</h3>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                ⋯
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-gray-600 text-sm">
                <AcademicCapIcon className="h-4 w-4 mr-2" />
                {course.instructor}
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPinIcon className="h-4 w-4 mr-2" />
                {course.location}
              </div>
            </div>
          </button>
        ))}
      </div>

      <CreateCourseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateCourse}
      />
    </div>
  );
}

export default Courses; 