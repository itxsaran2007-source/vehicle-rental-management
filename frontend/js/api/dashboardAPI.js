const api = require("./axiosConfig");

exports.getStats = () => api.get("/dashboard/stats");
exports.getActivity = () => api.get("/activity");
