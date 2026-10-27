$(document).ready(function () {
  if (document.body.classList.contains("about-page") && window.SiteDisclosure) {
    document.querySelectorAll(".publications [data-paper-key] > [id]").forEach((entry) => {
      const panels = Array.from(entry.querySelectorAll(":scope > .hidden"));
      const controllers = new Map();
      panels.forEach((panel, index) => {
        const kind = ["abstract", "award", "bibtex"].find((type) => panel.classList.contains(type));
        if (!kind) return;
        const triggers = Array.from(entry.querySelectorAll(`.links a.${kind}`));
        panel.id = `${entry.id}-${kind}-${index}`;
        triggers.forEach((trigger) => {
          trigger.tabIndex = 0;
          trigger.setAttribute("aria-controls", panel.id);
        });
        const controller = window.SiteDisclosure.enhancePanel(panel, triggers);
        controllers.set(panel, controller);
        const actions = document.createElement("div");
        actions.className = "content-disclosure-actions";
        const close = document.createElement("button");
        close.type = "button";
        close.className = "content-collapse-button";
        close.innerHTML = '<span data-language="en" lang="en">Click to collapse</span><span data-language="zh" lang="zh-CN">点击收起</span>';
        close.addEventListener("click", () => {
          controller.setOpen(false);
          if (triggers[0]) triggers[0].focus({ preventScroll: true });
        });
        actions.appendChild(close);
        panel.querySelector(".smooth-disclosure-body").appendChild(actions);
      });
      entry.querySelectorAll(".links a.abstract, .links a.award, .links a.bibtex").forEach((trigger) => {
        const kind = ["abstract", "award", "bibtex"].find((type) => trigger.classList.contains(type));
        const toggle = (event) => {
          event.preventDefault();
          const selected = panels.filter((panel) => panel.classList.contains(kind));
          const open = selected.some((panel) => !controllers.get(panel).open);
          panels.forEach((panel) => controllers.get(panel)?.setOpen(selected.includes(panel) && open));
        };
        trigger.addEventListener("click", toggle);
        trigger.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") toggle(event);
        });
      });
    });
  } else {
    // add toggle functionality to abstract, award and bibtex buttons
    $("a.abstract").click(function () {
      $(this).parent().parent().find(".abstract.hidden").toggleClass("open");
      $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
      $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
    });
    $("a.award").click(function () {
      $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
      $(this).parent().parent().find(".award.hidden").toggleClass("open");
      $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
    });
    $("a.bibtex").click(function () {
      $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
      $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
      $(this).parent().parent().find(".bibtex.hidden").toggleClass("open");
    });
  }
  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});
