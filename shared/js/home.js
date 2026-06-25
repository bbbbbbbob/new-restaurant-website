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

  function getPosterFromTrigger(trigger) {
    var posterEl = trigger.querySelector(".video-poster");
    if (posterEl && posterEl.tagName === "IMG" && posterEl.getAttribute("src")) {
      return posterEl.src;
    }

    return "";
  }

  function initVideoPosters() {
    document.querySelectorAll(".video-poster").forEach(function (poster) {
      if (poster.tagName === "IMG") {
        if (poster.getAttribute("src")) {
          return;
        }

        var trigger = poster.closest("[data-video-src]");
        if (!trigger) {
          return;
        }

        var posterSrc = trigger.getAttribute("data-poster-src") || poster.getAttribute("data-poster-src");
        if (posterSrc) {
          poster.src = posterSrc;
          return;
        }

        var videoSrc = trigger.getAttribute("data-video-src");
        if (!videoSrc) {
          return;
        }

        var video = document.createElement("video");
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";
        video.src = videoSrc;

        function captureFrame() {
          if (!video.videoWidth || !video.videoHeight) {
            return;
          }

          var canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
          poster.src = canvas.toDataURL("image/jpeg", 0.85);
        }

        video.addEventListener("loadeddata", function () {
          if (video.duration && !isNaN(video.duration) && video.duration > 0.15) {
            video.currentTime = 0.1;
          } else {
            captureFrame();
          }
        });

        video.addEventListener("seeked", captureFrame);
        return;
      }

      if (poster.tagName !== "VIDEO") {
        return;
      }

      poster.muted = true;
      poster.playsInline = true;
      poster.preload = "metadata";
      poster.controls = false;
      poster.loop = false;

      if (!poster.getAttribute("src")) {
        var videoTrigger = poster.closest("[data-video-src]");
        if (videoTrigger) {
          poster.src = videoTrigger.getAttribute("data-video-src");
        }
      }

      function showFirstFrame() {
        if (poster.readyState < 1) {
          return;
        }
        if (poster.duration && !isNaN(poster.duration) && poster.duration > 0.15) {
          poster.currentTime = 0.1;
        } else {
          poster.pause();
        }
      }

      poster.addEventListener("loadedmetadata", showFirstFrame);
      poster.addEventListener("loadeddata", showFirstFrame);
      poster.addEventListener("seeked", function () {
        poster.pause();
      });
    });
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

    function openModal(src, poster) {
      if (!video || !src) {
        return;
      }

      if (poster) {
        video.poster = poster;
      } else {
        video.removeAttribute("poster");
      }

      modal.hidden = false;
      document.body.classList.add("video-modal-open");
      video.controls = true;

      document.querySelectorAll("video.video-poster").forEach(function (thumb) {
        thumb.pause();
      });

      video.src = src;

      // Try play immediately while the click gesture is still active.
      var playPromise = video.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(function () {
          video.addEventListener("canplay", function handleCanPlay() {
            video.removeEventListener("canplay", handleCanPlay);
            video.play();
          });
        });
      }
    }

    function closeModal() {
      modal.hidden = true;
      document.body.classList.remove("video-modal-open");
      if (video) {
        video.pause();
        video.removeAttribute("poster");
        video.removeAttribute("src");
        video.load();
      }
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        openModal(trigger.getAttribute("data-video-src"), getPosterFromTrigger(trigger));
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
    initVideoPosters();
    initVideoModal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHome);
  } else {
    initHome();
  }
})();
