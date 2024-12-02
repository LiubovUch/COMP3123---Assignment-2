import axios from 'axios';


const api = axios.create({
  baseURL: API_URL,
});

export const signup = (data) => api.post('/user/signup', data);
export const login = (data) => api.post('/user/login', data);
export const getEmployees = () => api.get('/emp/employees');
export const getEmployee = (id) => api.get(`/emp/employees/${id}`);
export const addEmployee = (data) => api.post('/emp/employees', data);
export const updateEmployee = (id, data) => api.put(`/emp/employees/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/emp/employees/${id}`);
export const searchEmployee = (query) => api.get(`/emp/search?query=${query}`);

export default api;
