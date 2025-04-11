import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchJobs = async (status = '', sortBy = '') => {
  try {
    const response = await axios.get(`${API_URL}/jobs`, {
      params: { status, sortBy }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await axios.post(`${API_URL}/jobs`, jobData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateJob = async (id, jobData) => {
  try {
    const response = await axios.put(`${API_URL}/jobs/${id}`, jobData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/jobs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};