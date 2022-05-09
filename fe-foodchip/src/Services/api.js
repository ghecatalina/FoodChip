import axios from 'axios';
const api = axios.create({ baseURL: 'https://localhost:7198/api/' })
export default api;