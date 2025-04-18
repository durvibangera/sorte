import { useState, useEffect } from 'react';
import { ChevronLeftIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    birthday: '',
    yearLevel: '',
    photo: null
  });

  const [selectedColor, setSelectedColor] = useState('bg-blue-100');
  const [selectedLogo, setSelectedLogo] = useState('ssc');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setFormData(prev => ({
        ...prev,
        name: userData.name || '',
        school: userData.school || '',
        birthday: userData.birthday || '',
        yearLevel: userData.yearLevel || '',
        photo: userData.photo || null
      }));
    }
  }, []);

  const colors = [
    { name: 'gray', class: 'bg-gray-100/80 dark:bg-gray-800/50' },
    { name: 'pink', class: 'bg-pink-100/80 dark:bg-pink-800/20' },
    { name: 'blue', class: 'bg-blue-100/80 dark:bg-blue-800/20' },
    { name: 'purple', class: 'bg-purple-100/80 dark:bg-purple-800/20' },
    { name: 'green', class: 'bg-green-100/80 dark:bg-green-800/20' },
    { name: 'yellow', class: 'bg-yellow-100/80 dark:bg-yellow-800/20' },
    { name: 'orange', class: 'bg-orange-100/80 dark:bg-orange-800/20' }
  ];

  const logos = [
    { id: 'upload', name: 'Upload a custom logo', image: null },
    { id: 'student', name: 'Student ID', image: '/logos/student.png' },
    { id: 'ssc', name: 'Struggling Students Club', image: '/logos/ssc.png' },
    { id: 'scholar', name: 'Scholar Me Senpai', image: '/logos/scholar.png' },
    { id: 'academic', name: 'Academic Slayer', image: '/logos/academic.png' },
    { id: 'victim', name: 'Academic Victim', image: '/logos/victim.png' }
  ];

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        logos[0].image = reader.result;
        setSelectedLogo('upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Get existing user data from localStorage
      const storedUserData = localStorage.getItem('userData');
      let updatedUserData;
      
      if (storedUserData) {
        // Update existing user data
        updatedUserData = {
          ...JSON.parse(storedUserData),
          name: formData.name,
          school: formData.school,
          yearLevel: formData.yearLevel,
          birthday: formData.birthday,
          photo: formData.photo
        };
      } else {
        // Create new user data
        updatedUserData = {
          name: formData.name,
          school: formData.school,
          yearLevel: formData.yearLevel,
          birthday: formData.birthday,
          photo: formData.photo
        };
      }
      
      // Save to localStorage
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      
      // Show success state
      setIsSuccess(true);
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-serif italic text-gray-900 dark:text-white">Hello, {formData.name.toLowerCase()}</h1>
              <button 
                onClick={() => setIsSuccess(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* ID Card */}
          <div className={`${selectedColor} rounded-2xl p-5 shadow-sm transition-colors duration-200`}>
            <div className="flex gap-4">
              <div className="space-y-2">
                <div className="w-28 h-28 bg-white/90 dark:bg-gray-800/90 rounded-lg overflow-hidden">
                  {formData.photo ? (
                    <img 
                      src={formData.photo} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <PhotoIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="w-28 h-8 bg-black/10 dark:bg-white/5 rounded"></div>
              </div>
              <div className="flex-1">
                <div className="mb-6">
                  {selectedLogo === 'ssc' && (
                    <div className="text-blue-600/90 dark:text-blue-400/90">
                      <div className="text-2xl font-bold tracking-wider flex items-center gap-1">
                        SSC
                        <span className="text-yellow-400 text-xl">★</span>
                        <span className="text-yellow-400 text-xl">★</span>
                      </div>
                      <div className="text-sm font-medium mt-0.5">STRUGGLING STUDENTS CLUB</div>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="grid grid-cols-2 gap-y-3">
                    <div>
                      <div className="text-xs text-gray-600/90 dark:text-gray-400/90">NAME</div>
                      <div className="font-medium text-gray-900/90 dark:text-white/90">{formData.name}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600/90 dark:text-gray-400/90">BIRTHDAY</div>
                      <div className="font-medium text-gray-900/90 dark:text-white/90">
                        {formData.birthday.split('-').join('-')}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600/90 dark:text-gray-400/90">SCHOOL</div>
                      <div className="font-medium text-gray-900/90 dark:text-white/90">{formData.school}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600/90 dark:text-gray-400/90">YEAR LEVEL</div>
                      <div className="font-medium text-gray-900/90 dark:text-white/90">{formData.yearLevel}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="text-xl font-medium text-center text-gray-900 dark:text-white">Edit ID</h1>
          <div className="w-8" /> {/* Spacer for centering */}
        </div>

        {/* ID Card Preview */}
        <div className={`${selectedColor} rounded-2xl p-5 shadow-sm transition-colors duration-200`}>
          <div className="flex gap-4">
            <div className="space-y-2">
              <div className="w-28 h-28 bg-white/90 dark:bg-gray-800/90 rounded-lg overflow-hidden">
                {formData.photo ? (
                  <img 
                    src={formData.photo} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <PhotoIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                  </div>
                )}
              </div>
              <div className="w-28 h-8 bg-black/10 dark:bg-white/5 rounded"></div>
            </div>
            <div className="flex-1">
              <div className="mb-6">
                {selectedLogo === 'ssc' && (
                  <div className="text-blue-600/90 dark:text-blue-400/90">
                    <div className="text-2xl font-bold tracking-wider flex items-center gap-1">
                      SSC
                      <span className="text-yellow-400 text-xl">★</span>
                      <span className="text-yellow-400 text-xl">★</span>
                    </div>
                    <div className="text-sm font-medium mt-0.5">STRUGGLING STUDENTS CLUB</div>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <div className="grid grid-cols-2 gap-y-3">
                  <div>
                    <div className="text-xs text-gray-600/90 dark:text-gray-400/90">NAME</div>
                    <div className="font-medium text-gray-900/90 dark:text-white/90">{formData.name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600/90 dark:text-gray-400/90">BIRTHDAY</div>
                    <div className="font-medium text-gray-900/90 dark:text-white/90">
                      {formData.birthday.split('-').join('-')}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600/90 dark:text-gray-400/90">SCHOOL</div>
                    <div className="font-medium text-gray-900/90 dark:text-white/90">{formData.school}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600/90 dark:text-gray-400/90">YEAR LEVEL</div>
                    <div className="font-medium text-gray-900/90 dark:text-white/90">{formData.yearLevel}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="school" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              School
            </label>
            <input
              type="text"
              id="school"
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="yearLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Year Level
            </label>
            <input
              type="text"
              id="yearLevel"
              value={formData.yearLevel}
              onChange={(e) => setFormData({ ...formData, yearLevel: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Birthday (DD-MM-YYYY)
            </label>
            <input
              type="text"
              id="birthday"
              value={formData.birthday}
              onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
              placeholder="DD-MM-YYYY"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Profile Photo
            </label>
            <div className="mt-1 flex items-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                {formData.photo ? (
                  <img 
                    src={formData.photo} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <PhotoIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  </div>
                )}
              </div>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="ml-4 block w-full text-sm text-gray-500 dark:text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-medium
                  file:bg-blue-50 file:text-blue-700
                  dark:file:bg-blue-900/30 dark:file:text-blue-400
                  hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50"
              />
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md">
            {error}
          </div>
        )}

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

export default Profile; 