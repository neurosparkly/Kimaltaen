(function () {
  const data = window.KIMALTAEN_HOME || {};

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function renderHighlightCards(targetId, items) {
    const target = document.getElementById(targetId);
    if (!target || !Array.isArray(items)) return;

    target.innerHTML = items.map(item => `
      <div class="mini-card">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.excerpt)}</p>
      </div>
    `).join('');
  }

  function renderCards(targetId, items) {
    const target = document.getElementById(targetId);
    if (!target || !Array.isArray(items)) return;

    target.innerHTML = items.map(item => `
      <article class="card">
        <a href="${escapeHtml(item.href)}" aria-label="Lue: ${escapeHtml(item.title)}">
          <div class="card__image">
<img class="${item.imageClass ? escapeHtml(item.imageClass) : ''}" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.imageAlt || '')}">
</div>
          <div class="card__body">
            ${item.tag ? `<div class="card__tag">${escapeHtml(item.tag)}</div>` : ''}
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.excerpt)}</p>
            <span>Lue lisää</span>
          </div>
        </a>
      </article>
    `).join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderHighlightCards('home-highlights', data.highlights);
    renderCards('featured-posts', data.featured);
    renderCards('topic-cards', data.topics);
  });
})();
