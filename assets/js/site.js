document.addEventListener('DOMContentLoaded',()=>{const btn=document.querySelector('.menu');const nav=document.querySelector('.links');if(btn&&nav){btn.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));btn.textContent=open?'Close':'Menu';});}const search=document.querySelector('#project-search');const filters=[...document.querySelectorAll('[data-filter]')];const cards=[...document.querySelectorAll('[data-project]')];let active='all';function update(){const q=(search?.value||'').toLowerCase().trim();let visible=0;cards.forEach(card=>{const matches=(active==='all'||card.dataset.status===active)&&card.textContent.toLowerCase().includes(q);card.hidden=!matches;if(matches)visible++;});const empty=document.querySelector('#empty-state');if(empty)empty.hidden=visible>0;}filters.forEach(f=>f.addEventListener('click',()=>{active=f.dataset.filter;filters.forEach(x=>x.setAttribute('aria-pressed',String(x===f)));update();}));if(search)search.addEventListener('input',update);});


document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projects = document.querySelectorAll("[data-project]");
  const searchInput = document.getElementById("project-search");
  const emptyState = document.getElementById("empty-state");

  let activeFilter = "all";

  function filterProjects() {
    const query = searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";

    let visibleCount = 0;

    projects.forEach((project) => {
      const status = (
        project.getAttribute("data-status") || ""
      ).toLowerCase();

      const text = project.textContent.toLowerCase();

      const matchesFilter =
        activeFilter === "all" || status === activeFilter;

      const matchesSearch = text.includes(query);
      const showProject = matchesFilter && matchesSearch;

      project.style.display = showProject ? "" : "none";

      if (showProject) {
        visibleCount++;
      }
    });

    filterButtons.forEach((button) => {
      const isActive =
        button.getAttribute("data-filter") === activeFilter;

      button.setAttribute("aria-pressed", String(isActive));
    });

    if (emptyState) {
      emptyState.style.display =
        visibleCount === 0 ? "" : "none";
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.getAttribute("data-filter") || "all";
      filterProjects();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", filterProjects);
  }

  filterProjects();
});

