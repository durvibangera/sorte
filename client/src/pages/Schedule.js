import { useState, useEffect } from 'react';
import { 
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon
} from '@heroicons/react/24/outline';

function Schedule() {
  const [selectedDay, setSelectedDay] = useState('FRI');
  const [currentTime, setCurrentTime] = useState(new Date());

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

  // This would come from your backend in the future
  const schedule = {
    MON: [],
    TUE: [
      {
        id: 1,
        name: 'CMPM',
        instructor: 'John Doe',
        location: '51',
        startTime: '08:00',
        endTime: '09:00',
        color: 'bg-pink-100'
      }
    ],
    WED: [],
    THU: [],
    FRI: [
      {
        id: 2,
        name: 'STATS',
        instructor: 'Alisha Banz',
        location: '51',
        startTime: '10:50',
        endTime: '11:50',
        color: 'bg-yellow-100'
      }
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getCurrentClass = () => {
    const classes = schedule[selectedDay];
    if (!classes) return null;

    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

    return classes.find(cls => {
      return cls.startTime <= currentTimeString && currentTimeString <= cls.endTime;
    });
  };

  const currentClass = getCurrentClass();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif">Class Schedule</h1>
          <p className="text-gray-600 mt-1">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <button className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>

      {/* iPod Interface */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-200 rounded-3xl p-6 shadow-xl">
          <div className="flex gap-4 items-center">
            {/* Screen */}
            <div className="w-[280px] bg-white rounded-lg p-3">
              {currentClass ? (
                <div className={`${currentClass.color} rounded-lg p-3`}>
                  <div className="flex justify-between items-start mb-1">
                    <h2 className="text-lg font-medium">{currentClass.name}</h2>
                    <div className="text-xs text-gray-600">
                      {currentClass.startTime} - {currentClass.endTime}
                    </div>
                  </div>
                  <div className="space-y-0.5 text-sm text-gray-600">
                    <p>{currentClass.instructor}</p>
                    <p>Room {currentClass.location}</p>
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-2 h-1.5 bg-white/50 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-1/2"></div>
                  </div>
                </div>
              ) : (
                <div className="h-[80px] flex items-center justify-center text-gray-500 text-sm">
                  No class scheduled
                </div>
              )}
            </div>

            {/* iPod Controls */}
            <div className="relative h-32 w-32 flex-shrink-0">
              <div className="absolute inset-0 bg-white rounded-full shadow-inner"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-400 font-medium text-sm">SCHEDULE</div>
              </div>
              <button 
                onClick={() => {
                  const currentIndex = days.indexOf(selectedDay);
                  const prevIndex = (currentIndex - 1 + days.length) % days.length;
                  setSelectedDay(days[prevIndex]);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button 
                onClick={() => {
                  const currentIndex = days.indexOf(selectedDay);
                  const nextIndex = (currentIndex + 1) % days.length;
                  setSelectedDay(days[nextIndex]);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-600 hover:text-gray-900"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
              <button className="absolute bottom-3 left-1/2 -translate-x-1/2 p-1.5 text-gray-600 hover:text-gray-900">
                <PlayIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        {/* Week Days */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`py-2 rounded-xl font-medium transition-colors ${
                selectedDay === day
                  ? 'bg-yellow-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-5 gap-4">
          {days.map(day => (
            <div key={day} className="space-y-2">
              {schedule[day]?.map(cls => (
                <div
                  key={cls.id}
                  className={`${cls.color} rounded-lg p-3 transition-all hover:shadow-md`}
                  style={{
                    marginTop: `${(parseInt(cls.startTime.split(':')[0]) - 8) * 2}rem`
                  }}
                >
                  <div className="font-medium text-sm">{cls.name}</div>
                  <div className="text-xs text-gray-600">
                    {cls.startTime} - {cls.endTime}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Schedule; 