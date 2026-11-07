// ===========================
// Mobile Navigation Toggle
// ===========================
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ===========================
// Navbar background on scroll + Back to top + Active nav
// ===========================
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

const sectionIds = ['about', 'education', 'skills', 'projects', 'experience', 'contact'];
const navAnchors = sectionIds.map(id => navLinks.querySelector(`a[href="#${id}"]`));

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  let activeIndex = -1;

  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const section = document.getElementById(sectionIds[i]);
    if (section && section.offsetTop <= scrollY) {
      activeIndex = i;
      break;
    }
  }

  navAnchors.forEach((a, i) => {
    if (a) a.classList.toggle('active', i === activeIndex);
  });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  updateActiveNav();
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// Hero photo fallback (shows initials if the photo fails to load)
// ===========================
const heroPhoto = document.getElementById('heroPhoto');
const heroInitials = document.getElementById('heroInitials');

function showHeroFallback() {
  heroPhoto.style.display = 'none';
  heroInitials.style.display = 'flex';
}

if (heroPhoto && heroInitials) {
  heroPhoto.addEventListener('error', showHeroFallback);
  if (heroPhoto.complete && heroPhoto.naturalWidth === 0) {
    showHeroFallback();
  }
}

// ===========================
// Fade-in sections on scroll
// ===========================
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Trigger stagger children inside
      const staggerEl = entry.target.querySelector('.stagger-children');
      if (staggerEl) {
        staggerEl.classList.add('visible');
      }
    }
  });
}, { threshold: 0.08 });

fadeElements.forEach(el => observer.observe(el));

// Hero fades in immediately on load
window.addEventListener('load', () => {
  const navigationEntry = performance.getEntriesByType('navigation')[0];
  const shouldStartAtTop = !window.location.hash && (!navigationEntry || navigationEntry.type !== 'back_forward');

  if (shouldStartAtTop) {
    window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }

  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.opacity = '1';
    hero.style.transform = 'translateY(0)';
  }
});

// ===========================
// Render Project Cards
// ===========================
// Project data lives in data/projects.js (loaded before this file).
// Featured projects sort first; otherwise the order in the data file is kept.
const sortedProjectIndexes = projects
  .map((p, i) => i)
  .sort((a, b) => (projects[b].featured === true) - (projects[a].featured === true) || a - b);

let activeCategory = 'All';

function renderFilters() {
  const bar = document.getElementById('projectFilters');
  if (!bar) return;
  // Only show categories that have at least one project
  const used = CATEGORIES.filter(c => projects.some(p => p.category === c));
  bar.innerHTML = ['All', ...used].map(c => {
    const count = c === 'All' ? projects.length : projects.filter(p => p.category === c).length;
    const active = c === activeCategory;
    return `<button type="button" class="filter-chip${active ? ' active' : ''}" data-category="${c}" aria-pressed="${active}">${c} <span class="filter-count">${count}</span></button>`;
  }).join('');
  bar.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      renderFilters();
      renderCards();
    });
  });
}

function renderCards() {
  const grid = document.getElementById('projectsGrid');
  const visible = sortedProjectIndexes.filter(i => activeCategory === 'All' || projects[i].category === activeCategory);
  grid.innerHTML = visible.map(i => {
    const p = projects[i];
    let cardImageContent;
    if (p.image) {
      cardImageContent = `<div class="card-image" style="background:${p.imageBg};"><img src="${p.image}" alt="${p.title}" loading="lazy" class="card-lazy-img" /></div>`;
    } else {
      const statHtml = p.stat
        ? `<div class="card-stat"><div class="card-stat-value">${p.stat}</div><div class="card-stat-label">${p.statLabel}</div></div>`
        : '';
      cardImageContent = `<div class="card-image" style="background:${p.imageBg};">${statHtml}</div>`;
    }
    return `
      <div class="project-card" data-index="${i}">
        ${cardImageContent}
        <div class="card-body">
          <div class="card-top-row">
            <span class="course-tag">${p.course}</span>
            <span class="date-badge">${p.date}</span>
          </div>
          <h3 class="card-title">${p.title}</h3>
          <p class="card-summary">${p.summary}</p>
          <div class="card-skills">
            ${p.skills.map(s => `<span class="skill-pill">${s}</span>`).join('')}
          </div>
        </div>
      </div>`;
  }).join('');

  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openModal(parseInt(card.dataset.index)));
  });
}

