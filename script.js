const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnOpenModal = document.querySelectorAll(".btn--show-modal");
const allSections = document.querySelectorAll("section");
const allButtons = document.getElementsByTagName("button");
const header = document.querySelector(".header");
const section = document.querySelector("#section--1");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const menu = document.querySelector(".nav");

btnOpenModal.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
});

btnCloseModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});

btnScrollTo.addEventListener("click", () => {
  section.scrollIntoView({ behavior: "smooth" });
});

const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;
message.style.backgroundColor = "#37383d";
// header.before(message.cloneNode(true)) // with this we can insert the element into the DOM multiple times
header.before(message);
document.querySelector(".btn--close-cookie").addEventListener("click", () => {
  message.remove();
});
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + "px";

const randomRgb = () => {
  return Math.floor(Math.random() * 255) + 1;
};
const randomColor = `rgb(${randomRgb()},${randomRgb()},${randomRgb()})`;
console.log(randomColor);

//Event delegation
document.querySelector(".nav__links").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

const h1 = document.querySelector("h1");
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "white";

tabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;
  tabs.forEach((tab) => {
    tab.classList.remove("operations__tab--active");
  });
  tabsContent.forEach((content) => {
    content.classList.remove("operations__content--active");
  });
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

const handleHover = (e, opacity) => {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((sibling) => {
      if (sibling !== link) sibling.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

menu.addEventListener("mouseover", (e) => {
  handleHover(e, 0.3);
});

menu.addEventListener("mouseout", (e) => {
  handleHover(e, 1);
});
