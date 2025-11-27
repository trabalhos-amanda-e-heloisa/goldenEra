import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '9c065cd091e2aa081820553640b9c089',
  },
});

export default api;
