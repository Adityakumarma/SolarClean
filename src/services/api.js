import axios from "axios";

const API = axios.create({
  baseURL: "https://solarcleanbackend.onrender.com/api"
});

export const api = API;

// TEAM APIs
export const getTeams = () => API.get("/teams");
export const createTeam = (data) => API.post("/teams", data);
export const addMember = (id, data) => API.post(`/teams/${id}/member`, data);

// TASK APIs
export const getTasks = () => API.get("/tasks");
export const createTask = (data) => API.post("/tasks", data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const addJobCard = (id, data) =>
  API.put(`/tasks/${id}/jobcard`, data);

// Client APIs
export const createClient = (formData) => API.post("/clients",formData,{
  headers:{"Content-Type":"multipart/form-data"}
});
export const getClients = () =>API.get("/clients");
export const deleteClients = (id) =>API.delete(`/clients/${id}`);

// Quotation APIs
export const getQuotations = () => API.get("/quotations");
export const getQuotationById = (id) => API.get(`/quotations/${id}`);
export const createQuotation = (data) => API.post("/quotations", data);
export const deleteQuotation = (id) => API.delete(`/quotations/${id}`);

export const createLead = (data) => API.post("/leads", data);
export const getLeads = () => API.get("/leads");
export const deleteLead = (id) => API.delete(`/leads/${id}`);
export const updateLead = (id, data) => API.put(`/leads/${id}`, data);
export const login = (email, password) => API.post('/auth/login', { email, password });
// Set token on each request if present
API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});