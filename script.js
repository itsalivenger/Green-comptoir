// Green Comptoir Landing Page — Main Script

document.addEventListener('DOMContentLoaded', () => {
  // 0. Dynamic copyright year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 1. Scroll reveal observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // 2. Smooth requestAnimationFrame-driven Scroll Handler (Prevents Layout Thrashing & Freezing)
  const timeline = document.querySelector('.timeline');
  const progressBar = document.getElementById('timeline-progress-bar');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const storySection = document.getElementById('story');
  const storyImg = document.querySelector('.story-image-wrap img');

  let isTicking = false;

  function scheduleScrollUpdate() {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        runScrollAnimations();
        isTicking = false;
      });
      isTicking = true;
    }
  }

  function runScrollAnimations() {
    const windowHeight = window.innerHeight;

    // === PHASE 1: READ ALL GEOMETRIES FIRST (Prevents Forced Synchronous Layout / Freezing) ===
    let timelineRect = null;
    let itemStates = [];
    if (timeline && progressBar) {
      timelineRect = timeline.getBoundingClientRect();
      timelineItems.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        // Activate milestone as user scrolls down to it
        const shouldBeActive = (itemRect.top + 32) < (windowHeight * 0.68);
        itemStates.push(shouldBeActive);
      });
    }

    let storyRect = null;
    if (storySection && storyImg) {
      storyRect = storySection.getBoundingClientRect();
    }

    // === PHASE 2: WRITE ALL DOM MUTATIONS ===

    // 2a. Dynamic Timeline Scroll Fill
    if (timelineRect && progressBar) {
      const triggerStart = windowHeight * 0.72;
      const scrolledDist = triggerStart - timelineRect.top;
      // Total travel distance from start to last item
      const totalDist = Math.max(1, timelineRect.height - 40);

      let progress = (scrolledDist / totalDist) * 100;
      progress = Math.max(0, Math.min(100, progress));

      progressBar.style.height = progress.toFixed(1) + '%';

      timelineItems.forEach((item, index) => {
        if (itemStates[index]) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }

    // 2b. Story Image Scroll Rotation / Tilt Effect
    // "starts tilted by some bigger degree then when i reach it scrolling it should start rotating to be 0deg"
    if (storyRect && storyImg) {
      const startY = windowHeight * 0.95; // enters viewport
      const endY = windowHeight * 0.32;   // comfortably reached / centered for reading

      let progress = (startY - storyRect.top) / (startY - endY);
      progress = Math.max(0, Math.min(1, progress));

      // Initial angle: -20 degrees (matches style.css), smoothly reaches 0deg when scrolled into view
      const initialTilt = -20;
      const currentTilt = initialTilt * (1 - progress);
      const currentScale = 0.95 + (0.05 * progress);

      storyImg.style.transform = `rotate(${currentTilt.toFixed(2)}deg) scale(${currentScale.toFixed(3)})`;
    }
  }

  // Bind scroll and resize events with passive listeners
  window.addEventListener('scroll', scheduleScrollUpdate, { passive: true });
  window.addEventListener('resize', scheduleScrollUpdate, { passive: true });

  // Initial call on page load
  runScrollAnimations();

  // 4. Form submit handling (Google Apps Script Web App)
  const scriptURL = 'https://script.google.com/macros/s/AKfycbw2a7jZVa_5LJnLQT59HMSTSalseigKmTV1T-ypcussDpZpmY5jTVs6e560xqxwgoex/exec';
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submit-btn');

  // Modal elements
  const modal = document.getElementById('form-modal');
  const modalIcon = document.getElementById('modal-icon');
  const modalTitle = document.getElementById('modal-title');
  const modalMessage = document.getElementById('modal-message');
  const modalActionBtn = document.getElementById('modal-action-btn');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');

  function openModal({ type, title, message, buttonText }) {
    if (!modal) return;
    modal.classList.remove('modal--success', 'modal--error');
    modal.classList.add('modal--' + type);

    if (modalIcon) {
      modalIcon.innerHTML = type === 'success'
        ? '<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
        : '<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    }

    if (modalTitle) modalTitle.textContent = title;
    if (modalMessage) modalMessage.innerHTML = message;
    if (modalActionBtn) modalActionBtn.textContent = buttonText || 'Fermer';

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  if (modalActionBtn) modalActionBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      let valid = true;
      form.querySelectorAll('input[required]').forEach(input => {
        input.style.borderColor = '';
        input.style.boxShadow = '';
        if (!input.value.trim()) {
          input.style.borderColor = '#ef4444';
          input.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
          valid = false;
        }
      });

      if (!valid) return;

      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Envoyer';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.8';
        submitBtn.innerHTML = '⏳ Envoi en cours...';
      }

      const formData = new FormData(form);

      fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })
        .then(response => {
          openModal({
            type: 'success',
            title: 'Candidature Envoyée ! 🎉',
            message: 'Félicitations ! Votre inscription a bien été enregistrée.<br>Si vous êtes sélectionné(e) parmi les 20 Founding Members, vous recevrez votre confirmation directement sur <strong>WhatsApp</strong> !',
            buttonText: 'Génial, merci !'
          });
          form.reset();
        })
        .catch(error => {
          console.error('Error submitting form!', error.message);
          openModal({
            type: 'error',
            title: 'Oups ! Une erreur est survenue',
            message: 'Impossible d\'envoyer votre candidature pour le moment.<br>Veuillez vérifier votre connexion internet ou la configuration du script et réessayer.',
            buttonText: 'Réessayer'
          });
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '';
            submitBtn.innerHTML = originalBtnText;
          }
        });
    });

    form.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', function () {
        this.style.borderColor = '';
        this.style.boxShadow = '';
      });
    });
  }
});
