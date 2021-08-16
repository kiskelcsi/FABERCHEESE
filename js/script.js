"use strict";
// NAV
let toggleNavStatus = false;

let toggleNav = function () {
  let getSidebar = document.querySelector(".nav-sidebar");
  let getSidebarUl = document.querySelector(".nav-sidebar ul");
  let getSidebarLinks = document.querySelectorAll(".nav-sidebar a");

  if (toggleNavStatus === false) {
    getSidebarUl.style.visibility = "visible";
    getSidebar.style.width = "100%";

    let arrayLength = getSidebarLinks.length;
    for (let i = 0; i < arrayLength; i++) {
      getSidebarLinks[i].style.opacity = "1";
    }

    toggleNavStatus = true;
  } else if (toggleNavStatus === true) {
    getSidebar.style.width = "0rem";

    let arrayLength = getSidebarLinks.length;
    for (let i = 0; i < arrayLength; i++) {
      getSidebarLinks[i].style.opacity = "1";
    }
    getSidebarUl.style.visibility = "hidden";

    toggleNavStatus = false;
  }
};

// ANIMATED BOX
document.addEventListener("DOMContentLoaded", function (event) {
  document.addEventListener("scroll", function (event) {
    const animatedBoxes = document.getElementsByClassName("animated-box");
    const windowOffsetTop = window.innerHeight + window.scrollY;

    Array.prototype.forEach.call(animatedBoxes, (animatedBox) => {
      const animatedBoxOffsetTop = animatedBox.offsetTop;

      if (windowOffsetTop >= animatedBoxOffsetTop) {
        addClass(animatedBox, "fade-in");
      }
    });
  });
});

function addClass(element, className) {
  const arrayClasses = element.className.split(" ");
  if (arrayClasses.indexOf(className) === -1) {
    element.className += " " + className;
  }
}
// ¨SLIDE IN
const slideIn = document.querySelectorAll(".slideIn");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.35,
});

slideIn.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// MODAL BOX

const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});
document.addEventListener("keydown", (e) => {
  const modals = document.querySelectorAll(".modal.active");
  if (e.key === "Escape")
    modals.forEach((modal) => {
      closeModal(modal);
    });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

// GALERY SLIDER

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".btn_left");
const btnRight = document.querySelector(".btn_right");
const dotContainer = document.querySelector(".dots");
let curSlide = 0;
const maxSlide = slides.length;
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

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
    (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  );
};
goToSlide(0);
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

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
let closePic = document.getElementById("lb-back");
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlide();
  e.key === "ArrowRight" && nextSlide();
  e.key === "Escape" && closePic.classList.remove("show");
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    curSlide = slide;
    goToSlide(curSlide);
    activateDot(curSlide);
  }
});

// ZOOM IN-OUT

let zoomImg = function () {
  let clone = this.cloneNode();
  clone.classList.remove("zoomD");
  let lb = document.getElementById("lb-img");
  lb.innerHTML = "";
  lb.appendChild(clone);
  lb = document.getElementById("lb-back");
  lb.classList.add("show");
};

window.addEventListener("load", function () {
  let images = document.getElementsByClassName("zoomD");
  if (images.length > 0) {
    for (let img of images) {
      img.addEventListener("click", zoomImg);
    }
  }
  document.getElementById("lb-back").addEventListener("click", function () {
    this.classList.remove("show");
  });
});

// SCROLL

// (function () {
//   scrollTo();
// })();

// function scrollTo() {
//   var links = document.getElementsByTagName("a");
//   for (var i = 0; i < links.length; i++) {
//     var link = links[i];
//     if (
//       link.href &&
//       link.href.indexOf("#") != -1 &&
//       (link.pathname == location.pathname ||
//         "/" + link.pathname == location.pathname) &&
//       link.search == location.search
//     ) {
//       link.onclick = scrollAnchors;
//     }
//   }
// }
// function scrollAnchors(e, respond = null) {
//   const distanceToTop = (el) => Math.floor(el.getBoundingClientRect().top);
//   e.preventDefault();
//   var targetID = respond
//     ? respond.getAttribute("href")
//     : this.getAttribute("href");
//   const targetAnchor = document.querySelector(targetID);
//   if (!targetAnchor) return;
//   const originalTop = distanceToTop(targetAnchor);
//   window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });
//   const checkIfDone = setInterval(function () {
//     const atBottom =
//       window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
//     if (distanceToTop(targetAnchor) === 0 || atBottom) {
//       targetAnchor.tabIndex = "-1";
//       targetAnchor.focus();
//       window.history.pushState("", "", targetID);
//       clearInterval(checkIfDone);
//     }
//   }, 100);
// }

$(document).ready(function () {
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top,
            },
            1000,
            function () {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });
});
