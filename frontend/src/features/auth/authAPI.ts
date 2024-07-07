import axiosInstance from 'src/utils/axiosInstance';
import { AxiosResponse } from 'axios';

export const loginAPI = (credentials: {
  email: string;
  password: string;
}): Promise<AxiosResponse<{ message: string }>> => {
  return axiosInstance.post('/login', credentials);
};

export const googleLoginAPI = async (): Promise<AxiosResponse<{ message: string }>> => {
  const response = await axiosInstance.get('/auth/google');
  return response.data;
};
