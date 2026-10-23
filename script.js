const tabs = [...document.querySelectorAll(".tab")];
const views = [...document.querySelectorAll(".tab-view")];
const kicker = document.getElementById("section-kicker");
const titles = {
  about: { kicker: "/ ABOUT", title: "A steady hand<br><em>behind the community.</em>", copy: "Staff experience, community care, and thoughtful management — all in one place." },
  staff: { kicker: "/ STAFFING", title: "People first.<br><em>Standards always.</em>", copy: "A look at the teams I've supported and the responsibilities I've taken on." },
  projects: { kicker: "/ PROJECTS", title: "Good systems make<br><em>better communities.</em>", copy: "Selected examples of documentation, server organization, and community projects." },
  contact: { kicker: "/ CONTACT", title: "Let's make a space<br><em>work better.</em>", copy: "For staff opportunities, collaborations, or a conversation about community building." }
};
const heroTitle = document.getElementById("hero-title");
const heroCopy = document.getElementById("hero-copy");

function activateTab(name, focusCard = false) {
  tabs.forEach((tab) => {
    const selected = tab.dataset.tab === name;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.setAttribute("tabindex", selected ? "0" : "-1");
  });
  views.forEach((view) => view.classList.toggle("hidden", view.dataset.view !== name));
  const content = titles[name];
  if (!content) return;
  kicker.textContent = content.kicker;
  heroTitle.innerHTML = content.title;
  heroCopy.textContent = content.copy;
  if (focusCard) document.getElementById("view-card").focus({ preventScroll: true });
  history.replaceState(null, "", `#${name}`);
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.tab));
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = event.key === "ArrowRight" ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
    tabs[next].focus();
    activateTab(tabs[next].dataset.tab);
  });
});
const initial = location.hash.replace("#", "");
if (titles[initial]) activateTab(initial);
