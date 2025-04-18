import { useState } from 'react';
import { PlusIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

function Home({ user }) {
  const [tasks] = useState([
    {
      id: 1,
      title: 'Complete ML Assignment 3',
      course: 'Machine Learning',
      dueDate: '2024-04-20',
      color: 'yellow',
      completed: false
    },
    {
      id: 2,
      title: 'Study Neural Networks',
      course: 'Machine Learning',
      dueDate: '2024-04-19',
      color: 'yellow',
      completed: false
    },
    {
      id: 3,
      title: 'Practice Data Structures',
      course: 'Data Structures',
      dueDate: '2024-04-18',
      color: 'green',
      completed: true
    },
    {
      id: 4,
      title: 'Complete Web Dev Project',
      course: 'Web Development',
      dueDate: '2024-04-21',
      color: 'blue',
      completed: false
    }
  ]);

  const [filter, setFilter] = useState('ongoing');
  const [showCompleted, setShowCompleted] = useState(false);

  const filteredTasks = tasks.filter(task => showCompleted ? task.completed : !task.completed);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-serif mb-2">Hello, {user.name}</h1>
        <p className="text-gray-600">Thursday, April 17</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-8 space-y-8">
          {/* To-do Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif">To-do</h2>
              <button className="bg-black text-white rounded-full p-2 hover:bg-gray-800 transition-colors">
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <button
                className={`px-4 py-2 rounded-full transition-colors ${
                  !showCompleted
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setShowCompleted(false)}
              >
                Ongoing
              </button>
              <button
                className={`px-4 py-2 rounded-full transition-colors ${
                  showCompleted
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setShowCompleted(true)}
              >
                Completed
              </button>
              <button className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-colors flex items-center justify-center">
                💡
              </button>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  📋
                </div>
                <p className="text-gray-500">
                  {showCompleted ? 'No completed tasks' : 'No tasks to accomplish'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`bg-${task.color}-50 rounded-xl p-4 transition-all hover:shadow-md`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <button 
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                              ${task.completed 
                                ? 'border-green-500 bg-green-500 text-white' 
                                : `border-${task.color}-500 hover:bg-${task.color}-100`
                              }`}
                          >
                            {task.completed && <CheckCircleIcon className="h-5 w-5" />}
                          </button>
                          <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                            {task.title}
                          </h3>
                        </div>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span className={`inline-block px-2 py-1 rounded-md bg-${task.color}-100 text-${task.color}-700`}>
                            {task.course}
                          </span>
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
        </div>

        {/* Right Column */}
        <div className="col-span-4">
          {/* ID Card */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="bg-blue-600 p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white rounded-full"></div>
                <div>
                  <h3 className="text-white font-bold text-xl">SSC</h3>
                  <p className="text-blue-100">Student ID Card</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="text-gray-500 text-sm">NAME</span>
                <p className="font-medium">{user.name.toUpperCase()}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">SCHOOL</span>
                <p className="font-medium">{user.school}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500 text-sm">BIRTHDAY</span>
                  <p className="font-medium">{user.birthday}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">YEAR LEVEL</span>
                  <p className="font-medium">{user.yearLevel}</p>
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