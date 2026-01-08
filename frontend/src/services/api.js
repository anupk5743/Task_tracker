import axios from 'axios';

const API_URL = 'http://localhost:3001/api/tasks';

// Helper to get headers with token
const getHeaders = () => {
    try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user && user.token) {
                return {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
            }
        }
    } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
    }
    return {};
};

// Get all tasks
export const getAllTasks = async () => {
    const response = await axios.get(API_URL, getHeaders());
    return response.data;
};

// Get single task
export const getTask = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, getHeaders());
    return response.data;
};

// Create task
export const createTask = async (taskData) => {
    const response = await axios.post(API_URL, taskData, getHeaders());
    return response.data;
};

// Update task
export const updateTask = async (id, taskData) => {
    const response = await axios.put(`${API_URL}/${id}`, taskData, getHeaders());
    return response.data;
};

// Delete task
export const deleteTask = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, getHeaders());
    return response.data;
};
