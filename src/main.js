import './style.css';
import { 
  createIcons, 
  BookOpen,
  ExternalLink,
  Layers,
  GraduationCap,
  Calculator,
  Clock,
  UserCheck,
  ShieldCheck,
  Compass,
  Activity,
  FileText,
  ArrowRight,
  Headphones,
  CheckCircle2,
  Mail,
  Send,
  X,
  Star,
  Quote,
  Sigma
} from 'lucide';

// Web3Forms Access Key (Get a free key from https://web3forms.com)
const WEB3FORMS_ACCESS_KEY = 'c0624b50-dd2b-4c85-8b49-f9bf8f22bc73';

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  createIcons({
    icons: {
      BookOpen,
      ExternalLink,
      Layers,
      GraduationCap,
      Calculator,
      Clock,
      UserCheck,
      ShieldCheck,
      Compass,
      Activity,
      FileText,
      ArrowRight,
      Headphones,
      CheckCircle2,
      Mail,
      Send,
      X,
      Star,
      Quote,
      Sigma
    }
  });

  // 2. Native Scroll Reveal using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once revealed to keep state and performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px' // Trigger slightly before element enters viewport fully
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 3. Navbar scroll class toggle (Native)
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // 4. Active Nav link highlighting on scroll (Native)
  const navLinks = document.querySelectorAll('.nav-link');
  const sectionsList = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120; // offset for nav height

    sectionsList.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // 5. Mobile Hamburger Navigation Logic (Native)
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-link, .btn-mobile-nav');

  if (menuToggle && mobileNav) {
    const toggleMenu = () => {
      menuToggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    };

    menuToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // 6. Floating WhatsApp Tooltip Auto-show
  const floatingWhatsapp = document.getElementById('floating-whatsapp');
  if (floatingWhatsapp) {
    setTimeout(() => {
      const tooltip = floatingWhatsapp.querySelector('.whatsapp-tooltip');
      if (tooltip) {
        tooltip.classList.add('visible');
        setTimeout(() => {
          tooltip.classList.remove('visible');
        }, 5000);
      }
    }, 4000);
  }

  // 9. Testimonials Auto-scroll Carousel (Native)
  const scrollContainer = document.querySelector('.testimonials-container-scroll');
  if (scrollContainer) {
    let autoScrollInterval;
    
    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        const firstCard = scrollContainer.querySelector('.testimonial-card');
        if (!firstCard) return;
        
        const gap = window.innerWidth <= 768 ? 20 : 30;
        const cardWidth = firstCard.offsetWidth + gap;
        const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        
        if (scrollContainer.scrollLeft >= maxScrollLeft - 15) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }, 3500);
    };

    const stopAutoScroll = () => {
      clearInterval(autoScrollInterval);
    };

    startAutoScroll();

    scrollContainer.addEventListener('mouseenter', stopAutoScroll);
    scrollContainer.addEventListener('mouseleave', startAutoScroll);
    scrollContainer.addEventListener('touchstart', stopAutoScroll, { passive: true });
    scrollContainer.addEventListener('touchend', startAutoScroll, { passive: true });
  }

  // 10. Hero Interactive Mouse Parallax Effect (Wow Factor)
  const hero = document.getElementById('hero');
  const layeredWrapper = document.querySelector('.hero-image-wrapper-layered');
  const widgetWrappers = document.querySelectorAll('.glass-widget-wrapper');
  const symbols = document.querySelectorAll('.floating-symbol');

  if (hero && layeredWrapper) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // 1. Move the image frame slightly
      layeredWrapper.style.transform = `translate(${x * 0.015}px, ${y * 0.015}px)`;

      // 2. Translate widgets in parallax at faster speeds to give high 3D perspective
      widgetWrappers.forEach((wrapper, index) => {
        const factor = (index + 1) * 0.035;
        wrapper.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });

      // 3. Translate background symbols in opposite direction
      symbols.forEach((symbol, index) => {
        const factor = ((index % 3) + 1) * 0.03;
        symbol.style.transform = `translate(${-x * factor}px, ${-y * factor}px)`;
      });
    }, { passive: true });

    // Reset offsets when mouse leaves the hero container
    hero.addEventListener('mouseleave', () => {
      layeredWrapper.style.transform = 'translate(0, 0)';
      widgetWrappers.forEach((wrapper) => {
        wrapper.style.transform = 'translate(0, 0)';
      });
      symbols.forEach((symbol) => {
        symbol.style.transform = 'translate(0, 0)';
      });
    });
  }

  // --- Initialize Custom Hero Interactive Features ---
  initMathParticles();
  initSubjectRotator();
  initSandboxCard();
  initGrapher();
  initSolverConsole();
  initGeometry();
});

