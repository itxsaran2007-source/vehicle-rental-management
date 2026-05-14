const api = require("./axiosConfig");

exports.login = (payload) => api.post("/auth/login", payload);
exports.logout = () => api.post("/auth/logout");
