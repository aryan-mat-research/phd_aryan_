
(() => {
  // ----------------------------------------
  // Research search and filter
  // ----------------------------------------

  const search = document.getElementById("rp-search");
  const filterButtons = [
    ...document.querySelectorAll(".rp-filter")
  ];
  const cards = [
    ...document.querySelectorAll(".rp-card[data-project]")
  ];
  const count = document.getElementById("rp-count");
  const empty = document.getElementById("rp-empty");

  let activeFilter = "all";

  function updateProjects() {
    const query = search
      ? search.value.trim().toLowerCase()
      : "";

    let visible = 0;

    cards.forEach((card) => {
      const status = (
        card.dataset.status || ""
      ).toLowerCase();

      const searchable = (
        card.innerText +
        " " +
        (card.dataset.search || "") +
        " " +
        card.id
      ).toLowerCase();

      const matchesFilter =
        activeFilter === "all" ||
        status === activeFilter;

      const matchesQuery =
        !query || searchable.includes(query);

      const show =
        matchesFilter && matchesQuery;

      card.hidden = !show;

      if (show) visible++;
    });

    if (count) {
      count.textContent =
        `Showing ${visible} of ${cards.length} projects`;
    }

    if (empty) {
      empty.hidden = visible !== 0;
    }
  }

  if (search) {
    search.addEventListener("input", updateProjects);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "all";

      filterButtons.forEach((item) => {
        item.setAttribute(
          "aria-pressed",
          String(item === button)
        );
      });

      updateProjects();
    });
  });


  // ----------------------------------------
  // Load project images
  // ----------------------------------------

  document
    .querySelectorAll(".rp-media[data-image]")
    .forEach((figure) => {
      const path = figure.dataset.image.trim();
      const img = figure.querySelector("img");

      if (!path || !img) return;

      img.src = path;

      img.addEventListener("load", () => {
        figure.classList.add("has-image");
      });

      img.addEventListener("error", () => {
        img.removeAttribute("src");
        figure.classList.remove("has-image");

        console.warn(
          "Research image could not be loaded:",
          path
        );
      });
    });


  // ----------------------------------------
  // Make research cards clickable
  // ----------------------------------------

  cards.forEach((card) => {
    const projectLink =
      card.querySelector(
        'a.rp-project-link[href^="projects/"]'
      ) ||
      card.querySelector(
        'a[href^="projects/"]'
      );

    if (!projectLink) {
      console.warn(
        "No project details link found for card:",
        card
      );
      return;
    }

    card.style.cursor = "pointer";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "link");

    card.addEventListener("click", (event) => {
      // Let real links and controls work normally.
      if (
        event.target.closest(
          "a, button, input, select, textarea, label"
        )
      ) {
        return;
      }

      window.location.href = projectLink.href;
    });

    card.addEventListener("keydown", (event) => {
      if (event.target !== card) return;

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        window.location.href = projectLink.href;
      }
    });
  });


  // ----------------------------------------
  // Initial display
  // ----------------------------------------

  updateProjects();
})();
