import axiosInstance from './axiosInstance';

const getUser = async (token) => {
  const responseOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.get('/api/user/', responseOptions);

  return response;
};

const updateUser = async (token, data) => {
  const responseOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put('/api/user/', data, responseOptions);

  return response;
};

export { getUser, updateUser };
