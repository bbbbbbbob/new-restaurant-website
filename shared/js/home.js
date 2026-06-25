/**
 * Homepage interactions — story dish slider and reviews carousel.
 */

(function () {
  var STORY_AUTO_MS = 5000;
  var REVIEWS_AUTO_MS = 5000;

  function initStorySlider() {
    var slides = document.querySelectorAll(".brand-story__slide");
    var dotsContainer = document.querySelector(".brand-story__dots");
    var prevBtn = document.querySelector(".brand-story__arrow--prev");
    var nextBtn = document.querySelector(".brand-story__arrow--next");

    if (!slides.length || !dotsContainer) {
      return;
    }

    var current = 0;
    var total = slides.length;
    var dots = [];

    slides.forEach(function (_, index) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "brand-story__dot" + (index === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Show dish photo " + (index + 1));
      dot.addEventListener("click", function () {
        goTo(index);
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });

    function goTo(index) {
      slides[current].classList.remove("is-active");
      dots[current].classList.remove("is-active");
      current = index;
      slides[current].classList.add("is-active");
      dots[current].classList.add("is-active");
    }

    function next() {
      goTo((current + 1) % total);
    }

    function prev() {
      goTo((current - 1 + total) % total);
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", prev);
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", next);
    }

    setInterval(next, STORY_AUTO_MS);
  }

  function initReviewsCarousel() {
    var track = document.querySelector(".reviews-track");
    var dotsContainer = document.querySelector(".reviews-dots");
    if (!track || !dotsContainer) {
      return;
    }

    var slides = track.querySelectorAll(".review-card");
    var total = slides.length;
    if (total === 0) {
      return;
    }

    var current = 0;
    var dots = [];

    slides.forEach(function (_, index) {
      var dot = document.createElement("button");
      dot.className = "reviews-dot" + (index === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Show review " + (index + 1));
      dot.addEventListener("click", function () {
        goTo(index);
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });

    function goTo(index) {
      current = index;
      track.style.transform = "translateX(-" + current * 100 + "%)";
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === current);
      });
    }

    function next() {
      goTo((current + 1) % total);
    }

    setInterval(next, REVIEWS_AUTO_MS);
  }

  function initVideoModal() {
    var modal = document.getElementById("video-modal");
    if (!modal) {
      return;
    }

    var video = modal.querySelector(".video-modal__player");
    var closeBtn = modal.querySelector(".video-modal__close");
    var backdrop = modal.querySelector(".video-modal__backdrop");
    var triggers = document.querySelectorAll("[data-video-src]");

    function openModal(src) {
      if (!video || !src) {
        return;
      }
      video.src = src;
      video.load();
      modal.hidden = false;
      document.body.classList.add("video-modal-open");
      video.currentTime = 0;
      video.play();
    }

    function closeModal() {
      modal.hidden = true;
      document.body.classList.remove("video-modal-open");
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        openModal(trigger.getAttribute("data-video-src"));
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    if (backdrop) {
      backdrop.addEventListener("click", closeModal);
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !modal.hidden) {
        closeModal();
      }
    });
  }

  function initHome() {
    initStorySlider();
    initReviewsCarousel();
    initVideoModal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHome);
  } else {
    initHome();
  }
})();
