const header = document.querySelector(".header");
const menu = header.querySelector(".navigation__list");
const button = header.querySelector(".navigation__button");

button.addEventListener("click", () => {
  menu.classList.toggle("navigation__list--hidden");
  button.classList.toggle("button--menu-close");
});
