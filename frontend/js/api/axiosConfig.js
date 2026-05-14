const axios = require("axios");

const api = axios.create({ baseURL: "/api", timeout: 10000 });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

module.exports = api;
