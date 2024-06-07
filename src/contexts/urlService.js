import axiosInstance from './axiosInstance';

const createUrl = async (token, data) => {
  const responseOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post('/api/url/', data, responseOptions);

  return response;
};

const getUrls = async (token) => {
  const responseOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.get('/api/url/', responseOptions);

  return response;
};

const updateUrl = async (token, urlCode, data) => {
  const responseOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(`/api/url/${urlCode}`, data, responseOptions);

  return response;
};

const deleteUrl = async (token, urlCode) => {
  const responseOptions = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(`/api/url/${urlCode}`, responseOptions);

  return response;
};

export { createUrl, getUrls, updateUrl, deleteUrl };
