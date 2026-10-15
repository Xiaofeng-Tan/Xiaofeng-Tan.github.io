/* Public repository stars, refreshed per visit and while the page is visible.
 * No token is embedded. Shields supplies a fallback for API/network limits. */
(function () {
  'use strict';
  const nodes = Array.from(document.querySelectorAll('[data-github-stars]'));
  if (!nodes.length) return;
  const repositories = [...new Set(nodes.map(node => node.dataset.githubStars))];
  const inFlight = new Set();
  const lastRefresh = new Map();
  const interval = 5 * 60 * 1000;
  const badgeUrl = repo => `https://img.shields.io/github/stars/${repo}?style=flat&label=Stars&color=245b84&cacheSeconds=300`;

  function render(node, count) {
    const icon = document.createElement('span');
    icon.className = 'github-stars-icon';
    icon.textContent = '★';
    icon.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.className = 'github-stars-label';
    label.textContent = 'Stars';
    const value = document.createElement('span');
    value.className = 'github-stars-count';
    value.textContent = count == null ? '—' : count.toLocaleString('en-US');
    node.replaceChildren(icon, label, value);
  }

  function fallback(node, repo) {
    const image = document.createElement('img');
    image.className = 'github-stars-fallback';
    image.alt = 'GitHub Stars';
    image.src = badgeUrl(repo);
    image.addEventListener('error', () => { render(node, null); });
    node.replaceChildren(image);
    node.setAttribute('aria-label', 'View GitHub Stars');
    node.title = 'GitHub Stars (live badge)';
  }

  async function refresh(repo) {
    if (inFlight.has(repo)) return;
    inFlight.add(repo);
    const matching = nodes.filter(node => node.dataset.githubStars === repo);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: { Accept: 'application/vnd.github+json' },
        cache: 'no-store',
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Repository API unavailable');
      const data = await response.json();
      if (!Number.isInteger(data.stargazers_count) || data.stargazers_count < 0) {
        throw new Error('Invalid stars count');
      }
      matching.forEach(node => {
        render(node, data.stargazers_count);
        node.dataset.loaded = 'true';
        node.setAttribute('aria-label', `${data.stargazers_count} GitHub stars`);
        node.title = `GitHub Stars · updated ${new Date().toLocaleTimeString()}`;
      });
    } catch (error) {
      matching.forEach(node => {
        // Preserve a previously fetched number if a later refresh fails.
        if (node.dataset.loaded !== 'true' && !node.querySelector('img')) fallback(node, repo);
      });
    } finally {
      clearTimeout(timeout);
      inFlight.delete(repo);
      lastRefresh.set(repo, Date.now());
    }
  }

  nodes.forEach(node => fallback(node, node.dataset.githubStars));
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
