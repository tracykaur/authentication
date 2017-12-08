import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7000'
});

const setJWT = token => {
  localStorage.setItem('token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export { api, setJWT };
