// sorte/client/src/api.js
import axios from 'axios';

const API = axios.create({ 
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add response interceptor for debugging
API.interceptors.response.use(
    (response) => {
        console.log('API Response:', response.config.url, response.status);
        return response;
    },
    (error) => {
        console.error('API Error:', error.config?.url, error.response?.status, error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Auth endpoints
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);

// Course endpoints
export const fetchCourses = () => API.get('/courses');
export const createCourse = (courseData) => API.post('/courses', courseData);
export const getCourseById = (id) => API.get(`/courses/${id}`);
export const updateCourse = (id, courseData) => API.put(`/courses/${id}`, courseData);
export const deleteCourse = (id) => API.delete(`/courses/${id}`);

// Task endpoints
export const fetchAllTasks = () => API.get('/tasks');
export const fetchTasksByCourse = (courseId) => API.get(`/tasks/course/${courseId}`);
export const createTask = (taskData) => API.post('/tasks', taskData);
export const getTaskById = (id) => API.get(`/tasks/${id}`);
export const updateTask = (id, taskData) => API.put(`/tasks/${id}`, taskData);
export const toggleTaskCompletion = (id) => API.patch(`/tasks/${id}/toggle`);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

// User endpoints
export const fetchUserProfile = () => API.get('/auth/profile');

export const updateUserProfile = async (userData) => {
  try {
    const response = await API.put('/auth/profile', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Schedule endpoints
export const getScheduleEvents = () => API.get('/schedule');
export const createScheduleEvent = (eventData) => API.post('/schedule', eventData);
export const updateScheduleEvent = (id, eventData) => API.put(`/schedule/${id}`, eventData);
export const deleteScheduleEvent = (id) => API.delete(`/schedule/${id}`);
export const syncWithGoogleCalendar = () => API.post('/schedule/sync-google');