// ===========================
// Modal Logic
// ===========================
const overlay       = document.getElementById('projectModal');
const modalImage    = overlay.querySelector('.modal-image');
const modalMeta     = overlay.querySelector('.modal-meta');
const modalTitle    = overlay.querySelector('.modal-title');
const modalBullets  = overlay.querySelector('.modal-bullets');
const modalSkills   = overlay.querySelector('.modal-skills');
const modalAttach   = overlay.querySelector('.modal-attachments');

function openModal(index) {
  const p = projects[index];

  if (p.image) {
    modalImage.style.backgroundImage = `url('${p.image}')`;
    modalImage.style.background = `url('${p.image}') center/cover no-repeat, ${p.imageBg}`;
    modalImage.textContent = '';
  } else {
    modalImage.style.background = p.imageBg;
    modalImage.textContent = p.emoji;
  }

  modalMeta.innerHTML = `<span class="course-tag">${p.course}</span><span class="date-badge">${p.date}</span>`;
  modalTitle.textContent = p.title;
  modalBullets.innerHTML = p.bullets.map(b => `<li>${b}</li>`).join('');
  modalSkills.innerHTML = p.skills.map(s => `<span class="skill-pill">${s}</span>`).join('');

  const attachments = p.attachments || [];
  const links = p.links || [];
  if (attachments.length || links.length) {
    const attachHtml = attachments.length
      ? `<span class="modal-attachments-label">Attachments</span>` +
        attachments.map(a => `<button class="attach-link" data-href="${a.href}" data-label="${a.label}">${a.icon || '📄'} ${a.label}</button>`).join('')
      : '';
    const linksHtml = links.length
      ? `<span class="modal-attachments-label">Links</span>` +
        links.map(l => `<a class="attach-link attach-external" href="${l.href}" target="_blank" rel="noopener noreferrer">${l.label} ↗</a>`).join('')
      : '';
    modalAttach.innerHTML = attachHtml + linksHtml;
    modalAttach.querySelectorAll('.attach-link').forEach(btn => {
      btn.addEventListener('click', () => openViewer(btn.dataset.href, btn.dataset.label));
    });
    modalAttach.style.display = 'flex';
  } else {
    modalAttach.style.display = 'none';
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

overlay.querySelector('.modal-close').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeMobileViewer() || closeViewer() || closeModal();
  }
});

// ===========================
// File Viewer
// ===========================
const viewerOverlay  = document.getElementById('fileViewer');
const viewerFilename = viewerOverlay.querySelector('.viewer-filename');
const viewerOpen     = viewerOverlay.querySelector('.viewer-open');
const viewerDownload = viewerOverlay.querySelector('.viewer-download');
const viewerBody     = viewerOverlay.querySelector('.viewer-body');
const mobileViewerOverlay = document.getElementById('mobileViewer');
const mobileViewerFilename = mobileViewerOverlay.querySelector('.mobile-viewer-filename');
const mobileViewerType = mobileViewerOverlay.querySelector('.mobile-viewer-type');
const mobileViewerOpen = mobileViewerOverlay.querySelector('.mobile-viewer-open');
const mobileViewerDownload = mobileViewerOverlay.querySelector('.mobile-viewer-download');
const mobileViewerBody = mobileViewerOverlay.querySelector('.mobile-viewer-body');
let cleanupViewer = null;
let cleanupMobileViewer = null;
let mobileViewerRenderToken = 0;

// PDF.js is loaded (self-hosted) and configured by pdf-init.mjs, which sets window.pdfjsLib.

function isMobileViewer() {
  return window.matchMedia('(max-width: 768px)').matches;
}

function getFileExtension(href) {
  return href.split('.').filter(Boolean).pop().toLowerCase();
}

function getViewerTypeLabel(ext) {
  if (ext === 'pdf') return 'Scrollable document viewer';
  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return 'Zoomable image viewer';
  return 'Attachment preview';
}

