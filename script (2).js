// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== MOBILE MENU =====
function toggleMenu() {
  const links = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  links.classList.toggle('open');
  hamburger.classList.toggle('open');
}
// Close nav links when a link is clicked
document.getElementById('navLinks').querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('hamburger').classList.remove('open');
  });
});

// ===== SMOOTH SCROLL =====
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== FLOUR PARTICLES =====
function createParticles() {
  const container = document.getElementById('flourParticles');
  if (!container) return;
  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 14 + 4;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      bottom: -20px;
      animation-duration: ${Math.random() * 10 + 8}s;
      animation-delay: ${Math.random() * 8}s;
      opacity: ${Math.random() * 0.4 + 0.1};
    `;
    container.appendChild(p);
  }
}
createParticles();

// ===== MENU FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    menuCards.forEach((card, i) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !show);
      if (show) {
        card.style.animationDelay = `${i * 0.06}s`;
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = 'slideInCard 0.4s ease forwards';
        });
      }
    });
  });
});

// ===== CART SYSTEM =====
let cart = [];

function addToCart(btn, name, price) {
  btn.classList.add('added');
  btn.innerHTML = '<i class="fas fa-check"></i>';
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-plus"></i>';
    btn.classList.remove('added');
  }, 1000);

  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    const emojis = {
      'Butter Croissant': '🥐', 'Classic Sourdough': '🍞',
      'Strawberry Dream Cake': '🍰', 'Salted Caramel Muffin': '🧁',
      'French Baguette': '🥖', 'Dark Chocolate Ganache': '🎂',
      'Artisan Espresso': '☕', 'Crème Brûlée Tart': '🍮'
    };
    cart.push({ name, price, qty: 1, emoji: emojis[name] || '🍞' });
  }
  updateCart();
  showCartFloat();
}

function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.getElementById('cartCount');

  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty"><i class="fas fa-shopping-bag"></i><p>Your cart is empty</p></div>';
    cartTotal.style.display = 'none';
    cartCount.textContent = '0';
    return;
  }

  let total = 0;
  let totalQty = 0;
  cartItems.innerHTML = '';

  cart.forEach((item, idx) => {
    total += item.price * item.qty;
    totalQty += item.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <span>Rs. ${item.price.toLocaleString()} each</span>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="changeQty(${idx}, -1)"><i class="fas fa-minus"></i></button>
        <span>${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${idx}, 1)"><i class="fas fa-plus"></i></button>
      </div>
    `;
    cartItems.appendChild(div);
  });

  const grandTotal = total + 150;
  document.getElementById('subtotal').textContent = `Rs. ${total.toLocaleString()}`;
  document.getElementById('grandTotal').textContent = `Rs. ${grandTotal.toLocaleString()}`;
  cartTotal.style.display = 'block';
  cartCount.textContent = totalQty;
}

function changeQty(idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCart();
  if (cart.length === 0) document.getElementById('cartFloat').style.display = 'none';
}

function showCartFloat() {
  document.getElementById('cartFloat').style.display = 'flex';
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
  document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

// ===== TESTIMONIALS SLIDER =====
const track = document.getElementById('testimonialsTrack');
const dotsContainer = document.getElementById('testimonialDots');
let currentSlide = 0;
const totalCards = document.querySelectorAll('.testimonial-card').length;
let autoPlay;

function getVisibleCount() {
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 4;
}

function initDots() {
  dotsContainer.innerHTML = '';
  const pages = Math.ceil(totalCards / getVisibleCount());
  for (let i = 0; i < pages; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  }
}

function goToSlide(idx) {
  currentSlide = idx;
  const cardWidth = track.querySelector('.testimonial-card').offsetWidth + 24;
  const perPage = getVisibleCount();
  track.style.transform = `translateX(-${idx * perPage * cardWidth}px)`;
  track.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === idx));
}

function nextSlide() {
  const pages = Math.ceil(totalCards / getVisibleCount());
  currentSlide = (currentSlide + 1) % pages;
  goToSlide(currentSlide);
}

function startAutoPlay() {
  autoPlay = setInterval(nextSlide, 4000);
}
function stopAutoPlay() { clearInterval(autoPlay); }

initDots();
startAutoPlay();
track.addEventListener('mouseenter', stopAutoPlay);
track.addEventListener('mouseleave', startAutoPlay);
window.addEventListener('resize', () => { initDots(); goToSlide(0); });

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.menu-card, .gallery-item, .testimonial-card, .about-stat, .value-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ===== CONTACT FORM =====
function submitForm() {
  const name = document.getElementById('formName').value.trim();
  const email = document.getElementById('formEmail').value.trim();
  const message = document.getElementById('formMessage').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all required fields (Name, Email, Message).');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const btn = document.querySelector('.contact-form .btn-primary');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    btn.disabled = false;
    document.getElementById('formSuccess').style.display = 'flex';
    document.getElementById('formName').value = '';
    document.getElementById('formEmail').value = '';
    document.getElementById('formPhone').value = '';
    document.getElementById('formMessage').value = '';
    setTimeout(() => { document.getElementById('formSuccess').style.display = 'none'; }, 5000);
  }, 1500);
}

// ===== NEWSLETTER =====
function subscribeNewsletter() {
  const email = document.getElementById('newsEmail').value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('newsEmail').focus();
    return;
  }
  document.getElementById('newsEmail').value = '';
  document.getElementById('newsSuccess').style.display = 'block';
  setTimeout(() => { document.getElementById('newsSuccess').style.display = 'none'; }, 4000);
}

// ===== GALLERY HOVER GLOW =====
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    item.style.transform = 'scale(1.05)';
    item.style.boxShadow = '0 20px 60px rgba(59,31,14,0.2)';
    setTimeout(() => {
      item.style.transform = '';
      item.style.boxShadow = '';
    }, 600);
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--rose)';
        }
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => navObserver.observe(s));

// ===== HERO TEXT TYPING EFFECT (subtle) =====
window.addEventListener('load', () => {
  document.querySelector('.hero-title').style.animation = 'fadeUp 0.8s ease both';
});
