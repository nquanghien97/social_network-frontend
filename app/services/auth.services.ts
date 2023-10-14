import axios from 'axios';
import store from '../../store';
import { setProfile } from '../../store/reducers/userProfileReducer';
import { createUserFromUserResponse } from '@/entities/User.entities';
import { setToLocalStorage } from '../../utils/localStorage';

export const signUp = async (data: { email: string, password: string }) => {
  const dataResponse = await axios.post(`${process.env.API_URL}/api/auth/register`, data);
  const user = createUserFromUserResponse(dataResponse.data);
  store.dispatch(setProfile(user));
  setToLocalStorage('accessToken', dataResponse.data.accessToken);
  setToLocalStorage('refreshToken', dataResponse.data.refreshToken);
};
