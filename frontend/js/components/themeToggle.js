const themeSwitcher = document.querySelector(".theme-toggle");
if (themeSwitcher) {
  themeSwitcher.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
  });
}
