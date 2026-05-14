---
layout: about
title: About
permalink: /
#subtitle: <a href='#'>Affiliations</a>. Address. Contacts. Motto. Etc.

profile:
  align: right
  image: prof_pic.jpg
  image_circular: True # crops the image to make it circular
  more_info:

news: true # includes a list of news items
selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page
---


I am a second-year M.Sc. student in the [PALM Lab](https://palm.seu.edu.cn/) @ [Southeast University (SEU)](https://www.seu.edu.cn/english/), supervised by Prof. [Hongsong Wang](https://cs.seu.edu.cn/hongsongwang/main.htm), currently a Research Intern at [Tencent Hunyuan](https://hunyuan.tencent.com/). I am also collaborating remotely with Prof. [Ming-Hsuan Yang](https://faculty.ucmerced.edu/mhyang/) at [UC Merced](https://www.ucmerced.edu/). Previously, I was a Research Intern at [Tencent's Youtu Lab](https://open.youtu.qq.com/#/open). Prior to that, I was a remote visiting student at [LV LAB](https://www.lv-lab.org/SMU/index.html) @ Singapore Management University (SMU), where I worked closely with Prof. [Pan Zhou](https://panzhous.github.io/). I received dual bachelor's degrees (B.E. in CS, B.Sc. in Math) from [Shenzhen University (SZU)](https://en.szu.edu.cn/) in 2024, where I started research with Prof. [Can Gao](https://csse.szu.edu.cn/pages/user/index?id=953).

<div class="interest-card" markdown="0">
My research interests mainly revolve around RLHF, RLVR, AIGC, and 3D Human Modeling. I am actively seeking (1) <strong>Ph.D. positions</strong> for Fall 2027 and (2) other <strong>research collaborations</strong> related to RL or AIGC. Feel free to reach out via 📧 <span class="copyable" onclick="copyToClipboard('xiaofengtan@seu.edu.cn', 'Email')">xiaofengtan@seu.edu.cn <i class="fas fa-copy"></i></span> or 💬 <span class="copyable" onclick="copyToClipboard('txf_06_20', 'WeChat ID')">WeChat: txf_06_20 <i class="fas fa-copy"></i></span>. I'd be happy to connect 😊. And if you'd like to talk about  <span class="doraemon-text"><a href="https://en.wikipedia.org/wiki/Doraemon" target="_blank"><em>Doraemon</em></a></span> 😺, that works too. For more details, please check my <a href="/assets/pdf/CV_Xiaofeng_Tan.pdf" target="_blank">CV</a> / <a href="/assets/pdf/CV_Xiaofeng_Tan_CN.pdf" target="_blank" style="font-family: 'Songti SC', 'STSong', 'SimSun', serif;">中文简历</a>.
</div>

<div id="copy-toast" class="copy-toast"></div>

<script>
function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(function() {
    var toast = document.getElementById('copy-toast');
    toast.textContent = '✓ ' + label + ' copied!';
    toast.classList.add('show');
    setTimeout(function() {
      toast.classList.remove('show');
    }, 2000);
  });
}
</script>

<!-- ======================== Doraemon Desk Pet ======================== -->
<!-- Sprite assets are stored locally under /assets/pet/doraemon/, used here
     purely for personal & non-commercial educational fun. -->
<div id="dora-pet" class="dora-pet is-walking" aria-label="Doraemon desk pet">
  <div class="dora-sprite" title="Drag me / double-click to switch state"></div>
</div>

<button id="dora-bell" class="dora-bell-btn" type="button" aria-label="Open Doraemon panel" title="Doraemon">🔔</button>

<div id="dora-panel" class="dora-panel" role="dialog" aria-label="Doraemon states">
  <div class="dora-panel-header">
    <span>🔔 Doraemon</span>
    <button type="button" class="dora-close" aria-label="Close panel">×</button>
  </div>
  <div class="dora-panel-body">
    <button type="button" class="dora-state-btn" data-state="idle">Idle</button>
    <button type="button" class="dora-state-btn" data-state="waving">Waving</button>
    <button type="button" class="dora-state-btn" data-state="jumping">Jumping</button>
    <button type="button" class="dora-state-btn" data-state="failed">Failed</button>
    <button type="button" class="dora-state-btn" data-state="waiting">Waiting</button>
    <button type="button" class="dora-state-btn" data-state="running">Running</button>
    <button type="button" class="dora-state-btn is-active" data-state="review">Review</button>
  </div>
  <div class="dora-panel-footer">
    <button type="button" class="dora-ring">🔔 Ring the bell</button>
    <button type="button" class="dora-resume" title="Resume autonomous roaming">▶ Auto-roam</button>
  </div>