function applyImageTransform(image, state) {
  image.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
}

function clampImagePosition(stage, image, state) {
  const stageRect = stage.getBoundingClientRect();
  const imageRect = image.getBoundingClientRect();
  const overflowX = Math.max(0, (imageRect.width - stageRect.width) / 2);
  const overflowY = Math.max(0, (imageRect.height - stageRect.height) / 2);

  state.x = Math.min(overflowX, Math.max(-overflowX, state.x));
  state.y = Math.min(overflowY, Math.max(-overflowY, state.y));
}

function setupImageViewer() {
  const stage = viewerBody.querySelector('.viewer-image-stage');
  const image = viewerBody.querySelector('.viewer-zoom-image');
  const zoomInBtn = viewerBody.querySelector('[data-zoom="in"]');
  const zoomOutBtn = viewerBody.querySelector('[data-zoom="out"]');
  const resetBtn = viewerBody.querySelector('[data-zoom="reset"]');

  if (!stage || !image) return;

  const state = {
    scale: 1,
    minScale: 1,
    maxScale: 3,
    x: 0,
    y: 0,
    pointerId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  };

  const update = () => {
    clampImagePosition(stage, image, state);
    applyImageTransform(image, state);
  };

  const setScale = (nextScale) => {
    state.scale = Math.min(state.maxScale, Math.max(state.minScale, nextScale));
    if (state.scale === state.minScale) {
      state.x = 0;
      state.y = 0;
    }
    update();
  };

  const reset = () => {
    state.scale = 1;
    state.x = 0;
    state.y = 0;
    update();
  };

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    state.pointerId = event.pointerId;
    state.startX = event.clientX;
    state.startY = event.clientY;
    state.originX = state.x;
    state.originY = state.y;
    image.classList.add('is-dragging');
    stage.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (state.pointerId !== event.pointerId || state.scale <= 1) return;
    state.x = state.originX + (event.clientX - state.startX);
    state.y = state.originY + (event.clientY - state.startY);
    update();
  };

  const onPointerUp = (event) => {
    if (state.pointerId !== event.pointerId) return;
    state.pointerId = null;
    image.classList.remove('is-dragging');
    if (stage.hasPointerCapture(event.pointerId)) {
      stage.releasePointerCapture(event.pointerId);
    }
  };

  const onWheel = (event) => {
    event.preventDefault();
    const delta = event.deltaY < 0 ? 0.2 : -0.2;
    setScale(state.scale + delta);
  };

  const onResize = () => update();

  zoomInBtn?.addEventListener('click', () => setScale(state.scale + 0.25));
  zoomOutBtn?.addEventListener('click', () => setScale(state.scale - 0.25));
  resetBtn?.addEventListener('click', reset);
  stage.addEventListener('pointerdown', onPointerDown);
  stage.addEventListener('pointermove', onPointerMove);
  stage.addEventListener('pointerup', onPointerUp);
  stage.addEventListener('pointercancel', onPointerUp);
  stage.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('resize', onResize);

  update();

  cleanupViewer = () => {
    window.removeEventListener('resize', onResize);
  };
}

function openViewer(href, label) {
  if (isMobileViewer()) {
    openMobileViewer(href, label);
    return;
  }

  if (cleanupViewer) {
    cleanupViewer();
    cleanupViewer = null;
  }

  const ext = getFileExtension(href);
  viewerFilename.textContent = label;
  viewerOpen.href = href;
  viewerDownload.href = href;
  viewerDownload.download = href.split('/').pop();

  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) {
    viewerBody.innerHTML = `
      <div class="viewer-media">
        <div class="viewer-image-stage">
          <img class="viewer-zoom-image" src="${href}" alt="${label}" />
        </div>
        <div class="viewer-image-hint">
          <i data-lucide="move"></i>
          <span>Drag to move. Use the controls to zoom.</span>
        </div>
        <div class="viewer-image-controls">
          <button class="viewer-image-btn" type="button" data-zoom="out" aria-label="Zoom out"><i data-lucide="zoom-out"></i></button>
          <button class="viewer-image-btn" type="button" data-zoom="reset" aria-label="Reset zoom"><i data-lucide="scan-search"></i></button>
          <button class="viewer-image-btn" type="button" data-zoom="in" aria-label="Zoom in"><i data-lucide="zoom-in"></i></button>
        </div>
      </div>`;
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    setupImageViewer();
  } else if (ext === 'pdf') {
    viewerBody.innerHTML = `
      <div class="viewer-pdf-frame">
        <iframe src="${href}#toolbar=1&navpanes=0&scrollbar=1&view=FitH"></iframe>
      </div>`;
  } else {
    viewerBody.innerHTML = `<div class="viewer-no-preview">
      <p>Preview not available for this file type.</p>
      <p>Use the <strong>Open</strong> or <strong>Download</strong> buttons above.</p>
    </div>`;
  }

  viewerOverlay.classList.add('active');
}

