import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api"
  baseURL: "https://solarcleanbackend.onrender.com/api"
});

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
export const deleteClients = (id) =>API.delete(`/clients/${id}`)