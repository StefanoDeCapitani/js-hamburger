const hamburgerBtn = document.querySelector(".header-right > a");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const closeBtn = document.querySelector(".close");

hamburgerBtn.addEventListener("click", function () {
  hamburgerMenu.classList.add("active");
});

closeBtn.addEventListener("click", function () {
  hamburgerMenu.classList.remove("active");
});
