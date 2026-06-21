import './style.css';
import { 
  createIcons, 
  ArrowUpRight, 
  User, 
  Code2, 
  Sparkles, 
  ExternalLink, 
  Mail, 
  MapPin, 
  Send 
} from 'lucide';

import { init3D } from './scene3d.js';
import { initAnimations } from './animations.js';

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  createIcons({
    icons: {
      ArrowUpRight,
      User,
      Code2,
      Sparkles,
      ExternalLink,
      Mail,
      MapPin,
      Send
    }
  });

  // 2. Initialize 3D Engine
  try {
    init3D();
  } catch (error) {
    console.error("Three.js initialization failed:", error);
  }

  // 3. Initialize GSAP UI & Scroll Animations
  initAnimations();

  // 4. Contact Form Validation & Submission Handler
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Clean previous status
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      let isValid = true;
      const formGroups = contactForm.querySelectorAll('.form-group');

      // Simple field-by-field validation
      formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (!input) return;

        group.classList.remove('invalid');

        // Check if empty
        if (!input.value.trim()) {
          group.classList.add('invalid');
          isValid = false;
          return;
        }

        // Email regex check
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

      // If valid, simulate message sending state
      const submitBtn = contactForm.querySelector('.btn-submit');
      const submitBtnText = submitBtn.querySelector('span');
      const submitBtnIcon = submitBtn.querySelector('i');
      
      const originalText = submitBtnText.textContent;
      submitBtn.disabled = true;
      submitBtnText.textContent = 'Sending Message...';
      submitBtn.style.opacity = '0.7';

      // Simulate network request delay
      setTimeout(() => {
        // Success response
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        formStatus.classList.add('success');
        
        // Reset form inputs
        contactForm.reset();
        
        // Reset button state
        submitBtn.disabled = false;
        submitBtnText.textContent = originalText;
        submitBtn.style.opacity = '1';

        // Clear success message after 5 seconds
        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.classList.remove('success');
        }, 5000);

      }, 1800);
    });
  }
});
