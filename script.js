// ═══════════════════════════════════════════
// DEVDOOT AGRO — MAIN SCRIPT & ANIMATIONS
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // 1. Reading Progress Bar Injection & Logic
  const progressContainer = document.createElement('div');
  progressContainer.className = 'scroll-progress-container';
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  progressContainer.appendChild(progressBar);
  
  // Insert right after nav
  const nav = document.querySelector('nav');
  if (nav) {
    nav.parentNode.insertBefore(progressContainer, nav.nextSibling);
  }

  function updateProgressBar() {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = scrolled + '%';
  }

  window.addEventListener('scroll', () => {
    updateProgressBar();
    
    // Navbar Scroll class toggle
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  
  // Initial call
  updateProgressBar();

  // 2. Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      if (nav) nav.classList.toggle('mobile-open'); // Turn nav green on mobile menu expand
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
  }

  // 3. Advanced Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -60px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Custom hook for timeline items to pulse active state
        if (entry.target.classList.contains('timeline-item')) {
          entry.target.classList.add('active');
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // 4. Viewport Triggered Number Counter Animation
  const countUpElements = document.querySelectorAll('.count-up');
  
  const countUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  countUpElements.forEach(el => {
    countUpObserver.observe(el);
  });

  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    
    const duration = 1600; // 1.6s
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Sleek easeOutQuart formula for luxurious slowdown
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeProgress * target);
      
      element.textContent = currentValue.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    }
    
    requestAnimationFrame(updateCounter);
  }

  // 5. Scroll to Top Button
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 6. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('open');
        });
        item.classList.toggle('open');
      });
    }
  });

  // 8. Mobile Menu Active Link Auto-detection
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
  mobileMenuLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });
});