</div>

<audio id="dora-sound" src="{{ '/assets/pet/doraemon/sound.mp3' | relative_url }}" preload="none"></audio>

<style>
/* ---- Doraemon desk pet (autonomous walk + draggable) ---- */
.dora-pet {
  position: fixed;
  /* left & bottom are driven by JS */
  left: 60%;
  bottom: 12px;
  z-index: 9990;
  width: calc(192px * var(--dora-scale));
  height: calc(208px * var(--dora-scale));
  pointer-events: none; /* sprite child re-enables this */
  --dora-scale: 0.65;
  --dora-sprite-url: url("{{ '/assets/pet/doraemon/sprite.webp' | relative_url }}");
  /* horizontal facing: -1 means flipped (face left) */
  --dora-facing: 1;
  user-select: none;
  -webkit-user-select: none;
}
.dora-pet.is-hidden { display: none; }
@media (max-width: 768px) { .dora-pet, .dora-bell-btn { display: none; } }

.dora-sprite {
  --sprite-row: 0;
  --sprite-frames: 6;
  --sprite-duration: 1.7s;
  --sprite-y: calc(var(--sprite-row) * -208px);
  --sprite-end-x: calc(var(--sprite-frames) * -192px);
  width: 192px;
  height: 208px;
  background-image: var(--dora-sprite-url);
  background-repeat: no-repeat;
  background-size: 1536px 1872px;
  background-position: 0 var(--sprite-y);
  image-rendering: pixelated;
  transform: scale(calc(var(--dora-scale) * var(--dora-facing)), var(--dora-scale));
  transform-origin: 0 0;
  /* When facing left, scaleX(-1) flips around origin 0,0 -> shift back */
  margin-left: calc((var(--dora-facing) < 0) * 0px);
  animation: dora-play var(--sprite-duration) steps(var(--sprite-frames)) infinite;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.18));
  pointer-events: auto;
  cursor: grab;
}
.dora-pet[data-facing="-1"] .dora-sprite {
  transform: translateX(calc(192px * var(--dora-scale))) scale(calc(-1 * var(--dora-scale)), var(--dora-scale));
}
.dora-pet.is-dragging .dora-sprite { cursor: grabbing; }

@keyframes dora-play {
  0%   { background-position: 0 var(--sprite-y); }
  100% { background-position: var(--sprite-end-x) var(--sprite-y); }
}

/* Bell button (opens panel) */
.dora-bell-btn {
  position: fixed;
  right: 16px;
  bottom: 16px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.08);
  background: #fffbe8;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  z-index: 9991;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.dora-bell-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 18px rgba(0,0,0,0.16); }
