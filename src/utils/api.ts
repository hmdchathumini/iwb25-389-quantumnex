import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

// Utility function to handle API requests
const apiRequest = async (endpoint, method = 'GET', data = null) => {
    try {
        const response = await axios({
            url: `${API_BASE_URL}${endpoint}`,
            method,
            data,
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers you need, like Authorization
            },
        });
        return response.data;
    } catch (error) {
        console.error('API request error:', error);
        throw error; // Rethrow the error for further handling
    }
};

// User authentication
export const registerUser = async (userData) => {
    return await apiRequest('/register', 'POST', userData);
};

export const loginUser = async (credentials) => {
    return await apiRequest('/login', 'POST', credentials);
};

// Task management
export const postTask = async (taskData) => {
    return await apiRequest('/tasks', 'POST', taskData);
};

export const getNearbyWorkers = async (location) => {
    return await apiRequest(`/workers/nearby?location=${location}`);
};

export const getTasks = async () => {
    return await apiRequest('/tasks');
};

// Payment handling
export const processPayment = async (paymentData) => {
    return await apiRequest('/payments', 'POST', paymentData);
};

// Export other utility functions as needed
export default {
    registerUser,
    loginUser,
    postTask,
    getNearbyWorkers,
    getTasks,
    processPayment,
};