// src/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
});

const sendRequest = async (method, url, data = null, token = null, baseURL) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const request = {
    method,
    url: `${baseURL}/${url}`,
    responseType: 'json',
    headers,
    data
  };

  try {
    const response = await apiClient(request);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Redirect to root if unauthorized (401)
      window.location.href = '/';
    } else {
      throw error;
    }
  }
};

export const get = async (url, params = {}, token = null, baseURL) => {
  return sendRequest('GET', url, { params }, token, baseURL);
};

export const post = async (url, data, token = null, baseURL) => {
  return sendRequest('POST', url, data, token, baseURL);
};

export const put = async (url, data, token = null, baseURL) => {
  return sendRequest('PUT', url, data, token, baseURL);
};

export const del = async (url, token = null, baseURL) => {
  return sendRequest('DELETE', url, null, token, baseURL);
};
