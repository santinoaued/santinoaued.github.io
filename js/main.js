// Mode and language switches, URL/localStorage sync, and rendering of all
// visible text from content.js.

const MODES = ["game", "web"];
const LANGUAGES = ["es", "en"];
const DEFAULT_STATE = { mode: "game", lang: "es" };
const STORAGE_KEY = "santino-portfolio";
const SWITCH_FADE_MS = 150;

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mainElement = document.getElementById("main");

const state = getInitialState();

// ---------- State ----------

function pickValid(value, allowed) {
  return allowed.includes(value) ? value : null;
}

function readUrlState() {
  const params = new URLSearchParams(window.location.search);
  return {
    mode: pickValid(params.get("mode"), MODES),
    lang: pickValid(params.get("lang"), LANGUAGES),
  };
}

function readStoredState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    return {
      mode: pickValid(saved.mode, MODES),
      lang: pickValid(saved.lang, LANGUAGES),
    };
  } catch (error) {
    return { mode: null, lang: null };
  }
}

// URL wins over the stored choice; defaults fill whatever is missing.
function getInitialState() {
  const fromUrl = readUrlState();
  const fromStorage = readStoredState();
  return {
    mode: fromUrl.mode || fromStorage.mode || DEFAULT_STATE.mode,
    lang: fromUrl.lang || fromStorage.lang || DEFAULT_STATE.lang,
  };
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    // Storage blocked (private mode, disabled cookies): the URL still keeps the state.
  }
}

function syncUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("mode", state.mode);
  url.searchParams.set("lang", state.lang);
  try {
    history.replaceState(null, "", url);
  } catch (error) {
    // Some file:// setups block history changes; the page still works.
  }
}

function setState(changes) {
  const next = { ...state, ...changes };
  if (next.mode === state.mode && next.lang === state.lang) return;

  Object.assign(state, next);
  updateSwitches();
  syncUrl();
  saveState();

  if (reducedMotion.matches) {
    renderPage();
    return;
  }
  mainElement.classList.add("is-switching");
  window.setTimeout(() => {
    renderPage();
    mainElement.classList.remove("is-switching");
  }, SWITCH_FADE_MS);
}

// ---------- Rendering ----------

function getTextScope() {
  const text = CONTENT[state.lang];
  return { ui: text.ui, common: text.common, mode: text[state.mode] };
}

// Turns "common.aboutTitle" into scope.common.aboutTitle.
function resolvePath(scope, path) {
  return path.split(".").reduce((value, key) => (value == null ? undefined : value[key]), scope);
}

function renderTextNodes(scope) {
  document.querySelectorAll("[data-text]").forEach((element) => {
    const value = resolvePath(scope, element.dataset.text);
    element.textContent = value || "";
    element.hidden = !value;
  });
  document.querySelectorAll("[data-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", resolvePath(scope, element.dataset.ariaLabel) || "");
  });
  document.querySelectorAll("[data-alt]").forEach((element) => {
    element.setAttribute("alt", resolvePath(scope, element.dataset.alt) || "");
  });
}

function renderHeroActions(scope) {
  const container = document.getElementById("hero-actions");
  container.innerHTML = scope.mode.heroActions
    .map((action, index) => {
      const variant = index === 0 ? "button--primary" : "button--ghost";
      return `<a class="button ${variant}" href="${action.href}">${action.label}</a>`;
    })
    .join("");
}

function renderHowIWork(scope) {
  const list = document.getElementById("how-i-work");
  list.innerHTML = scope.common.howIWork.map((item) => `<li>${item}</li>`).join("");
}

function renderTech(scope) {
  const container = document.getElementById("tech-groups");
  container.innerHTML = scope.mode.techGroups
    .map(
      (group) => `
        <div class="tech__group">
          <h3 class="tech__group-title">${group.title}</h3>
          <ul class="tags">${group.items.map((item) => `<li class="tag">${item}</li>`).join("")}</ul>
        </div>`
    )
    .join("");
}

function renderCard(project, ui) {
  // The logo is decorative: the card title already names the platform.
  const logo = CARD_LOGOS[project.id];
  const media = logo
    ? `<img class="card__logo" src="${logo}" alt="" loading="lazy">`
    : `<span class="card__name">${project.name}</span>`;

  return `
    <li class="slide">
      <a class="card" data-platform="${project.id}" href="${LINKS[project.id].href}" target="_blank" rel="noopener">
        <div class="card__media" aria-hidden="true">${media}</div>
        <div class="card__body">
          <h4 class="card__title">${project.name}</h4>
          <p class="card__text">${project.text}</p>
          <span class="card__cta">${project.cta} <span class="card__arrow" aria-hidden="true">&rarr;</span></span>
          <span class="visually-hidden">${ui.newTab}</span>
        </div>
      </a>
    </li>`;
}

