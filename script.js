// Navigation and content work without JavaScript. Enhance only the active state.
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

if ("IntersectionObserver" in window) {
  const navigation = [...document.querySelectorAll('nav a[href^="#"]')];
  const sections = navigation
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const visibleSections = new Set();
  const updateNavigation = () => {
    const active = sections.find((section) => visibleSections.has(section.id));
    navigation.forEach((link) => {
      if (active && link.getAttribute("href") === `#${active.id}`)
        link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.add(entry.target.id);
        else visibleSections.delete(entry.target.id);
      });
      updateNavigation();
    },
    { rootMargin: "-20% 0px -45% 0px", threshold: 0 },
  );
  sections.forEach((section) => observer.observe(section));
}
