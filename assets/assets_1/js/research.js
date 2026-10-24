(() => {
      const search = document.getElementById('rp-search');
      const filterButtons = [...document.querySelectorAll('.rp-filter')];
      const cards = [...document.querySelectorAll('[data-project]')];
      const count = document.getElementById('rp-count');
      const empty = document.getElementById('rp-empty');
      let activeFilter = 'all';

      function updateProjects() {
        const query = search.value.trim().toLowerCase();
        let visible = 0;

        cards.forEach(card => {
          const status = card.dataset.status || '';
          const searchable = (card.innerText + ' ' + (card.dataset.search || '') + ' ' + card.id).toLowerCase();
          const matchesFilter = activeFilter === 'all' || status === activeFilter;
          const matchesQuery = !query || searchable.includes(query);
          const show = matchesFilter && matchesQuery;
          card.hidden = !show;
          if (show) visible++;
        });

        count.textContent = `Showing ${visible} of ${cards.length} projects`;
        empty.hidden = visible !== 0;
      }

      search.addEventListener('input', updateProjects);
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          activeFilter = button.dataset.filter;
          filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
          updateProjects();
        });
      });

      document.querySelectorAll('.rp-media[data-image]').forEach(figure => {
        const path = figure.dataset.image.trim();
        const img = figure.querySelector('img');
        if (!path) return;
        img.src = path;
        img.addEventListener('load', () => figure.classList.add('has-image'));
        img.addEventListener('error', () => {
          img.removeAttribute('src');
          figure.classList.remove('has-image');
          console.warn('Research image could not be loaded:', path);
        });
      });

      updateProjects();
    })();