function renderFeatured(project, ui) {
  const data = FEATURED_PROJECTS[project.id];
  return `
    <li class="slide slide--featured">
      <article class="featured-card">
        <div class="featured-card__media">
          <img src="${data.image}" alt="${project.imageAlt}" width="${data.width}" height="${data.height}" loading="lazy">
        </div>
        <div class="featured-card__body">
          <p class="featured-card__badge">${project.badge}</p>
          <h4 class="featured-card__title">${project.title}</h4>
          <p class="featured-card__text">${project.text}</p>
          <a class="button button--primary" href="${data.href}" target="_blank" rel="noopener">
            ${project.cta}<span class="visually-hidden"> ${ui.newTab}</span>
          </a>
        </div>
      </article>
    </li>`;
}

function renderProjects(scope) {
  const container = document.getElementById("projects-content");
  const { projects, featured, emptyProjects } = scope.mode;

  if (projects) {
    const slides =
      featured.map((project) => renderFeatured(project, scope.ui)).join("") +
      projects.map((project) => renderCard(project, scope.ui)).join("");
    container.innerHTML = `
      <div class="slider">
        <ul class="slider__track" tabindex="0" aria-label="${scope.ui.sliderLabel}">${slides}</ul>
        <div class="slider__controls">
          <button type="button" class="slider__button" data-slide="-1" aria-label="${scope.ui.sliderPrev}">&larr;</button>
          <div class="slider__progress" aria-hidden="true"><span></span></div>
          <button type="button" class="slider__button" data-slide="1" aria-label="${scope.ui.sliderNext}">&rarr;</button>
        </div>
      </div>`;
    updateSlider(container.querySelector(".slider__track"));
    return;
  }
  container.innerHTML = `
    <div class="empty-state">
      <p class="empty-state__text">${emptyProjects.text}</p>
      <a class="button button--primary" href="#contact">${emptyProjects.cta}</a>
    </div>`;
}

// Progress bar and arrow states follow the scroll position of the track.
function updateSlider(track) {
  const slider = track.closest(".slider");
  const maxScroll = track.scrollWidth - track.clientWidth;
  const progress = maxScroll > 0 ? (track.scrollLeft + track.clientWidth) / track.scrollWidth : 1;
  slider.style.setProperty("--progress", `${Math.round(progress * 100)}%`);
  slider.querySelector('[data-slide="-1"]').disabled = track.scrollLeft <= 1;
  slider.querySelector('[data-slide="1"]').disabled = track.scrollLeft >= maxScroll - 1;
}

// Listeners live on the static container because the slider is re-rendered on every switch.
function initSlider() {
  const container = document.getElementById("projects-content");
  let drag = null;

  container.addEventListener("click", (event) => {
    const button = event.target.closest("[data-slide]");
    if (button) {
      const track = container.querySelector(".slider__track");
      const step = track.querySelector(".slide").offsetWidth;
      track.scrollBy({ left: Number(button.dataset.slide) * step, behavior: reducedMotion.matches ? "auto" : "smooth" });
    }
    // A drag that moved should not open the card underneath
    if (drag && drag.moved) event.preventDefault();
  }, true);

  container.addEventListener("scroll", (event) => {
    if (event.target.classList.contains("slider__track")) updateSlider(event.target);
  }, true);

  // Mouse drag; touch and trackpads already scroll natively
  container.addEventListener("dragstart", (event) => {
    if (event.target.closest(".slider__track")) event.preventDefault(); // no native link/image dragging
  });
  container.addEventListener("pointerdown", (event) => {
    const track = event.target.closest(".slider__track");
    if (!track || event.pointerType !== "mouse") return;
    drag = { track, startX: event.clientX, startScroll: track.scrollLeft, moved: false };
  });
  window.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 5) {
      drag.moved = true;
      drag.track.classList.add("is-dragging");
    }
    drag.track.scrollLeft = drag.startScroll - distance;
  });
  window.addEventListener("pointerup", () => {
    if (!drag) return;
    drag.track.classList.remove("is-dragging"); // snap takes over again and settles on a slide
    setTimeout(() => (drag = null)); // keep "moved" until the click that follows pointerup
  });
}

// Header is transparent over the forest scene and solid once the page scrolls past it.
function initHeader() {
  const header = document.querySelector(".site-header");
  const hero = document.getElementById("top");
  // Turns solid before the hero's bottom fade reaches the header, so its light text never sits on linen
  new IntersectionObserver(([entry]) => header.classList.toggle("is-over-hero", entry.intersectionRatio >= 0.6), {
    threshold: 0.6,
  }).observe(hero);
}

