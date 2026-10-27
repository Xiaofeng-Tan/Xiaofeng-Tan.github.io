/* One interruptible height animation for native details and paper panels.
 * Measure real content height rather than animating an arbitrary max-height. */
(function () {
  "use strict";
  const controllers = new WeakMap();
  const active = new Set();
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

  function create(element, body, options) {
    if (controllers.has(element)) return controllers.get(element);
    let desiredOpen = options.isOpen();
    let heightAnimation = null;
    let bodyAnimation = null;
    let generation = 0;

    function cancel() {
      generation += 1;
      if (heightAnimation) heightAnimation.cancel();
      if (bodyAnimation) bodyAnimation.cancel();
      heightAnimation = bodyAnimation = null;
      active.delete(controller);
    }

    function finish() {
      cancel();
      options.setOpen(desiredOpen);
      element.style.height = "";
      element.classList.remove("is-animating", "is-closing");
      options.sync(desiredOpen);
    }

    function setOpen(open, animate = true) {
      const startHeight = element.getBoundingClientRect().height;
      const startOpacity = options.isOpen() ? parseFloat(getComputedStyle(body).opacity) || 0 : 0;
      cancel();
      desiredOpen = open;
      options.sync(open);
      if (!animate || media.matches) {
        finish();
        return;
      }

      // Keep content in layout during collapse, and clip it to the animated box.
      options.setOpen(true);
      element.classList.add("is-animating");
      element.classList.toggle("is-closing", !open);
      element.style.height = "auto";
      const endHeight = open ? element.getBoundingClientRect().height : options.closedHeight();
      element.style.height = `${startHeight}px`;
      const duration = Math.min(420, Math.max(260, 260 + Math.abs(endHeight - startHeight) * 0.14));
      const token = generation;
      heightAnimation = element.animate([{ height: `${startHeight}px` }, { height: `${endHeight}px` }], { duration, easing, fill: "both" });
      bodyAnimation = body.animate([{ opacity: startOpacity }, { opacity: open ? 1 : 0 }], {
        duration: open ? duration : Math.min(180, duration),
        easing,
        fill: "both",
      });
      active.add(controller);
      heightAnimation.onfinish = () => {
        if (token === generation) finish();
      };
    }

    const controller = {
      setOpen,
      toggle: () => setOpen(!desiredOpen),
      finish,
      get open() {
        return desiredOpen;
      },
    };
    controllers.set(element, controller);
    options.sync(desiredOpen);

    // Nested disclosures, image loads, and wrapping can change a parent's
    // target height while opening. Retarget from the current rendered frame.
    if (window.ResizeObserver) {
      new ResizeObserver(() => {
        if (heightAnimation && desiredOpen) setOpen(true);
      }).observe(body);
    }
    return controller;
  }

  function enhanceDetails(details) {
    const summary = details.querySelector(":scope > summary");
    const body = Array.from(details.children).find((child) => child !== summary);
    if (!summary || !body) return;
    details.classList.add("smooth-disclosure");
    body.classList.add("smooth-disclosure-body");
    const controller = create(details, body, {
      isOpen: () => details.open,
      setOpen: (open) => {
        details.open = open;
      },
      closedHeight: () => {
        const style = getComputedStyle(details);
        const margins = getComputedStyle(summary);
        return (
          summary.getBoundingClientRect().height +
          parseFloat(style.paddingTop) +
          parseFloat(style.paddingBottom) +
          parseFloat(style.borderTopWidth) +
          parseFloat(style.borderBottomWidth) +
          parseFloat(margins.marginTop) +
          parseFloat(margins.marginBottom)
        );
      },
      sync: (open) => summary.setAttribute("aria-expanded", String(open)),
    });
    summary.addEventListener("click", (event) => {
      event.preventDefault();
      controller.toggle();
    });
    details.addEventListener("toggle", () => {
      if (!details.classList.contains("is-animating") && details.open !== controller.open) {
        controller.setOpen(details.open, false);
      }
    });
    return controller;
  }

  function enhancePanel(panel, triggers) {
    const body = document.createElement("div");
    body.className = "smooth-disclosure-body";
    while (panel.firstChild) body.appendChild(panel.firstChild);
    panel.appendChild(body);
    panel.classList.add("smooth-paper-panel");
    const controller = create(panel, body, {
      isOpen: () => panel.classList.contains("open"),
      setOpen: (open) => panel.classList.toggle("open", open),
      closedHeight: () => 0,
      sync: (open) => {
        panel.setAttribute("aria-hidden", String(!open));
        panel.inert = !open;
        triggers.forEach((trigger) => trigger.setAttribute("aria-expanded", String(open)));
      },
    });
    return controller;
  }

  // Translation/resizing should never leave a panel at an obsolete height.
  window.addEventListener("resize", () => active.forEach((controller) => controller.finish()));
  document.addEventListener("site-language-changed", () => active.forEach((controller) => controller.finish()));
  media.addEventListener("change", () => active.forEach((controller) => controller.finish()));
  window.SiteDisclosure = {
    enhanceDetails,
    enhancePanel,
    get: (element) => controllers.get(element),
    settle: () => active.forEach((controller) => controller.finish()),
  };
})();
