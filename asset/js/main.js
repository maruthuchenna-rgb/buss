/**
 * TEXON / STACKLY CORPORATE BUSINESS WEBSITE THEME
 * Main Script - asset/js/main.js
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. HERO IMAGE SLIDER (5 SLIDES)
     ========================================================================== */
  const heroSlider = (() => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');
    const currentNumEl = document.querySelector('.slider-counter .current-num');
    const totalNumEl = document.querySelector('.slider-counter .total-num');
    const frame = document.querySelector('.hero-slider-frame');

    if (!slides.length) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayTimer = null;
    const intervalTime = 5000;

    if (totalNumEl) {
      totalNumEl.textContent = String(totalSlides).padStart(2, '0');
    }

    function goToSlide(index) {
      if (index < 0) {
        currentIndex = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      // Update slides
      slides.forEach((slide, idx) => {
        if (idx === currentIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }

});

      // Update dots
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }

});

      // Update counter
      if (currentNumEl) {
        currentNumEl.textContent = String(currentIndex + 1).padStart(2, '0');
      }
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(nextSlide, intervalTime);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    // Event Listeners
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoPlay();

});
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoPlay();

});
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const targetIndex = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        if (!isNaN(targetIndex)) {
          goToSlide(targetIndex);
          startAutoPlay();
        }

});

});

    // Pause on hover
    if (frame) {
      frame.addEventListener('mouseenter', stopAutoPlay);
      frame.addEventListener('mouseleave', startAutoPlay);
    }

    // Keyboard navigation (Left / Right arrow keys)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }

});

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (frame) {
      frame.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true

});

      frame.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true

});
    }

    function handleSwipe() {
      const threshold = 50;
      if (touchEndX < touchStartX - threshold) {
        nextSlide();
        startAutoPlay();
      }
      if (touchEndX > touchStartX + threshold) {
        prevSlide();
        startAutoPlay();
      }
    }

    // Initialize
    goToSlide(0);
    startAutoPlay();
  })();

  /* ==========================================================================
     2. STICKY HEADER SCROLL EFFECT
     ========================================================================== */
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }

});

  /* ==========================================================================
     3. SEARCH TRIGGER & MODAL (Search Button Redirects to 404)
     ========================================================================== */
  const searchTrigger = document.getElementById('searchTriggerBtn');
  const searchModal = document.getElementById('searchModal');
  const searchClose = document.getElementById('searchCloseBtn');
  const searchInput = document.getElementById('searchInput');

  function openSearch() {
    searchModal?.classList.add('active');
    setTimeout(() => searchInput?.focus(), 100);
    document.body.style.overflow = 'hidden';
  }

  function closeSearch() {
    searchModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Search button redirect to 404 as requested
  if (searchTrigger) {
    searchTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '404.html';

});
  }

  searchClose?.addEventListener('click', closeSearch);
  searchModal?.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();

});

  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      window.location.href = '404.html';
    }

});

  /* ==========================================================================
     CHOOSE WHAT FITS YOU - PILLAR ARROW BUTTON & CARD ICON REACTION -> 404
     ========================================================================== */
  (function initPillarArrowButtons() {
    const arrowBtns = document.querySelectorAll('.pillar-arrow-btn');
    if (!arrowBtns.length) return;

    arrowBtns.forEach((btn) => {
      const card = btn.closest('.pillar-card');

      // Touch feedback on mobile/tablet (triggers arrow flight + card icon bounce)
      btn.addEventListener('touchstart', () => {
        btn.classList.add('touch-active');
        if (card) card.classList.add('arrow-touched');
      }, { passive: true

});

      btn.addEventListener('touchend', () => {
        btn.classList.remove('touch-active');
        btn.classList.add('touched');
        if (card) {
          card.classList.add('arrow-touched');
          setTimeout(() => card.classList.remove('arrow-touched'), 800);
        }
      }, { passive: true

});

      // Hover on desktop also triggers card icon animation
      btn.addEventListener('mouseenter', () => {
        if (card) card.classList.add('arrow-touched');

});

      btn.addEventListener('mouseleave', () => {
        if (card) card.classList.remove('arrow-touched');

});

      // Click / tap redirect to 404.html with smooth feedback
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.classList.add('touched');
        if (card) card.classList.add('arrow-touched');
        setTimeout(() => {
          window.location.href = '404.html';
        }, 180);

});

});
  })();

  /* ==========================================================================
     3.1 LOGIN NAVIGATION & MODAL
     ========================================================================== */
  const loginTrigger = document.getElementById('loginTriggerBtn');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  const loginModal = document.getElementById('loginModal');
  const loginClose = document.getElementById('loginCloseBtn');
  const loginEmailInput = document.getElementById('loginEmail');

  function redirectToLogin(e) {
    // Direct navigation to dedicated corporate login page
    window.location.href = 'login.html';
  }

  function closeLogin() {
    loginModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  loginTrigger?.addEventListener('click', redirectToLogin);
  mobileLoginBtn?.addEventListener('click', redirectToLogin);
  loginClose?.addEventListener('click', closeLogin);
  loginModal?.addEventListener('click', (e) => {
    if (e.target === loginModal) closeLogin();

});

  /* ==========================================================================
     4. OFF-CANVAS MOBILE MENU DRAWER
     ========================================================================== */
  const menuTrigger = document.getElementById('menuHamburgerBtn');
  const mobileDrawer = document.getElementById('mobileMenuDrawer');
  const mobileClose = document.getElementById('mobileMenuCloseBtn');

  function openMobileMenu() {
    mobileDrawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer?.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuTrigger?.addEventListener('click', openMobileMenu);
  mobileClose?.addEventListener('click', closeMobileMenu);

  /* ==========================================================================
     5. CART DRAWER (Badge 5)
     ========================================================================== */
  const cartTrigger = document.getElementById('floatingCartBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartClose = document.getElementById('cartCloseBtn');

  function openCart() {
    cartDrawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer?.classList.remove('active');
    document.body.style.overflow = '';
  }

  cartTrigger?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);

  /* ==========================================================================
     6. SETTINGS DRAWER
     ========================================================================== */
  const settingsTrigger = document.getElementById('floatingSettingsBtn');
  const settingsDrawer = document.getElementById('settingsDrawer');
  const settingsClose = document.getElementById('settingsCloseBtn');

  function openSettings() {
    settingsDrawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSettings() {
    settingsDrawer?.classList.remove('active');
    document.body.style.overflow = '';
  }

  settingsTrigger?.addEventListener('click', openSettings);
  settingsClose?.addEventListener('click', closeSettings);

  // Close drawers & modals with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeLogin();
      closeMobileMenu();
      closeCart();
      closeSettings();
    }

});

  /* ==========================================================================
     7. PORTFOLIO FILTER TABS
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }

});

});

});

  /* ==========================================================================
     8. THEME COLOR PICKER IN SETTINGS
     ========================================================================== */
  const colorOptions = document.querySelectorAll('.theme-color-option');
  colorOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const selectedColor = option.getAttribute('data-color');
      if (selectedColor) {
        document.documentElement.style.setProperty('--color-primary', selectedColor);
        document.documentElement.style.setProperty('--color-primary-light', selectedColor);
      }

});

});

  /* ==========================================================================
     9. STATS COUNTER ANIMATION
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-count');
  let statsAnimated = false;

  function runCounterAnimation() {
    statNumbers.forEach((counter) => {
      const target = +counter.getAttribute('data-count');
      const speed = 40;
      let count = 0;

      const updateCount = () => {
        const increment = Math.ceil(target / speed);
        count += increment;

        if (count < target) {
          counter.innerText = count.toLocaleString();
          setTimeout(updateCount, 25);
        } else {
          counter.innerText = target.toLocaleString();
        }
      };

      updateCount();

});
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !statsAnimated) {
        runCounterAnimation();
        statsAnimated = true;
      }

});
  }, { threshold: 0.3

});

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }

  /* ==========================================================================
     10. BACK TO TOP BUTTON WITH CIRCULAR PROGRESS
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTopBtn');
  const progressCircle = document.querySelector('.progress-ring-circle');
  if (backToTopBtn && progressCircle) {
    const circumference = 2 * Math.PI * 20; // r = 20 -> ~125.66

    window.addEventListener('scroll', () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrollCurrent = window.scrollY;

      if (scrollCurrent > 120) {
        backToTopBtn.classList.add('visible');
        const scrollFraction = scrollTotal > 0 ? Math.min(1, Math.max(0, scrollCurrent / scrollTotal)) : 0;
        const offset = circumference - scrollFraction * circumference;
        progressCircle.style.strokeDashoffset = offset;
      } else {
        backToTopBtn.classList.remove('visible');
      }

});

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth'

});

});
  }

  console.log('Texon Corporate Theme JS successfully initialized with 5-image hero slider & value pillars!');

  /* =====================================================
     TESTIMONIALS SLIDER â€” auto-play + drag + dots
     ===================================================== */
  (function initTestiSlider() {
    const track    = document.getElementById('testiTrack');
    const viewport = document.getElementById('testiViewport');
    const dotsWrap = document.getElementById('testiDots');
    if (!track || !viewport) return;

    const cards = Array.from(track.querySelectorAll('.testi-card'));
    const total = cards.length;
    let visible = 3;
    let current = 0;
    let autoTimer = null;
    let isDragging = false;
    let dragStartX = 0, dragCurrentX = 0;
    let baseX = 0;

    function getVisible() {
      const vw = window.innerWidth;
      if (vw <= 768) return 1;
      if (vw <= 1024) return 2;
      return 3;
    }

    function maxIdx() { return Math.max(0, total - visible); }

    function cardStep() {
      return cards[0].getBoundingClientRect().width + 22;
    }

    function applyTransform(idx, animate) {
      track.style.transition = animate
        ? 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)'
        : 'none';
      baseX = -(idx * cardStep());
      track.style.transform = `translateX(${baseX}px)`;
      updateDots();
    }

    function buildDots() {
      dotsWrap.innerHTML = '';
      for (let i = 0; i <= maxIdx(); i++) {
        const dot = document.createElement('button');
        dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      }
    }

    function updateDots() {
      dotsWrap.querySelectorAll('.testi-dot').forEach((d, i) =>
        d.classList.toggle('active', i === current));
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, maxIdx()));
      applyTransform(current, true);
    }

    function goNext() { goTo(current + 1 > maxIdx() ? 0 : current + 1); }
    function goPrev() { goTo(current - 1 < 0 ? maxIdx() : current - 1); }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(goNext, 4000);
    }

    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = null;
    }

    viewport.addEventListener('mouseenter', stopAuto);
    viewport.addEventListener('mouseleave', startAuto);

    /* Drag */
    track.addEventListener('mousedown', e => {
      isDragging = true; dragStartX = e.clientX; dragCurrentX = e.clientX;
      track.classList.add('is-dragging'); stopAuto();

});
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      dragCurrentX = e.clientX;
      track.style.transition = 'none';
      track.style.transform = `translateX(${baseX + (dragCurrentX - dragStartX)}px)`;

});
    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('is-dragging');
      const delta = dragCurrentX - dragStartX;
      if (delta < -60) goNext();
      else if (delta > 60) goPrev();
      else applyTransform(current, true);
      startAuto();

});

    track.addEventListener('touchstart', e => {
      isDragging = true; dragStartX = e.touches[0].clientX; dragCurrentX = dragStartX;
      track.classList.add('is-dragging'); stopAuto();
    }, { passive: true

});
    track.addEventListener('touchmove', e => {
      if (!isDragging) return;
      dragCurrentX = e.touches[0].clientX;
      track.style.transition = 'none';
      track.style.transform = `translateX(${baseX + (dragCurrentX - dragStartX)}px)`;
    }, { passive: true

});
    track.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('is-dragging');
      const delta = dragCurrentX - dragStartX;
      if (delta < -60) goNext();
      else if (delta > 60) goPrev();
      else applyTransform(current, true);
      startAuto();

});

    window.addEventListener('resize', () => {
      visible = getVisible();
      buildDots();
      if (current > maxIdx()) current = maxIdx();
      applyTransform(current, false);

});

    visible = getVisible();
    buildDots();
    applyTransform(0, false);
    startAuto();
  })();

  /* =====================================================
     MEET THE EXPERTS â€” cards fade-up on scroll & touch details
     ===================================================== */
  (function initExpertCards() {
    const cards = document.querySelectorAll('.expert-card');
    if (!cards.length) return;

    // Scroll reveal observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const delay = (parseInt(card.dataset.aos, 10) - 1) * 160;
          setTimeout(() => card.classList.add('in-view'), delay);
          observer.unobserve(card);
        }

});
    }, { threshold: 0.15

});

    cards.forEach(card => observer.observe(card));

    // Touch & Click to show/hide expert details
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        // If clicking a link inside (e.g. social profile), let it follow the link
        if (e.target.closest('a')) return;

        const isCurrentlyActive = card.classList.contains('show-details');

        // Close details on any other card
        cards.forEach(c => {
          if (c !== card) c.classList.remove('show-details');

});

        // Toggle this card
        if (isCurrentlyActive) {
          card.classList.remove('show-details');
        } else {
          card.classList.add('show-details');
        }

});

      // Keyboard accessibility (Enter / Space)
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target.closest('a')) return;
          e.preventDefault();
          card.click();
        }

});

});

    // Tap outside to close open expert details
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.expert-card')) {
        cards.forEach(c => c.classList.remove('show-details'));
      }

});
  })();

  /* =====================================================
     BLOG / INSIGHTS â€” cards fade-up on scroll
     ===================================================== */
  (function initBlogCards() {
    const cards = document.querySelectorAll('.blog-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const delay = (parseInt(card.dataset.blog, 10) - 1) * 160;
          setTimeout(() => card.classList.add('in-view'), delay);
          observer.unobserve(card);
        }

});
    }, { threshold: 0.15

});

    cards.forEach(card => observer.observe(card));
  })();

  /* =====================================================
     OUR PROCESS â€” step cards scroll-in animation
     ===================================================== */
  (function initProcessSteps() {
    const stepCards = document.querySelectorAll('.process-step-card');
    if (!stepCards.length) return;

    if (!('IntersectionObserver' in window)) {
      stepCards.forEach(c => c.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const delay = (parseInt(card.dataset.step, 10) - 1) * 160;
          setTimeout(() => card.classList.add('in-view'), delay);
          observer.unobserve(card);
        }

});
    }, { threshold: 0.1

});

    stepCards.forEach(card => observer.observe(card));
  })();

  /* =====================================================
     STATS COUNTER â€” count-up animation on scroll
     ===================================================== */
  (function initStatsCounter() {
    const statItems = document.querySelectorAll('.stat-item');
    if (!statItems.length) return;

    function countUp(el) {
      const countEl = el.querySelector('.stat-count');
      if (!countEl || el.dataset.counted) return;
      el.dataset.counted = '1';

      const target = parseInt(countEl.dataset.target, 10);
      const duration = 1800; // ms
      const startTime = performance.now();

      function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        countEl.textContent = current;
        if (progress < 1) requestAnimationFrame(step);
        else {
          countEl.textContent = target;
          el.classList.add('animated');
        }
      }
      requestAnimationFrame(step);
    }

    // IntersectionObserver â€” trigger when section enters viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statItems.forEach(item => countUp(item));
          observer.disconnect();
        }

});
    }, { threshold: 0.3

});

    const section = document.querySelector('.stats-counter-section');
    if (section) observer.observe(section);
  })();

  /* =====================================================
     PORTFOLIO WORK SLIDER
     ===================================================== */
  (function initPortfolioSlider() {
    const track       = document.getElementById('pfTrack');
    const viewport    = document.getElementById('pfViewport');
    const prevBtn     = document.getElementById('pfPrev');
    const nextBtn     = document.getElementById('pfNext');
    const dotsWrap    = document.getElementById('pfDots');

    if (!track || !viewport) return;

    const cards       = Array.from(track.querySelectorAll('.portfolio-work-card'));
    const totalCards  = cards.length;
    let cardsVisible  = 4; // default desktop
    let currentIndex  = 0;
    let autoTimer     = null;
    let isDragging    = false;
    let dragStartX    = 0;
    let dragCurrentX  = 0;
    let trackBaseX    = 0;

    /* Determine how many cards are visible at current viewport */
    function getCardsVisible() {
      const vw = window.innerWidth;
      if (vw <= 480) return 1;
      if (vw <= 768) return 2;
      if (vw <= 1024) return 3;
      return 4;
    }

    /* Max index we can scroll to */
    function maxIndex() {
      return Math.max(0, totalCards - cardsVisible);
    }

    /* Get width of one card + gap */
    function cardStep() {
      const card = cards[0];
      const gap = 24;
      return card.getBoundingClientRect().width + gap;
    }

    /* Apply transform to track */
    function applyTransform(index, animate) {
      if (!animate) track.style.transition = 'none';
      else track.style.transition = 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      trackBaseX = -(index * cardStep());
      track.style.transform = `translateX(${trackBaseX}px)`;
      updateDots();
    }

    /* Create dots */
    function buildDots() {
      dotsWrap.innerHTML = '';
      const count = maxIndex() + 1;
      for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        dot.className = 'portfolio-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      }
    }

    function updateDots() {
      const dots = dotsWrap.querySelectorAll('.portfolio-dot');
      dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }

    /* Navigation */
    function goTo(index) {
      currentIndex = Math.max(0, Math.min(index, maxIndex()));
      applyTransform(currentIndex, true);
    }

    function goPrev() { goTo(currentIndex - 1); }
    function goNext() { goTo(currentIndex + 1 > maxIndex() ? 0 : currentIndex + 1); }

    /* Auto-play */
    function startAuto() {
      stopAuto();
      autoTimer = setInterval(() => {
        goTo(currentIndex + 1 > maxIndex() ? 0 : currentIndex + 1);
      }, 3500);
    }

    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = null;
    }

    /* Button listeners */
    prevBtn.addEventListener('click', () => { goPrev(); stopAuto(); startAuto();

});
    nextBtn.addEventListener('click', () => { goNext(); stopAuto(); startAuto();

});

    /* Pause on hover */
    viewport.addEventListener('mouseenter', stopAuto);
    viewport.addEventListener('mouseleave', startAuto);

    /* Drag / touch support */
    function onDragStart(x) {
      isDragging = true;
      dragStartX = x;
      dragCurrentX = x;
      track.classList.add('is-dragging');
      stopAuto();
    }

    function onDragMove(x) {
      if (!isDragging) return;
      dragCurrentX = x;
      const delta = dragCurrentX - dragStartX;
      track.style.transition = 'none';
      track.style.transform = `translateX(${trackBaseX + delta}px)`;
    }

    function onDragEnd() {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('is-dragging');
      const delta = dragCurrentX - dragStartX;
      if (delta < -60) goNext();
      else if (delta > 60) goPrev();
      else applyTransform(currentIndex, true);
      startAuto();
    }

    /* Mouse drag */
    track.addEventListener('mousedown', e => onDragStart(e.clientX));
    window.addEventListener('mousemove', e => { if (isDragging) onDragMove(e.clientX);

});
    window.addEventListener('mouseup', onDragEnd);

    /* Touch drag */
    track.addEventListener('touchstart', e => onDragStart(e.touches[0].clientX), { passive: true

});
    track.addEventListener('touchmove', e => onDragMove(e.touches[0].clientX), { passive: true

});
    track.addEventListener('touchend', onDragEnd);

    /* Resize handler */
    window.addEventListener('resize', () => {
      cardsVisible = getCardsVisible();
      buildDots();
      if (currentIndex > maxIndex()) currentIndex = maxIndex();
      applyTransform(currentIndex, false);

});

    /* Init */
    cardsVisible = getCardsVisible();
    buildDots();
    applyTransform(0, false);
    startAuto();
  })();

  /* =====================================================
     AUTH ROLE SELECTOR & DEMO CREDENTIALS
     ===================================================== */
  (function initAuthRoleSwitcher() {
    const roleTabs = document.querySelectorAll('.role-tab-btn');
    const authForm = document.getElementById('authMainForm');
    const roleInput = document.getElementById('selectedRoleInput');
    const emailInput = document.getElementById('authEmail');
    const passwordInput = document.getElementById('authPassword');
    const demoFillBtn = document.getElementById('demoFillBtn');
    const roleNotice = document.getElementById('roleNoticeText');

    if (!roleTabs.length) return;

    let currentRole = 'client';

    function setRole(role) {
      currentRole = role;
      roleTabs.forEach(tab => {
        const isActive = tab.dataset.role === role;
        tab.classList.toggle('active', isActive);

});

      if (roleInput) roleInput.value = role;

      if (roleNotice) {
        if (role === 'admin') {
          roleNotice.textContent = 'Admin Mode: Executive Management & Analytics Access';
        } else {
          roleNotice.textContent = 'Client Mode: Corporate Advisory & Project Tracking';
        }
      }
    }

    roleTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        setRole(tab.dataset.role);

});

});

    if (demoFillBtn) {
      demoFillBtn.addEventListener('click', () => {
        if (currentRole === 'admin') {
          if (emailInput) emailInput.value = 'executive.admin@texon.corp';
          if (passwordInput) passwordInput.value = 'AdminPass2026!';
        } else {
          if (emailInput) emailInput.value = 'client.partner@globalreach.com';
          if (passwordInput) passwordInput.value = 'ClientPartner2026!';
        }

});
    }

    // Format friendly name from email address
    function formatNameFromEmail(email) {
      if (!email || !email.includes('@')) return 'Executive Partner';
      const prefix = email.split('@')[0];
      const parts = prefix.split(/[._-]+/);
      const formatted = parts
        .filter(p => p.length > 0)
        .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
        .join(' ');
      return formatted || 'Executive Partner';
    }

    // Save user session in localStorage and sessionStorage
    function saveUserSession(email, name, role, company) {
      const cleanEmail = (email || '').trim();
      let cleanName = (name || '').trim();

      if (!cleanName || cleanName === 'Executive Partner') {
        if (cleanEmail.toLowerCase() === 'client.partner@globalreach.com') {
          cleanName = 'Ralph Edwards';
        } else if (cleanEmail.toLowerCase() === 'executive.admin@texon.corp') {
          cleanName = 'Executive Administrator';
        } else {
          cleanName = formatNameFromEmail(cleanEmail);
        }
      }

      const userData = {
        email: cleanEmail,
        name: cleanName,
        role: role || (cleanEmail.toLowerCase().includes('admin') ? 'admin' : 'client'),
        company: company || (role === 'admin' ? 'Texon Executive Office' : 'Momentum Logistics'),
        lastLogin: new Date().toISOString()
      };

      try {
        localStorage.setItem('texon_user_session', JSON.stringify(userData));
        sessionStorage.setItem('texon_user_session', JSON.stringify(userData));
        localStorage.setItem('texon_user_email', cleanEmail);
        sessionStorage.setItem('texon_user_email', cleanEmail);
        localStorage.setItem('texon_user_name', cleanName);
        sessionStorage.setItem('texon_user_name', cleanName);
        localStorage.setItem('texon_user_role', userData.role);
        sessionStorage.setItem('texon_user_role', userData.role);
      } catch (e) {
        console.warn('Storage write error', e);
      }

      return userData;
    }

    if (authForm) {
      authForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submittedEmail = emailInput ? emailInput.value.trim() : '';
        const fullNameInput = document.getElementById('fullName');
        const companyInput = document.getElementById('companyName');

        let submittedName = fullNameInput ? fullNameInput.value.trim() : '';
        let submittedCompany = companyInput ? companyInput.value.trim() : '';

        // If on login page (no fullName input), determine user name
        if (!submittedName) {
          if (submittedEmail.toLowerCase() === 'client.partner@globalreach.com') {
            submittedName = 'Ralph Edwards';
            submittedCompany = 'Momentum Logistics';
          } else if (submittedEmail.toLowerCase() === 'executive.admin@texon.corp') {
            submittedName = 'Executive Administrator';
            submittedCompany = 'Texon Executive Office';
          } else {
            // Check if previously registered
            try {
              const prev = localStorage.getItem('texon_reg_' + submittedEmail.toLowerCase());
              if (prev) {
                const parsed = JSON.parse(prev);
                submittedName = parsed.name || '';
                submittedCompany = parsed.company || '';
              }
            } catch (err) {}

            if (!submittedName) {
              submittedName = formatNameFromEmail(submittedEmail);
            }
          }
        } else {
          // On signup page: remember this registration
          try {
            localStorage.setItem('texon_reg_' + submittedEmail.toLowerCase(), JSON.stringify({
              name: submittedName,
              company: submittedCompany,
              role: currentRole
            }));
          } catch (err) {}
        }

        // Persist session
        saveUserSession(submittedEmail, submittedName, currentRole, submittedCompany);

        // Redirect to corresponding dashboard
        if (currentRole === 'admin') {
          window.location.href = 'dashboard-admin.html';
        } else {
          window.location.href = 'dashboard-client.html';
        }
      });
    }

    // Toggle Password Visibility
    const pwdToggles = document.querySelectorAll('.auth-toggle-pwd');
    pwdToggles.forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.previousElementSibling || document.getElementById('authPassword');
        if (input) {
          const isPwd = input.type === 'password';
          input.type = isPwd ? 'text' : 'password';
          btn.setAttribute('aria-label', isPwd ? 'Hide password' : 'Show password');
          btn.style.color = isPwd ? '#60a5fa' : '#64748b';
        }
      });
    });
  })();

  /* =====================================================
     DASHBOARD USER SESSION SYNC (EMAIL & NAME DISPLAY)
     Syncs login email and name to sidebar, topbar, banner, & settings
     ===================================================== */
  (function initDashboardUserSession() {
    const isDashboard = document.querySelector('.dash-app-layout');
    if (!isDashboard) return;

    const isAdminPage = window.location.pathname.includes('dashboard-admin.html');

    // Retrieve user session
    let userSession = null;
    try {
      const raw = sessionStorage.getItem('texon_user_session') || localStorage.getItem('texon_user_session');
      if (raw) userSession = JSON.parse(raw);
    } catch (e) {}

    const directEmail = sessionStorage.getItem('texon_user_email') || localStorage.getItem('texon_user_email');
    const directName  = sessionStorage.getItem('texon_user_name')  || localStorage.getItem('texon_user_name');

    // Default fallbacks if opened directly without logging in
    const defaultEmail = isAdminPage ? 'executive.admin@texon.corp' : 'client.partner@globalreach.com';
    const defaultName  = isAdminPage ? 'Executive Administrator' : 'Ralph Edwards';

    const currentEmail = (userSession && userSession.email) || directEmail || defaultEmail;
    const currentName  = (userSession && userSession.name)  || directName  || defaultName;

    function applyUserData(name, email) {
      // 1. Sidebar user info
      const sidebarNameEl = document.getElementById('dashSidebarUserName') || document.querySelector('.dash-sidebar-footer .dash-user-name');
      if (sidebarNameEl) sidebarNameEl.textContent = name;

      let sidebarEmailEl = document.getElementById('dashSidebarUserEmail') || document.querySelector('.dash-sidebar-footer .dash-user-email');
      if (!sidebarEmailEl) {
        const metaContainer = document.querySelector('.dash-sidebar-footer .dash-user-meta');
        if (metaContainer) {
          sidebarEmailEl = document.createElement('div');
          sidebarEmailEl.id = 'dashSidebarUserEmail';
          sidebarEmailEl.className = 'dash-user-email';
          sidebarEmailEl.style.cssText = 'font-size: 11px; color: #94a3b8; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 2px;';
          const roleText = metaContainer.querySelector('.dash-user-role-text');
          if (roleText) {
            metaContainer.insertBefore(sidebarEmailEl, roleText);
          } else {
            metaContainer.appendChild(sidebarEmailEl);
          }
        }
      }
      if (sidebarEmailEl) {
        sidebarEmailEl.textContent = email;
        sidebarEmailEl.title = email;
      }

      // 2. Topbar chip user info
      const topbarNameEl  = document.getElementById('dashTopbarUserName')  || document.querySelector('.dash-chip-name');
      const topbarEmailEl = document.getElementById('dashTopbarUserEmail') || document.querySelector('.dash-chip-email');
      if (topbarNameEl)  topbarNameEl.textContent = name;
      if (topbarEmailEl) {
        topbarEmailEl.textContent = email;
        topbarEmailEl.title = email;
      }

      // 3. Welcome Banner user info
      const bannerNameEl  = document.getElementById('dashBannerUserName')  || document.querySelector('.dash-banner-name');
      const bannerEmailEl = document.getElementById('dashBannerUserEmail') || document.querySelector('.dash-banner-email');
      if (bannerNameEl)  bannerNameEl.textContent = name;
      if (bannerEmailEl) bannerEmailEl.textContent = email;

      // 4. Settings tab form fields
      const settingsNameInputs = document.querySelectorAll('#tab-settings .name-input, #tab-admin-settings input[type="text"]');
      settingsNameInputs.forEach(input => {
        if (input) input.value = name;
      });

      const settingsEmailInputs = document.querySelectorAll('#tab-settings input[type="email"], #tab-admin-settings input[type="email"]');
      settingsEmailInputs.forEach(input => {
        if (input) input.value = email;
      });
    }

    // Apply immediately on load
    applyUserData(currentName, currentEmail);

    // 5. Allow saving profile updates from Settings tab
    const profileForms = document.querySelectorAll('#tab-settings form, #tab-admin-settings form');
    profileForms.forEach(form => {
      form.addEventListener('submit', () => {
        const nameInp  = form.querySelector('.name-input, input[type="text"]');
        const emailInp = form.querySelector('input[type="email"]');
        const newName  = nameInp  ? nameInp.value.trim()  : currentName;
        const newEmail = emailInp ? emailInp.value.trim() : currentEmail;

        try {
          const updated = {
            email: newEmail,
            name: newName,
            role: isAdminPage ? 'admin' : 'client',
            company: isAdminPage ? 'Texon Executive Office' : 'Momentum Logistics',
            lastLogin: new Date().toISOString()
          };
          localStorage.setItem('texon_user_session', JSON.stringify(updated));
          sessionStorage.setItem('texon_user_session', JSON.stringify(updated));
          localStorage.setItem('texon_user_email', newEmail);
          sessionStorage.setItem('texon_user_email', newEmail);
          localStorage.setItem('texon_user_name', newName);
          sessionStorage.setItem('texon_user_name', newName);
        } catch (e) {}

        applyUserData(newName, newEmail);
      });
    });

  })();

  /* =====================================================
     DASHBOARD 5-SIDEBAR OPTIONS DYNAMIC VIEW SWITCHER
     ===================================================== */
  (function initDashboardTabs() {
    const navLinks = document.querySelectorAll('.dash-nav-link[data-tab]');
    const tabPanels = document.querySelectorAll('.dash-content-panel');
    const topbarTitle = document.getElementById('dashTopbarTitle');
    const sidebarToggleBtn = document.getElementById('dashSidebarToggle');
    const sidebar = document.getElementById('dashSidebar');

    if (!navLinks.length || !tabPanels.length) return;

    function switchTab(tabId, tabName) {
      // Update sidebar nav active class
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.tab === tabId);

});

      // Update content panel with smooth animation
      tabPanels.forEach(panel => {
        if (panel.id === tabId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }

});

      // Update topbar title
      if (topbarTitle && tabName) {
        topbarTitle.textContent = tabName;
      }

      // Close mobile sidebar if open
      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    }

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = link.dataset.tab;
        const tabName = link.dataset.name || link.querySelector('span:first-of-type')?.textContent;
        switchTab(tabId, tabName);

});

});

    if (sidebarToggleBtn && sidebar) {
      sidebarToggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');

});
    }
  })();

  /* ==========================================================================
     PHONE NUMBER INPUT â€” STRICT NUMBERS ONLY (0-9)
     Blocks: letters, symbols, and all special characters
     Allows: ONLY numeric digits 0-9 and navigation/control keys
     ========================================================================== */
  (() => {
    const CONTROL_KEYS = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End'
    ];

    function sanitizePhoneValue(value) {
      if (!value) return '';
      // Strip everything that is not a numeric digit
      return value.replace(/[^0-9]/g, '');
    }

    function flashError(input) {
      input.style.borderColor = '#ef4444';
      input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.25)';
      setTimeout(() => {
        input.style.borderColor = '';
        input.style.boxShadow = '';
      }, 500);
    }

    function attachPhoneValidation(input) {
      if (input.dataset.phoneValidated === 'true') return;
      input.dataset.phoneValidated = 'true';

      input.setAttribute('inputmode', 'numeric');
      input.setAttribute('pattern', '[0-9]*');

      // Keydown: Allow only numbers 0-9 and control keys
      input.addEventListener('keydown', (e) => {
        if (CONTROL_KEYS.includes(e.key)) return;
        if (e.ctrlKey || e.metaKey) return;

        // Block anything that is not a digit 0-9
        if (!/^[0-9]$/.test(e.key)) {
          e.preventDefault();
          flashError(input);
        }

});

      // Paste: sanitize immediately
      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData('text') || '';
        const cleaned = sanitizePhoneValue(text);
        const start = input.selectionStart || 0;
        const end = input.selectionEnd || 0;
        const current = input.value || '';
        const updated = current.slice(0, start) + cleaned + current.slice(end);
        const maxLen = parseInt(input.getAttribute('maxlength'), 10) || 15;
        input.value = updated.slice(0, maxLen);
        input.dispatchEvent(new Event('input', { bubbles: true }));

});

      // Input event: sanitize for IME, autocomplete, speech-to-text
      input.addEventListener('input', () => {
        const cleaned = sanitizePhoneValue(input.value);
        if (cleaned !== input.value) {
          const cursor = input.selectionStart || 0;
          input.value = cleaned;
          try { input.setSelectionRange(cursor - 1, cursor - 1); } catch (err) {}
        }

});
    }

    // Target all phone input fields
    function initPhoneInputs() {
      const phoneInputs = document.querySelectorAll(
        '.phone-number-input, input[type="tel"], input[name*="phone" i], input[id*="phone" i], input[placeholder*="phone" i]'
      );
      phoneInputs.forEach(attachPhoneValidation);
    }

    initPhoneInputs();

    // Observe dynamic elements (e.g. dashboard tabs)
    const phoneObserver = new MutationObserver(() => {
      initPhoneInputs();

});
    phoneObserver.observe(document.body, { childList: true, subtree: true

});
  })();

  /* ==========================================================================
     NAME INPUT â€” STRICT LETTERS ONLY (a-z, A-Z, space)
     Blocks: numbers, digits, symbols, and all special characters
     Allows: ONLY alphabetic letters and spaces
     ========================================================================== */
  (() => {
    const CONTROL_KEYS = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End'
    ];

    function sanitizeNameValue(value) {
      if (!value) return '';
      // Strip everything that is not a letter or space
      return value.replace(/[^a-zA-Z\s]/g, '');
    }

    function flashError(input) {
      input.style.borderColor = '#ef4444';
      input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.25)';
      setTimeout(() => {
        input.style.borderColor = '';
        input.style.boxShadow = '';
      }, 500);
    }

    function attachNameValidation(input) {
      if (input.dataset.nameValidated === 'true') return;
      input.dataset.nameValidated = 'true';

      // Keydown: Allow only letters a-z, A-Z, space, and control keys
      input.addEventListener('keydown', (e) => {
        if (CONTROL_KEYS.includes(e.key)) return;
        if (e.ctrlKey || e.metaKey) return;

        // Block numbers and special characters
        if (!/^[a-zA-Z\s]$/.test(e.key)) {
          e.preventDefault();
          flashError(input);
        }

});

      // Paste: sanitize immediately
      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData('text') || '';
        const cleaned = sanitizeNameValue(text);
        const start = input.selectionStart || 0;
        const end = input.selectionEnd || 0;
        const current = input.value || '';
        input.value = current.slice(0, start) + cleaned + current.slice(end);
        input.dispatchEvent(new Event('input', { bubbles: true }));

});

      // Input event: sanitize for IME, autocomplete, speech-to-text
      input.addEventListener('input', () => {
        const cleaned = sanitizeNameValue(input.value);
        if (cleaned !== input.value) {
          const cursor = input.selectionStart || 0;
          input.value = cleaned;
          try { input.setSelectionRange(cursor - 1, cursor - 1); } catch (err) {}
        }

});
    }

    // Target all name inputs across site
    function initNameInputs() {
      const nameInputs = document.querySelectorAll(
        '.name-input, input[id*="Name" i], input[name*="name" i], input[placeholder*="name" i]'
      );
      nameInputs.forEach((input) => {
        // Exclude company name / enterprise name if it needs numbers, but if class is .name-input or personal name, enforce it
        if (input.id === 'companyName') return; // Enterprise names can contain numbers
        attachNameValidation(input);

});
    }

    initNameInputs();

    // Observe dynamic elements
    const nameObserver = new MutationObserver(() => {
      initNameInputs();

});
    nameObserver.observe(document.body, { childList: true, subtree: true

});
  })();

  /* ==========================================================================
     CONTACT FORM SUBMISSION WITH TOAST NOTIFICATION
     ========================================================================== */
  (() => {
    const contactForm = document.getElementById('contactPageForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const phoneInput = document.getElementById('contactPhone');
      const serviceInput = document.getElementById('contactService');
      const messageInput = document.getElementById('contactMessage');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (!nameInput?.value.trim()) {
        alert('Please enter your full name (letters only).');
        nameInput?.focus();
        return;
      }

      if (!emailInput?.value.trim()) {
        alert('Please enter your corporate email address.');
        emailInput?.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        const origText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
          <svg class="spin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
          <span>Transmitting Inquiry...</span>
        `;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origText;

          // Show elegant success alert
          const alertBox = document.getElementById('contactFormSuccessAlert');
          if (alertBox) {
            alertBox.style.display = 'block';
            alertBox.scrollIntoView({ behavior: 'smooth', block: 'center'

});
            setTimeout(() => {
              alertBox.style.display = 'none';
            }, 8000);
          } else {
            alert('Thank you! Your strategic consultation request has been received. Our executive advisory team will contact you within 2 business hours.');
          }

          contactForm.reset();
        }, 1200);
      }

});
  })();

  /* ==========================================================================
     CLIENT REVIEWS SLIDER (About Page & Subpages)
     ========================================================================== */
  (function initClientReviewsSlider() {
    const track = document.getElementById('aboutReviewTrack');
    const prevBtn = document.getElementById('aboutReviewPrev');
    const nextBtn = document.getElementById('aboutReviewNext');
    const dotsWrap = document.getElementById('aboutReviewDots');
    if (!track) return;

    const slides = track.querySelectorAll('.reviews-slide-item');
    const totalSlides = slides.length;
    if (totalSlides === 0) return;

    let currentIndex = 0;
    let autoSlideTimer = null;

    // Build dots
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'review-dot-btn' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
        dot.addEventListener('click', () => {
          goToSlide(i);
          resetAutoSlide();

});
        dotsWrap.appendChild(dot);
      }
    }

    function updateDots() {
      if (!dotsWrap) return;
      const dots = dotsWrap.querySelectorAll('.review-dot-btn');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);

});
    }

    function goToSlide(index) {
      if (index < 0) {
        currentIndex = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();

});
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();

});
    }

    // Auto-advance every 5 seconds
    function startAutoSlide() {
      stopAutoSlide();
      autoSlideTimer = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    function resetAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    // Pause on hover
    const frame = track.closest('.reviews-slider-frame');
    if (frame) {
      frame.addEventListener('mouseenter', stopAutoSlide);
      frame.addEventListener('mouseleave', startAutoSlide);

      // Touch swipe support
      let touchStartX = 0;
      let touchEndX = 0;

      frame.addEventListener('touchstart', (e) => {
        stopAutoSlide();
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true

});

      frame.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
      }, { passive: true

});

      function handleSwipe() {
        const threshold = 40;
        if (touchEndX < touchStartX - threshold) {
          nextSlide();
        } else if (touchEndX > touchStartX + threshold) {
          prevSlide();
        }
      }
    }

    startAutoSlide();
  })();

  /* ==========================================================================
     LEADERSHIP TEAM SOCIAL EXPAND (Touch & Click Support)
     ========================================================================== */
  (function initLeadershipSocial() {
    const plusBtns = document.querySelectorAll('.leadership-plus-btn');
    if (!plusBtns.length) return;

    plusBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.leadership-card');
        if (!card) return;

        const wasActive = card.classList.contains('social-active');

        // Close all cards first
        document.querySelectorAll('.leadership-card.social-active').forEach((c) => {
          c.classList.remove('social-active');
          const b = c.querySelector('.leadership-plus-btn');
          if (b) b.setAttribute('aria-expanded', 'false');

});

        // Toggle clicked card
        if (!wasActive) {
          card.classList.add('social-active');
          btn.setAttribute('aria-expanded', 'true');
        }

});

});

    // Close on outside touch/click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.leadership-card')) {
        document.querySelectorAll('.leadership-card.social-active').forEach((c) => {
          c.classList.remove('social-active');
          const b = c.querySelector('.leadership-plus-btn');
          if (b) b.setAttribute('aria-expanded', 'false');

});
      }

});
  })();

  /* ==========================================================================
     COMMON QUERIES / FAQ ACCORDION INTERACTION
     ========================================================================== */
  (function initCommonQueriesAccordion() {
    const cards = document.querySelectorAll('.query-accordion-card');
    if (!cards.length) return;

    cards.forEach((card) => {
      const headerBtn = card.querySelector('.query-header-btn');
      if (!headerBtn) return;

      headerBtn.addEventListener('click', () => {
        const isActive = card.classList.contains('active');

        // Close other accordions for sleek single-open behavior
        cards.forEach((c) => {
          c.classList.remove('active');
          const btn = c.querySelector('.query-header-btn');
          if (btn) btn.setAttribute('aria-expanded', 'false');

});

        if (!isActive) {
          card.classList.add('active');
          headerBtn.setAttribute('aria-expanded', 'true');
        }

});

});
  })();

  /* ==========================================================================
     PORTFOLIO STAT COUNTERS ANIMATION
     ========================================================================== */
  (function initPortfolioMetricCounters() {
    const counterElements = document.querySelectorAll('.stat-number-display .counter-num');
    if (!counterElements.length) return;

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counterElements.forEach((el) => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            if (isNaN(target)) return;

            let current = 0;
            const duration = 1600;
            const stepTime = 24;
            const stepIncrement = Math.max(1, Math.ceil(target / (duration / stepTime)));

            const timer = setInterval(() => {
              current += stepIncrement;
              if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
              } else {
                el.textContent = current;
              }
            }, stepTime);

});
          observer.disconnect();
        }

});
    }, { threshold: 0.25

});

    const grid = document.querySelector('.portfolio-stats-grid');
    if (grid) {
      observer.observe(grid);
    }
  })();

  /* ==========================================================================
     BLOG REAL-TIME SEARCH FILTER
     ========================================================================== */
  (function initBlogSearchFilter() {
    const searchInput = document.getElementById('blogSearchInput');
    const posts = document.querySelectorAll('.blog-post-card');
    if (!searchInput || !posts.length) return;

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      let visibleCount = 0;

      posts.forEach((post) => {
        const title = (post.querySelector('.blog-post-title')?.textContent || '').toLowerCase();
        const excerpt = (post.querySelector('.blog-post-excerpt')?.textContent || '').toLowerCase();

        if (!query || title.includes(query) || excerpt.includes(query)) {
          post.style.display = 'block';
          visibleCount++;
        } else {
          post.style.display = 'none';
        }

});

      let noMatchMsg = document.getElementById('blogNoMatchNotice');
      if (visibleCount === 0) {
        if (!noMatchMsg) {
          noMatchMsg = document.createElement('div');
          noMatchMsg.id = 'blogNoMatchNotice';
          noMatchMsg.style.cssText = 'padding: 40px; text-align: center; background: #ffffff; border-radius: 18px; border: 1px dashed #cbd5e1; color: #64748b; font-size: 16px;';
          noMatchMsg.textContent = 'No articles found matching your query. Try searching for "optimization", "cloud", or "security".';
          const feedPane = document.getElementById('blogFeedPane');
          if (feedPane) feedPane.appendChild(noMatchMsg);
        }
        noMatchMsg.style.display = 'block';
      } else if (noMatchMsg) {
        noMatchMsg.style.display = 'none';
      }

});
  })();

  /* ==========================================================================
     ATTRACTIVE CONTENT-AWARE CUSTOM CURSOR SYSTEM
     Dynamic visual feedback adapting to links, buttons, images, text, and sliders
     ========================================================================== */
  (function initCustomCursor() {
    // Only activate on devices with a mouse/pointer (disabled on touch devices)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const ring = document.getElementById('cursorRing');
    const dot  = document.getElementById('cursorDot');
    if (!ring || !dot) return;

    let mouseX = -200, mouseY = -200;
    let ringX = -200, ringY = -200;
    const LAG = 0.16; // Smooth fluid spring lag

    // Direct mouse tracking for high-precision inner dot
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    });

    // Spring animation for outer orbital ring
    function animateCursor() {
      ringX += (mouseX - ringX) * LAG;
      ringY += (mouseY - ringY) * LAG;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Active state tracker
    const ALL_STATES = [
      'cursor-link',
      'cursor-btn',
      'cursor-text',
      'cursor-input',
      'cursor-img',
      'cursor-drag',
      'cursor-hidden'
    ];

    function setCursorState(stateName) {
      ALL_STATES.forEach((s) => {
        if (s !== stateName) document.body.classList.remove(s);
      });
      if (stateName) {
        document.body.classList.add(stateName);
      }
    }

    // Determine state based on hovered target element
    function evaluateTargetState(target) {
      if (!target) return null;

      // Explicit cursor override attribute
      const customData = target.closest('[data-cursor]');
      if (customData) {
        return 'cursor-' + customData.getAttribute('data-cursor');
      }

      // Input, textarea, or editable elements
      if (target.matches('input, textarea, select, [contenteditable="true"]')) {
        return 'cursor-input';
      }

      // Text headings and paragraphs (sleek vertical indicator)
      if (target.matches('h1, h2, h3, h4, h5, h6, .section-title, .hero-heading, .stat-number-display, .process-heading, .auth-brand-title')) {
        return 'cursor-text';
      }

      // Buttons, action CTAs, dropdown toggles
      if (target.closest('button, .btn, [class*="btn-"], .role-tab-btn, .pillar-arrow-btn, .expert-touch-btn, .leadership-plus-btn, .query-header-btn')) {
        return 'cursor-btn';
      }

      // Standard links and menu items
      if (target.closest('a, .nav-link, .auth-back-link, .breadcrumb-item a, .footer-col a')) {
        return 'cursor-link';
      }

      // Sliders, carousels, and review tracks
      if (target.closest('.hero-slider-frame, .reviews-track, .testimonial-slider, .slider-nav-arrows')) {
        return 'cursor-drag';
      }

      // Cards, image wrappers, team experts, portfolio previews
      if (target.closest('.expert-card, .portfolio-card, .blog-post-card, .solution-card, .pillar-card, .process-img-wrap, .stat-card, .partner-badge')) {
        return 'cursor-img';
      }

      return null;
    }

    // Dynamic hover listeners using event delegation
    document.addEventListener('mouseover', (e) => {
      setCursorState(evaluateTargetState(e.target));
    });

    document.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget) {
        setCursorState(null);
      }
    });

    // Window boundary detection
    document.addEventListener('mouseleave', () => setCursorState('cursor-hidden'));
    document.addEventListener('mouseenter', () => setCursorState(null));

    // Tactile press & release feedback
    document.addEventListener('mousedown', () => {
      ring.style.transform = 'translate(-50%, -50%) scale(0.72)';
      dot.style.transform  = 'translate(-50%, -50%) scale(1.4)';
    });

    document.addEventListener('mouseup', () => {
      ring.style.transform = 'translate(-50%, -50%) scale(1)';
      dot.style.transform  = 'translate(-50%, -50%) scale(1)';
    });

  })();

  /* ==========================================================================
     STACKLY PRELOADER CONTROLLER
     ========================================================================== */
  const initStacklyPreloader = () => {
    const preloader = document.getElementById('stacklyPreloader');
    if (!preloader) return;

    document.body.classList.add('preloader-active');

    const progressBar = document.getElementById('preloaderProgressBar');
    const percentLabel = document.getElementById('preloaderPercent');
    const statusText = document.getElementById('preloaderStatusText');

    let currentPercent = 0;
    let targetPercent = 0;
    let isPageLoaded = false;
    let animationComplete = false;

    const phrases = [
      { at: 0, text: 'Synchronizing enterprise workspace...' },
      { at: 35, text: 'Loading advisory framework & analytics...' },
      { at: 70, text: 'Preparing high-velocity cloud architecture...' },
      { at: 94, text: 'Finalizing environment...' },
      { at: 100, text: 'Welcome to Stackly.' }
    ];

    const updateStatus = (pct) => {
      if (!statusText) return;
      for (let i = phrases.length - 1; i >= 0; i--) {
        if (pct >= phrases[i].at) {
          if (statusText.dataset.currentPhrase !== phrases[i].text) {
            statusText.dataset.currentPhrase = phrases[i].text;
            statusText.style.opacity = '0';
            statusText.style.transform = 'translateY(4px)';
            setTimeout(() => {
              statusText.textContent = phrases[i].text;
              statusText.style.opacity = '1';
              statusText.style.transform = 'translateY(0)';
            }, 140);
          }
          break;
        }
      }
    };

    // Smooth percentage progression loop
    const tick = () => {
      if (currentPercent < targetPercent) {
        const step = Math.max(1, Math.ceil((targetPercent - currentPercent) * 0.16));
        currentPercent = Math.min(targetPercent, currentPercent + step);

        if (progressBar) progressBar.style.width = `${currentPercent}%`;
        if (percentLabel) percentLabel.textContent = `${currentPercent}%`;
        updateStatus(currentPercent);
      }

      if (currentPercent >= 100 && !animationComplete) {
        animationComplete = true;
        setTimeout(dismissPreloader, 340);
        return;
      }

      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Dynamic progression intervals for realistic feel
    targetPercent = 28;
    setTimeout(() => { if (!isPageLoaded) targetPercent = 62; }, 400);
    setTimeout(() => { if (!isPageLoaded) targetPercent = 88; }, 850);

    const onComplete = () => {
      if (isPageLoaded) return;
      isPageLoaded = true;
      targetPercent = 100;
    };

    if (document.readyState === 'complete') {
      setTimeout(onComplete, 600);
    } else {
      window.addEventListener('load', () => {
        setTimeout(onComplete, 500);
      });
    }

    // Safety timeout: dismiss gracefully after 2.8s maximum
    setTimeout(onComplete, 2600);

    function dismissPreloader() {
      preloader.classList.add('preloader-hidden');
      document.body.classList.remove('preloader-active');

      setTimeout(() => {
        preloader.style.display = 'none';
      }, 850);
    }
  };

  // =========================================================================
  // SCROLL REVEAL — Intersection Observer (no GSAP, no AOS, vanilla only)
  // Elements with class "scroll-reveal" animate from bottom-up + fade-in
  // when they enter the viewport. Once visible they stay visible (one-shot).
  // =========================================================================
  (function initScrollReveal() {
    var revealEls = document.querySelectorAll('.scroll-reveal');
    if (!revealEls.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // fire once and forget
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -48px 0px'
    });

    revealEls.forEach(function(el) {
      observer.observe(el);
    });
  })();

  initStacklyPreloader();

});
