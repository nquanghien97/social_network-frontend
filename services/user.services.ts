import axios from 'axios';

export const getUser = (id: number) => axios.post(`${process.env.API_URL}/api/user`, id);
