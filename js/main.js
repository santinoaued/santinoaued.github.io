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

// isCopy marks the repeated cards that only exist to make the carousel loop seamless.
function renderCard(project, ui, isCopy) {
  // The logo is decorative: the card title already names the platform.
  const logo = CARD_LOGOS[project.id];
  const media = logo
    ? `<img class="card__logo" src="${logo}" alt="" loading="lazy">`
    : `<span class="card__name">${project.name}</span>`;

  return `
    <li class="slide"${isCopy ? ' aria-hidden="true"' : ""}>
      <a class="card" data-platform="${project.id}" href="${LINKS[project.id].href}" target="_blank" rel="noopener"${isCopy ? ' tabindex="-1"' : ""}>
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
    <li>
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
    // Real cards in the middle, a copy on each side, so the loop never shows an edge
    const cards = [true, false, true]
      .map((isCopy) => projects.map((project) => renderCard(project, scope.ui, isCopy)).join(""))
      .join("");
    container.innerHTML = `
      <ul class="featured">${featured.map((project) => renderFeatured(project, scope.ui)).join("")}</ul>
      <h3 class="projects__subtitle">${scope.mode.profilesTitle}</h3>
      <div class="slider">
        <div class="slider__viewport">
          <ul class="slider__track" aria-label="${scope.ui.sliderLabel}" data-period-cards="${projects.length}">${cards}</ul>
        </div>
        <div class="slider__controls">
          <button type="button" class="slider__button" data-slide="-1" aria-label="${scope.ui.sliderPrev}">&larr;</button>
          <button type="button" class="slider__button" data-carousel-pause aria-pressed="${carouselPaused}" aria-label="${scope.ui.carouselPause}">
            <span aria-hidden="true">${carouselPaused ? "&#9654;" : "&#10074;&#10074;"}</span>
          </button>
          <button type="button" class="slider__button" data-slide="1" aria-label="${scope.ui.sliderNext}">&rarr;</button>
        </div>
      </div>`;
    return;
  }
  container.innerHTML = `
    <div class="empty-state">
      <p class="empty-state__text">${emptyProjects.text}</p>
      <a class="button button--primary" href="#contact">${emptyProjects.cta}</a>
    </div>`;
}

// Profiles carousel: drifts on its own in an endless loop and stops while someone uses it.
const CAROUSEL_SPEED = 40; // px per second
const CAROUSEL_RESUME_MS = 4000; // idle time after a swipe, drag or arrow before it moves again
let carouselPaused = reducedMotion.matches; // the pause button; starts paused for reduced motion

// Moves the track with a GPU transform (sub-pixel smooth) instead of scrolling it.
// Listeners live on the static container because the carousel is re-rendered on every switch.
function initCarousel() {
  const container = document.getElementById("projects-content");
  let offset = 0; // px the track is shifted left; kept inside the real (middle) set
  let drag = null;
  let glide = null; // arrow-button animation: { from, to, start }
  let isFocused = false;
  let resumeAt = 0;
  let lastTime = 0;
  let frame = 0;

  const getTrack = () => container.querySelector(".slider__track");
  const holdForAWhile = () => (resumeAt = performance.now() + CAROUSEL_RESUME_MS);

  // Distance from a card to its copy: shifting by it looks identical, so the loop has no seam
  function getPeriod(track) {
    return track.children[Number(track.dataset.periodCards)].offsetLeft - track.children[0].offsetLeft;
  }

  function render(track) {
    const period = getPeriod(track);
    if (!period) return;
    offset = ((((offset - period) % period) + period) % period) + period; // wrap into [period, 2 * period)
    track.style.transform = `translate3d(${-offset}px, 0, 0)`;
  }

  function tick(time) {
    const track = getTrack();
    const elapsed = lastTime ? Math.min(time - lastTime, 100) : 0;
    lastTime = time;
    if (track) {
      if (glide) {
        const progress = Math.min((time - glide.start) / 450, 1);
        offset = glide.from + (glide.to - glide.from) * (1 - Math.pow(1 - progress, 3)); // ease-out
        if (progress === 1) glide = null;
      } else if (!carouselPaused && !isFocused && !drag && time > resumeAt) {
        offset += (CAROUSEL_SPEED * elapsed) / 1000;
      }
      render(track);
    }
    frame = requestAnimationFrame(tick);
  }

  // Only run while the projects are on screen
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !frame) {
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    } else if (!entry.isIntersecting && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  }).observe(container);

  // Keyboard: pause while a card has focus and bring that card into view
  container.addEventListener("focusin", (event) => {
    const slide = event.target.closest(".slide");
    isFocused = !!event.target.closest(".slider");
    if (!slide) return;
    const track = getTrack();
    slide.closest(".slider__viewport").scrollLeft = 0; // focus must not scroll the clipped viewport itself
    offset = slide.offsetLeft - track.children[0].offsetLeft;
  });
  container.addEventListener("focusout", () => (isFocused = false));
  container.addEventListener("scroll", (event) => {
    if (event.target.classList.contains("slider__viewport")) event.target.scrollLeft = 0;
  }, true);

  // Sideways trackpad or shift+wheel moves it; plain vertical wheel keeps scrolling the page
  container.addEventListener("wheel", (event) => {
    if (!event.target.closest(".slider__viewport") || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    event.preventDefault();
    offset += event.deltaX;
    holdForAWhile();
  }, { passive: false });

  container.addEventListener("click", (event) => {
    const pauseButton = event.target.closest("[data-carousel-pause]");
    if (pauseButton) {
      carouselPaused = !carouselPaused;
      pauseButton.setAttribute("aria-pressed", String(carouselPaused));
      pauseButton.firstElementChild.innerHTML = carouselPaused ? "&#9654;" : "&#10074;&#10074;";
    }
    const button = event.target.closest("[data-slide]");
    if (button) {
      const step = getTrack().children[1].offsetLeft - getTrack().children[0].offsetLeft; // one card + gap
      const to = offset + Number(button.dataset.slide) * step;
      if (reducedMotion.matches) offset = to;
      else glide = { from: offset, to, start: performance.now() };
      holdForAWhile();
    }
    // A drag that moved should not open the card underneath
    if (drag && drag.moved) event.preventDefault();
  }, true);

  // Drag with mouse or finger. touch-action: pan-y in CSS leaves vertical swipes to the page.
  container.addEventListener("dragstart", (event) => {
    if (event.target.closest(".slider__viewport")) event.preventDefault(); // no native link/image dragging
  });
  container.addEventListener("pointerdown", (event) => {
    const viewport = event.target.closest(".slider__viewport");
    if (!viewport || event.button > 0) return;
    drag = { viewport, startX: event.clientX, startOffset: offset, moved: false };
    glide = null;
  });
  window.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const distance = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(distance) > 5) {
      drag.moved = true;
      drag.viewport.classList.add("is-dragging");
    }
    if (drag.moved) offset = drag.startOffset - distance;
  });
  const endDrag = () => {
    if (!drag) return;
    drag.viewport.classList.remove("is-dragging");
    holdForAWhile();
    setTimeout(() => (drag = null)); // keep "moved" until the click that follows pointerup
  };
  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag); // the browser took over for a vertical swipe
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
  ".experience, .tech__group, .featured-card, .projects__subtitle, .slider, .empty-state, " +
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
initCarousel();
initHeader();
renderPage();
syncUrl();
