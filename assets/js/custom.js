// ============================================================================
// About page custom scripts
// Extracted from _layouts/about.liquid
// ============================================================================

// ========== Block 1: Education / Research detail toggles ==========
    // Move the detail card under the visual row that contains the clicked logo.
    // This avoids a first-row click expanding below later wrapped rows.
    function placeDetailAfterLogoRow(detail, clickedItem, logoItems) {
      const logoRow = clickedItem.closest('.logo-row');
      if (!logoRow) return;

      const clickedTop = clickedItem.offsetTop;
      const sameRowItems = Array.from(logoItems).filter((item) => Math.abs(item.offsetTop - clickedTop) < 3);
      const lastItemInRow = sameRowItems[sameRowItems.length - 1] || clickedItem;

      lastItemInRow.insertAdjacentElement('afterend', detail);
    }

    function toggleTimelineDetail(kind, index) {
      const detail = document.getElementById(kind + '-detail-' + index);
      if (!detail) return;

      const section = detail.closest('.timeline-section');
      if (!section) return;

      const logoItems = section.querySelectorAll('.logo-item');
      const clickedItem = section.querySelector('.logo-item[data-index="' + index + '"]');
      if (!clickedItem) return;

      const wasActive = detail.classList.contains('active');

      section.querySelectorAll('.detail-card.active').forEach((card) => {
        card.classList.remove('active');
        if (card !== detail) {
          window.setTimeout(() => section.appendChild(card), 420);
        }
      });

      logoItems.forEach((item) => item.classList.remove('active'));

      if (wasActive) {
        window.setTimeout(() => section.appendChild(detail), 420);
        return;
      }

      placeDetailAfterLogoRow(detail, clickedItem, logoItems);
      clickedItem.classList.add('active');
      window.requestAnimationFrame(() => detail.classList.add('active'));
    }

    // Toggle education detail
    function toggleEducationDetail(index) {
      toggleTimelineDetail('education', index);
    }

    // Toggle research detail
    function toggleResearchDetail(index) {
      toggleTimelineDetail('research', index);
    }

