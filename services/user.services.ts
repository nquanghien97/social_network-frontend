import { getFromLocalStorage } from '../utils/localStorage';
import api from '../app/_config/api';
import { parseJwt } from '../utils/parseJwt';
import store from '../store';
import { setProfile } from '../store/reducers/userProfileReducer';
// import { UpdateUserDTO } from '@/dto/User.dto';

export const getUserId = () => {
  const token = getFromLocalStorage('accessToken');
  if (!token) return null;
  const data = parseJwt(token);

  return data.userId;
};

export const getUser = async () => {
  const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user`);
  return res.data.user;
};

export const updateUser = async (data: FormData) => {
  const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/update-user`, data);
  store.dispatch(setProfile(res.data.user));
};