function setupMobileImageViewer() {
  const stage = mobileViewerBody.querySelector('.mobile-image-stage');
  const canvas = mobileViewerBody.querySelector('.mobile-zoom-canvas');

  if (!stage || !canvas) return;

  const context = canvas.getContext('2d');
  const source = new Image();
  source.decoding = 'async';

  const state = {
    zoom: 1,
    minZoom: 1,
    maxZoom: 4,
    x: 0,
    y: 0,
    pointers: new Map(),
    dragPointerId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    pinchStartDistance: 0,
    pinchStartScale: 1,
    pinchStartX: 0,
    pinchStartY: 0,
    pinchStartMidX: 0,
    pinchStartMidY: 0,
    baseScale: 1,
    stageWidth: 0,
    stageHeight: 0,
    imageReady: false,
  };

  const draw = () => {
    if (!state.imageReady) return;

    const pixelRatio = Math.max(window.devicePixelRatio || 1, 1);
    const drawnWidth = source.naturalWidth * state.baseScale * state.zoom;
    const drawnHeight = source.naturalHeight * state.baseScale * state.zoom;
    const offsetX = (state.stageWidth - drawnWidth) / 2 + state.x;
    const offsetY = (state.stageHeight - drawnHeight) / 2 + state.y;

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, state.stageWidth, state.stageHeight);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.drawImage(source, offsetX, offsetY, drawnWidth, drawnHeight);
  };

  const clamp = () => {
    if (!state.imageReady) return;

    const drawnWidth = source.naturalWidth * state.baseScale * state.zoom;
    const drawnHeight = source.naturalHeight * state.baseScale * state.zoom;
    const overflowX = Math.max(0, (drawnWidth - state.stageWidth) / 2);
    const overflowY = Math.max(0, (drawnHeight - state.stageHeight) / 2);

    state.x = Math.min(overflowX, Math.max(-overflowX, state.x));
    state.y = Math.min(overflowY, Math.max(-overflowY, state.y));
  };

  const update = () => {
    clamp();
    draw();
  };

  const setZoom = (nextZoom) => {
    state.zoom = Math.min(state.maxZoom, Math.max(state.minZoom, nextZoom));
    if (state.zoom <= 1.01) {
      state.x = 0;
      state.y = 0;
    }
    update();
  };

  const resizeCanvas = () => {
    const rect = stage.getBoundingClientRect();
    const pixelRatio = Math.max(window.devicePixelRatio || 1, 1);

    state.stageWidth = Math.max(1, rect.width);
    state.stageHeight = Math.max(1, rect.height);
    canvas.width = Math.round(state.stageWidth * pixelRatio);
    canvas.height = Math.round(state.stageHeight * pixelRatio);
    canvas.style.width = `${state.stageWidth}px`;
    canvas.style.height = `${state.stageHeight}px`;

    if (state.imageReady) {
      state.baseScale = Math.min(
        state.stageWidth / source.naturalWidth,
        state.stageHeight / source.naturalHeight
      );
      update();
    }
  };

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    stage.setPointerCapture(event.pointerId);
    state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (state.pointers.size === 1) {
      state.dragPointerId = event.pointerId;
      state.startX = event.clientX;
      state.startY = event.clientY;
      state.originX = state.x;
      state.originY = state.y;
      if (state.zoom > 1) {
        canvas.classList.add('is-dragging');
      }
    }

    if (state.pointers.size === 2) {
      const [first, second] = [...state.pointers.values()];
      state.dragPointerId = null;
      state.pinchStartDistance = Math.hypot(second.x - first.x, second.y - first.y);
      state.pinchStartScale = state.zoom;
      state.pinchStartX = state.x;
      state.pinchStartY = state.y;
      state.pinchStartMidX = (first.x + second.x) / 2;
      state.pinchStartMidY = (first.y + second.y) / 2;
      canvas.classList.remove('is-dragging');
    }
  };

  const onPointerMove = (event) => {
    if (!state.pointers.has(event.pointerId)) return;
    state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (state.pointers.size >= 2) {
      const [first, second] = [...state.pointers.values()];
      const nextDistance = Math.hypot(second.x - first.x, second.y - first.y);
      const nextMidX = (first.x + second.x) / 2;
      const nextMidY = (first.y + second.y) / 2;

      if (state.pinchStartDistance > 0) {
        state.zoom = Math.min(
          state.maxZoom,
          Math.max(state.minZoom, state.pinchStartScale * (nextDistance / state.pinchStartDistance))
        );
      }

      state.x = state.pinchStartX + (nextMidX - state.pinchStartMidX);
      state.y = state.pinchStartY + (nextMidY - state.pinchStartMidY);
      canvas.classList.remove('is-dragging');
      update();
      return;
    }

    if (state.dragPointerId !== event.pointerId || state.zoom <= 1) return;
    state.x = state.originX + (event.clientX - state.startX);
    state.y = state.originY + (event.clientY - state.startY);
    canvas.classList.add('is-dragging');
    update();
  };

  const onPointerUp = (event) => {
    state.pointers.delete(event.pointerId);

    if (stage.hasPointerCapture(event.pointerId)) {
      stage.releasePointerCapture(event.pointerId);
    }

    if (state.pointers.size === 1) {
      const [pointerId, pointer] = [...state.pointers.entries()][0];
      state.dragPointerId = pointerId;
      state.startX = pointer.x;
      state.startY = pointer.y;
      state.originX = state.x;
      state.originY = state.y;
      if (state.zoom > 1) {
        canvas.classList.add('is-dragging');
      }
      return;
    }

    state.dragPointerId = null;
    canvas.classList.remove('is-dragging');
  };

  const onWheel = (event) => {
    event.preventDefault();
    const delta = event.deltaY < 0 ? 0.2 : -0.2;
    setZoom(state.zoom + delta);
  };

  const onResize = () => resizeCanvas();

  stage.addEventListener('pointerdown', onPointerDown);
  stage.addEventListener('pointermove', onPointerMove);
  stage.addEventListener('pointerup', onPointerUp);
  stage.addEventListener('pointercancel', onPointerUp);
  stage.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('resize', onResize);

  source.addEventListener('load', () => {
    state.imageReady = true;
    state.zoom = 1;
    state.x = 0;
    state.y = 0;
    resizeCanvas();
  }, { once: true });
  source.src = canvas.dataset.src;

  cleanupMobileViewer = () => {
    window.removeEventListener('resize', onResize);
  };
}