// ========== Block 2: Mascot (Doraemon / Tom & Jerry) ==========
(function() {
  const container = document.getElementById('mascot-container');
  const bubble = document.getElementById('mascot-bubble');
  const mascots = document.querySelectorAll('.mascot');
  const mascotOrder = ['doraemon', 'tomjerry'];
  
  // ========== 状态管理 ==========
  let currentMascot = 'doraemon';
  let currentMascotIndex = 0;
  let isSwitching = false;  // 防止切换过程中重复触发
  let bubbleTimer = null;   // 气泡隐藏定时器
  
  // ========== 各角色对话内容 ==========
  const messages = {
    doraemon: [
      '铜锣烧真好吃！🥞', 'Dorayaki is the best! 🥞',
      '大雄！快起床！⏰', 'Nobita! Wake up! ⏰',
      '让我从口袋里找找...🎒', 'Let me check my pocket... 🎒',
      '任意门！🚪', 'Anywhere Door! 🚪',
      '竹蜻蜓启动！🚁', 'Take-copter, go! 🚁',
      '时光机出发！⏳', 'Time Machine, depart! ⏳',
      '缩小灯！🔦', 'Small Light! 🔦',
      '记忆面包来了！🍞', 'Memory Bread here! 🍞',
      '翻译魔芋～', 'Translation Konjac~',
      '别提老鼠！我耳朵都没了😱', 'Don\'t mention mice! 😱',
      'I\'m a robot cat from the future! 🤖', '22世纪的机器猫来了！🤖'
    ],
    tomjerry: [
      '等等我Jerry！🏃', 'Wait for me, Jerry! 🏃',
      '你追不到我～🐭', 'You can\'t catch me~ 🐭',
      '奶酪在哪里？🧀', 'Where\'s the cheese? 🧀',
      '又被平底锅打了！🍳', 'Got hit by the pan again! 🍳',
      '这次一定抓住你！', 'I\'ll catch you this time!',
      '陷阱准备好了！', 'The trap is ready!',
      '今天休战吧～', 'Let\'s call a truce today~',
      '我们是最好的冤家！💫', 'We\'re the best frenemies! 💫',
      '小心后面！⚠️', 'Watch your back! ⚠️',
      '又是追逐的一天！', 'Another day of chase!',
      'Classic never gets old! 🎬', '经典永不过时！🎬'
    ]
  };
  
  // ========== 气泡颜色配置 ==========
  const bubbleColors = {
    doraemon: { border: '#0DACD6', lightBg: '#f0fafb', darkBg: '#1a2529' },
    tomjerry: { border: '#FF8C00', lightBg: '#fff5e6', darkBg: '#2a2415' }
  };
  
  // 更新气泡颜色
  function updateBubbleColor(mascotName) {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    const colors = bubbleColors[mascotName] || bubbleColors.doraemon;
    bubble.style.borderColor = colors.border;
    bubble.style.setProperty('--bubble-border-color', colors.border);
    bubble.style.setProperty('--bubble-bg-color', isDarkMode ? colors.darkBg : colors.lightBg);
  }
  
  // ========== 核心切换逻辑 ==========
  function switchMascot(targetName) {
    // 防止重复切换或切换到当前角色
    if (isSwitching || currentMascot === targetName) return;
    isSwitching = true;
    
    const oldMascot = document.getElementById(currentMascot);
    const newMascot = document.getElementById(targetName);
    const oldName = currentMascot;
    
    // 立即更新状态（防止自动切换定时器干扰）
    currentMascot = targetName;
    currentMascotIndex = mascotOrder.indexOf(targetName);
    
    // 隐藏当前气泡
    hideBubble();
    
    // 哆啦A梦特殊离场动画
    if (oldName === 'doraemon' && oldMascot) {
      // 显示离场对话
      bubble.textContent = '铜锣烧！😍 どら焼き！😍 Dorayaki! 😍';
      bubble.classList.add('show', 'exit-animation');
      
      // 启动离场动画
      oldMascot.classList.remove('active');
      oldMascot.style.display = 'block';
      oldMascot.style.opacity = '1';
      oldMascot.classList.add('exit-animation');
      
      // 使用 requestAnimationFrame 让对话框跟随哆啦A梦
      let exitAnimationId = null;
      const startTime = performance.now();
      const duration = 6000; // 6秒动画（与 CSS 动画时间一致）
      
      function updateBubblePosition(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 获取哆啦A梦当前的 transform 位置
        const doraemonRect = oldMascot.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // 计算哆啦A梦相对于容器的中心位置
        const doraemonCenterX = doraemonRect.left + doraemonRect.width / 2 - containerRect.left;
        
        // 更新气泡位置，使其跟随哆啦A梦
        bubble.style.left = doraemonCenterX + 'px';
        
        // 保持透明度不变
        
        if (progress < 1) {
          exitAnimationId = requestAnimationFrame(updateBubblePosition);
        }
      }
      
      exitAnimationId = requestAnimationFrame(updateBubblePosition);
      
      // 6秒后清理并显示新角色（与动画时间一致）
      setTimeout(() => {
        // 停止动画
        if (exitAnimationId) {
          cancelAnimationFrame(exitAnimationId);
        }
        
        // 清理旧角色
        oldMascot.classList.remove('exit-animation');
        oldMascot.style.display = '';
        oldMascot.style.opacity = '';
        
        // 清理气泡
        bubble.classList.remove('show', 'exit-animation');
        bubble.style.left = '';
        bubble.style.opacity = '';
        
        // 显示新角色
        if (newMascot) {
          newMascot.classList.add('active');
        }
        updateBubbleColor(targetName);
        isSwitching = false;
      }, 6000);
    } else {
      // 其他角色：快速淡出淡入
      if (oldMascot) {
        oldMascot.classList.add('fade-out');
        oldMascot.classList.remove('active');
      }
      
      // 450ms 后显示新角色
      setTimeout(() => {
        if (oldMascot) {
          oldMascot.classList.remove('fade-out');
        }
        if (newMascot) {
          newMascot.classList.add('active');
        }
        updateBubbleColor(targetName);
        isSwitching = false;
      }, 450);
    }
  }
  
  // 切换到下一个角色
  function switchToNextMascot() {
    if (isSwitching) return;
    const nextIndex = (currentMascotIndex + 1) % mascotOrder.length;
    switchMascot(mascotOrder[nextIndex]);
  }
  
  // ========== 角色动画 ==========
  function playAnimation() {
    const mascot = document.getElementById(currentMascot);
    if (!mascot) return;
    
    switch (currentMascot) {
      case 'doraemon':
        mascot.classList.add('jumping');
        setTimeout(() => mascot.classList.remove('jumping'), 400);
        break;
      case 'tomjerry':
        mascot.classList.add('chasing');
        setTimeout(() => mascot.classList.remove('chasing'), 500);
        break;
    }
  }
  
  // ========== 气泡控制 ==========
  function getRandomMessage() {
    const msgs = messages[currentMascot];
    return msgs[Math.floor(Math.random() * msgs.length)];
  }
  
  function showBubble(customMessage) {
    if (bubbleTimer) clearTimeout(bubbleTimer);
    bubble.textContent = customMessage || getRandomMessage();
    bubble.classList.add('show');
    bubbleTimer = setTimeout(hideBubble, 2500);
  }
  
  function hideBubble() {
    if (bubbleTimer) {
      clearTimeout(bubbleTimer);
      bubbleTimer = null;
    }
    bubble.classList.remove('show');
  }
  
  // ========== 拖拽功能 ==========
  let isDragging = false;
  let dragStartX, dragStartY;
  let containerStartX, containerStartY;
  let hasMoved = false;
  
  function getContainerPosition() {
    const rect = container.getBoundingClientRect();
    return { x: rect.left, y: rect.top };
  }
  
  function onDragStart(e) {
    isDragging = true;
    hasMoved = false;
    container.classList.add('dragging');
    
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
    dragStartX = clientX;
    dragStartY = clientY;
    
    const pos = getContainerPosition();
    containerStartX = pos.x;
    containerStartY = pos.y;
    
    e.preventDefault();
  }
  
  function onDragMove(e) {
    if (!isDragging) return;
    
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - dragStartX;
    const deltaY = clientY - dragStartY;
    
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      hasMoved = true;
    }
    
    const newX = containerStartX + deltaX;
    const newY = containerStartY + deltaY;
    const maxX = window.innerWidth - container.offsetWidth;
    const maxY = window.innerHeight - container.offsetHeight;
    
    container.style.left = Math.max(0, Math.min(newX, maxX)) + 'px';
    container.style.top = Math.max(0, Math.min(newY, maxY)) + 'px';
    container.style.right = 'auto';
    container.style.bottom = 'auto';
  }
  
  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    container.classList.remove('dragging');
  }
  
  container.addEventListener('mousedown', onDragStart);
  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', onDragEnd);
  container.addEventListener('touchstart', onDragStart, { passive: false });
  document.addEventListener('touchmove', onDragMove, { passive: false });
  document.addEventListener('touchend', onDragEnd);
  
  // ========== 统一的点击/双击检测 ==========
  let clickCount = 0;
  let clickTimer = null;
  const DOUBLE_CLICK_DELAY = 300;
  
  function handleSingleClick() {
    if (isSwitching) return;
    playAnimation();
    showBubble();
  }
  
  function handleDoubleClick() {
    if (isSwitching) return;
    switchToNextMascot();
  }
  
  function handleClick(e) {
    if (hasMoved) {
      hasMoved = false;
      return;
    }
    
    clickCount++;
    
    if (clickCount === 1) {
      clickTimer = setTimeout(() => {
        clickCount = 0;
        handleSingleClick();
      }, DOUBLE_CLICK_DELAY);
    } else if (clickCount >= 2) {
      clearTimeout(clickTimer);
      clickCount = 0;
      handleDoubleClick();
    }
  }
  
  // 桌面端使用 click，移动端使用 touchend
  const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (isMobile) {
    container.addEventListener('touchend', function(e) {
      if (!isDragging) {
        e.preventDefault();
        handleClick(e);
      }
    }, { passive: false });
  } else {
    container.addEventListener('click', handleClick);
  }
  
  // ========== 自动行为 ==========
  // 随机自动对话
  setInterval(() => {
    if (Math.random() > 0.85 && !bubble.classList.contains('show') && !isSwitching) {
      showBubble();
    }
  }, 15000);
  
  // 自动切换角色已禁用（只保留双击手动切换）
  
  // 初始化气泡颜色
  updateBubbleColor(currentMascot);
  
})();

