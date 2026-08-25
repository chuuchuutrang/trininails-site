(() => {
  const storageKey = "trininails-theme";
  const root = document.documentElement;
  const body = document.body;
  const toggle = document.querySelector("[data-theme-toggle]");
  const label = document.querySelector("[data-theme-label]");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const systemTheme = matchMedia("(prefers-color-scheme: dark)");

  if (!toggle) return;

  const readSavedTheme = () => {
    try { return localStorage.getItem(storageKey); } catch (error) { return null; }
  };

  const saveTheme = (theme) => {
    try { localStorage.setItem(storageKey, theme); } catch (error) {}
  };

  const applyTheme = (theme, persist = false) => {
    const isDark = theme === "dark";
    const nextAction = isDark ? "Switch to light mode" : "Switch to dark mode";

    root.dataset.theme = isDark ? "dark" : "light";
    root.style.colorScheme = isDark ? "dark" : "light";
    body.classList.toggle("dark-site", isDark);
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", nextAction);
    toggle.title = nextAction;
    if (label) label.textContent = nextAction;
    if (themeColor) themeColor.content = isDark ? "#07050a" : "#f6edef";
    if (persist) saveTheme(isDark ? "dark" : "light");
  };

  applyTheme(root.dataset.theme === "dark" ? "dark" : "light");

  toggle.addEventListener("click", () => {
    applyTheme(body.classList.contains("dark-site") ? "light" : "dark", true);
  });

  systemTheme.addEventListener("change", (event) => {
    if (!readSavedTheme()) applyTheme(event.matches ? "dark" : "light");
  });
})();
