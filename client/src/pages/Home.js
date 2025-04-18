import { useState, useEffect } from 'react';
import { PlusIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { fetchAllTasks, toggleTaskCompletion } from '../api';

function Home({ user }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  // Fetch all tasks when component mounts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const response = await fetchAllTasks();
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to load tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleToggleTask = async (taskId) => {
    try {
      await toggleTaskCompletion(taskId);
      // Update local state
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...task, completed: !task.completed } : task
      ));
    } catch (error) {
      console.error('Error toggling task:', error);
      setError('Failed to update task. Please try again.');
    }
  };

  const filteredTasks = tasks.filter(task => showCompleted ? task.completed : !task.completed);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-serif mb-2 text-gray-900 dark:text-white">Hello, {user.name}</h1>
        <p className="text-gray-600 dark:text-gray-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-8 space-y-8">
          {/* To-do Section */}
          <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm transition-colors duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif text-gray-900 dark:text-white">To-do</h2>
              <button className="bg-black dark:bg-gray-700 text-white rounded-full p-2 hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex items-center space-x-2 mb-6">
              <button
                className={`px-4 py-2 rounded-full transition-colors ${
                  !showCompleted
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setShowCompleted(false)}
              >
                Ongoing
              </button>
              <button
                className={`px-4 py-2 rounded-full transition-colors ${
                  showCompleted
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setShowCompleted(true)}
              >
                Completed
              </button>
            </div>

            {loading ? (
              <div className="text-center py-6">
                <p className="text-gray-500 dark:text-gray-400">Loading tasks...</p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  📋
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  {showCompleted ? 'No completed tasks' : 'No tasks to accomplish'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div 
                    key={task._id} 
                    className={`bg-${task.color}-50 dark:bg-${task.color}-900/20 rounded-xl p-4 transition-all hover:shadow-md`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <button 
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                              ${task.completed 
                                ? 'border-green-500 bg-green-500 text-white' 
                                : `border-${task.color}-500 dark:border-${task.color}-400 hover:bg-${task.color}-100 dark:hover:bg-${task.color}-900/30`
                              }`}
                            onClick={() => handleToggleTask(task._id)}
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
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className={`inline-block px-2 py-1 rounded-md bg-${task.color}-100 dark:bg-${task.color}-900/30 text-${task.color}-700 dark:text-${task.color}-400`}>
                            {task.course ? task.course.name : 'No course'}
                          </span>
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
        </div>

        {/* Right Column */}
        <div className="col-span-4">
          {/* ID Card */}
          <div className="bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-sm transition-colors duration-200">
            <div className="bg-blue-600 dark:bg-blue-700 p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white dark:bg-gray-200 rounded-full"></div>
                <div>
                  <h3 className="text-white font-bold text-xl">SSC</h3>
                  <p className="text-blue-100 dark:text-blue-200">Student ID Card</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="text-gray-500 dark:text-gray-400 text-sm">NAME</span>
                <p className="font-medium text-gray-900 dark:text-white">{user.name.toUpperCase()}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 text-sm">SCHOOL</span>
                <p className="font-medium text-gray-900 dark:text-white">{user.school}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">BIRTHDAY</span>
                  <p className="font-medium text-gray-900 dark:text-white">{user.birthday}</p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">YEAR LEVEL</span>
                  <p className="font-medium text-gray-900 dark:text-white">{user.yearLevel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 