async function renderMobilePdf(href) {
  const renderToken = ++mobileViewerRenderToken;

  if (!window.pdfjsLib) {
    mobileViewerBody.innerHTML = `<div class="mobile-viewer-empty">
      <p>PDF rendering is unavailable in this browser.</p>
      <p>Use the Open button above to view the file directly.</p>
    </div>`;
    return;
  }

  mobileViewerBody.innerHTML = `<div class="mobile-viewer-loading">
    <p>Loading document pages...</p>
  </div>`;

  try {
    const loadingTask = window.pdfjsLib.getDocument({ url: href, isEvalSupported: false });
    const pdf = await loadingTask.promise;
    if (renderToken !== mobileViewerRenderToken) return;
    const stack = document.createElement('div');
    stack.className = 'mobile-doc-stack';

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      if (renderToken !== mobileViewerRenderToken) return;
      const container = document.createElement('div');
      container.className = 'mobile-doc-page';

      const label = document.createElement('div');
      label.className = 'mobile-doc-page-label';
      label.textContent = `Page ${pageNumber}`;

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const viewport = page.getViewport({ scale: 1 });
      const availableWidth = Math.max(280, mobileViewerBody.clientWidth - 32);
      const scale = availableWidth / viewport.width;
      const scaledViewport = page.getViewport({ scale });
      const outputScale = Math.min(3, Math.max(window.devicePixelRatio || 1, 1) * 1.5);

      canvas.width = Math.floor(scaledViewport.width * outputScale);
      canvas.height = Math.floor(scaledViewport.height * outputScale);
      canvas.style.width = `${Math.floor(scaledViewport.width)}px`;
      canvas.style.height = `${Math.floor(scaledViewport.height)}px`;

      container.appendChild(label);
      container.appendChild(canvas);
      stack.appendChild(container);

      await page.render({
        canvas,
        canvasContext: context,
        viewport: scaledViewport,
        transform: [outputScale, 0, 0, outputScale, 0, 0],
      }).promise;
      if (renderToken !== mobileViewerRenderToken) return;
    }

    mobileViewerBody.innerHTML = '';
    mobileViewerBody.appendChild(stack);
    cleanupMobileViewer = () => {
      mobileViewerBody.innerHTML = '';
    };
  } catch (error) {
    if (renderToken !== mobileViewerRenderToken) return;
    mobileViewerBody.innerHTML = `<div class="mobile-viewer-empty">
      <p>Could not render this document.</p>
      <p>Use the Open button above to view it directly.</p>
    </div>`;
    console.error(error);
  }
}

