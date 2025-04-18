import { useState } from 'react';
import { ChevronLeftIcon, PhotoIcon, PencilIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    school: 'Example University',
    yearLevel: '3rd Year',
    birthday: '2000-01-01',
    bio: 'Computer Science student passionate about web development and AI.',
    interests: ['Programming', 'Machine Learning', 'Web Development'],
    achievements: [
      { id: 1, title: 'Dean\'s List 2023', date: '2023' },
      { id: 2, title: 'Hackathon Winner', date: '2022' },
      { id: 3, title: 'Research Publication', date: '2023' }
    ]
  });

  const [editForm, setEditForm] = useState({ ...userData });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(editForm);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [formData, setFormData] = useState({
    name: 'DUVI',
    school: 'DJSCE',
    birthday: '2005-09-12',
    yearLevel: 'SY',
    photo: null
  });

  const [selectedColor, setSelectedColor] = useState('bg-blue-100');
  const [selectedLogo, setSelectedLogo] = useState('ssc');

  const colors = [
    { name: 'gray', class: 'bg-gray-100' },
    { name: 'pink', class: 'bg-pink-100' },
    { name: 'blue', class: 'bg-blue-100' },
    { name: 'purple', class: 'bg-purple-100' },
    { name: 'green', class: 'bg-green-100' },
    { name: 'yellow', class: 'bg-yellow-100' },
    { name: 'orange', class: 'bg-orange-100' }
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-4xl font-serif">Edit ID</h1>
      </div>

      {/* ID Card Preview */}
      <div className={`max-w-md mx-auto ${selectedColor} rounded-xl p-6 shadow-md`}>
        <div className="flex gap-6">
          <div className="w-32 h-32 bg-white rounded-lg overflow-hidden flex items-center justify-center">
            {formData.photo ? (
              <img 
                src={formData.photo} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <PhotoIcon className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <div className="h-16 mb-4">
              {selectedLogo === 'upload' && logos[0].image ? (
                <img 
                  src={logos[0].image} 
                  alt="Custom Logo" 
                  className="h-full object-contain"
                />
              ) : (
                <div className="text-xl font-bold">
                  {selectedLogo === 'ssc' ? 'SSC' : 'STUDENT ID'}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">NAME</span>
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">SCHOOL</span>
                <span className="font-medium">{formData.school}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">BIRTHDAY</span>
                <span className="font-medium">
                  {new Date(formData.birthday).toLocaleDateString('en-GB')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">YEAR LEVEL</span>
                <span className="font-medium">{formData.yearLevel}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full h-8 bg-black/10 rounded"></div>
        </div>
      </div>

      {/* Customization Options */}
      <div className="max-w-md mx-auto space-y-8">
        {/* Color Selection */}
        <div>
          <h2 className="text-lg font-medium mb-4">Color</h2>
          <div className="flex gap-4">
            {colors.map(color => (
              <button
                key={color.name}
                className={`w-12 h-12 rounded-full ${color.class} ${
                  selectedColor === color.class 
                    ? 'ring-2 ring-offset-2 ring-blue-500' 
                    : ''
                }`}
                onClick={() => setSelectedColor(color.class)}
              />
            ))}
            <button className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-2xl">
              +
            </button>
          </div>
        </div>

        {/* Logo Selection */}
        <div>
          <h2 className="text-lg font-medium mb-4">Logo</h2>
          <div className="grid grid-cols-2 gap-4">
            {logos.map(logo => (
              <button
                key={logo.id}
                className={`aspect-video border rounded-xl p-4 flex items-center justify-center ${
                  selectedLogo === logo.id 
                    ? 'ring-2 ring-blue-500' 
                    : 'hover:bg-gray-50'
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
                    <div className="text-center text-gray-500">
                      <PhotoIcon className="h-8 w-8 mx-auto mb-2" />
                      <span className="text-sm">Upload a custom logo</span>
                    </div>
                  </>
                ) : (
                  <span className="text-sm font-medium">{logo.name}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo
            </label>
            <div className="flex items-center">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center mr-4">
                {formData.photo ? (
                  <img 
                    src={formData.photo} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PhotoIcon className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="photo-upload"
                onChange={handlePhotoChange}
              />
              <button
                type="button"
                onClick={() => document.getElementById('photo-upload').click()}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Change Photo
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value.toUpperCase() }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              School
            </label>
            <input
              type="text"
              value={formData.school}
              onChange={(e) => setFormData(prev => ({ ...prev, school: e.target.value.toUpperCase() }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Birthday
            </label>
            <input
              type="date"
              value={formData.birthday}
              onChange={(e) => setFormData(prev => ({ ...prev, birthday: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year Level
            </label>
            <input
              type="text"
              value={formData.yearLevel}
              onChange={(e) => setFormData(prev => ({ ...prev, yearLevel: e.target.value.toUpperCase() }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          type="button"
          className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
        >
          Save
        </button>
      </div>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg">
            {/* Header */}
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <CheckIcon className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Profile Content */}
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleChange}
                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                    ) : (
                      userData.name
                    )}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleChange}
                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                    ) : (
                      userData.email
                    )}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">School</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <input
                        type="text"
                        name="school"
                        value={editForm.school}
                        onChange={handleChange}
                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                    ) : (
                      userData.school
                    )}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Year Level</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <input
                        type="text"
                        name="yearLevel"
                        value={editForm.yearLevel}
                        onChange={handleChange}
                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                    ) : (
                      userData.yearLevel
                    )}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Birthday</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <input
                        type="date"
                        name="birthday"
                        value={editForm.birthday}
                        onChange={handleChange}
                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                    ) : (
                      new Date(userData.birthday).toLocaleDateString()
                    )}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Bio</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <textarea
                        name="bio"
                        rows={3}
                        value={editForm.bio}
                        onChange={handleChange}
                        className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                      />
                    ) : (
                      userData.bio
                    )}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Interests</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex flex-wrap gap-2">
                      {userData.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Achievements</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {userData.achievements.map((achievement) => (
                        <li
                          key={achievement.id}
                          className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                        >
                          <div className="w-0 flex-1 flex items-center">
                            <span className="ml-2 flex-1 w-0 truncate">
                              {achievement.title} ({achievement.date})
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 