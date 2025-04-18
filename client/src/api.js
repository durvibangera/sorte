import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Add token to request headers if available
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', req.url, req.method);
    return req;
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

// For testing, set a temporary token if none exists
if (!localStorage.getItem('token')) {
    // This is a temporary solution to allow testing without login
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmFhMDk3ZjM1MjIwM2M3NzcyMzYzZCIsImlhdCI6MTcxMDkyMTg3OSwiZXhwIjoxNzEwOTI1NDc5fQ.TqZMIBYQPqWpTaZQlGKRsXYwutP4m2PtXVBnp-7o8eY');
}

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