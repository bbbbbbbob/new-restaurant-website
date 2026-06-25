/**
 * Front-end form handling for Birthday Party and Contact forms.
 * Shows success/error UI on submit — no backend wired yet.
 */

(function () {
  var forms = document.querySelectorAll("[data-contact-form]");

  forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var messageEl = form.querySelector(".form__message");
      var isValid = form.checkValidity();

      if (!messageEl) {
        return;
      }

      messageEl.classList.remove(
        "form__message--success",
        "form__message--error",
        "is-visible"
      );

      if (isValid) {
        messageEl.textContent =
          "Thank you. Your message has been received. We will get back to you shortly.";
        messageEl.classList.add("form__message--success", "is-visible");
        form.reset();
      } else {
        messageEl.textContent =
          "Please fill in all required fields correctly before submitting.";
        messageEl.classList.add("form__message--error", "is-visible");
      }
    });
  });
})();
