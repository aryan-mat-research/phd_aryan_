
(() => {
  const cards = document.querySelectorAll(
    ".experience-card[data-project-href]"
  );

  cards.forEach((card) => {
    const destination = card.dataset.projectHref;
    const projectLink = card.querySelector(
      ".experience-project-link"
    );

    if (!destination || !projectLink) {
      console.warn(
        "Experience card is missing its project link:",
        card
      );
      return;
    }

    card.addEventListener("click", (event) => {
      // Preserve clicks on links and other controls.
      if (
        event.target.closest(
          "a, button, input, select, textarea, label"
        )
      ) {
        return;
      }

      window.location.href = destination;
    });

    // Keyboard users can focus the card itself.
    card.tabIndex = 0;

    card.addEventListener("keydown", (event) => {
      if (event.target !== card) return;

      if (event.key === "Enter") {
        window.location.href = destination;
      }
    });
  });
})();


