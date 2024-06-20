import {axiosInstance} from '../axios/axios';

/** CLIENT  */
export const createJob = async (data , token ) => {
  try {
 
    const response = await axiosInstance.post('/jobs', data, {
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

export const getJobsByClient = async ( { clientId, token} ) => {
    try {
   
      const response = await axiosInstance.get(`/jobs/client/${clientId}`, {
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

/** FREELANCER */

export const getAllJobs = async ( { token, page, limit , experience  }) => {
  try {
 
    const response = await axiosInstance.get(`/jobs`, {
      headers: {
        'x-access-token': token, 
      },
      params: { page, limit ,experience },
    });
    return response;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
    return error.response.data;
  }
};

export const submitProposal = async (data , token ) => {
  try {
 
    const response = await axiosInstance.post('/proposals', data, {
      headers: {
        'x-access-token': token, 
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error in submitting proposals data:', error.response.data);
    return error.response.data;
  }
};

export const reviewProposals = async ( {jobId , token} ) => {
  try {
    const response = await axiosInstance.get(`/proposals/jobs/${jobId}`, {
      headers: {
        'x-access-token': token, 
      },
    });
    return response;
  } catch (error) {
    console.error('Error in Review proposals API:', error.response.data);
    return error.response.data;
  }
};

export const updateProposals = async ( proposalId ,  data , token ) => {

  console.log(`data , proposalID: ${data} , ${proposalId}`);
  try {
    const response = await axiosInstance.put(`/proposals/${proposalId}`, data ,  {
      headers: {
        'x-access-token': token, 
      },
    });
    return response;
  } catch (error) {
    console.error('Error in Update proposals API:', error.response.data);
    return error.response.data;
  }
};
