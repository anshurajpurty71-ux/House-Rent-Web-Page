/* =============================================
   SilverNest Rental Website — JavaScript
   ============================================= */

'use strict';

/* ---- Loading Screen ---- */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('done');
  }, 1600);
});

/* ---- Dark Mode Toggle ---- */
const darkToggle = document.getElementById('darkToggle');
const body = document.body;

const savedTheme = localStorage.getItem('silverness-theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  if (darkToggle) darkToggle.textContent = '☀️';
}

if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    darkToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('silverness-theme', isDark ? 'dark' : 'light');
  });
}

/* ---- Sticky Navbar ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---- Mobile Hamburger Menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close on nav link click
  navLinks.querySelectorAll('.nav-link, .nav-cta-btn').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ---- Hero Slider ---- */
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('sliderDots');
let currentSlide = 0;
let sliderInterval;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Slide ${i + 1}`);
  dot.addEventListener('click', () => goToSlide(i));
  if (dotsContainer) dotsContainer.appendChild(dot);
});

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dotsContainer.querySelectorAll('.dot')[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dotsContainer.querySelectorAll('.dot')[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

document.getElementById('sliderNext')?.addEventListener('click', () => { nextSlide(); resetInterval(); });
document.getElementById('sliderPrev')?.addEventListener('click', () => { prevSlide(); resetInterval(); });

function resetInterval() {
  clearInterval(sliderInterval);
  sliderInterval = setInterval(nextSlide, 4000);
}
sliderInterval = setInterval(nextSlide, 4000);

/* ---- Gallery Lightbox ---- */
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbCaption = document.getElementById('lbCaption');
let currentLbIndex = 0;

const galleryData = [
  { src: 'images/house1.png', caption: '3D Front View — Modern Exterior Design' },
  { src: 'images/house2.png', caption: 'NH-33 Road View — Excellent Connectivity' },
  { src: 'images/house3.png', caption: 'Building Structure Under Construction' },
  { src: 'images/house4.png', caption: 'Second Floor Plan — 1628 Sq Ft' },
  { src: 'images/house5.png', caption: 'Road View — National Highway 33' },
  { src: 'images/house6.png', caption: 'Construction Progress View' },
];

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

function openLightbox(index) {
  currentLbIndex = index;
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const data = galleryData[currentLbIndex];
  lbImage.src = data.src;
  lbImage.alt = data.caption;
  lbCaption.textContent = data.caption;
}

document.getElementById('lbPrev')?.addEventListener('click', () => {
  currentLbIndex = (currentLbIndex - 1 + galleryData.length) % galleryData.length;
  updateLightbox();
});

document.getElementById('lbNext')?.addEventListener('click', () => {
  currentLbIndex = (currentLbIndex + 1) % galleryData.length;
  updateLightbox();
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'ArrowLeft') {
    currentLbIndex = (currentLbIndex - 1 + galleryData.length) % galleryData.length;
    updateLightbox();
  } else if (e.key === 'ArrowRight') {
    currentLbIndex = (currentLbIndex + 1) % galleryData.length;
    updateLightbox();
  } else if (e.key === 'Escape') {
    closeLightbox();
  }
});

/* ---- FAQ Accordion ---- */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const wasOpen = item.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

/* ---- Counter Animations ---- */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const step = Math.ceil(target / (duration / 16));
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current.toLocaleString('en-IN');
  }, 16);
}

/* ---- Scroll Reveal & Intersection Observer ---- */
const revealEls = document.querySelectorAll('.reveal');
const counterEls = document.querySelectorAll('.stat-num');
let countersStarted = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      counterEls.forEach(el => animateCounter(el));
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

/* ---- Back to Top ---- */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (backToTop) {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---- Share Property ---- */
const shareBtn = document.getElementById('shareBtn');
if (shareBtn) {
  shareBtn.addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Premium 2BHK Flat for Rent | Tupudana, Jamshedpur',
          text: 'Check out this premium 2BHK apartment for rent near Silver Springs, NH-33, Tupudana. ₹9,000/month.',
          url: window.location.href,
        });
      } catch (e) {
        copyLink();
      }
    } else {
      copyLink();
    }
  });
}

function copyLink() {
  const url = window.location.href;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      showToast('🔗 Link copied to clipboard!');
    });
  } else {
    const ta = document.createElement('textarea');
    ta.value = url;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('🔗 Link copied to clipboard!');
  }
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 6rem; left: 50%; transform: translateX(-50%);
    background: #1c1b18; color: white; padding: 0.75rem 1.5rem;
    border-radius: 99px; font-size: 0.9rem; font-weight: 500;
    z-index: 9999; box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    animation: fadeInUp 0.3s ease;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => { toast.remove(); }, 3000);
}

/* ---- Inquiry Form Validation & Submission ---- */
function submitInquiry(method) {
  const name   = document.getElementById('inp-name');
  const phone  = document.getElementById('inp-phone');
  const email  = document.getElementById('inp-email');
  const occ    = document.getElementById('inp-occ');
  const date   = document.getElementById('inp-date');
  const count  = document.getElementById('inp-occ-count');

  // Clear errors
  ['name','phone','email','occ','date','count'].forEach(id => {
    const el = document.getElementById(`err-${id}`);
    if (el) el.textContent = '';
  });
  [name, phone, email, occ, date, count].forEach(el => el?.classList.remove('error'));

  let valid = true;

  function setError(field, errId, msg) {
    const errEl = document.getElementById(errId);
    if (errEl) errEl.textContent = msg;
    if (field) field.classList.add('error');
    valid = false;
  }

  if (!name?.value.trim()) setError(name, 'err-name', 'Name is required');
  if (!phone?.value.trim()) {
    setError(phone, 'err-phone', 'Phone is required');
  } else if (!/^[\+\d\s\-]{7,15}$/.test(phone.value.trim())) {
    setError(phone, 'err-phone', 'Enter a valid phone number');
  }
  if (!email?.value.trim()) {
    setError(email, 'err-email', 'Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    setError(email, 'err-email', 'Enter a valid email address');
  }
  if (!occ?.value.trim()) setError(occ, 'err-occ', 'Occupation is required');
  if (!date?.value) setError(date, 'err-date', 'Move-in date is required');
  if (!count?.value) setError(count, 'err-count', 'Number of occupants is required');

  if (!valid) return;

  // Build the inquiry message
  const message = `Hello,

