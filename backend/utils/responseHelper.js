exports.success = (res, status, data) => res.status(status).json({ success: true, data });
exports.error = (res, status, message) => res.status(status).json({ success: false, message });
