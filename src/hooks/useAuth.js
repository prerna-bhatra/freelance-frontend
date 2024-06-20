// src/hooks/useAuth.js

import { useSelector } from 'react-redux';

export const useAuthToken = () => {
  return useSelector(state => state.user.token);
};


export const useClient = () => {
  return useSelector( state => state.profile.userProfile.id);
}