function openMobileViewer(href, label) {
  if (cleanupMobileViewer) {
    cleanupMobileViewer();
    cleanupMobileViewer = null;
  }

  mobileViewerBody.scrollTop = 0;
  const ext = getFileExtension(href);
  mobileViewerFilename.textContent = label;
  mobileViewerType.textContent = getViewerTypeLabel(ext);
  mobileViewerOpen.href = href;
  mobileViewerDownload.href = href;
  mobileViewerDownload.download = href.split('/').pop();

  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) {
    mobileViewerBody.innerHTML = `
      <div class="mobile-image-stage">
        <div class="mobile-image-canvas">
          <canvas class="mobile-zoom-canvas" data-src="${href}" aria-label="${label}"></canvas>
        </div>
        <div class="mobile-image-hint">
          <i data-lucide="move"></i>
          <span>Pinch with two fingers to zoom. Drag after zooming to move around.</span>
        </div>
      </div>`;
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    setupMobileImageViewer();
  } else if (ext === 'pdf') {
    renderMobilePdf(href);
  } else {
    mobileViewerBody.innerHTML = `<div class="mobile-viewer-empty">
      <p>Preview not available for this file type.</p>
      <p>Use Open or Download to continue.</p>
    </div>`;
  }

  mobileViewerOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeViewer() {
  if (!viewerOverlay.classList.contains('active')) return false;
  if (cleanupViewer) {
    cleanupViewer();
    cleanupViewer = null;
  }
  viewerOverlay.classList.remove('active');
  viewerBody.innerHTML = '';
  return true;
}

function closeMobileViewer() {
  if (!mobileViewerOverlay.classList.contains('active')) return false;
  mobileViewerRenderToken += 1;
  if (cleanupMobileViewer) {
    cleanupMobileViewer();
    cleanupMobileViewer = null;
  }
  mobileViewerOverlay.classList.remove('active');
  mobileViewerBody.innerHTML = '';
  if (!overlay.classList.contains('active')) {
    document.body.style.overflow = '';
  }
  return true;
}

viewerOverlay.querySelector('.viewer-close').addEventListener('click', closeViewer);
viewerOverlay.addEventListener('click', e => { if (e.target === viewerOverlay) closeViewer(); });
mobileViewerOverlay.querySelector('.mobile-viewer-close').addEventListener('click', closeMobileViewer);
mobileViewerOverlay.addEventListener('click', e => { if (e.target === mobileViewerOverlay) closeMobileViewer(); });

// ===========================
// Init
// ===========================
renderFilters();
renderCards();

// Initialize Lucide icons (static + dynamically rendered)
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}