// ==========================================
//   HERO DYNAMIC INTERACTIVE ENGINE CODE
// ==========================================

// 1. Math Canvas Particle & Constellation Background
function initMathParticles() {
  const canvas = document.getElementById('math-particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;
  
  const formulas = [
    '∫ dy/dx', '√x', 'π', 'x² + y² = r²', 'dy/dx', '∑ x_i', '∞', 'λ = c/f', 'sin(θ)',
    'e = mc²', 'f(x)', 'lim x→0', 'dx', 'dy', 'a² + b² = c²', 'log(x)', 'θ', 'e^{iπ} + 1 = 0'
  ];
  
  let particles = [];
  const particleCount = 28;
  
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.text = formulas[Math.floor(Math.random() * formulas.length)];
      this.fontSize = Math.floor(Math.random() * 5) + 12; // 12px to 17px
      this.opacity = Math.random() * 0.35 + 0.15; // 0.15 to 0.50
    }
    
    update(mouseX, mouseY) {
      this.x += this.vx;
      this.y += this.vy;
      
      // Wrap around screen boundaries
      if (this.x < -50) this.x = width + 50;
      if (this.x > width + 50) this.x = -50;
      if (this.y < -50) this.y = height + 50;
      if (this.y > height + 50) this.y = -50;
      
      // Repulsion force from mouse cursor
      if (mouseX !== undefined && mouseY !== undefined) {
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const force = (130 - dist) / 130;
          this.x += (dx / dist) * force * 1.6;
          this.y += (dy / dist) * force * 1.6;
        }
      }
    }
    
    draw() {
      ctx.font = `italic 500 ${this.fontSize}px 'Cambria', 'Georgia', serif`;
      ctx.fillStyle = `rgba(12, 35, 64, ${this.opacity})`;
      ctx.fillText(this.text, this.x, this.y);
    }
  }
  
  function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  let mouseX = undefined;
  let mouseY = undefined;
  
  const hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }, { passive: true });
    
    hero.addEventListener('mouseleave', () => {
      mouseX = undefined;
      mouseY = undefined;
    });
  }
  
  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    init();
  });
  
  init();
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw constellation lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          const alpha = ((100 - dist) / 100) * 0.05;
          ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y - 5);
          ctx.lineTo(p2.x, p2.y - 5);
          ctx.stroke();
        }
      }
      
      // Draw cursor connections
      if (mouseX !== undefined && mouseY !== undefined) {
        const p = particles[i];
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const alpha = ((130 - dist) / 130) * 0.06;
          ctx.strokeStyle = `rgba(29, 191, 115, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - 5);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      }
    }
    
    particles.forEach(p => {
      p.update(mouseX, mouseY);
      p.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// 2. Typewriter Math Subject Rotator
function initSubjectRotator() {
  const element = document.getElementById('typed-math-subject');
  if (!element) return;
  
  const subjects = [
    'High School Mathematics',
    'College Mathematics',
    'Calculus',
    'Linear Algebra',
    'Differential Equations',
    'Discrete Mathematics',
    'Probability & Statistics'
  ];
  
  let subjectIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 100;
  
  function type() {
    const currentWord = subjects[subjectIdx];
    
    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
      delay = 50;
    } else {
      element.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
      delay = 120;
    }
    
    if (!isDeleting && charIdx === currentWord.length) {
      isDeleting = true;
      delay = 2200; // pause at the end of the word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      subjectIdx = (subjectIdx + 1) % subjects.length;
      delay = 600; // pause before starting next word
    }
    
    setTimeout(type, delay);
  }
  
  type();
}

// 3. Flipper Card & Sandbox Dashboard Tabs Controller
let triggerActiveTabInit;
function initSandboxCard() {
  const toggleBtn = document.getElementById('toggle-sandbox-btn');
  const flipCard = document.querySelector('.hero-flip-card');
  const toggleText = toggleBtn ? toggleBtn.querySelector('.toggle-text') : null;
  
  if (!toggleBtn || !flipCard) return;
  
  let isSandboxActive = false;
  
  toggleBtn.addEventListener('click', () => {
    flipCard.classList.toggle('flipped');
    isSandboxActive = flipCard.classList.contains('flipped');
    
    if (isSandboxActive) {
      if (toggleText) toggleText.textContent = 'View Profile Photo';
      setTimeout(() => {
        triggerActiveTabInit();
      }, 350); // wait for 3D flip animation
    } else {
      if (toggleText) toggleText.textContent = 'Try Interactive Sandbox';
    }
  });
  
  // Tab Swapper logic
  const tabButtons = document.querySelectorAll('.lab-tab-btn');
  const tabPanels = document.querySelectorAll('.lab-tab-panel');
  
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const targetPanel = document.getElementById(`panel-${tabName}`);
      if (targetPanel) targetPanel.classList.add('active');
      
      triggerActiveTabInit();
    });
  });
  
  triggerActiveTabInit = function() {
    const activeTab = document.querySelector('.lab-tab-btn.active');
    if (!activeTab) return;
    const tabName = activeTab.getAttribute('data-tab');
    
    if (tabName === 'grapher') {
      resizeGrapherCanvas();
      drawGraph();
    } else if (tabName === 'geometry') {
      resizeGeometryCanvas();
      draw3DGeometry();
    }
  };
}

// 4. Interactive Grapher Canvas
let grapherCanvas = null;
let grapherCtx = null;
let currentEquation = 'sine';
let graphMouseX = undefined;

function initGrapher() {
  grapherCanvas = document.getElementById('grapher-canvas');
  if (!grapherCanvas) return;
  grapherCtx = grapherCanvas.getContext('2d');
  
  const eqnBtns = document.querySelectorAll('.eqn-btn');
  eqnBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      eqnBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentEquation = btn.getAttribute('data-eqn');
      drawGraph();
    });
  });
  
  grapherCanvas.addEventListener('mousemove', (e) => {
    const rect = grapherCanvas.getBoundingClientRect();
    graphMouseX = e.clientX - rect.left;
    drawGraph();
  }, { passive: true });
  
  grapherCanvas.addEventListener('mouseleave', () => {
    graphMouseX = undefined;
    drawGraph();
  });
}

function resizeGrapherCanvas() {
  if (!grapherCanvas) return;
  grapherCanvas.width = grapherCanvas.offsetWidth;
  grapherCanvas.height = grapherCanvas.offsetHeight;
}

function drawGraph() {
  if (!grapherCanvas || !grapherCtx) return;
  const ctx = grapherCtx;
  const w = grapherCanvas.width;
  const h = grapherCanvas.height;
  
  ctx.clearRect(0, 0, w, h);
  
  const originX = w / 2;
  const originY = h / 2;
  const scaleX = w / 12; // units range from -6 to 6
  const scaleY = h / 6;  // units range from -3 to 3
  
  // Draw grid
  ctx.strokeStyle = 'rgba(29, 78, 216, 0.08)';
  ctx.lineWidth = 0.8;
  
  for (let x = -6; x <= 6; x++) {
    const px = originX + x * scaleX;
    ctx.beginPath();
    ctx.moveTo(px, 0);
    ctx.lineTo(px, h);
    ctx.stroke();
  }
  for (let y = -3; y <= 3; y++) {
    const py = originY - y * scaleY;
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(w, py);
    ctx.stroke();
  }
  
  // Draw primary axes
  ctx.strokeStyle = 'rgba(37, 99, 235, 0.25)';
  ctx.lineWidth = 1.5;
  
  ctx.beginPath();
  ctx.moveTo(0, originY);
  ctx.lineTo(w, originY);
  ctx.moveTo(originX, 0);
  ctx.lineTo(originX, h);
  ctx.stroke();
  
  // Math functions
  function evaluateY(x) {
    if (currentEquation === 'sine') {
      return Math.sin(x);
    } else if (currentEquation === 'quadratic') {
      return 0.4 * x * x - 1.8;
    } else if (currentEquation === 'wave') {
      return Math.cos(2.2 * x) * Math.exp(-0.25 * x);
    }
    return 0;
  }
  
  function evaluateDerivative(x) {
    if (currentEquation === 'sine') {
      return Math.cos(x);
    } else if (currentEquation === 'quadratic') {
      return 0.8 * x;
    } else if (currentEquation === 'wave') {
      const e = Math.exp(-0.25 * x);
      return -2.2 * Math.sin(2.2 * x) * e - 0.25 * Math.cos(2.2 * x) * e;
    }
    return 0;
  }
  
  // Plot curve
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  
  let started = false;
  for (let px = 0; px < w; px++) {
    const x = (px - originX) / scaleX;
    const y = evaluateY(x);
    const py = originY - y * scaleY;
    
    if (py >= 0 && py <= h) {
      if (!started) {
        ctx.moveTo(px, py);
        started = true;
      } else {
        ctx.lineTo(px, py);
      }
    }
  }
  ctx.stroke();
  
  // Coordinates tooltip tracking
  const coordsDisplay = document.getElementById('grapher-coords');
  const slopeDisplay = document.getElementById('grapher-slope');
  
  if (graphMouseX !== undefined && coordsDisplay && slopeDisplay) {
    const xVal = (graphMouseX - originX) / scaleX;
    const yVal = evaluateY(xVal);
    const slopeVal = evaluateDerivative(xVal);
    
    coordsDisplay.textContent = `x: ${xVal.toFixed(2)}, y: ${yVal.toFixed(2)}`;
    slopeDisplay.textContent = `dy/dx: ${slopeVal.toFixed(2)}`;
    
    const py = originY - yVal * scaleY;
    
    // Draw target point
    ctx.fillStyle = '#1dbf73';
    ctx.beginPath();
    ctx.arc(graphMouseX, py, 6, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw tangent line
    ctx.strokeStyle = '#1dbf73';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    
    const len = 1.5;
    const x1 = xVal - len;
    const x2 = xVal + len;
    const y1 = slopeVal * (x1 - xVal) + yVal;
    const y2 = slopeVal * (x2 - xVal) + yVal;
    
    ctx.moveTo(originX + x1 * scaleX, originY - y1 * scaleY);
    ctx.lineTo(originX + x2 * scaleX, originY - y2 * scaleY);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

// 5. Steps Solve Typewriter Console
function initSolverConsole() {
  const runBtn = document.getElementById('run-solver-btn');
  const body = document.getElementById('solver-console-body');
  if (!runBtn || !body) return;
  
  const formulasDb = [
    {
      input: 'solve ∫ 2x * cos(x) dx',
      steps: [
        'Analyzing integration task: ∫ 2x * cos(x) dx',
        'Applying Integration by Parts method:',
        '  ∫ u dv = u*v - ∫ v du',
        'Let u = 2x  =>  du = 2 dx',
        'Let dv = cos(x) dx  =>  v = sin(x)',
        'Substitute into Parts formula:',
        '  ∫ 2x cos(x) dx = 2x*sin(x) - ∫ 2*sin(x) dx',
        'Evaluate remaining integral ∫ 2*sin(x) dx:',
        '  ∫ 2*sin(x) dx = -2*cos(x)',
        'Compile solved expression (with constant C):'
      ],
      output: 'Output: 2x*sin(x) + 2*cos(x) + C ✓'
    },
    {
      input: 'solve lim(x->0) (1 - cos(x)) / x²',
      steps: [
        'Evaluating limit: lim(x->0) [ (1 - cos(x)) / x² ]',
        'Substitute x = 0: (1 - cos(0)) / 0² = (1 - 1) / 0 = 0/0\n  Detected Indeterminate form (0/0).',
        'Applying L\'Hôpital\'s Rule (differentiate top & bottom):',
        '  d/dx [1 - cos(x)] = sin(x)',
        '  d/dx [x²] = 2x',
        'New limit expression: lim(x->0) [ sin(x) / 2x ]',
        'Substitute x = 0: sin(0) / 0 = 0/0 (Still indeterminate)',
        'Applying L\'Hôpital\'s Rule a second time:',
        '  d/dx [sin(x)] = cos(x)',
        '  d/dx [2x] = 2',
        'New limit expression: lim(x->0) [ cos(x) / 2 ]',
        'Evaluate limit: cos(0) / 2 = 1/2'
      ],
      output: 'Output: 0.5000 ✓'
    },
    {
      input: 'solve x² - 6x + 8 = 0',
      steps: [
        'Solving quadratic: x² - 6x + 8 = 0',
        'Using coefficients: a = 1, b = -6, c = 8',
        'Calculate discriminant: D = b² - 4ac',
        '  D = (-6)² - 4(1)(8) = 36 - 32 = 4',
        'Discriminant > 0, calculate real roots:',
        '  x = (-b ± √D) / 2a',
        'Substitute values into quadratic formula:',
        '  x = (6 ± √4) / 2  =>  x = (6 ± 2) / 2',
        'Compute roots:\n  Root 1: (6 + 2)/2 = 4\n  Root 2: (6 - 2)/2 = 2'
      ],
      output: 'Output: x = 2, x = 4 ✓'
    }
  ];
  
  let currentIdx = 0;
  let isSolving = false;
  
  runBtn.addEventListener('click', () => {
    if (isSolving) return;
    isSolving = true;
    
    const origHtml = runBtn.innerHTML;
    runBtn.disabled = true;
    runBtn.innerHTML = `<i data-lucide="loader"></i> <span>Calculating...</span>`;
    
    // update icons in case lucide needs to reload it
    if (window.lucide) {
      window.lucide.createIcons();
    }
    
    const prob = formulasDb[currentIdx];
    currentIdx = (currentIdx + 1) % formulasDb.length;
    
    body.innerHTML = '';
    
    const inputDiv = document.createElement('div');
    inputDiv.className = 'console-line line-input';
    inputDiv.textContent = `> ${prob.input}`;
    body.appendChild(inputDiv);
    
    let stepIdx = 0;
    
    function writeNextStep() {
      if (stepIdx < prob.steps.length) {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'console-line line-step';
        body.appendChild(stepDiv);
        
        let charIdx = 0;
        const text = prob.steps[stepIdx];
        
        function typeChar() {
          if (charIdx < text.length) {
            stepDiv.textContent += text[charIdx];
            charIdx++;
            body.scrollTop = body.scrollHeight;
            setTimeout(typeChar, 12);
          } else {
            stepIdx++;
            setTimeout(writeNextStep, 450);
          }
        }
        typeChar();
      } else {
        setTimeout(() => {
          const outputDiv = document.createElement('div');
          outputDiv.className = 'console-line line-success';
          outputDiv.textContent = `> ${prob.output}`;
          body.appendChild(outputDiv);
          body.scrollTop = body.scrollHeight;
          
          isSolving = false;
          runBtn.disabled = false;
          runBtn.innerHTML = origHtml;
        }, 200);
      }
    }
    
    setTimeout(writeNextStep, 500);
  });
}

// 6. Interactive 3D Wireframe Geometry Render (Torus Ring)
let geomCanvas = null;
let geomCtx = null;
let geomPoints = [];
let geomEdges = [];
let geomAngleX = 0.55;
let geomAngleY = 0.65;
let isGeomDragging = false;
let geomLastMouseX, geomLastMouseY;

function initGeometry() {
  geomCanvas = document.getElementById('geometry-canvas');
  if (!geomCanvas) return;
  geomCtx = geomCanvas.getContext('2d');
  
  // Parameterize Torus shape vertices
  const R = 3.3; // major radius
  const r = 1.1; // minor radius (tube thickness)
  const thetaSteps = 8;
  const phiSteps = 16;
  
  geomPoints = [];
  geomEdges = [];
  
  // Vertices
  for (let i = 0; i < phiSteps; i++) {
    const phi = (i / phiSteps) * Math.PI * 2;
    for (let j = 0; j < thetaSteps; j++) {
      const theta = (j / thetaSteps) * Math.PI * 2;
      
      const x = (R + r * Math.cos(theta)) * Math.cos(phi);
      const y = (R + r * Math.cos(theta)) * Math.sin(phi);
      const z = r * Math.sin(theta);
      
      geomPoints.push({ x, y, z });
    }
  }
  
  // Mesh edges linking points
  for (let i = 0; i < phiSteps; i++) {
    for (let j = 0; j < thetaSteps; j++) {
      const current = i * thetaSteps + j;
      const nextTheta = i * thetaSteps + ((j + 1) % thetaSteps);
      const nextPhi = ((i + 1) % phiSteps) * thetaSteps + j;
      
      geomEdges.push([current, nextTheta]);
      geomEdges.push([current, nextPhi]);
    }
  }
  
  geomCanvas.addEventListener('mousedown', (e) => {
    isGeomDragging = true;
    geomLastMouseX = e.clientX;
    geomLastMouseY = e.clientY;
  });
  
  window.addEventListener('mousemove', (e) => {
    if (!isGeomDragging) return;
    const deltaX = e.clientX - geomLastMouseX;
    const deltaY = e.clientY - geomLastMouseY;
    
    geomAngleY += deltaX * 0.008;
    geomAngleX += deltaY * 0.008;
    
    geomLastMouseX = e.clientX;
    geomLastMouseY = e.clientY;
    
    draw3DGeometry();
  }, { passive: true });
  
  window.addEventListener('mouseup', () => {
    isGeomDragging = false;
  });
  
  // Touch support for mobiles
  geomCanvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isGeomDragging = true;
      geomLastMouseX = e.touches[0].clientX;
      geomLastMouseY = e.touches[0].clientY;
    }
  }, { passive: true });
  
  geomCanvas.addEventListener('touchmove', (e) => {
    if (!isGeomDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - geomLastMouseX;
    const deltaY = e.touches[0].clientY - geomLastMouseY;
    
    geomAngleY += deltaX * 0.008;
    geomAngleX += deltaY * 0.008;
    
    geomLastMouseX = e.touches[0].clientX;
    geomLastMouseY = e.touches[0].clientY;
    
    draw3DGeometry();
  }, { passive: true });
  
  geomCanvas.addEventListener('touchend', () => {
    isGeomDragging = false;
  });
  
  // Auto rotation loop
  function tick() {
    const isPanelActive = document.querySelector('#panel-geometry.active');
    const isFlipped = document.querySelector('.hero-flip-card.flipped');
    
    if (!isGeomDragging && isPanelActive && isFlipped) {
      geomAngleY += 0.004;
      geomAngleX += 0.002;
      draw3DGeometry();
    }
    requestAnimationFrame(tick);
  }
  tick();
}

function resizeGeometryCanvas() {
  if (!geomCanvas) return;
  geomCanvas.width = geomCanvas.offsetWidth;
  geomCanvas.height = geomCanvas.offsetHeight;
}

function draw3DGeometry() {
  if (!geomCanvas || !geomCtx) return;
  const ctx = geomCtx;
  const w = geomCanvas.width;
  const h = geomCanvas.height;
  const originX = w / 2;
  const originY = h / 2;
  const fov = Math.min(w, h) * 0.65;
  
  ctx.clearRect(0, 0, w, h);
  
  const cosX = Math.cos(geomAngleX);
  const sinX = Math.sin(geomAngleX);
  const cosY = Math.cos(geomAngleY);
  const sinY = Math.sin(geomAngleY);
  
  const projected = geomPoints.map(p => {
    // rotation on Y
    let x1 = p.x * cosY - p.z * sinY;
    let z1 = p.x * sinY + p.z * cosY;
    
    // rotation on X
    let y2 = p.y * cosX - z1 * sinX;
    let z2 = p.y * sinX + z1 * cosX;
    
    const cameraDist = 6.0;
    const scale = fov / (z2 + cameraDist);
    
    return {
      x: originX + x1 * scale,
      y: originY - y2 * scale,
      z: z2
    };
  });
  
  ctx.lineWidth = 0.9;
  
  geomEdges.forEach(edge => {
    const p1 = projected[edge[0]];
    const p2 = projected[edge[1]];
    
    // Color depth opacity
    const avgZ = (p1.z + p2.z) / 2;
    const depthRatio = (avgZ + 1.8) / 3.6; // normalized 0 to 1
    const opacity = Math.max(0.15, 0.95 - depthRatio * 0.7);
    
    ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  });
}