I am interested in your rental property.

My Details:
Name: ${name.value.trim()}
Phone: ${phone.value.trim()}
Email: ${email.value.trim()}
Occupation: ${occ.value.trim()}
Move-in Date: ${date.value}
Occupants: ${count.value}

Please share more details about the property and rental terms.

Thank you.`;

  const encodedMsg = encodeURIComponent(message);
  const ownerPhone = '919508834199';

  if (method === 'whatsapp') {
    window.open(`https://wa.me/${ownerPhone}?text=${encodedMsg}`, '_blank');
  } else {
    // SMS — works on mobile browsers
    window.location.href = `sms:+${ownerPhone}?body=${encodedMsg}`;
  }

  // Show success message
  const formMsg = document.getElementById('formMsg');
  if (formMsg) {
    formMsg.className = 'form-message success';
    formMsg.textContent = '✅ Opening your messaging app with the inquiry message...';
    formMsg.style.display = 'block';
    setTimeout(() => { formMsg.style.display = 'none'; }, 5000);
  }
}

/* ---- Active nav link on scroll ---- */
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      allNavLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

/* ---- Lazy Loading ---- */
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) img.src = img.dataset.src;
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  lazyImages.forEach(img => imgObserver.observe(img));
}

/* ---- Toast fade-in animation (inject style once) ---- */
const toastStyle = document.createElement('style');
toastStyle.textContent = `@keyframes fadeInUp { from { opacity:0; transform: translateX(-50%) translateY(10px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }`;
document.head.appendChild(toastStyle);
