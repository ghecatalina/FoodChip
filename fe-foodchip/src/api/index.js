import axios from "axios";

export const api = axios.create({ baseURL: 'https://localhost:7056/api/' });

export const signIn = (formData) => api.post('auth/login', formData);
export const register = (formData) => api.post('auth/register', formData);
