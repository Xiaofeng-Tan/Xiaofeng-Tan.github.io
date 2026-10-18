---
layout: page
permalink: /Publications/
title: Publications
description:
nav: false
nav_order: 2
_styles: |
  /* ========== Publications 页面样式 - 美化增强版 ========== */
  /* 引入学术风格衬线字体 */
  @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,500&display=swap');

  body {
    background: linear-gradient(135deg, #fdfbfb 0%, #f7f4f9 50%, #faf8fc 100%);
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    animation: backgroundShiftLight 20s ease-in-out infinite;
    font-family: "Crimson Pro", "Source Serif 4", Georgia, "Times New Roman", serif;
  }

  @keyframes backgroundShiftLight {
    0%, 100% { 
      background: linear-gradient(135deg, #fdfbfb 0%, #f7f4f9 50%, #faf8fc 100%);
    }
    50% { 
      background: linear-gradient(135deg, #faf8fc 0%, #fdfbfb 50%, #f7f4f9 100%);
    }
  }

  @keyframes backgroundShiftDark {
    0%, 100% { 
      background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%);
    }
    50% { 
      background: linear-gradient(135deg, #161b22 0%, #0d1117 50%, #161b22 100%);
    }
  }

  /* 全局浮动装饰元素 */
  body::before,
  body::after {
    content: '';
    position: fixed;
    border-radius: 50%;
    opacity: 0.4;
    z-index: 0;
    pointer-events: none;
  }

  body::before {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0, 161, 233, 0.1) 0%, transparent 70%);
    top: -100px;
    right: -100px;
    animation: floatBubble1 25s ease-in-out infinite;
  }

  body::after {
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, rgba(118, 75, 162, 0.08) 0%, transparent 70%);
    bottom: -80px;
    left: -80px;
    animation: floatBubble2 30s ease-in-out infinite;
  }

  @keyframes floatBubble1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-50px, 50px) scale(1.1); }
  }

  @keyframes floatBubble2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(50px, -50px) scale(1.15); }
  }

  .post {
    font-family: "Crimson Pro", "Source Serif 4", Georgia, "Times New Roman", serif;
    color: #2c3e50;
    position: relative;
    z-index: 1;
  }

  /* 页面标题样式 - 增强版 */
  .post-header {
    text-align: left;
    margin: 0 0 1.5rem 0;
    padding: 0;
    background: transparent;
    border: none;
    box-shadow: none;
    position: relative;
  }

  .post-title {
    font-family: "Playfair Display", Georgia, "Times New Roman", serif;
    font-size: 2.2rem;
    margin-bottom: 0.4rem;
    color: #2c3e50;
    font-weight: 700;
    letter-spacing: -0.5px;
    line-height: 1.25;
    position: relative;
    display: inline-block;
  }

  .post-title::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #00A1E9 0%, #764ba2 100%);
    border-radius: 2px;
  }

  .post-description {
    font-size: 0.95rem;
    color: #7f8c8d;
    margin-top: 0.8rem;
    font-weight: 500;
    line-height: 1.6;
  }

  /* Collapsible publication sections (single-line headers) */
  .publications-grouped {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin-top: 0.2rem;
    margin-bottom: 0.85rem;
  }

  .pub-category {
    border: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
    background: transparent;
    border-radius: 0;
  }

  .pub-category__summary {
    list-style: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.32rem 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #64748b;
    user-select: none;
    transition: color 0.15s ease;
  }

  .pub-category__summary::-webkit-details-marker {
    display: none;
  }

  .pub-category__summary::marker {
    display: none;
    content: '';
  }

  .pub-category__label {
    flex: 1;
    min-width: 0;
    line-height: 1.2;
  }

  .pub-category__chevron {
    flex-shrink: 0;
    width: 0.5rem;
    height: 0.5rem;
    border-right: 1.5px solid currentColor;
    border-bottom: 1.5px solid currentColor;
    transform: rotate(45deg);
    margin-top: -0.2rem;
    opacity: 0.55;
    transition: transform 0.2s ease, opacity 0.15s ease;
  }

  .pub-category:not([open]) .pub-category__chevron {
    transform: rotate(-45deg);
    margin-top: 0.1rem;
  }

  .pub-category[open] .pub-category__chevron {
    transform: rotate(45deg);
    margin-top: -0.15rem;
  }

  .pub-category__summary:hover {
    color: #00A1E9;
  }

  .pub-category__summary:hover .pub-category__chevron {
    opacity: 0.9;
  }

  .pub-category__body {
    padding: 0 0 0.35rem 0;
    border: 0;
  }

  .pub-category__body .publications {
    margin-top: 0.25rem;
    margin-bottom: 0.15rem;
  }

  .pub-category__body .publications h2.year:first-child,
  .pub-category__body .publications h2.bibliography:first-child {
    margin-top: 0.65rem;
  }

  /* ========== 年份分组标题 - 现代极简风格 ========== */
  .publications h2.year,
  .publications h2.bibliography {
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin: 2.8rem 0 1rem 0;
    padding: 0;
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    gap: 1rem;
  }

  /* 左侧竖线装饰 */
  .publications h2.year::before,
  .publications h2.bibliography::before {
    content: '';
    width: 3px;
    height: 100%;
    min-height: 20px;
    background: linear-gradient(180deg, #00A1E9 0%, #764ba2 100%);
    border-radius: 2px;
    flex-shrink: 0;
  }

  /* 右侧延伸线 */
  .publications h2.year::after,
  .publications h2.bibliography::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, #e2e8f0 0%, transparent 100%);
  }

  /* 悬停效果 */
  .publications h2.year:hover,
  .publications h2.bibliography:hover {
    color: #00A1E9;
  }

  .publications h2.year:hover::before,
  .publications h2.bibliography:hover::before {
    background: linear-gradient(180deg, #00A1E9 0%, #00A1E9 100%);
    box-shadow: 0 0 12px rgba(0, 161, 233, 0.4);
  }

  /* Publications — Minimalist Academic Style */
  .publications {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  .publications .bibliography {
    margin-top: 0;
  }

  .publications .bibliography li {
    margin-bottom: 0;
    padding: 0.5rem 0 0.5rem 0.7rem;
    background: transparent;
    border-radius: 0;
    box-shadow: none;
    border: none;
    border-left: 2px solid transparent;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    transition: border-color 0.2s ease, background 0.2s ease;
    position: relative;
    overflow: visible;
    backdrop-filter: none;
    width: 100%;
    min-width: 0;
  }

  .publications .bibliography li .row {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    width: 100%;
  }

  .publications .bibliography li .col-sm-8,
  .publications .bibliography li .col-sm-10 {
    flex: 1;
    max-width: none;
    width: auto;
    min-width: 0;
  }

  .publications .bibliography li::before {
    display: none;
  }

  .publications .bibliography li::after {
    display: none;
  }

  .publications .bibliography li:hover {
    transform: none;
    box-shadow: none;
    border-left-color: #00A1E9;
    background: rgba(0, 161, 233, 0.015);
  }

  .publications .bibliography li:last-child {
    border-bottom: none;
  }

  .publications .title {
    font-size: 0.95rem;
    font-weight: 700;
    margin-bottom: 0.1rem;
    color: #1a2530;
    line-height: 1.4;
    position: relative;
    z-index: 1;
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
    letter-spacing: -0.01em;
    width: 100%;
  }

  .publications .author {
    font-size: 0.8rem;
    margin-bottom: 0.05rem;
    color: #5a6c7d;
    position: relative;
    z-index: 1;
    line-height: 1.35;
  }

  .publications .author em {
    font-weight: 700;
    font-style: normal;
    color: #00A1E9;
    background: linear-gradient(135deg, #00A1E9 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .publications .author em sup,
  .publications .author sup {
    -webkit-text-fill-color: #00A1E9;
    color: #00A1E9;
    font-size: 0.7em;
    vertical-align: super;
  }

  .publications .periodical {
    font-size: 0.78rem;
    margin-bottom: 0.05rem;
    color: #7f8c8d;
    font-style: italic;
    position: relative;
    z-index: 1;
    line-height: 1.25;
  }

  .publications .periodical .venue-abbr {
    font-style: normal;
    font-weight: 600;
    margin-right: 0.3rem;
    font-size: 0.76rem;
  }

  .publications .periodical .venue-separator {
    color: #ccc;
    margin: 0 0.35rem;
    font-style: normal;
  }

  /* Preview thumbnail — 4:3 cover crop */
  .publications .abbr {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex: 0 0 3.75rem;
    width: 3.75rem;
    max-width: 3.75rem;
    padding-right: 0.55rem;
    padding-top: 0.12rem;
  }

  .publications .abbr:has(> img.preview) {
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    background: rgba(0, 0, 0, 0.04);
    padding: 0;
    align-self: flex-start;
    margin-right: 0.55rem;
  }

  .publications .abbr > img.preview {
    width: 100% !important;
    height: 100% !important;
    max-width: none !important;
    object-fit: cover;
    object-position: center;
    display: block;
    border-radius: 0 !important;
    box-shadow: none !important;
    vertical-align: top;
  }

  .publications .abbr figure {
    margin: 0;
    padding: 0;
    width: 100%;
    line-height: 0;
    border-radius: 4px;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background: rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.08);
  }

  .publications .abbr picture {
    display: block;
    width: 100%;
    height: 100%;
  }

  .publications .abbr .preview,
  .publications .abbr figure img {
    width: 100% !important;
    height: 100% !important;
    max-width: none !important;
    object-fit: cover;
    object-position: center;
    display: block;
    border-radius: 0 !important;
    box-shadow: none !important;
    vertical-align: top;
  }

  @media (min-width: 768px) {
    .publications .abbr {
      flex: 0 0 4.25rem;
      width: 4.25rem;
      max-width: 4.25rem;
    }
  }

  @media (max-width: 480px) {
    .publications .abbr {
      flex: 0 0 3.25rem;
      width: 3.25rem;
      max-width: 3.25rem;
      padding-right: 0.45rem;
    }
  }

  /* CCF 等级徽章 */
  .ccf-badge {
    display: inline-block;
    font-size: 0.6rem;
    font-weight: 600;
    padding: 0.05rem 0.4rem;
    border-radius: 3px;
    margin-left: 0.4rem;
    font-style: normal;
    vertical-align: middle;
    letter-spacing: 0.02em;
  }

  .ccf-badge-ccfa {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
    color: white;
    box-shadow: 0 2px 6px rgba(238, 90, 90, 0.35);
  }

  .ccf-badge-ccfb {
    background: linear-gradient(135deg, #ffa726 0%, #fb8c00 100%);
    color: white;
    box-shadow: 0 2px 6px rgba(251, 140, 0, 0.35);
  }

  .ccf-badge-ccfc {
    background: linear-gradient(135deg, #66bb6a 0%, #43a047 100%);
    color: white;
    box-shadow: 0 2px 6px rgba(67, 160, 71, 0.35);
  }

  .ccf-badge-ccfnone {
    background: linear-gradient(135deg, #90a4ae 0%, #78909c 100%);
    color: white;
    box-shadow: 0 2px 6px rgba(120, 144, 156, 0.35);
  }

  /* CORE 等级徽章 */
  .core-badge {
    display: inline-block;
    font-size: 0.6rem;
    font-weight: 600;
    padding: 0.05rem 0.4rem;
    border-radius: 3px;
    margin-left: 0.4rem;
    font-style: normal;
    vertical-align: middle;
    letter-spacing: 0.02em;
  }

  .core-badge-coreastar {
    background: linear-gradient(135deg, #7c4dff 0%, #651fff 100%);
    color: white;
    box-shadow: 0 2px 6px rgba(101, 31, 255, 0.35);
  }

  .core-badge-corea {
    background: linear-gradient(135deg, #448aff 0%, #2979ff 100%);
    color: white;
    box-shadow: 0 2px 6px rgba(41, 121, 255, 0.35);
  }

  .core-badge-coreb {
    background: linear-gradient(135deg, #69f0ae 0%, #00e676 100%);
    color: #1b5e20;
    box-shadow: 0 2px 6px rgba(0, 230, 118, 0.35);
  }

  /* SCI 分区徽章 */
  .sci-badge {
    display: inline-block;
    font-size: 0.6rem;
    font-weight: 600;
    padding: 0.05rem 0.4rem;
    border-radius: 3px;
    margin-left: 0.4rem;
    font-style: normal;
    vertical-align: middle;
    letter-spacing: 0.02em;
  }

  .sci-badge-sciq1 {
    background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%);
    color: white;
    box-shadow: 0 2px 6px rgba(194, 24, 91, 0.35);
  }

  .sci-badge-sciq2 {
    background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
    color: white;
    box-shadow: 0 2px 6px rgba(245, 124, 0, 0.35);
  }

  .sci-badge-sciq3 {
    background: linear-gradient(135deg, #8bc34a 0%, #689f38 100%);
    color: white;
    box-shadow: 0 2px 6px rgba(104, 159, 56, 0.35);
  }

  .sci-badge-sciq4 {
    background: linear-gradient(135deg, #9e9e9e 0%, #757575 100%);
    color: white;
    box-shadow: 0 2px 6px rgba(117, 117, 117, 0.35);
  }

  /* Publication Links — Hyperlink Style */
  .publications .links {
    font-size: 0.74rem;
    margin-top: 0.1rem;
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.28rem 0.5rem;
    row-gap: 0.32rem;
  }

  .publications .links a {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    flex-shrink: 0;
    white-space: nowrap;
    padding: 0 !important;
    margin: 0;
    background: transparent !important;
    color: #00A1E9;
    border-radius: 0 !important;
    text-decoration: underline;
    text-decoration-color: rgba(0, 161, 233, 0.3);
    text-underline-offset: 2px;
    text-decoration-thickness: 1px;
    transition: color 0.2s ease, text-decoration-color 0.2s ease;
    font-weight: 500;
    border: none !important;
    box-shadow: none !important;
    cursor: pointer;
    line-height: 1.25;
    font-size: 0.74rem;
  }

  .publications .links a i {
    font-size: 0.75em;
    opacity: 0.65;
    flex-shrink: 0;
    text-decoration: none;
  }

  .publications .links a:hover {
    color: #0077b6;
    text-decoration: underline;
    text-decoration-color: #0077b6;
    transform: none;
    box-shadow: none !important;
    background: transparent !important;
  }

  .publications .links a:hover i {
    opacity: 1;
  }

  .publications .links a[href*="pdf"],
  .publications .links a[href*="arxiv"] {
    color: #c0392b;
    text-decoration-color: rgba(192, 57, 43, 0.3);
  }

  .publications .links a[href*="pdf"]:hover,
  .publications .links a[href*="arxiv"]:hover {
    color: #922b21;
    text-decoration-color: #922b21;
  }

  .publications .links a[href*="github"] {
    color: #4a5568;
    text-decoration-color: rgba(74, 85, 104, 0.3);
  }

  .publications .links a[href*="github"]:hover {
    color: #2d3748;
    text-decoration-color: #2d3748;
  }

  .publications .links a[href*="xiaofeng-tan.github.io/projects"],
  .publications .links a[href*="wengwanjiang.github.io"] {
    color: #27ae60;
    text-decoration-color: rgba(39, 174, 96, 0.3);
  }

  .publications .links a[href*="xiaofeng-tan.github.io/projects"]:hover,
  .publications .links a[href*="wengwanjiang.github.io"]:hover {
    color: #1e8449;
    text-decoration-color: #1e8449;
  }

  .publications .links a.award {
    color: #e67e22;
    text-decoration-color: rgba(230, 126, 34, 0.3);
  }

  .publications .links a.award:hover {
    color: #ca6f1e;
    text-decoration-color: #ca6f1e;
  }

  .publications .links a.abstract,
  .publications .links a.bibtex {
    color: #8e44ad;
    text-decoration-color: rgba(142, 68, 173, 0.3);
  }

  .publications .links a.abstract:hover,
  .publications .links a.bibtex:hover {
    color: #6c3483;
    text-decoration-color: #6c3483;
  }

  /* 搜索框样式 - 增强 */
  .bibsearch-form-input {
    background: rgba(255, 255, 255, 0.75);
    border: 2px solid rgba(0, 161, 233, 0.15);
    border-radius: 12px;
    padding: 0.65rem 1.2rem;
    font-size: 0.92rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(12px);
    width: 100%;
    max-width: 400px;
  }

  .bibsearch-form-input:focus {
    border-color: #00A1E9;
    box-shadow: 0 0 0 4px rgba(0, 161, 233, 0.12);
    outline: none;
    background: rgba(255, 255, 255, 0.95);
  }

  /* Abstract/Bibtex 展开内容样式 */
  .publications .abstract,
  .publications .bibtex {
    margin-top: 0.4rem;
    padding: 0.6rem 0.8rem;
    background: rgba(248, 249, 250, 0.6);
    border-radius: 4px;
    border-left: 2px solid #00A1E9;
    font-size: 0.82rem;
    line-height: 1.6;
    color: #5a6c7d;
  }

  .publications .bibtex pre {
    margin: 0;
    font-size: 0.75rem;
    background: transparent;
    padding: 0;
    overflow-x: auto;
  }

  /* ========== 暗色模式 ========== */
  html[data-theme="dark"] body {
    background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%);
    animation: backgroundShiftDark 20s ease-in-out infinite;
  }

  html[data-theme="dark"] body::before {
    background: radial-gradient(circle, rgba(94, 200, 242, 0.12) 0%, transparent 70%);
  }

  html[data-theme="dark"] body::after {
    background: radial-gradient(circle, rgba(179, 136, 255, 0.1) 0%, transparent 70%);
  }

  html[data-theme="dark"] .post {
    color: #c9d1d9;
  }

  html[data-theme="dark"] .post-title {
    color: #e6edf3;
  }

  html[data-theme="dark"] .post-title::after {
    background: linear-gradient(90deg, #5ec8f2 0%, #b388ff 100%);
  }

  html[data-theme="dark"] .post-description {
    color: #8b949e;
  }

  html[data-theme="dark"] .pub-category {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  html[data-theme="dark"] .pub-category__summary {
    color: #8b949e;
  }

  html[data-theme="dark"] .pub-category__summary:hover {
    color: #5ec8f2;
  }

  /* 年份分组标题 - 暗色模式 */
  html[data-theme="dark"] .publications h2.year,
  html[data-theme="dark"] .publications h2.bibliography {
    color: #64748b;
  }

  html[data-theme="dark"] .publications h2.year::before,
  html[data-theme="dark"] .publications h2.bibliography::before {
    background: linear-gradient(180deg, #5ec8f2 0%, #b388ff 100%);
  }

  html[data-theme="dark"] .publications h2.year::after,
  html[data-theme="dark"] .publications h2.bibliography::after {
    background: linear-gradient(90deg, #30363d 0%, transparent 100%);
  }

  html[data-theme="dark"] .publications h2.year:hover,
  html[data-theme="dark"] .publications h2.bibliography:hover {
    color: #5ec8f2;
  }

  html[data-theme="dark"] .publications h2.year:hover::before,
  html[data-theme="dark"] .publications h2.bibliography:hover::before {
    box-shadow: 0 0 14px rgba(94, 200, 242, 0.5);
  }

  /* Publications — Dark Mode */
  html[data-theme="dark"] .publications .bibliography li {
    background: transparent;
    border-bottom-color: rgba(255, 255, 255, 0.06);
    border-left-color: transparent;
    box-shadow: none;
  }

  html[data-theme="dark"] .publications .bibliography li:hover {
    background: rgba(94, 200, 242, 0.025);
    border-left-color: #5ec8f2;
    box-shadow: none;
  }

  html[data-theme="dark"] .publications .title {
    color: #e6edf3;
  }

  html[data-theme="dark"] .publications .author {
    color: #b1bac4;
  }

  html[data-theme="dark"] .publications .author em {
    background: linear-gradient(135deg, #5ec8f2 0%, #b388ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  html[data-theme="dark"] .publications .periodical {
    color: #8b949e;
  }

  html[data-theme="dark"] .publications .links a {
    color: #5ec8f2;
    text-decoration-color: rgba(94, 200, 242, 0.3);
  }

  html[data-theme="dark"] .publications .links a:hover {
    color: #8dd8f8;
    text-decoration-color: #8dd8f8;
  }

  html[data-theme="dark"] .publications .abbr figure {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
  }

  html[data-theme="dark"] .publications .abbr > img.preview {
    border-color: rgba(255, 255, 255, 0.1);
  }

  html[data-theme="dark"] .publications .links a[href*="pdf"],
  html[data-theme="dark"] .publications .links a[href*="arxiv"] {
    color: #ffa198;
    text-decoration-color: rgba(255, 161, 152, 0.3);
  }

  html[data-theme="dark"] .publications .links a[href*="pdf"]:hover,
  html[data-theme="dark"] .publications .links a[href*="arxiv"]:hover {
    color: #ffcbc7;
    text-decoration-color: #ffcbc7;
  }

  html[data-theme="dark"] .publications .links a[href*="github"] {
    color: #c9d1d9;
    text-decoration-color: rgba(201, 209, 217, 0.3);
  }

  html[data-theme="dark"] .publications .links a[href*="github"]:hover {
    color: #f0f3f6;
    text-decoration-color: #f0f3f6;
  }

  html[data-theme="dark"] .publications .links a[href*="xiaofeng-tan.github.io/projects"],
  html[data-theme="dark"] .publications .links a[href*="wengwanjiang.github.io"] {
    color: #7ee787;
    text-decoration-color: rgba(126, 231, 135, 0.3);
  }

  html[data-theme="dark"] .publications .links a[href*="xiaofeng-tan.github.io/projects"]:hover,
  html[data-theme="dark"] .publications .links a[href*="wengwanjiang.github.io"]:hover {
    color: #a5f0ad;
    text-decoration-color: #a5f0ad;
  }

  html[data-theme="dark"] .publications .links a.abstract,
  html[data-theme="dark"] .publications .links a.bibtex {
    color: #d2a8ff;
    text-decoration-color: rgba(210, 168, 255, 0.3);
  }

  html[data-theme="dark"] .publications .links a.abstract:hover,
  html[data-theme="dark"] .publications .links a.bibtex:hover {
    color: #e4c8ff;
    text-decoration-color: #e4c8ff;
  }

  html[data-theme="dark"] .publications .abstract,
  html[data-theme="dark"] .publications .bibtex {
    background: rgba(22, 27, 34, 0.9);
    border-left-color: #5ec8f2;
    color: #b1bac4;
  }

  /* 搜索框暗色模式 */
  html[data-theme="dark"] .bibsearch-form-input {
    background: rgba(22, 27, 34, 0.88);
    border-color: rgba(48, 54, 61, 0.85);
    color: #c9d1d9;
  }

  html[data-theme="dark"] .bibsearch-form-input:focus {
    border-color: #5ec8f2;
    box-shadow: 0 0 0 4px rgba(94, 200, 242, 0.18);
    background: rgba(33, 38, 45, 0.95);
  }

  html[data-theme="dark"] .bibsearch-form-input::placeholder {
    color: #8b949e;
  }

  /* Footer 样式 */
  html[data-theme="light"] footer.sticky-bottom,
  html[data-theme="light"] footer.fixed-bottom,
  html:not([data-theme="dark"]) footer.sticky-bottom,
  html:not([data-theme="dark"]) footer.fixed-bottom {
    background-color: #f8f9fa !important;
    border-top: 1px solid rgba(0, 0, 0, 0.08) !important;
  }

  html[data-theme="light"] footer.sticky-bottom .container,
  html[data-theme="light"] footer.fixed-bottom .container,
  html:not([data-theme="dark"]) footer.sticky-bottom .container,
  html:not([data-theme="dark"]) footer.fixed-bottom .container {
    color: #5a6c7d !important;
  }

  html[data-theme="light"] footer.sticky-bottom .container a,
  html[data-theme="light"] footer.fixed-bottom .container a,
  html:not([data-theme="dark"]) footer.sticky-bottom .container a,
  html:not([data-theme="dark"]) footer.fixed-bottom .container a {
    color: #00A1E9 !important;
  }

  html[data-theme="dark"] footer.sticky-bottom,
  html[data-theme="dark"] footer.fixed-bottom {
    background-color: #0d1117 !important;
    border-top: 1px solid rgba(48, 54, 61, 0.8) !important;
  }

  html[data-theme="dark"] footer.sticky-bottom .container,
  html[data-theme="dark"] footer.fixed-bottom .container {
    color: #8b949e !important;
  }

  html[data-theme="dark"] footer.sticky-bottom .container a,
  html[data-theme="dark"] footer.fixed-bottom .container a {
    color: #5ec8f2 !important;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .post-title {
      font-size: 1.6rem;
    }

    .post-title::after {
      width: 45px;
      height: 2px;
    }

    .publications h2.year,
    .publications h2.bibliography {
      font-size: 0.68rem;
      margin: 2rem 0 0.8rem 0;
      gap: 0.8rem;
    }

    .publications h2.year::before,
    .publications h2.bibliography::before {
      width: 2px;
      min-height: 16px;
    }

    .publications .bibliography li {
      padding: 0.65rem 0.8rem;
      margin-bottom: 0.5rem;
      border-radius: 12px;
    }

    .publications .bibliography li::after {
      display: none;
    }

    .publications .title {
      font-size: 0.9rem;
    }

    .publications .author {
      font-size: 0.78rem;
    }

    .publications .periodical {
      font-size: 0.76rem;
    }

    .publications .links {
      gap: 0.3rem;
    }

    .publications .links a {
      font-size: 0.7rem;
      padding: 0.18rem 0.5rem;
    }

    .publications .bibliography li:hover {
      transform: none;
    }

    .bibsearch-form-input {
      max-width: 100%;
    }
  }

  @media (max-width: 480px) {
    .post-title {
      font-size: 1.4rem;
    }

    .publications h2.year,
    .publications h2.bibliography {
      font-size: 0.65rem;
      margin: 1.5rem 0 0.6rem 0;
      gap: 0.6rem;
    }

    .publications .title {
      font-size: 0.84rem;
    }

    .publications .author {
      font-size: 0.74rem;
    }

    .publications .periodical {
      font-size: 0.72rem;
    }

    .publications .links a {
      font-size: 0.66rem;
      padding: 0.15rem 0.4rem;
    }
  }
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications-grouped">
  <details class="pub-category" open>
    <summary class="pub-category__summary">
      <span class="pub-category__label">Publications</span>
      <span class="pub-category__chevron" aria-hidden="true"></span>
    </summary>
    <div class="pub-category__body">
      <div class="publications">
        {% bibliography --group_by year --query @*[abbr!=UR]* %}
      </div>
    </div>
  </details>

  <details class="pub-category" open>
    <summary class="pub-category__summary">
      <span class="pub-category__label">Preprints</span>
      <span class="pub-category__chevron" aria-hidden="true"></span>
    </summary>
    <div class="pub-category__body">
      <div class="publications">
        {% bibliography --group_by year --query @*[abbr=UR]* %}
      </div>
    </div>
  </details>
</div>
