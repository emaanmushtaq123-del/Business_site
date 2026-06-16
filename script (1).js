// ===========================
//  NAMRA FRAGRANCES – script.js
// ===========================

/* ---- Sticky Navbar ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ---- Mobile Hamburger ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ---- Cart Counter ---- */
let cartCount = 0;
const cartBadge = document.getElementById('cartBadge');

function addToCart(btn) {
  cartCount++;
  cartBadge.textContent = cartCount;

  // Button feedback
  btn.textContent = 'Added ✓';
  btn.style.background = 'var(--gold)';
  btn.style.color      = 'var(--black)';
  setTimeout(() => {
    btn.textContent     = 'Add to Cart';
    btn.style.background = '';
    btn.style.color      = '';
  }, 1800);

  showToast('Item added to your bag!');
}

/* ---- Toast Notification ---- */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ---- Contact Form ---- */
function handleForm(e) {
  e.preventDefault();
  showToast('Message sent! We\'ll reply within 24 hours ✦');
  e.target.reset();
}

/* ---- Scroll Reveal (Intersection Observer) ---- */
const revealEls = document.querySelectorAll(
  '.product-card, .testi-card, .collection-card, .about-grid, .ci-item, .af-item'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger effect using index
      const delay = (Array.from(revealEls).indexOf(entry.target) % 4) * 80;
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});

/* ---- Active Nav Link on Scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--gold)' : '';
  });
});

/* ---- Smooth scroll polyfill fallback ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- Newsletter ---- */
const newsletterBtn = document.querySelector('.newsletter button');
if (newsletterBtn) {
  newsletterBtn.addEventListener('click', () => {
    const input = document.querySelector('.newsletter input');
    if (input && input.value.includes('@')) {
      showToast('Subscribed! Welcome to Namra ✦');
      input.value = '';
    } else {
      showToast('Please enter a valid email address.');
    }
  });
}

/* ---- Console greeting ---- */
console.log('%c✦ Namra Fragrances – Where Every Scent Tells a Story ✦', 
  'color:#c9a84c; font-size:14px; font-family:Georgia,serif; padding:6px;');
