/* Progressive enhancement: content, figures, tables, and PDF work without JS. */
(() => {
  "use strict";
  document.documentElement.classList.add("js");

  const controls = [...document.querySelectorAll("[data-backbone]")];
  const tables = { sd: document.querySelector("#table-sd"), bagel: document.querySelector("#table-bagel") };
  function showBackbone(name, announce = true) {
    Object.entries(tables).forEach(([key, table]) => { table.hidden = key !== name; });
    controls.forEach(button => {
      const selected = button.dataset.backbone === name;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    if (announce) document.querySelector(".table-status").textContent =
      `Showing ${name === "sd" ? "SD3.5-Medium" : "BAGEL"} results.`;
  }
  controls.forEach(button => button.addEventListener("click", () => showBackbone(button.dataset.backbone)));
  showBackbone("sd", false);

  document.querySelectorAll(".evidence-toggle").forEach(button => {
    const evidence = document.getElementById(button.getAttribute("aria-controls"));
    evidence.hidden = true;
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", () => {
      evidence.hidden = !evidence.hidden;
      button.setAttribute("aria-expanded", String(!evidence.hidden));
    });
  });

  const dialog = document.querySelector(".lightbox");
  const image = dialog.querySelector("img");
  const original = dialog.querySelector(".lightbox-original");
  let trigger;
  function closeLightbox() { dialog.close(); }
  document.querySelectorAll("[data-zoom]").forEach(button => {
    button.addEventListener("click", () => {
      if (typeof dialog.showModal !== "function") {
        window.open(button.dataset.zoom, "_blank", "noopener");
        return;
      }
      trigger = button;
      image.src = button.dataset.zoom;
      image.alt = button.querySelector("img").alt;
      image.classList.toggle("diagram", !button.closest(".image-pair"));
      original.href = button.dataset.zoom;
      dialog.showModal();
      document.body.classList.add("modal-open");
      dialog.querySelector(".lightbox-close").focus();
    });
  });
  dialog.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  dialog.addEventListener("click", event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom)) closeLightbox();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    if (trigger) trigger.focus({ preventScroll: true });
  });
})();
