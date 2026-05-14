document.querySelectorAll(".sidebar-toggle").forEach((button) => {
  button.addEventListener("click", () => { document.body.classList.toggle("sidebar-collapsed"); });
});
