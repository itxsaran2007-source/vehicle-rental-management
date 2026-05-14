const clock = document.querySelector(".navbar-clock");
if (clock) {
  setInterval(() => { clock.textContent = new Date().toLocaleTimeString(); }, 1000);
}
