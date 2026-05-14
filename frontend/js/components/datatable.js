exports.renderTable = (container, rows) => {
  container.innerHTML = rows.map((row) => `<tr><td>${row.name}</td><td>${row.email}</td><td>${row.role}</td></tr>`).join("");
};
