import axios from 'axios';

export default function GetNewsData(size: number) {
  return axios.get(`https://newsdata.io/api/1/news?country=vi&category=top&apikey=pub_420495721dff27f7f7bdb1b249d92241f6598&size=${size}`);
}
