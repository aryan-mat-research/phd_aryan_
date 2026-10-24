
/* =========================================
   ARYAN.PHD — SITE JAVASCRIPT
   Navigation and mobile menu
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu");
  const navigation = document.querySelector(".links");

  // Stop safely if this page has no navigation menu.
  if (!menuButton || !navigation) {
    return;
  }

  function setMenuOpen(isOpen) {
    menuButton.setAttribute("aria-expanded", String(isOpen));

    // Support common class names used by navigation CSS.
    navigation.classList.toggle("open", isOpen);
    navigation.classList.toggle("active", isOpen);
    menuButton.classList.toggle("open", isOpen);

    document.body.classList.toggle("nav-open", isOpen);
  }

  // Toggle the mobile navigation.
  menuButton.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    setMenuOpen(!isOpen);
  });

  // Close the menu after choosing a navigation link.
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });

  // Close the menu with Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  // Close the menu when clicking outside it.
  document.addEventListener("click", (event) => {
    if (
      menuButton.getAttribute("aria-expanded") === "true" &&
      !navigation.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  });

  // Reset mobile menu state when returning to desktop width.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      setMenuOpen(false);
    }
  });
});
