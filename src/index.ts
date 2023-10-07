import button from "./components/Button";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app");

  const result = button({ buttonText: "Click me!" });

  root!.innerHTML = result;
});
