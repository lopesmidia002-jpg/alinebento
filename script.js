/**
 * Dra. Aline Bento - Otorrinolaringologia
 * Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  // Header scroll shadow effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.25)';
      header.style.padding = '10px 0';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
      header.style.padding = '12px 0';
    }
  });

  // Smooth scroll offset handling for sticky header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section, .surgery-card, .testimonial-card, .partner-logo-item').forEach(el => {
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // ============================================================
  // Modal de Login
  // ============================================================
  const btnLogin    = document.getElementById('btnLogin');
  const loginModal  = document.getElementById('loginModal');
  const modalClose  = document.getElementById('modalClose');
  const togglePass  = document.getElementById('togglePassword');
  const passInput   = document.getElementById('loginPassword');

  function openModal() {
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('loginEmail').focus(), 50);
  }

  function closeModal() {
    loginModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (btnLogin)   btnLogin.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);

  // Fecha ao clicar fora do modal-box
  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) closeModal();
    });
  }

  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginModal && loginModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Mostrar/ocultar senha
  if (togglePass && passInput) {
    togglePass.addEventListener('click', () => {
      const isText = passInput.type === 'text';
      passInput.type = isText ? 'password' : 'text';
      togglePass.setAttribute('aria-label', isText ? 'Mostrar senha' : 'Ocultar senha');
    });
  }

  // Submit do form (placeholder)
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('btnLoginSubmit');
      btn.textContent = 'Entrando...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Entrar';
        btn.disabled = false;
      }, 1800);
    });
  }
});