// ========== Block 3: oneko.js (currently disabled) ==========
(function oneko() {
  // 已禁用 - 如需启用请删除下面的 return 语句
  return;
  
  const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
  if (isReducedMotion) return;

  const nekoEl = document.createElement("div");
  let persistPosition = true;
  let nekoPosX = 32;
  let nekoPosY = 32;
  let mousePosX = 0;
  let mousePosY = 0;
  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;
  const nekoSpeed = 10;
  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  function init() {
    // 使用 GitHub raw 链接加载精灵图
    let nekoFile = "https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif";
    
    // 从 localStorage 恢复位置状态
    if (persistPosition) {
      let storedNeko = JSON.parse(window.localStorage.getItem("oneko"));
      if (storedNeko !== null) {
        nekoPosX = storedNeko.nekoPosX;
        nekoPosY = storedNeko.nekoPosY;
        mousePosX = storedNeko.mousePosX;
        mousePosY = storedNeko.mousePosY;
        frameCount = storedNeko.frameCount;
        idleTime = storedNeko.idleTime;
        idleAnimation = storedNeko.idleAnimation;
        idleAnimationFrame = storedNeko.idleAnimationFrame;
        nekoEl.style.backgroundPosition = storedNeko.bgPos;
      }
    }
    
    nekoEl.id = "oneko";
    nekoEl.ariaHidden = true;
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "none";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = 2147483647;
    nekoEl.style.backgroundImage = `url(${nekoFile})`;
    document.body.appendChild(nekoEl);

    document.addEventListener("mousemove", function (event) {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    });

    // 页面关闭前保存位置状态
    if (persistPosition) {
      window.addEventListener("beforeunload", function (event) {
        window.localStorage.setItem(
          "oneko",
          JSON.stringify({
            nekoPosX: nekoPosX,
            nekoPosY: nekoPosY,
            mousePosX: mousePosX,
            mousePosY: mousePosY,
            frameCount: frameCount,
            idleTime: idleTime,
            idleAnimation: idleAnimation,
            idleAnimationFrame: idleAnimationFrame,
            bgPos: nekoEl.style.backgroundPosition,
          })
        );
      });
    }

    window.requestAnimationFrame(onAnimationFrame);
  }

  let lastFrameTimestamp;

  function onAnimationFrame(timestamp) {
    // Stops execution if the neko element is removed from DOM
    if (!nekoEl.isConnected) {
      return;
    }
    if (!lastFrameTimestamp) {
      lastFrameTimestamp = timestamp;
    }
    if (timestamp - lastFrameTimestamp > 100) {
      lastFrameTimestamp = timestamp;
      frame();
    }
    window.requestAnimationFrame(onAnimationFrame);
  }

  function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle() {
    idleTime += 1;

    // every ~ 20 seconds
    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) == 0 &&
      idleAnimation == null
    ) {
      let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
      if (nekoPosX < 32) {
        avalibleIdleAnimations.push("scratchWallW");
      }
      if (nekoPosY < 32) {
        avalibleIdleAnimations.push("scratchWallN");
      }
      if (nekoPosX > window.innerWidth - 32) {
        avalibleIdleAnimations.push("scratchWallE");
      }
      if (nekoPosY > window.innerHeight - 32) {
        avalibleIdleAnimations.push("scratchWallS");
      }
      idleAnimation =
        avalibleIdleAnimations[
          Math.floor(Math.random() * avalibleIdleAnimations.length)
        ];
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192) {
          resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  function frame() {
    frameCount += 1;
    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < nekoSpeed || distance < 48) {
      idle();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);
      // count down after being alerted before moving
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    let direction;
    direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    setSprite(direction, frameCount);

    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  }

  init();
})();

