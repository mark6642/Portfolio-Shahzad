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
  Send
} from 'lucide';

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
      Send
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

  // 6. Contact Form Validation & Submission Handler (Native)
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      let isValid = true;
      const formGroups = contactForm.querySelectorAll('.form-group');

      formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (!input) return;

        group.classList.remove('invalid');

        if (!input.value.trim()) {
          group.classList.add('invalid');
          isValid = false;
          return;
        }

        if (input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value.trim())) {
            group.classList.add('invalid');
            isValid = false;
          }
        }
      });

      if (!isValid) {
        formStatus.textContent = 'Please correct the errors in the form.';
        formStatus.classList.add('error');
        return;
      }

      const submitBtn = contactForm.querySelector('.btn-submit');
      const submitBtnText = submitBtn.querySelector('span');
      
      const originalText = submitBtnText.textContent;
      submitBtn.disabled = true;
      submitBtnText.textContent = 'Sending Message...';
      submitBtn.style.opacity = '0.7';

      setTimeout(() => {
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        formStatus.classList.add('success');
        
        contactForm.reset();
        
        submitBtn.disabled = false;
        submitBtnText.textContent = originalText;
        submitBtn.style.opacity = '1';

        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.classList.remove('success');
        }, 5000);

      }, 1500);
    });
  }
});
