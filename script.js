// Smooth small vanilla script: navigation, form (simulated), animations
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const yearEl = document.getElementById('year');

  // Update year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Toggle mobile menu
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('show');
  });

  // Close mobile menu on nav click
  navLinks.forEach(a => a.addEventListener('click', () => navMenu.classList.remove('show')));

  // Intersection observer for active link & reveal animations
  const sections = document.querySelectorAll('main section[id]');
  const opts = { root: null, threshold: 0.2 };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const id = e.target.id;
      const link = document.querySelector('.nav-link[href="#' + id + '"]');
      if (e.isIntersecting) {
        if (link) { document.querySelectorAll('.nav-link').forEach(n=>n.classList.remove('active')); link.classList.add('active'); }
        e.target.classList.add('reveal');
      }
    });
  }, opts);
  sections.forEach(s => io.observe(s));

  // Scroll button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 120) scrollTopBtn.hidden = false;
    else scrollTopBtn.hidden = true;
  });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Simple reveal CSS hook
  document.querySelectorAll('.card, .project, .skill, .portrait-frame, .lead').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'opacity 520ms ease, transform 520ms ease';
  });

  // Use another observer for elements
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.15});
  document.querySelectorAll('.card, .project, .skill, .portrait-frame, .lead').forEach(el => revealObserver.observe(el));

  // Form handling (simulate)
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        name: contactForm.name.value.trim(),
        email: contactForm.email.value.trim(),
        subject: contactForm.subject.value.trim(),
        message: contactForm.message.value.trim()
      };
      if (!data.name || data.name.length < 3) return showMessage('Nombre inválido', 'error');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return showMessage('Correo inválido', 'error');
      if (data.subject.length < 5) return showMessage('Asunto muy corto', 'error');
      if (data.message.length < 10) return showMessage('Mensaje muy corto', 'error');
      // simulate
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.disabled = true; btn.textContent = 'Enviando...';
      setTimeout(() => {
        showMessage('¡Gracias! Mensaje enviado (simulado).', 'success');
        contactForm.reset();
        btn.disabled = false; btn.textContent = original;
      }, 1200);
    });
  }

  function showMessage(msg, type) {
    formMessage.textContent = msg;
    formMessage.style.color = type === 'success' ? '#b7f5d4' : '#ffd6d6';
    setTimeout(()=>{ formMessage.textContent = '' }, 4000);
  }
});