[data-theme="dark"] .dora-bell-btn { background:#4a3f1f; border-color: rgba(255,255,255,0.08); color:#fff; }
@media (max-width: 768px) { .dora-bell-btn { display: none; } }

/* Control panel (top-level, not nested in pet) */
.dora-panel {
  position: fixed;
  right: 16px;
  bottom: 68px;
  width: 240px;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.18);
  overflow: hidden;
  z-index: 9991;
  display: none;
  font-size: 13px;
  color: #333;
}
.dora-panel.is-open { display: block; }
[data-theme="dark"] .dora-panel { background:#2a2a2e; border-color:rgba(255,255,255,0.08); color:#eee; }
@media (max-width: 768px) { .dora-panel { display: none !important; } }

.dora-panel-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px; font-weight: 600; font-size: 13px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  cursor: move;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
}
.dora-panel.is-dragging { box-shadow: 0 14px 40px rgba(0,0,0,0.25); }
[data-theme="dark"] .dora-panel-header { border-bottom-color: rgba(255,255,255,0.08); }
.dora-close {
  border: none; background: transparent; cursor: pointer;
  font-size: 18px; line-height: 1; color: inherit; padding: 2px 6px;
  -webkit-user-select: auto; user-select: auto;
}
.dora-panel-body {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 6px; padding: 10px;
}
.dora-state-btn {
  font-size: 11.5px; padding: 6px 4px; border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.08); background: #f8f8f9;
  cursor: pointer; color: inherit;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.dora-state-btn:hover { background: #eef0f4; }
.dora-state-btn.is-active { background: #e8f1ff; border-color: #a8c7fa; }
[data-theme="dark"] .dora-state-btn { background:#3a3a40; border-color: rgba(255,255,255,0.08); }
[data-theme="dark"] .dora-state-btn:hover { background:#45454c; }
[data-theme="dark"] .dora-state-btn.is-active { background:#3a4a66; border-color:#5d7ab0; }

.dora-panel-footer {
  display: flex; gap: 6px;
  padding: 8px 10px 10px;
  border-top: 1px solid rgba(0,0,0,0.06);
}
[data-theme="dark"] .dora-panel-footer { border-top-color: rgba(255,255,255,0.08); }
.dora-ring, .dora-resume {
  flex: 1;
  font-size: 12px; padding: 6px 8px; border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.08);
  cursor: pointer; color: inherit;
}
.dora-ring { background: #fffbe8; }
.dora-ring:hover { background: #fff3c8; }
.dora-resume { background: #eef5ff; }
.dora-resume:hover { background: #dbe9ff; }
[data-theme="dark"] .dora-ring { background:#4a3f1f; border-color: rgba(255,255,255,0.08); }
[data-theme="dark"] .dora-ring:hover { background:#5a4d28; }
[data-theme="dark"] .dora-resume { background:#2c3a55; border-color: rgba(255,255,255,0.08); }
[data-theme="dark"] .dora-resume:hover { background:#37466a; }
</style>

<script>
(function () {
  var pet = document.getElementById('dora-pet');
  if (!pet) return;
  var sprite = pet.querySelector('.dora-sprite');
  var bellBtn = document.getElementById('dora-bell');
  var sound = document.getElementById('dora-sound');
  var panel = document.getElementById('dora-panel');
  var panelClose = panel.querySelector('.dora-close');
  var stateBtns = panel.querySelectorAll('.dora-state-btn');
  var ringBtn = panel.querySelector('.dora-ring');
  var resumeBtn = panel.querySelector('.dora-resume');

  // === States: row, frames, duration (ms) ===
  // Durations chosen ~1.5x slower than the original spec for a calmer pace.
  var STATES = {
    idle:     { row: 0, frames: 6, dur: 2700 },
    runRight: { row: 1, frames: 8, dur: 1950 },
    runLeft:  { row: 2, frames: 8, dur: 1950 },
    waving:   { row: 3, frames: 4, dur: 2400 },
    jumping:  { row: 4, frames: 5, dur: 2250 },
    failed:   { row: 5, frames: 8, dur: 2700 },
    waiting:  { row: 6, frames: 6, dur: 3000 },
    running:  { row: 7, frames: 6, dur: 2100 },
    review:   { row: 8, frames: 6, dur: 2550 }
  };

  // Ordered list for double-click state cycling
  var STATE_ORDER = ['idle', 'waving', 'jumping', 'failed', 'waiting', 'running', 'review'];

  function setSpriteState(s) {
    sprite.style.setProperty('--sprite-row', s.row);
    sprite.style.setProperty('--sprite-frames', s.frames);
    sprite.style.setProperty('--sprite-duration', (s.dur / 1000) + 's');
    sprite.style.animation = 'none';
    void sprite.offsetHeight;
    sprite.style.animation = '';
  }

  // === Position / movement ===
  var SCALE = 0.65;                 // keep in sync with --dora-scale
  var SPRITE_W = 192 * SCALE;       // ~161
  var SPRITE_H = 208 * SCALE;       // ~175
  var GROUND_OFFSET = 12;           // distance from bottom
  var ROAM_PADDING = 24;            // keep this far from viewport edges
  // Limit autonomous roaming to a small region around the bottom-right area
  var ROAM_HALF_RANGE = 140;        // px — half-width of roam window
  var ROAM_CENTER_RATIO = 0.7;      // 0.5 = screen center, 0.7 = right-of-center

  function getRoamBounds() {
    var center = window.innerWidth * ROAM_CENTER_RATIO;
    var minX = Math.max(ROAM_PADDING, center - ROAM_HALF_RANGE);
    var maxX = Math.min(window.innerWidth - SPRITE_W - ROAM_PADDING, center + ROAM_HALF_RANGE);
    if (maxX < minX) maxX = minX;
    return { minX: minX, maxX: maxX };
  }

  // Current logical position (left in px from viewport left)
  var posX = window.innerWidth * ROAM_CENTER_RATIO;
  var posY = GROUND_OFFSET;
  var facing = 1;                   // 1 = right, -1 = left
  var velX = 0;                     // px/sec
  var current = 'idle';
  var nextStateAt = 0;              // timestamp ms
  var lastTs = 0;
  var dragging = false;
  var dragOffsetX = 0, dragOffsetY = 0;
  var hidden = false;
  // When user clicks a state button, take over for a while
  var manualUntil = 0;              // performance.now() timestamp; while > now, skip auto pickNextState
  var MANUAL_HOLD = 6000;           // ms — how long the manual state stays before auto-roam resumes

  function clampX(x) {
    // For dragging: allow full viewport width (minus padding)
    var minX = ROAM_PADDING;
    var maxX = Math.max(minX, window.innerWidth - SPRITE_W - ROAM_PADDING);
    return Math.max(minX, Math.min(maxX, x));
  }
  function clampRoamX(x) {
    var b = getRoamBounds();
    return Math.max(b.minX, Math.min(b.maxX, x));
  }
  function clampY(y) {
    var maxY = Math.max(0, window.innerHeight - SPRITE_H - 4);
    return Math.max(0, Math.min(maxY, y));
  }

  function applyTransform() {
    pet.style.left = posX + 'px';
    pet.style.bottom = posY + 'px';
    pet.dataset.facing = facing < 0 ? '-1' : '1';
  }

  function pickNextState() {
    // No real walking: pet stays in place and cycles through stationary states.
    // Probability roughly matches the previous distribution but "walk" is dropped.
    var r = Math.random();
    if (r < 0.40) {
      current = 'idle'; velX = 0; facing = 1;
      setSpriteState(STATES.idle); applyTransform();
      nextStateAt = performance.now() + 3500 + Math.random() * 3500;
    } else if (r < 0.62) {
      current = 'waiting'; velX = 0; facing = 1;
      setSpriteState(STATES.waiting); applyTransform();
      nextStateAt = performance.now() + 3500 + Math.random() * 3500;
    } else if (r < 0.80) {
      current = 'waving'; velX = 0; facing = 1;
      setSpriteState(STATES.waving); applyTransform();
      nextStateAt = performance.now() + 3000 + Math.random() * 2000;
    } else if (r < 0.90) {
      current = 'jumping'; velX = 0; facing = 1;
      setSpriteState(STATES.jumping); applyTransform();
      nextStateAt = performance.now() + 2500 + Math.random() * 1500;
    } else if (r < 0.97) {
      current = 'review'; velX = 0; facing = 1;
      setSpriteState(STATES.review); applyTransform();
      nextStateAt = performance.now() + 4000 + Math.random() * 2000;
    } else {
      current = 'failed'; velX = 0; facing = 1;
      setSpriteState(STATES.failed); applyTransform();
      nextStateAt = performance.now() + 3000 + Math.random() * 1500;
    }
  }

  function tick(ts) {
    if (!lastTs) lastTs = ts;
    var dt = Math.min(64, ts - lastTs);
    lastTs = ts;

    if (!dragging && !hidden) {
      if (velX !== 0) {
        posX += velX * dt / 1000;
        // Stop at roam-range edges instead of reversing — direction stays consistent with state
        var b = getRoamBounds();
        if (posX <= b.minX) {
          posX = b.minX; velX = 0; facing = 1;
          current = 'idle'; setSpriteState(STATES.idle);
          nextStateAt = performance.now() + 1500 + Math.random() * 1500;
        } else if (posX >= b.maxX) {
          posX = b.maxX; velX = 0; facing = 1;
          current = 'idle'; setSpriteState(STATES.idle);
          nextStateAt = performance.now() + 1500 + Math.random() * 1500;
        }
      }
      if (ts >= nextStateAt && ts >= manualUntil) pickNextState();
      applyTransform();
    }
    requestAnimationFrame(tick);
  }

  // Manually force a state (from panel buttons)
  function setActiveBtn(stateKey) {
    stateBtns.forEach(function (b) {
      b.classList.toggle('is-active', b.dataset.state === stateKey);
    });
  }
  function applyManualState(stateKey) {
    var s = STATES[stateKey];
    if (!s) return;
    setSpriteState(s);
    current = stateKey;
    setActiveBtn(stateKey);
    // Set walking velocity / facing based on state.
    // Note: the sprite sheet's row 1 (Run Right) and row 2 (Run Left) actually
    // contain visually identical right-facing frames. Left-facing is achieved
    // by mirroring the sprite via CSS using data-facing="-1".
    // Walking states are kept for sprite animation only — no real movement.
    if (stateKey === 'runRight')      { facing = 1;  velX = 0; }
    else if (stateKey === 'runLeft')  { facing = -1; velX = 0; }
    else                              { velX = 0;  facing = 1; }
    applyTransform();                // flush data-facing immediately
    manualUntil = performance.now() + MANUAL_HOLD;
    nextStateAt = manualUntil;       // also push autosched
  }

  // === Drag interaction ===
  function onPointerDown(e) {
    if (hidden) return;
    dragging = true;
    pet.classList.add('is-dragging');
    var rect = pet.getBoundingClientRect();
    dragOffsetX = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    dragOffsetY = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    setSpriteState(STATES.jumping);
    current = 'jumping';
    velX = 0;
    facing = 1;
    applyTransform();
    e.preventDefault();
  }
  function onPointerMove(e) {
    if (!dragging) return;
    var cx = e.clientX || (e.touches && e.touches[0].clientX);
    var cy = e.clientY || (e.touches && e.touches[0].clientY);
    if (cx == null) return;
    posX = clampX(cx - dragOffsetX);
    // bottom = window.innerHeight - top - height
    var top = cy - dragOffsetY;
    posY = clampY(window.innerHeight - top - SPRITE_H);
    applyTransform();
  }
  function onPointerUp() {
    if (!dragging) return;
    dragging = false;
    pet.classList.remove('is-dragging');
    // After dropping, gradually fall back to ground line
    var dropAnim = function () {
      if (posY > GROUND_OFFSET + 1) {
        posY = Math.max(GROUND_OFFSET, posY - 8);
        applyTransform();
        requestAnimationFrame(dropAnim);
      } else {
        posY = GROUND_OFFSET;
        applyTransform();
        nextStateAt = performance.now() + 600;
      }
    };
    dropAnim();
  }

  sprite.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);
  sprite.addEventListener('touchstart', onPointerDown, { passive: false });
  window.addEventListener('touchmove', onPointerMove, { passive: false });
  window.addEventListener('touchend', onPointerUp);

  // Double-click sprite -> cycle through states
  sprite.addEventListener('dblclick', function (e) {
    e.preventDefault();
    var idx = STATE_ORDER.indexOf(current);
    var next = STATE_ORDER[(idx + 1) % STATE_ORDER.length];
    applyManualState(next);
  });

  // Bell button: toggle the control panel; shift-click hides the pet itself
  bellBtn.addEventListener('click', function (e) {
    if (e.shiftKey) {
      hidden = !hidden;
      pet.classList.toggle('is-hidden', hidden);
      bellBtn.textContent = hidden ? '🔕' : '🔔';
      return;
    }
    panel.classList.toggle('is-open');
  });
  panelClose.addEventListener('click', function () {
    panel.classList.remove('is-open');
  });

  // ---- Make the panel draggable by its header ---------------------------
  var panelHeader = panel.querySelector('.dora-panel-header');
  var panelDragging = false;
  var panelDragDX = 0, panelDragDY = 0;
  var PANEL_POS_KEY = 'doraPanelPos';

  function clampPanelPos(left, top) {
    var rect = panel.getBoundingClientRect();
    var maxLeft = Math.max(0, window.innerWidth  - rect.width  - 4);
    var maxTop  = Math.max(0, window.innerHeight - rect.height - 4);
    if (left < 4) left = 4;
    if (top  < 4) top  = 4;
    if (left > maxLeft) left = maxLeft;
    if (top  > maxTop)  top  = maxTop;
    return { left: left, top: top };
  }

  function setPanelPos(left, top, persist) {
    var p = clampPanelPos(left, top);
    panel.style.left  = p.left + 'px';
    panel.style.top   = p.top  + 'px';
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
    if (persist) {
      try { localStorage.setItem(PANEL_POS_KEY, JSON.stringify(p)); } catch (err) {}
    }
  }

  // Restore saved position on load (only if it still fits the viewport).
  try {
    var saved = localStorage.getItem(PANEL_POS_KEY);
    if (saved) {
      var s = JSON.parse(saved);
      if (s && typeof s.left === 'number' && typeof s.top === 'number') {
        // Apply once panel becomes measurable; defer to next frame.
        requestAnimationFrame(function () { setPanelPos(s.left, s.top, false); });
      }
    }
  } catch (err) {}

  function onPanelDragStart(e) {
    // Ignore drags that start on interactive children (close button etc.)
    if (e.target.closest('.dora-close')) return;
    var p = e.touches ? e.touches[0] : e;
    var rect = panel.getBoundingClientRect();
    panelDragging = true;
    panelDragDX = p.clientX - rect.left;
    panelDragDY = p.clientY - rect.top;
    // Pin current position as left/top so subsequent moves work consistently
    setPanelPos(rect.left, rect.top, false);
    panel.classList.add('is-dragging');
    e.preventDefault();
  }
  function onPanelDragMove(e) {
    if (!panelDragging) return;
    var p = e.touches ? e.touches[0] : e;
    setPanelPos(p.clientX - panelDragDX, p.clientY - panelDragDY, false);
    e.preventDefault();
  }
  function onPanelDragEnd() {
    if (!panelDragging) return;
    panelDragging = false;
    panel.classList.remove('is-dragging');
    var rect = panel.getBoundingClientRect();
    setPanelPos(rect.left, rect.top, true);   // persist final position
  }
  panelHeader.addEventListener('mousedown',  onPanelDragStart);
  panelHeader.addEventListener('touchstart', onPanelDragStart, { passive: false });
  document.addEventListener('mousemove',  onPanelDragMove);
  document.addEventListener('touchmove',  onPanelDragMove, { passive: false });
  document.addEventListener('mouseup',    onPanelDragEnd);
  document.addEventListener('touchend',   onPanelDragEnd);

  // Keep the panel inside the viewport when the window is resized.
  window.addEventListener('resize', function () {
    if (panel.style.left) {
      var left = parseFloat(panel.style.left) || 0;
      var top  = parseFloat(panel.style.top)  || 0;
      setPanelPos(left, top, true);
    }
  });

  // State buttons → manual override
  stateBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyManualState(btn.dataset.state);
    });
  });

  // Ring bell (sound + waving)
  ringBtn.addEventListener('click', function () {
    if (sound) { try { sound.currentTime = 0; sound.play(); } catch (err) {} }
    applyManualState('waving');
  });

  // Resume autonomous roaming immediately
  resumeBtn.addEventListener('click', function () {
    manualUntil = 0;
    nextStateAt = performance.now();
    setActiveBtn('');
  });

  // Keep within viewport on resize
  window.addEventListener('resize', function () {
    posX = clampX(posX);
    posY = clampY(posY);
    applyTransform();
  });

  // Init: start with Review (matches the highlighted button) for a few seconds, then roam
  applyTransform();
  setSpriteState(STATES.review);
  current = 'review';
  nextStateAt = performance.now() + 3500;
  requestAnimationFrame(tick);
})();
</script>
<!-- ====================== End Doraemon Desk Pet ====================== -->