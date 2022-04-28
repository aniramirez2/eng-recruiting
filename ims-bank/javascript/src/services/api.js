import axios from 'axios';
import env from '../configs/environment';

const api = axios.create({
  baseURL: `${env.BACKEND_URL}`
});

export default api;
