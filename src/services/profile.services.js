import {axiosInstance} from '../axios/axios';

export const createFreelancerProfile = async (data , token ) => {
  try {
 
    const response = await axiosInstance.post('/user/freelancers', data, {
      headers: {
        'x-access-token': token, 
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
    return error.response.data;
  }
};

export const clientProfile = async (data , token) => {
  try {
   
    const response = await axiosInstance.post('/user/clients', {...data , totalFundingin$: 10000}, {
      headers: {
        'x-access-token': token, 
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
    return error.response.data;
  }
};


export const getFreelancerProfile = async( freelancerId , token) => {
  try {
   
    const response = await axiosInstance.get(`/user/freelancers/${freelancerId}`, {
      headers: {
        'x-access-token': token, 
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching Freelancer data:', error.response.data);
    return error.response.data;
  }
}

export const getFreelancerProfileByUserID = async( userId , token) => {
  try {
   
    const response = await axiosInstance.get(`/user/freelancers/user/${userId}`, {
      headers: {
        'x-access-token': token, 
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching Freelancer By UserID data:', error.response.data);
    return error.response.data;
  }
}

export const  getClientProfileByUserID = async( userId , token) => {
  try {
   
    const response = await axiosInstance.get(`/user/clients/user/${userId}`, {
      headers: {
        'x-access-token': token, 
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching Client By UserID data:', error.response.data);
    return error.response.data;
  }
}