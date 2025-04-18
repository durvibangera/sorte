import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

// Import images
import cozyStudySpace from '../assets/music/chill beats/cozy study space.jpg';
import natureStudySpace from '../assets/music/nature/nature study space.jpg';

export default function StudySpaceSelection() {
  const navigate = useNavigate();

  const studySpaces = [
    {
      id: 'cozy',
      name: 'Cozy Room',
      description: 'A warm and comfortable study space with lo-fi beats',
      image: cozyStudySpace
    },
    {
      id: 'nature',
      name: 'Forest View',
      description: 'A peaceful nature setting with calming ambient sounds',
      image: natureStudySpace
    }
  ];

  const selectSpace = (spaceId) => {
    // Store the selected space in localStorage
    localStorage.setItem('selectedStudySpace', spaceId);
    navigate('/pomodoro');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ChevronLeftIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white ml-4">Choose Your Study Environment</h1>
          </div>

          <div className="bg-white dark:bg-dark-card shadow-lg rounded-2xl p-6 mb-8 transition-colors duration-200">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Select a study environment to customize your Pomodoro experience. Each environment comes with its own background and curated playlist to help you focus.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studySpaces.map(space => (
                <div 
                  key={space.id}
                  className="group cursor-pointer rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] transform-gpu dark:shadow-gray-900/30"
                  onClick={() => selectSpace(space.id)}
                >
                  <div className="relative aspect-video">
                    <img 
                      src={space.image} 
                      alt={space.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-medium mb-1">{space.name}</h3>
                      <p className="text-sm text-white/90">{space.description}</p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 transition-colors duration-200">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {space.id === 'cozy' ? 'Lo-fi Beats' : 'Nature Sounds'}
                      </div>
                      <button 
                        className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800/30 transition-colors"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 