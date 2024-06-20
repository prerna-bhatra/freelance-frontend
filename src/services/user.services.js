import {axiosInstance} from '../axios/axios'

export const createUser = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/register' , data );
      return response;
    } catch (error) {
      console.error('Error fetching data:', error.response.data);

      return error.response.data;
    }
  };
  
  export const loginUser = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/login' , data );
      return response;
    } catch (error) {
      console.error('Error fetching data:', error.response.data);

      return error.response.data;
    }
  };