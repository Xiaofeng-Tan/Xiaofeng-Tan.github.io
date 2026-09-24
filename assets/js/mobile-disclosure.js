/* Mobile-only progressive disclosure. Content stays complete without JS and
 * on desktop. Hide whole items, never clip text or leave invisible links active.
 */
(function () {
  'use strict';
  if (!document.body.classList.contains('about-page')) return;
  const mobile = window.matchMedia('(max-width: 767.98px)');
  const groups = [];

  function setup(container, items, limit, id, labelCount) {
    if (!container || items.length <= limit) return;
    const extras = items.slice(limit);
    container.id = container.id || id;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mobile-disclosure';
    button.setAttribute('aria-controls', container.id);
    // Explicit language nodes keep labels compatible with the site translator.
    button.innerHTML = '<span data-language="en" lang="en"></span><span data-language="zh" lang="zh-CN"></span>';
    container.insertAdjacentElement('afterend', button);
    const group = { container, extras, button, expanded: false, count: labelCount || items.length };
    groups.push(group);
    button.addEventListener('click', () => {
      const collapsing = group.expanded;
      group.expanded = !group.expanded;
      render(group);
      if (collapsing) {
        // Avoid leaving the reader far below the content after it shrinks.
        const rect = button.getBoundingClientRect();
        if (rect.top < 110 || rect.bottom > window.innerHeight) {
          button.scrollIntoView({ block: 'center', behavior: 'auto' });
        }
      }
    });
    render(group);
  }

  function render(group) {
    const collapsed = mobile.matches && !group.expanded;
    group.button.hidden = !mobile.matches;
    group.button.setAttribute('aria-expanded', String(!collapsed));
    group.button.querySelector('[data-language="en"]').textContent = collapsed
      ? `Show all (${group.count}) ↓` : 'Show less ↑';
    group.button.querySelector('[data-language="zh"]').textContent = collapsed
      ? `展开全部（${group.count}）↓` : '收起 ↑';
    group.extras.forEach(item => {
      item.hidden = collapsed;
      // Timeline details may have been moved beside their controlling item.
      // Close them before hiding an institution, so no orphan card remains.
      const detailId = item.getAttribute('aria-controls');
      if (detailId && collapsed) {
        const detail = document.getElementById(detailId);
        item.classList.remove('active');
        item.setAttribute('aria-expanded', 'false');
        if (detail) detail.classList.remove('active');
      }
    });
  }

  function select(containerSelector, itemSelector, limit, id) {
    const container = document.querySelector(containerSelector);
    if (container) setup(container, Array.from(container.querySelectorAll(itemSelector)), limit, id);
  }

  select('.news', 'tbody > tr', 3, 'mobile-news');
  select('.logo-row--research', ':scope > .logo-item', 2, 'mobile-research');
  select('.honors-section', ':scope > .compact-card', 3, 'mobile-honors');
  document.querySelectorAll('.publications-grouped .bibliography').forEach((list, index) => {
    setup(list, Array.from(list.children), index === 0 ? 2 : 1, `mobile-papers-${index}`);
  });

  // The first English/Chinese pair remains visible. All interests are retained.
  const life = document.querySelector('.hobbies-section');
  if (life) {
    const paragraphs = Array.from(life.querySelectorAll(':scope > p'));
    setup(life, paragraphs, 2, 'mobile-life', paragraphs.length / 2);
  }
  mobile.addEventListener('change', () => groups.forEach(render));
})();
