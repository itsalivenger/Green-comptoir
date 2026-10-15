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

  // 4. Form submit handling
  const form = document.getElementById('founding-form');
  const successMsg = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');

  if (form) {
    form.addEventListener('submit', function(e) {
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

      submitBtn.innerHTML = '⏳ Envoi en cours...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.8';

      setTimeout(() => {
        form.style.display = 'none';
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1500);
    });

    document.querySelectorAll('#founding-form input').forEach(input => {
      input.addEventListener('input', function() {
        this.style.borderColor = '';
        this.style.boxShadow = '';
      });
    });
  }
});
