/**
 * Loads menu page images from assets/menu/menu_page-XXXX.jpg
 */

(function () {
  var MENU_PAGE_COUNT = 27;
  var MENU_IMAGE_PATH = "../assets/menu/menu_page-";

  function padPageNumber(num) {
    var str = String(num);
    while (str.length < 4) {
      str = "0" + str;
    }
    return str;
  }

  function initMenuImages() {
    var container = document.getElementById("menu-images");
    if (!container) {
      return;
    }

    var pageIndex = 1;
    while (pageIndex <= MENU_PAGE_COUNT) {
      var img = document.createElement("img");
      img.src = MENU_IMAGE_PATH + padPageNumber(pageIndex) + ".jpg";
      img.alt = "Menu page " + pageIndex;
      img.loading = pageIndex === 1 ? "eager" : "lazy";
      img.className = "menu-images__page";
      container.appendChild(img);
      pageIndex += 1;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMenuImages);
  } else {
    initMenuImages();
  }
})();
