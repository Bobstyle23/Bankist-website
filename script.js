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

const menuHeight = menu.getBoundingClientRect().height; //to take the height dynamically
const stickyNav = (entries) => {
  //callback function for observer
  const [entry] = entries;
  if (!entry.isIntersecting) {
    menu.classList.add("sticky");
    message.remove();
  } else {
    menu.classList.remove("sticky");
    header.before(message);
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${menuHeight}px`,
});
headerObserver.observe(header); //observing header section

const revealSection = (entries, observer) => {
  const [entry] = entries; //taking only one entry out of entries since there is only one threshold
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, //targets whole viewport
  threshold: 0.15, //when target visible 15%
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

const imgTargets = document.querySelectorAll("img[data-src]");
const loadImg = (entries, observer) => {
  const [entry] = entries; //we take only one entry since we have only one threshold. if there are multiple threshold we use loop
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src; //replacing src with dataset.src
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null, //targets full viewport
  threshold: 0, //observe target at 0%
  rootMargin: "200px", //load before 200px
});

imgTargets.forEach((img) => imgObserver.observe(img));

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  //Event delegation
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
