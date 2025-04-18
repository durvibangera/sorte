import { useState } from 'react';
import { ChevronLeftIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'DUVI',
    school: 'DJSCE',
    birthday: '2005-09-12',
    yearLevel: 'SY',
    photo: null
  });

  const [selectedColor, setSelectedColor] = useState('bg-blue-100');
  const [selectedLogo, setSelectedLogo] = useState('ssc');
  const [isSuccess, setIsSuccess] = useState(false);

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
    setIsSuccess(true);
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

        {/* Customization Options */}
        <div className="space-y-6">
          {/* Color Selection */}
          <div>
            <h2 className="text-base mb-3 text-gray-900 dark:text-white">Color</h2>
            <div className="flex gap-3 justify-center">
              {colors.map(color => (
                <button
                  key={color.name}
                  className={`w-10 h-10 rounded-full ${color.class} ${
                    selectedColor === color.class 
                      ? 'ring-2 ring-offset-2 ring-blue-400/50 dark:ring-offset-gray-900' 
                      : ''
                  }`}
                  onClick={() => setSelectedColor(color.class)}
                />
              ))}
              <button className="w-10 h-10 rounded-full bg-black/80 dark:bg-gray-700/80 text-white flex items-center justify-center text-xl">
                +
              </button>
            </div>
          </div>

          {/* Logo Selection */}
          <div>
            <h2 className="text-base mb-3 text-gray-900 dark:text-white">Logo</h2>
            <div className="grid grid-cols-2 gap-3">
              {logos.map(logo => (
                <button
                  key={logo.id}
                  className={`aspect-video border dark:border-gray-700/50 rounded-xl p-3 flex items-center justify-center ${
                    selectedLogo === logo.id 
                      ? 'ring-2 ring-blue-400/50 dark:ring-blue-400/30' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  } ${
                    logo.id === 'upload' ? 'bg-gray-50/80 dark:bg-gray-800/30' : 'bg-white/80 dark:bg-gray-800/30'
                  }`}
                  onClick={() => {
                    if (logo.id === 'upload') {
                      document.getElementById('logo-upload').click();
                    } else {
                      setSelectedLogo(logo.id);
                    }
                  }}
                >
                  {logo.id === 'upload' ? (
                    <>
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                      />
                      <div className="text-center text-gray-500/90 dark:text-gray-400/90">
                        <PhotoIcon className="h-7 w-7 mx-auto mb-1.5" />
                        <span className="text-sm">Upload a custom logo</span>
                      </div>
                    </>
                  ) : (
                    <span className="text-sm font-medium text-gray-900/90 dark:text-white/90">{logo.name}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700/90 dark:text-gray-300/90 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value.toUpperCase() }))}
                className="w-full px-3 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 dark:bg-gray-800/50 dark:text-white/90"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700/90 dark:text-gray-300/90 mb-1">
                School
              </label>
              <input
                type="text"
                value={formData.school}
                onChange={(e) => setFormData(prev => ({ ...prev, school: e.target.value.toUpperCase() }))}
                className="w-full px-3 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 dark:bg-gray-800/50 dark:text-white/90"
                placeholder="Enter your school"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700/90 dark:text-gray-300/90 mb-1">
                Birthday
              </label>
              <input
                type="date"
                value={formData.birthday}
                onChange={(e) => setFormData(prev => ({ ...prev, birthday: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 dark:bg-gray-800/50 dark:text-white/90"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700/90 dark:text-gray-300/90 mb-1">
                Year Level
              </label>
              <input
                type="text"
                value={formData.yearLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, yearLevel: e.target.value.toUpperCase() }))}
                className="w-full px-3 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 dark:bg-gray-800/50 dark:text-white/90"
                placeholder="Enter your year level"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3 bg-gray-100/80 dark:bg-gray-800/50 text-gray-900/90 dark:text-white/90 rounded-xl hover:bg-gray-200/80 dark:hover:bg-gray-700/50 transition-colors font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile; 