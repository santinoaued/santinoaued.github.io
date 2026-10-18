// Hero background: a misty pine forest drawn on canvas.
// Desktop with a mouse gets the animated version (parallax, wind, rain, scroll fog);
// touch screens and reduced-motion get a single still frame.

function startHeroScene() {
  const canvas = document.getElementById("hero-scene");
  const hero = document.getElementById("top");
  const context = canvas.getContext("2d");
  const isAnimated =
    window.matchMedia("(min-width: 64rem) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const SKY_TOP = "#5F7269";
  const SKY_BOTTOM = "#C9D2CB";
  const FOG_RGB = "220, 227, 220";
  const RAIN_COLOR = "rgba(236, 241, 237, 0.32)";
  const PARALLAX = 0.08; // max layer shift, as a fraction of the width
  // Ridges from far to near: lighter with distance, like real fog
  const RIDGES = [
    { color: "#A3B2AA", base: 0.6, size: 0.08, depth: 0.15 },
    { color: "#7E9389", base: 0.72, size: 0.11, depth: 0.35 },
    { color: "#557064", base: 0.86, size: 0.15, depth: 0.6 },
  ];
  // The two big pines on the right, rooted below the bottom edge
  const FRONT_PINES = [
    { x: 0.8, height: 0.95, color: "#1F3A2E", phase: 0 },
    { x: 0.93, height: 0.72, color: "#24402F", phase: 1.7 },
  ];

  let width = 0;
  let height = 0;
  let ridgeLayers = [];
  let fogBlobs = [];
  let raindrops = [];
  let wind = 0.2;
  const mouse = { x: 0.5, y: 0.5, smoothX: 0.5, smoothY: 0.5 };
  let isVisible = true;
  let frameRequest = 0;

  // Small seeded random so the forest looks the same on every visit
  function seededRandom(seed) {
    return function () {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function drawPine(ctx, x, baseY, treeHeight, color) {
    const treeWidth = treeHeight * 0.42;
    ctx.fillStyle = color;
    ctx.fillRect(x - treeHeight * 0.02, baseY - treeHeight * 0.12, treeHeight * 0.04, treeHeight * 0.12);
    for (let tier = 0; tier < 4; tier++) {
      const top = baseY - treeHeight + tier * treeHeight * 0.2;
      const bottom = top + treeHeight * 0.36;
      const halfWidth = (treeWidth * (0.4 + tier * 0.2)) / 2;
      ctx.beginPath();
      ctx.moveTo(x, top);
      ctx.lineTo(x + halfWidth, bottom);
      ctx.lineTo(x - halfWidth, bottom);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Each ridge is drawn once into its own wider canvas, then only moved per frame
  function buildRidges() {
    const random = seededRandom(7);
    ridgeLayers = RIDGES.map((ridge) => {
      const layer = document.createElement("canvas");
      layer.width = Math.ceil(width * (1 + PARALLAX * 2));
      layer.height = height;
      const ctx = layer.getContext("2d");
      const baseY = height * ridge.base;
      const treeSize = height * ridge.size;

      ctx.fillStyle = ridge.color;
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= layer.width; x += 20) {
        ctx.lineTo(x, baseY + Math.sin(x * 0.004 + ridge.base * 10) * treeSize * 0.25);
      }
      ctx.lineTo(layer.width, height);
      ctx.fill();

      for (let x = 0; x < layer.width; x += treeSize * (0.25 + random() * 0.35)) {
        const ground = baseY + Math.sin(x * 0.004 + ridge.base * 10) * treeSize * 0.25;
        drawPine(ctx, x, ground + treeSize * 0.1, treeSize * (0.6 + random() * 0.7), ridge.color);
      }
      return { canvas: layer, depth: ridge.depth };
    });

    fogBlobs = Array.from({ length: 10 }, (_, index) => ({
      x: random() * width,
      y: height * (0.5 + (index % 3) * 0.14 + random() * 0.08),
      radius: height * (0.25 + random() * 0.25),
      speed: 0.08 + random() * 0.18,
      alpha: 0.18 + random() * 0.2,
    }));

    raindrops = Array.from({ length: 170 }, () => ({
      x: random() * width,
      y: random() * height,
      length: 10 + random() * 16,
      speed: 7 + random() * 6,
    }));
  }

  function resize() {
    const scale = Math.min(window.devicePixelRatio || 1, 1.5);
    width = Math.round(hero.clientWidth * scale);
    height = Math.round(hero.clientHeight * scale);
    if (!width || !height) return; // not laid out yet (hidden tab, zero-size preview)
    canvas.width = width;
    canvas.height = height;
    buildRidges();
    if (!isAnimated) drawFrame(0);
  }

  function drawFrame(time) {
    const sky = context.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, SKY_TOP);
    sky.addColorStop(0.7, SKY_BOTTOM);
    context.fillStyle = sky;
    context.fillRect(0, 0, width, height);

    // Wind follows the cursor, plus slow gusts
    const gust = Math.sin(time * 0.0007) * 0.25 + Math.sin(time * 0.0019) * 0.1;
    const targetWind = 0.25 + (mouse.x - 0.5) * 0.9 + gust;
    wind += (targetWind - wind) * 0.03;
    mouse.smoothX += (mouse.x - mouse.smoothX) * 0.06;
    mouse.smoothY += (mouse.y - mouse.smoothY) * 0.06;

    ridgeLayers.forEach((layer, index) => {
      const shiftX = -(mouse.smoothX - 0.5) * layer.depth * width * PARALLAX;
      const shiftY = -(mouse.smoothY - 0.5) * layer.depth * height * 0.03;
      context.drawImage(layer.canvas, -width * PARALLAX + shiftX, shiftY);

      // Fog drifts between ridges
      fogBlobs.forEach((blob, blobIndex) => {
        if (blobIndex % ridgeLayers.length !== index) return;
        if (isAnimated) blob.x = (blob.x + blob.speed * (0.5 + wind) + width * 1.5) % (width * 1.5);
        const fog = context.createRadialGradient(blob.x - width * 0.25, blob.y, 0, blob.x - width * 0.25, blob.y, blob.radius);
        fog.addColorStop(0, `rgba(${FOG_RGB}, ${blob.alpha})`);
        fog.addColorStop(1, `rgba(${FOG_RGB}, 0)`);
        context.fillStyle = fog;
        context.fillRect(0, 0, width, height);
      });
    });

    FRONT_PINES.forEach((pine) => {
      const sway = wind * 0.05 + Math.sin(time * 0.0016 + pine.phase) * 0.012;
      const shiftX = -(mouse.smoothX - 0.5) * width * PARALLAX;
      context.save();
      context.translate(width * pine.x + shiftX, height * 1.03);
      context.transform(1, 0, -sway, 1, 0, 0); // skew: the top bends, the base stays put
      drawPine(context, 0, 0, height * pine.height, pine.color);
      context.restore();
    });

    if (isAnimated) {
      context.strokeStyle = RAIN_COLOR;
      context.lineWidth = 1;
      context.beginPath();
      raindrops.forEach((drop) => {
        drop.y += drop.speed;
        drop.x += drop.speed * wind * 0.35;
        if (drop.y > height) drop.y = -drop.length;
        if (drop.x > width) drop.x -= width;
        if (drop.x < 0) drop.x += width;
        context.moveTo(drop.x, drop.y);
        context.lineTo(drop.x - drop.length * wind * 0.35, drop.y - drop.length);
      });
      context.stroke();

      // Fog closes over the scene as the hero scrolls away
      const scrolled = Math.min(window.scrollY / hero.clientHeight, 1);
      context.fillStyle = `rgba(${FOG_RGB}, ${scrolled * 0.85})`;
      context.fillRect(0, 0, width, height);
    }
  }

  function loop(time) {
    drawFrame(time);
    frameRequest = isVisible ? requestAnimationFrame(loop) : 0;
  }

  resize();
  window.addEventListener("resize", resize);
  if (!isAnimated) return;

  window.addEventListener("pointermove", (event) => {
    mouse.x = event.clientX / window.innerWidth;
    mouse.y = event.clientY / window.innerHeight;
  });
  // Stop drawing while the hero is off screen
  new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    if (isVisible && !frameRequest) frameRequest = requestAnimationFrame(loop);
  }).observe(hero);
}

startHeroScene();
