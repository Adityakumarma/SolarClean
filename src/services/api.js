import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api"
   baseURL: "https://solarcleanbackend.onrender.com/api"
});

// Attach JWT token automatically to every request
API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Auto logout on unauthorized
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized request");
    }

    return Promise.reject(error);
  }
);

export default API;
export const api = API;

// ==========================
// AUTH APIs
// ==========================

export const login = (email, password) =>
  API.post("/auth/login", { email, password });

export const changePassword = (currentPassword, newPassword) =>
  API.post("/auth/change-password", {
    currentPassword,
    newPassword,
  });

// ==========================
// TEAM APIs
// ==========================

export const getTeams = () => API.get("/teams");

export const createTeam = (data) =>
  API.post("/teams", data);

export const addMember = (id, data) =>
  API.post(`/teams/${id}/member`, data);

// ==========================
// TASK APIs
// ==========================

export const getTasks = () => API.get("/tasks");

export const createTask = (data) =>
  API.post("/tasks", data);

export const updateTask = (id, data) =>
  API.put(`/tasks/${id}`, data);

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);

export const addJobCard = (id, data) =>
  API.put(`/tasks/${id}/jobcard`, data);

// ==========================
// CLIENT APIs
// ==========================

export const createClient = (formData) =>
  API.post("/clients", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getClients = () =>
  API.get("/clients");

export const getClientById = (id) =>
  API.get(`/clients/${id}`);

export const updateClient = (id, formData) =>
  API.put(`/clients/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteClient = (id) =>
  API.delete(`/clients/${id}`);

// ==========================
// LEAD APIs
// ==========================

export const createLead = (data) =>
  API.post("/leads", data);

export const getLeads = () =>
  API.get("/leads");

export const updateLead = (id, data) =>
  API.put(`/leads/${id}`, data);

export const deleteLead = (id) =>
  API.delete(`/leads/${id}`);

// ==========================
// QUOTATION APIs
// ==========================

export const getQuotations = () =>
  API.get("/quotations");

export const getQuotationById = (id) =>
  API.get(`/quotations/${id}`);

export const createQuotation = (data) =>
  API.post("/quotations", data);

export const deleteQuotation = (id) =>
  API.delete(`/quotations/${id}`);