// ========== Block 4: Section sub-navigation (scroll spy) ==========
(function() {
  const sectionNav = document.getElementById('sectionSubnav');
  if (!sectionNav) return;

  const navbar = document.getElementById('navbar');
  const navLinks = sectionNav.querySelectorAll('.section-subnav-link');
  const sectionIds = Array.from(navLinks).map(link => link.getAttribute('data-section'));
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  // Dynamically position subnav below navbar
  function positionSubnav() {
    if (navbar) {
      sectionNav.style.top = navbar.offsetHeight + 'px';
    }
  }
  positionSubnav();
  window.addEventListener('resize', positionSubnav);

  // Smooth scroll on click
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-section');
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Show/hide nav and scroll spy
  function updateNav() {
    const scrollY = window.scrollY;
    const firstSection = sections[0];
    const navHeight = navbar ? navbar.offsetHeight : 56;
    const subnavHeight = sectionNav.offsetHeight || 36;
    const offset = navHeight + subnavHeight + 20;

    // Show subnav when scrolled past the first section
    if (firstSection && scrollY >= firstSection.offsetTop - offset - 50) {
      sectionNav.classList.add('visible');
    } else {
      sectionNav.classList.remove('visible');
    }

    // Scroll spy: highlight active section
    let currentSection = '';
    sections.forEach(section => {
      if (section.offsetTop - offset <= scrollY) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentSection) {
        link.classList.add('active');
        // Scroll the active link into view within the subnav
        link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();
