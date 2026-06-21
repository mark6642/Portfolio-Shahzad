import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Initialize all UI and scroll animations
export function initAnimations() {
  // 1. Initial Page Load Animation Sequence
  const loadTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

  // Start by setting initial states
  gsap.set('.navbar', { y: -50, opacity: 0 });
  gsap.set('.hero-badge', { y: 30, opacity: 0 });
  gsap.set('.hero-title', { y: 40, opacity: 0 });
  gsap.set('.hero-desc', { y: 30, opacity: 0 });
  gsap.set('.hero-actions', { y: 30, opacity: 0 });
  gsap.set('.hero-image-container', { x: 50, scale: 0.9, opacity: 0 });
  gsap.set('#webgl-canvas', { opacity: 0 });
  gsap.set('.hero-scroll-indicator', { opacity: 0 });

  loadTl
    .to('#webgl-canvas', { opacity: 1, duration: 2 })
    .to('.navbar', { y: 0, opacity: 1, duration: 1 }, '-=1.2')
    .to('.hero-badge', { y: 0, opacity: 1, duration: 0.8 }, '-=0.8')
    .to('.hero-title', { y: 0, opacity: 1, duration: 1 }, '-=0.7')
    .to('.hero-desc', { y: 0, opacity: 1, duration: 0.8 }, '-=0.7')
    .to('.hero-actions', { y: 0, opacity: 1, duration: 0.8 }, '-=0.7')
    .to('.hero-image-container', { x: 0, scale: 1, opacity: 1, duration: 1.2 }, '-=0.9')
    .to('.hero-scroll-indicator', { opacity: 0.7, duration: 0.8 }, '-=0.5');

  // 2. Scroll Trigger: Section Headers
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    const subtitle = section.querySelector('.section-subtitle');
    const title = section.querySelector('.section-title');
    
    if (subtitle && title) {
      gsap.fromTo([subtitle, title], 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  // 3. Scroll Trigger: About Section Cards
  gsap.fromTo('.bio-card',
    { x: -50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-grid',
        start: 'top 75%'
      }
    }
  );

  gsap.fromTo('.skills-card',
    { x: 50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-grid',
        start: 'top 75%'
      }
    }
  );

  gsap.fromTo('.philosophy-card',
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.philosophy-card',
        start: 'top 85%'
      }
    }
  );

  // 4. Scroll Trigger: Skills Bars Loading
  const skillFills = document.querySelectorAll('.skill-fill');
  skillFills.forEach(fill => {
    const targetWidth = fill.style.width;
    // Set initial width to 0
    gsap.set(fill, { width: '0%' });
    
    gsap.to(fill, {
      width: targetWidth,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.skills-card',
        start: 'top 70%'
      }
    });
  });

  // 5. Scroll Trigger: Projects Grid Cards Stagger Reveal
  gsap.fromTo('.project-card',
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%'
      }
    }
  );

  // 6. Scroll Trigger: Contact Elements Reveal
  gsap.fromTo('.contact-info',
    { x: -40, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-grid',
        start: 'top 80%'
      }
    }
  );

  gsap.fromTo('.contact-form',
    { x: 40, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-grid',
        start: 'top 80%'
      }
    }
  );

  // 7. Navbar scroll class toggle
  ScrollTrigger.create({
    start: 'top -50',
    onUpdate: (self) => {
      const navbar = document.querySelector('.navbar');
      if (self.direction === 1) {
        navbar.classList.add('scrolled');
      } else if (self.scroll() < 50) {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // 8. Active Nav link highlighting on scroll
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
  });

  // 9. Mobile Hamburger Navigation Logic
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
}
