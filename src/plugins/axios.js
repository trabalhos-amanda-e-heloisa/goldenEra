import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzA2NWNkMDkxZTJhYTA4MTgyMDU1MzY0MGI5YzA4OSIsIm5iZiI6MTc1OTI1MTcyOC45OTIsInN1YiI6IjY4ZGMwZDEwNTVhM2FmZGQ2MzJkZjQ2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L0-LI0VQfFGewyz4T_Y9SCJFEcy3y0a_rx0-ofLMCLs`,
  },
});

export default api;