/* Public repository stars, refreshed per visit and while the page is visible.
 * No token is embedded. Shields JSON and a last-known count cover API limits
 * without replacing the inline text with an image badge. */
(function () {
  'use strict';
  const nodes = Array.from(document.querySelectorAll('[data-github-stars]'));
  if (!nodes.length) return;
  const repositories = [...new Set(nodes.map(node => node.dataset.githubStars))];
  const inFlight = new Set();
  const lastRefresh = new Map();
  const interval = 5 * 60 * 1000;

  function render(node, count) {
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('class', 'github-stars-icon');
    icon.setAttribute('viewBox', '0 0 24 24');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'm12 3 2.78 5.63L21 9.54l-4.5 4.38 1.06 6.19L12 17.19l-5.56 2.92 1.06-6.19L3 9.54l6.22-.91Z');
    icon.appendChild(path);
    icon.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.className = 'github-stars-label';
    label.textContent = 'Stars';
    const value = document.createElement('span');
    value.className = 'github-stars-count';
    value.textContent = count == null ? '—' : count.toLocaleString('en-US');
    if (count == null) node.replaceChildren(icon, label);
    else node.replaceChildren(icon, value, label);
  }

  function fallback(node) {
    render(node, null);
    node.setAttribute('aria-label', 'View GitHub Stars');
    node.title = 'View stars on GitHub';
  }

  const cacheKey = repo => `github-stars:${repo}`;
  function showCount(repo, count, updatedAt, source) {
    nodes.filter(node => node.dataset.githubStars === repo).forEach(node => {
      render(node, count);
      node.dataset.loaded = 'true';
      node.setAttribute('aria-label', `${count} GitHub stars`);
      node.title = `GitHub Stars · ${source} · ${new Date(updatedAt).toLocaleString()}`;
    });
  }

  async function fetchJSON(url, headers = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
      const response = await fetch(url, { headers, cache: 'no-store', signal: controller.signal });
      if (!response.ok) throw new Error('Stars source unavailable');
      return await response.json();
    } finally {
      clearTimeout(timeout);
    }
  }

  async function refresh(repo) {
    if (inFlight.has(repo)) return;
    inFlight.add(repo);
    const matching = nodes.filter(node => node.dataset.githubStars === repo);
    try {
      let count;
      let source = 'GitHub';
      try {
        const data = await fetchJSON(`https://api.github.com/repos/${repo}`, {
          Accept: 'application/vnd.github+json',
        });
        if (!Number.isInteger(data.stargazers_count) || data.stargazers_count < 0) {
          throw new Error('Invalid stars count');
        }
        count = data.stargazers_count;
      } catch (error) {
        const data = await fetchJSON(`https://img.shields.io/github/stars/${repo}.json`);
        const value = String(data.value ?? data.message ?? '').trim();
        if (!/^\d+(?:,\d{3})*(?:\.\d+)?[kKmM]?$/.test(value)) {
          throw new Error('Invalid fallback stars count');
        }
        count = /^[\d,]+$/.test(value) ? Number(value.replace(/,/g, '')) : value;
        source = 'Shields (cached by provider)';
      }
      const updatedAt = Date.now();
      showCount(repo, count, updatedAt, source);
      try { localStorage.setItem(cacheKey(repo), JSON.stringify({ count, updatedAt })); } catch (_) {}
    } catch (error) {
      matching.forEach(node => {
        // Preserve a previously fetched number if a later refresh fails.
        if (node.dataset.loaded !== 'true') {
          fallback(node);
          node.title = 'Stars temporarily unavailable; view count on GitHub';
        }
      });
    } finally {
      inFlight.delete(repo);
      lastRefresh.set(repo, Date.now());
    }
  }

  nodes.forEach(node => fallback(node));
  repositories.forEach(repo => {
    try {
      const saved = JSON.parse(localStorage.getItem(cacheKey(repo)));
      if (saved && Number.isFinite(saved.updatedAt) &&
          /^\d+(?:,\d{3})*(?:\.\d+)?[kKmM]?$/.test(String(saved.count))) {
        showCount(repo, saved.count, saved.updatedAt, 'Last known count');
      }
    } catch (_) {}
  });
  repositories.forEach(refresh);
  setInterval(() => {
    if (!document.hidden) repositories.forEach(refresh);
  }, interval);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) repositories.forEach(repo => {
      if (Date.now() - (lastRefresh.get(repo) || 0) >= interval) refresh(repo);
    });
  });
})();
