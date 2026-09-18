const projectsGrid = document.querySelector("#projectsGrid");

function renderProjects() {
  projectsGrid.innerHTML = window.deeProjects
    .map(
      (project) => `
        <article class="project-card reveal">
          <div class="project-image">
            <img src="${project.image}" alt="${project.alt}" loading="lazy" />
          </div>
          <div class="project-body">
            <p>${project.label}</p>
            <h3>${project.name}</h3>
            <span>${project.description}</span>
            <strong>${project.impact}</strong>
            <div class="tag-row">
              ${project.tags.map((tag) => `<em>${tag}</em>`).join("")}
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function initReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function initSparkleTrail() {
  const trail = document.querySelector(".storyline");
  if (!trail) return;

  const updateTrail = () => {
    const rect = trail.getBoundingClientRect();
    const railTop = window.scrollY + rect.top;
    const railHeight = trail.offsetHeight;
    const cursor = window.scrollY + window.innerHeight * 0.58;
    const progress = Math.max(0, Math.min(1, (cursor - railTop) / Math.max(railHeight, 1)));

    trail.style.setProperty("--trail-progress", `${Math.round(progress * railHeight)}px`);
  };

  updateTrail();
  window.addEventListener("scroll", updateTrail, { passive: true });
  window.addEventListener("resize", updateTrail);
}

renderProjects();
initReveals();
initSparkleTrail();
