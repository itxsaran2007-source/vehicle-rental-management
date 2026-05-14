const api = require("./axiosConfig");

exports.fetchUsers = () => api.get("/users");
exports.createUser = (data) => api.post("/users", data);
exports.updateUser = (id, data) => api.put(`/users/${id}`, data);
exports.deleteUser = (id) => api.delete(`/users/${id}`);
