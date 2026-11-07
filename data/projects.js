// ===========================
// PROJECT DATA
// Edit this file to add, remove, or change project cards. No other file needs to change.
//
// Fields:
//   title, course (small tag on the card: course, Forage simulation, or personal project), date, summary
//   category: one of the CATEGORIES below (drives the filter chips)
//   featured: true puts the card first
//   image: card image path (optional). Without one, the card shows imageBg plus stat/statLabel
//   imageBg: CSS gradient behind the image or stat
//   stat / statLabel: big number on cards without an image (optional)
//   emoji: shown in the pop-up header when there is no image (optional)
//   skills: small pills on the card
//   bullets: shown in the pop-up when the card is clicked (HTML allowed, e.g. <strong>)
//   links: external links, opened in a new tab, e.g. { label: 'GitHub', href: 'https://github.com/...' }
//   attachments: files opened in the on-page viewer (PDF or image), e.g. { label: 'Report (.pdf)', icon: '📄', href: 'docs/file.pdf' }
// ===========================

const CATEGORIES = ['Finance & Valuation', 'Data, Analytics & ML', 'Strategy & Research', 'Built with AI'];

const projects = [
  {
    title: 'Four-Stock Portfolio Optimization & Efficient Frontier Modeling',
    course: 'Investment Analysis · BUS 350',
    category: 'Finance & Valuation',
    featured: false,
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
    links: [],
    attachments: [
      { label: 'View Chart', icon: '📈', href: 'images/4 Stock Portfolio (Visual Only).png' },
    ],
  },
  {
    title: 'Two-Stock Portfolio Risk & Return Analysis',
    course: 'Investment Analysis · BUS 350',
    category: 'Finance & Valuation',
    featured: false,
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
    links: [],
    attachments: [
      { label: 'View Chart', icon: '📈', href: 'images/Two-Stock Portfolio Risk & Return Analysis.png' },
    ],
  },
  {
    title: 'Equity Portfolio Construction & Risk Analysis',
    course: 'MarketWatch Competition · BUS 350',
    category: 'Finance & Valuation',
    featured: false,
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
    links: [],
    attachments: [
      { label: 'Trading Report (.pdf)', icon: '📄', href: 'docs/Trading_Competition_Report_Intiseier_Iqbal.pdf' },
    ],
  },
  {
    title: 'UPS SWOT & Takeover LBO Analysis',
    course: 'Intermediate Finance · BUS 341',
    category: 'Finance & Valuation',
    featured: false,
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
    links: [],
    attachments: [
      { label: 'UPS Analysis (.pdf)', icon: '📄', href: 'docs/UPS SWOT & Takeover LBO Analysis - Intiseier Iqbal.pdf' },
    ],
  },
  {
    title: 'WACC & Capital Structure Analysis',
    course: 'Intermediate Finance · BUS 341',
    category: 'Finance & Valuation',
    featured: false,
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
    links: [],
    attachments: [
      { label: 'View Spreadsheet', icon: '📈', href: 'images/WACC Assignment PNG (Visual Only).jpeg' },
    ],
  },
  {
    title: 'BeneFIT Medical Apparel Strategic Marketing Plan',
    course: 'Marketing',
    category: 'Strategy & Research',
    featured: false,
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
    links: [],
    attachments: [
      { label: 'Marketing Plan Report (.pdf)', icon: '📄', href: 'docs/BeneFIT Medical Apparel Strategic Marketing Plan Report.pdf' },
      { label: 'Presentation (.pdf)', icon: '📊', href: 'docs/BeneFIT Medical Apparel Marketing Plan Presentation.pdf' },
    ],
  },
  {
    title: 'Current Population Survey (CPS) Wage Analysis',
    course: 'Econometrics',
    category: 'Data, Analytics & ML',
    featured: false,
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
    links: [],
    attachments: [
      { label: 'Full Report (.pdf)', icon: '📄', href: 'docs/CPS Wage Analysis Econometrics Project - R Studio.pdf' },
    ],
  },
  {
    title: 'Great American Cars Inc. Manufacturing Relocation Report',
    course: 'Strategic Consulting',
    category: 'Strategy & Research',
    featured: false,
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
    links: [],
    attachments: [
      { label: 'Title Page', icon: '📄', href: 'docs/Great American Cars Manufacturing Relocation Report - Title Page.pdf' },
      { label: 'Executive Summary', icon: '📄', href: 'docs/Great American Cars Manufacturing Relocation Report - Executive Summary.pdf' },
      { label: 'Full Report', icon: '📄', href: 'docs/Great American Cars Manufacturing Relocation Consulting Report.pdf' },
    ],
  },
  {
    title: 'Globalization of Chile Research Project',
    course: 'Economics',
    category: 'Strategy & Research',
    featured: false,
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
    links: [],
    attachments: [
      { label: 'Full Paper (.pdf)', icon: '📄', href: 'docs/Globalization of Chile Economic Analysis Research Paper.pdf' },
    ],
  },
  {
    title: 'Nvidia Shares Investment Analysis Excel Project',
    course: 'Finance · Excel',
    category: 'Finance & Valuation',
    featured: false,
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
    links: [],
    attachments: [
      { label: 'Project PDF', icon: '📄', href: 'docs/Nvidia Shares Investment Analysis Excel Project (Photo PDF).pdf' },
    ],
  },
];
