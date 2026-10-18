---
---
/* Translate interface text without replacing DOM elements or their handlers.
 * Paper titles, authors, abstracts, and project pages stay in their original language.
 */
(function () {
  'use strict';
  const translations = {{ site.data.i18n_zh | jsonify }};
  const originals = new WeakMap();
  const attributes = new WeakMap();
  const button = document.getElementById('language-toggle');
  const introButtons = Array.from(document.querySelectorAll('[data-language-target]'));
  if (!button && introButtons.length === 0) return;

  function translate(text) {
    const key = text.trim().replace(/\s+/g, ' ');
    let value = translations[key];
    if (!value) {
      value = key
        .replace(/\bPresent\b/g, '至今')
        .replace(/\bExpected\b/g, '预计')
        .replace(/\bFall\b/g, '秋季')
        .replace(/\bSpring\b/g, '春季')
        .replace(/\(Mentor\)/g, '（导师）');
      if (value === key) return text;
    }
    return text.replace(text.trim(), value);
  }

  function setLanguage(language) {
    const chinese = language === 'zh';
    document.documentElement.lang = chinese ? 'zh-CN' : 'en';
    try { localStorage.setItem('site-language', language); } catch (error) {}
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || parent.closest(
        'script, style, code, pre, textarea, [data-language], [data-preview-label], #language-toggle, ' +
        '.copyable, #copy-toast, .publications .title, .publications .author, ' +
        '.publications .abstract.hidden, .publications .bibtex, .project-page-content, .katex, .MathJax'
      )) continue;
      if (!originals.has(node)) originals.set(node, node.nodeValue);
      const original = originals.get(node);
      node.nodeValue = chinese ? translate(original) : original;
    }
    document.querySelectorAll('[title], [placeholder], [aria-label]').forEach(function (element) {
      if (element.closest('[data-language], #language-toggle')) return;
      if (!attributes.has(element)) {
        const saved = {};
        ['title', 'placeholder', 'aria-label'].forEach(function (name) {
          if (element.hasAttribute(name)) saved[name] = element.getAttribute(name);
        });
        attributes.set(element, saved);
      }
      Object.entries(attributes.get(element)).forEach(function ([name, value]) {
        element.setAttribute(name, chinese ? translate(value) : value);
      });
    });
    if (button) {
      button.textContent = chinese ? 'EN' : '中文';
      button.title = chinese ? 'Switch to English' : '切换为中文';
      button.setAttribute('aria-label', button.title);
    }
    document.dispatchEvent(new CustomEvent('site-language-changed', { detail: { language: language } }));
    // Notify layout-dependent widgets after the text changes.
    window.dispatchEvent(new Event('resize'));
  }
  if (button) {
    button.addEventListener('click', function () {
      setLanguage(document.documentElement.lang === 'zh-CN' ? 'en' : 'zh');
    });
  }
  introButtons.forEach(function (introButton) {
    introButton.addEventListener('click', function () {
      setLanguage(introButton.dataset.languageTarget);
    });
  });
  setLanguage(document.documentElement.lang === 'zh-CN' ? 'zh' : 'en');
})();