function renderContact(scope) {
  const list = document.getElementById("contact-list");
  list.innerHTML = MODE_CONTACTS[state.mode]
    .map((id) => {
      const link = LINKS[id];
      const isExternal = !link.href.startsWith("mailto:");
      const externalAttributes = isExternal ? ' target="_blank" rel="noopener"' : "";
      const newTabNote = isExternal ? `<span class="visually-hidden">${scope.ui.newTab}</span>` : "";
      const icon = link.icon
        ? `<img class="contact-link__icon" src="${link.icon}" alt="" width="28" height="28">`
        : `<span class="contact-link__icon" aria-hidden="true"></span>`;
      return `
        <li>
          <a class="contact-link" href="${link.href}"${externalAttributes}>
            ${icon}
            <span class="contact-link__text">
              <span class="contact-link__label">${scope.ui.contactLabels[id]}</span>
              <span class="contact-link__value">${link.display}</span>
            </span>
            ${newTabNote}
          </a>
        </li>`;
    })
    .join("");
}

// Floating WhatsApp button with a prefilled message in the current language.
function renderWhatsappButton(scope) {
  const button = document.getElementById("whatsapp-button");
  button.href = `${LINKS.whatsapp.href}?text=${encodeURIComponent(scope.ui.whatsappMessage)}`;
}

function updateSwitches() {
  document.querySelectorAll("[data-set-mode]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.setMode === state.mode));
  });
  document.querySelectorAll("[data-set-lang]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.setLang === state.lang));
  });
}

// Scroll "pop": elements appear when they enter the viewport and fade out when they leave it.
const REVEAL_SELECTOR =
  ".section__title, .section__lead, .about__photo, .about__text, .about__subtitle, .principles li, " +
  ".experience, .tech__group, .slide, .empty-state, " +
  ".contact__lead, .contact-list > li";

const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
  { threshold: 0.15 }
);

// Runs after every render because mode/language switches replace the lists.
function observeReveals() {
  if (reducedMotion.matches) return;
  revealObserver.disconnect();
  document.querySelectorAll(REVEAL_SELECTOR).forEach((element) => {
    const siblingIndex = [...element.parentElement.children].indexOf(element);
    element.classList.add("reveal");
    element.style.setProperty("--reveal-index", Math.min(siblingIndex, 5));
    revealObserver.observe(element);
  });
}

// Restarts the CSS typing animation on the hero role (see .hero__role in styles.css).
// Types the hero role one letter at a time. The full text lives in a visually hidden
// sibling for screen readers; the typed copy is aria-hidden.
const INTRO_DURATION_MS = 1300;
const TYPING_STEP_MS = 70;
let typingTimer = 0;
let hasTyped = false;

function typeHeroRole(scope) {
  const role = document.querySelector(".hero__role");
  const text = scope.mode.heroTitle;
  clearTimeout(typingTimer);
  if (reducedMotion.matches) {
    role.textContent = text;
    return;
  }
  role.textContent = "";
  let length = 0;
  const typeNext = () => {
    role.textContent = text.slice(0, ++length);
    if (length < text.length) typingTimer = setTimeout(typeNext, TYPING_STEP_MS);
  };
  // Only the first load waits for the intro; switches type right away
  typingTimer = setTimeout(typeNext, hasTyped ? 0 : INTRO_DURATION_MS);
  hasTyped = true;
}

function renderPage() {
  const scope = getTextScope();
  const root = document.documentElement;

  root.lang = state.lang;
  root.dataset.mode = state.mode;
  document.title = scope.mode.metaTitle;
  document.querySelector('meta[name="description"]').setAttribute("content", scope.mode.metaDescription);

  renderTextNodes(scope);
  typeHeroRole(scope);
  renderHeroActions(scope);
  renderHowIWork(scope);
  renderTech(scope);
  renderProjects(scope);
  renderContact(scope);
  renderWhatsappButton(scope);
  updateSwitches();
  observeReveals();
}

// ---------- Init ----------

document.querySelectorAll("[data-set-mode]").forEach((button) => {
  button.addEventListener("click", () => setState({ mode: button.dataset.setMode }));
});
document.querySelectorAll("[data-set-lang]").forEach((button) => {
  button.addEventListener("click", () => setState({ lang: button.dataset.setLang }));
});

document.getElementById("year").textContent = new Date().getFullYear();
initSlider();
initHeader();
renderPage();
syncUrl();
