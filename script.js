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
// Project Data
// ===========================
const projects = [
  {
    title: 'Four-Stock Portfolio Optimization & Efficient Frontier Modeling',
    course: 'Investment Analysis · BUS 350',
    date: 'Dec 2025',
    summary: 'Mean-variance optimization with 4×4 covariance matrix and efficient frontier modeling in Excel.',
    image: 'images/4 Stock Portfolio (Visual Only).png',
    imageBg: 'linear-gradient(135deg,#1a3a5c,#0d5c4a)',
    emoji: '📈',
    skills: ['Portfolio Management', 'Risk Analysis', 'Financial Analysis'],
    bullets: [
      'Constructed a four-asset equity portfolio using mean–variance optimization and log returns',
      'Built a 4×4 covariance matrix and calculated portfolio variance using matrix multiplication (MMULT) in Excel',
      'Modeled constrained vs. unconstrained portfolios to illustrate how short-selling expands the feasible investment set',
    ],
    attachments: [
      { label: 'View Chart', icon: '📈', href: 'images/4 Stock Portfolio (Visual Only).png' },
    ],
  },
  {
    title: 'Two-Stock Portfolio Risk & Return Analysis',
    course: 'Investment Analysis · BUS 350',
    date: 'Oct 2025',
    summary: 'Markowitz efficient frontier using Bloomberg Terminal data — optimal 80/20 allocation at 0.95% return & 8% risk.',
    image: 'images/Two-Stock Portfolio Risk & Return Analysis.png',
    imageBg: 'linear-gradient(135deg,#0d3a4a,#1a3a5c)',
    emoji: '📊',
    skills: ['Bloomberg Terminal', 'Portfolio Management', 'Excel'],
    bullets: [
      'Built a two-stock portfolio (Trimble Inc. & Fortive Corp.) using Bloomberg Terminal data and Excel to calculate log returns, variances, and portfolio weights (–50% to 150%) along the Markowitz Efficient Frontier',
      'Identified an optimal 80/20 allocation achieving a 0.95% monthly return at 8% risk, maximizing return-to-risk efficiency',
    ],
    attachments: [
      { label: 'View Chart', icon: '📈', href: 'images/Two-Stock Portfolio Risk & Return Analysis.png' },
    ],
  },
  {
    title: 'Equity Portfolio Construction & Risk Analysis',
    course: 'MarketWatch Competition · BUS 350',
    date: 'Fall 2025',
    summary: '$1M simulated portfolio — +2.16% return and top-20 leaderboard finish selecting Apple, Costco, Nvidia & IVV.',
    image: 'images/stock/marketwatch.jpg',
    imageBg: 'linear-gradient(135deg,#1a3a5c,#0d5c4a)',
    stat: '+2.16%', statLabel: 'Simulated Portfolio Return',
    skills: ['Risk Analysis', 'CAPM', 'Excel'],
    bullets: [
      'Managed a $1,000,000 simulated equity portfolio focused on diversification and risk-adjusted returns',
      'Calculated volatility, beta, Sharpe ratio, Sortino ratio, CAPM expected return, and alpha in Excel',
      'Selected Apple, Costco, Nvidia, and IVV based on correlation & portfolio balance — finishing +2.16% with a top-20 leaderboard ranking',
    ],
    attachments: [
      { label: 'Trading Report (.pdf)', icon: '📄', href: 'docs/Trading_Competition_Report_Intiseier_Iqbal.pdf' },
    ],
  },
  {
    title: 'UPS SWOT & Takeover LBO Analysis',
    course: 'Intermediate Finance · BUS 341',
    date: 'May 2025',
    summary: '10-page LBO evaluation with 2.3× MoM and ~18% IRR under a 60/40 debt-equity structure.',
    image: 'images/stock/ups-shipping.jpg',
    imageBg: 'linear-gradient(135deg,#1e3050,#0d2a45)',
    stat: '~18%', statLabel: 'IRR · 2.3× MoM',
    skills: ['SWOT Analysis', 'Bloomberg Terminal', 'Financial Analysis'],
    bullets: [
      "Assessed UPS's industry positioning, strategy, and growth levers using McKinsey reports, 10-K/10-Q filings, and Bloomberg data",
      'Performed five-year financial analysis, DuPont ROE decomposition, and WACC validation (7.58%)',
      'Conducted relative valuation using EBITDA multiples vs. FedEx, DHL, and DSV',
      'Modeled LBO projections assuming 60/40 debt-equity mix, calculating 2.3× MoM and ~18% IRR under base case',
      'Created a 2×2 IRR sensitivity matrix to evaluate risk-return tradeoffs across margin and multiple scenarios',
    ],
    attachments: [
      { label: 'UPS Analysis (.pdf)', icon: '📄', href: 'docs/UPS SWOT & Takeover LBO Analysis - Intiseier Iqbal.pdf' },
    ],
  },
  {
    title: 'WACC & Capital Structure Analysis',
    course: 'Intermediate Finance · BUS 341',
    date: 'May 2025',
    summary: 'WACC computed for 4 firms using Bloomberg Terminal, with 3D capital structure visualizations in Excel.',
    image: 'images/WACC Assignment PNG (Visual Only).jpeg',
    imageBg: 'linear-gradient(135deg,#1a2a4a,#0d3a5c)',
    emoji: '📊',
    skills: ['Excel', 'Bloomberg Terminal', 'Financial Reporting'],
    bullets: [
      'Used Excel to compute capital structure weights and after-tax costs of capital for equity, debt, and preferred stock',
      "Selected peer firms from Bloomberg's industry classification and compiled comparative WACC data",
      'Visualized capital structure breakdowns with 3D pie charts and produced a clean, professional spreadsheet output',
      'Demonstrated Bloomberg Terminal proficiency and Excel financial modeling, including data validation and formula-based automation',
    ],
    attachments: [
      { label: 'View Spreadsheet', icon: '📈', href: 'images/WACC Assignment PNG (Visual Only).jpeg' },
    ],
  },
  {
    title: 'BeneFIT Medical Apparel Strategic Marketing Plan',
    course: 'Marketing',
    date: 'May 2025',
    summary: 'Full-service marketing plan with SWOT analysis, pricing strategy, and an $80 bundle model for medical apparel.',
    image: 'images/stock/StockCake-Diverse_Healthcare_Team-1048822-medium.jpg',
    imageBg: 'linear-gradient(135deg,#3a1a5c,#5c1a3a)',
    stat: '$80', statLabel: 'Bundle Pricing Model',
    skills: ['Marketing Strategy', 'Market Research', 'Product Marketing'],
    bullets: [
      'Developed a full-service marketing plan introducing compression socks and ergonomic insoles to complement existing scrubs',
      'Conducted SWOT analysis, positioning statement creation, pricing strategy, and promotional planning across digital and physical channels',
      'Delivered a PowerPoint presentation with strategic recommendations to faculty and peers, supported by branding mockups and data-backed goals',
      'Proposed direct-to-consumer and wholesale distribution methods, loyalty incentives, and survey-driven customer response assessments',
      'Contributed to case report writing, market research, and bundle pricing model ($80 for scrubs + accessories), aligning with brand identity and financial targets',
    ],
    attachments: [
      { label: 'Marketing Plan Report (.pdf)', icon: '📄', href: 'docs/BeneFIT Medical Apparel Strategic Marketing Plan Report.pdf' },
      { label: 'Presentation (.pdf)', icon: '📊', href: 'docs/BeneFIT Medical Apparel Marketing Plan Presentation.pdf' },
    ],
  },
  {
    title: 'Current Population Survey (CPS) Wage Analysis',
    course: 'Econometrics',
    date: 'Dec 2024',
    summary: 'Heteroskedasticity-robust regression on gender, race, education, and marital status effects on log wages using R.',
    image: 'images/stock/data-analytics.jpg',
    imageBg: 'linear-gradient(135deg,#1a4a2a,#0d3a4a)',
    stat: 'OLS', statLabel: 'Robust Regression · R Studio',
    skills: ['R Programming', 'Econometrics', 'Statistical Modeling'],
    bullets: [
      'Cleaned and processed CPS data in R Studio, handling missing values, recoding categorical variables, and generating indicator variables for demographic characteristics',
      'Performed heteroskedasticity-robust regression analysis to estimate the effects of gender, race, marital status, and education on log wages, interpreting statistical significance and economic implications',
      'Applied data visualization techniques and summary statistics to present findings effectively in tables and charts',
      'Delivered a well-structured report with regression outputs, interpretations, and policy insights, showcasing analytical skills in econometrics',
    ],
    attachments: [
      { label: 'Full Report (.pdf)', icon: '📄', href: 'docs/CPS Wage Analysis Econometrics Project - R Studio.pdf' },
    ],
  },
  {
    title: 'Great American Cars Inc. Manufacturing Relocation Report',
    course: 'Strategic Consulting',
    date: 'Dec 2024',
    summary: "15+ page consulting report analyzing South Carolina's business environment for a simulated manufacturing relocation decision.",
    image: 'images/stock/ChatGPT Image Mar 9, 2026, 11_39_13 PM.png',
    imageBg: 'linear-gradient(135deg,#2a1a1a,#4a2a0d)',
    stat: '15+', statLabel: 'Page Consulting Report',
    skills: ['Strategic Consulting', 'Data Analysis', 'Research'],
    bullets: [
      "Acted as a business consultant analyzing South Carolina's business environment, including government policies, tax structures, economic trends, and competitive landscape",
      'Conducted research using U.S. Bureau of Labor Statistics, South Carolina Department of Commerce, and regional economic studies to assess cost benefits and operational feasibility',
      'Produced a 15+ page consulting report with executive summary, SWOT analysis, tax comparisons, labor force evaluations, and relocation incentives',
      'Designed and integrated visual data representations (charts, tables, figures) to illustrate state GDP trends, unemployment rates, and corporate tax advantages',
      'Presented key findings in a structured executive report, demonstrating professional business writing, analytical thinking, and strategic communication skills',
    ],
    attachments: [
      { label: 'Title Page', icon: '📄', href: 'docs/Great American Cars Manufacturing Relocation Report - Title Page.pdf' },
      { label: 'Executive Summary', icon: '📄', href: 'docs/Great American Cars Manufacturing Relocation Report - Executive Summary.pdf' },
      { label: 'Full Report', icon: '📄', href: 'docs/Great American Cars Manufacturing Relocation Consulting Report.pdf' },
    ],
  },
  {
    title: 'Globalization of Chile Research Project',
    course: 'Economics',
    date: 'Apr 2024',
    summary: "15-page research paper on Chile's economic development, globalization impacts, and key policy trends.",
    image: 'images/stock/chile-landscape.jpg',
    imageBg: 'linear-gradient(135deg,#1a2a4a,#0d3a2a)',
    stat: '15', statLabel: 'Page Research Paper',
    skills: ['Academic Research', 'Excel', 'Presentations'],
    bullets: [
      'Conducted comprehensive data collection and analysis using various reliable sources and college databases',
      'Utilized Microsoft Excel and statistical software to create detailed graphs and tables',
      "Prepared a 15-page research paper answering critical questions on Chile's economic development",
      'Delivered findings through a PowerPoint presentation highlighting significant trends and policy impacts',
    ],
    attachments: [
      { label: 'Full Paper (.pdf)', icon: '📄', href: 'docs/Globalization of Chile Economic Analysis Research Paper.pdf' },
    ],
  },
  {
    title: 'Nvidia Shares Investment Analysis Excel Project',
    course: 'Finance · Excel',
    date: 'Apr 2024',
    summary: 'Team-led financial analysis of Nvidia FY2023 using advanced Excel — VLOOKUP, VBA, Solver, pivot tables, and dashboards.',
    image: 'images/stock/nvidia-gpu.jpg',
    imageBg: 'linear-gradient(135deg,#1a2a1a,#2a4a0d)',
    stat: 'FY23', statLabel: 'Nvidia Investment Analysis',
    skills: ['Excel / VBA', 'Pivot Tables', 'Financial Analysis'],
    bullets: [
      'Led a team of 4 to complete a comprehensive financial analysis of Nvidia Corporation for fiscal year 2023',
      'Utilized advanced Excel functions for data manipulation and financial metrics evaluation, including summary statistics, financial metrics, and date/time functions',
      'Developed an investment system based on historical data, tested its effectiveness, and demonstrated its relevance through detailed reports and dashboards',
      'Applied Excel tools: VLOOKUP, INDEX/MATCH, VBA, conditional formatting, nested IFs, data validation, array formulas, Solver, and pivot tables',
      'Implemented findings in a detailed, visually appealing report to aid investor decision-making',
    ],
    attachments: [
      { label: 'Project PDF', icon: '📄', href: 'docs/Nvidia Shares Investment Analysis Excel Project (Photo PDF).pdf' },
    ],
  },
];

// ===========================
// Render Project Cards
// ===========================
function renderCards() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = projects.map((p, i) => {
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

  if (p.attachments.length) {
    modalAttach.innerHTML = `<span class="modal-attachments-label">Attachments</span>` +
      p.attachments.map(a => `<button class="attach-link" data-href="${a.href}" data-label="${a.label}">${a.icon} ${a.label}</button>`).join('');
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

if (window.pdfjsLib) {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

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
    const loadingTask = window.pdfjsLib.getDocument(href);
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
renderCards();

// Initialize Lucide icons (static + dynamically rendered)
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}
