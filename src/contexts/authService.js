import axiosInstance from './axiosInstance';

const login = async (email, password) => {
  const response = await axiosInstance.post('/api/auth/login', { email, password });

  return response;
};

const register = async (name, email, password) => {
  const response = await axiosInstance.post('/api/auth/register', { name, email, password });

  return response;
};

const forgotPassword = async (email) => {
  const response = await axiosInstance.post('/api/auth/forgotpassword', { email });

  return response;
};

const resetPassword = async (token, password) => {
  const response = await axiosInstance.put(`/api/auth/resetpassword/${token}`, { password });

  return response;
};

const changePassword = async (token, oldPassword, newPassword) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  };

  const response = await axiosInstance.put('/api/auth/changepassword', { oldPassword, newPassword }, requestOptions);

  return response;
};

const logout = async (token) => {
  const responseOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post('/api/auth/logout', {}, responseOptions);

  return response;
};

export { login, register, forgotPassword, resetPassword, changePassword, logout };
