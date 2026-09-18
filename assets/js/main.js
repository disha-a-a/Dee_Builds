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

  window.addEventListener(
    "scroll",
    () => {
      const progress =
        window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      trail.style.setProperty("--trail-progress", `${Math.min(progress * 100, 100)}%`);
    },
    { passive: true }
  );
}

renderProjects();
initReveals();
initSparkleTrail();
