import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Utility function to handle API requests
const apiRequest = async (endpoint, method = 'GET', data = null) => {
    try {
        const response = await axios({
            url: `${API_BASE_URL}${endpoint}`,
            method,
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
};

// User authentication
export const registerUser = async (userData) => {
    return await apiRequest('/users/createUser', 'POST', userData);
};

export const getUser = async (id) => {
    return await apiRequest(`/users/getUser/${id}`, 'GET');
};

export const deleteUser = async (id) => {
    return await apiRequest(`/users/deleteUser/${id}`, 'DELETE');
};

// Task management
export const postTask = async (taskData) => {
    return await apiRequest('/tasks/createTask', 'POST', taskData);
};

export const getTask = async (id) => {
    return await apiRequest(`/tasks/getTask/${id}`, 'GET');
};

export const deleteTask = async (id) => {
    return await apiRequest(`/tasks/deleteTask/${id}`, 'DELETE');
};

// Payment handling
export const createPayment = async (paymentData) => {
    return await apiRequest('/payment/createPayment', 'POST', paymentData);
};

export const getPayment = async (id) => {
    return await apiRequest(`/payment/getPayment/${id}`, 'GET');
};

export const refundPayment = async (paymentData) => {
    return await apiRequest('/payment/refundPayment', 'POST', paymentData);
};

export default {
    registerUser,
    getUser,
    deleteUser,
    postTask,
    getTask,
    deleteTask,
    createPayment,
    getPayment,
    refundPayment,
};