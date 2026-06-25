/**
 * Unified site shell — Header, Footer, social links.
 * Set data-depth on body: 0 = root, 1 = one level deep, 2 = two levels deep.
 */

(function () {
  var INSTAGRAM_URL = "https://www.instagram.com/saigondistrictkitchenandbar/";
  var FACEBOOK_URL =
    "https://www.facebook.com/saigondistrictkitchenandbar/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&_rdr";

  var NAV_LINKS = [
    { label: "Menu", key: "menu" },
    { label: "Location", key: "location" },
    { label: "Birthday Party", key: "birthday-party" },
    { label: "Jobs", key: "jobs" },
    { label: "Contact Us", key: "contact-us" }
  ];

  var ROUTES = {
    home: "index.html",
    menu: "menu/index.html",
    location: "location/index.html",
    "birthday-party": "birthday-party/index.html",
    "contact-us": "contact-us/index.html",
    jobs: "jobs/index.html"
  };

  function rootPrefix() {
    var depth = parseInt(document.body.getAttribute("data-depth") || "0", 10);
    var prefix = "";
    for (var i = 0; i < depth; i++) {
      prefix += "../";
    }
    return prefix;
  }

  function route(key) {
    var path = ROUTES[key];
    if (!path) {
      return rootPrefix();
    }
    return rootPrefix() + path;
  }

  function asset(path) {
    return rootPrefix() + path;
  }

  function buildNavLinks(activeKey) {
    return NAV_LINKS.map(function (link) {
      var cls = link.key === activeKey ? " class=\"is-active\"" : "";
      return "<li><a href=\"" + route(link.key) + "\"" + cls + ">" + link.label + "</a></li>";
    }).join("");
  }

  function buildSocialLinks() {
    return (
      "<div class=\"site-header__social\">" +
      "<a href=\"" + INSTAGRAM_URL + "\" class=\"site-header__social-link\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Instagram\">" +
      "<svg class=\"site-header__social-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\">" +
      "<path fill=\"currentColor\" d=\"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.226-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z\"/>" +
      "</svg></a>" +
      "<a href=\"" + FACEBOOK_URL + "\" class=\"site-header__social-link\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Facebook\">" +
      "<svg class=\"site-header__social-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\">" +
      "<path fill=\"currentColor\" d=\"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z\"/>" +
      "</svg></a>" +
      "</div>"
    );
  }

  function buildHeader(activeKey) {
    return (
      "<header class=\"site-header\">" +
      "  <div class=\"site-header__inner\">" +
      "    <a href=\"" + route("home") + "\" class=\"site-header__logo\">" +
      "      <img src=\"" + asset("assets/brand/logo.jpg") + "\" alt=\"SAIGON DISTRICT KITCHEN AND BAR\" />" +
      "    </a>" +
      "    <nav class=\"site-header__nav\">" +
      "      <ul class=\"site-header__links\">" +
      buildNavLinks(activeKey) +
      "      </ul>" +
      "    </nav>" +
      "    <div class=\"site-header__actions\">" +
      buildSocialLinks() +
      "    </div>" +
      "    <button class=\"site-header__toggle\" aria-label=\"Toggle navigation\" aria-expanded=\"false\">" +
      "      <span></span><span></span><span></span>" +
      "    </button>" +
      "  </div>" +
      "</header>"
    );
  }

  function buildFooter() {
    return (
      "<footer class=\"site-footer\">" +
      "  <div class=\"container\">" +
      "    <div class=\"site-footer__grid\">" +
      "      <div>" +
      "        <h3 class=\"site-footer__heading\">Our Restaurant</h3>" +
      "        <ul class=\"site-footer__links\">" +
      "          <li><a href=\"" + route("menu") + "\">Menu</a></li>" +
      "          <li><a href=\"" + route("location") + "\">Location</a></li>" +
      "        </ul>" +
      "      </div>" +
      "      <div>" +
      "        <h3 class=\"site-footer__heading\">More</h3>" +
      "        <ul class=\"site-footer__links\">" +
      "          <li><a href=\"" + route("birthday-party") + "\">Birthday Party</a></li>" +
      "          <li><a href=\"" + route("jobs") + "\">Jobs</a></li>" +
      "          <li><a href=\"" + route("contact-us") + "\">Contact Us</a></li>" +
      "        </ul>" +
      "      </div>" +
      "    </div>" +
      "    <div class=\"site-footer__bottom\">" +
      "      <p>4500 Satellite Blvd #1180, Duluth, GA 30096</p>" +
      "      <p>(678) 404-7383</p>" +
      "      <p>parisbanhmiatl.info@gmail.com</p>" +
      "      <p class=\"site-footer__copyright\">&copy; " +
      new Date().getFullYear() +
      " SAIGON DISTRICT KITCHEN AND BAR. All rights reserved.</p>" +
      "    </div>" +
      "  </div>" +
      "</footer>"
    );
  }

  function initMobileNav() {
    var toggle = document.querySelector(".site-header__toggle");
    var nav = document.querySelector(".site-header__nav");
    if (!toggle || !nav) {
      return;
    }

    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
      nav.classList.toggle("is-open");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  window.initShell = function (activeKey) {
    var headerEl = document.getElementById("site-header");
    var footerEl = document.getElementById("site-footer");

    if (headerEl) {
      headerEl.innerHTML = buildHeader(activeKey);
    }
    if (footerEl) {
      footerEl.innerHTML = buildFooter();
    }

    initMobileNav();
  };
})();
