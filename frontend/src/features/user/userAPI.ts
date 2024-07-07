import axios from 'axios';
import { AxiosResponse } from 'axios';
import { User } from 'src/types/user';

export const fetchUserAPI = (userId: string): Promise<AxiosResponse<User>> => {
  return axios.get(`/api/user/${userId}`);
};
