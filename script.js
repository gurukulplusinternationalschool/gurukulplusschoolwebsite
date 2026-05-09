// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

navToggle.addEventListener('click', () => mobileMenu.classList.add('active'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('active'));
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('active'));
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal, .reveal-left');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.hero-stat .num[data-count]');
let counterStarted = false;
const startCounters = () => {
  if (counterStarted) return;
  counterStarted = true;
  counters.forEach(counter => {
    const target = +counter.dataset.count;
    const duration = 2000;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(animate);
      else counter.textContent = target.toLocaleString() + (counter.closest('.hero-stat').querySelector('.label').textContent.includes('%') ? '%' : '+');
    };
    requestAnimationFrame(animate);
  });
};
const heroObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) startCounters();
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
});

// ===== CONTACT FORM BUTTON =====

const form = document.getElementById("contact");
const result = document.getElementById("result");
const phoneInput = document.getElementById("phone");

/* ===== ALLOW ONLY NUMBERS ===== */

phoneInput.addEventListener("input", function () {

  this.value = this.value.replace(/\D/g, "");

});

/* ===== FORM SUBMIT ===== */

form.addEventListener("submit", async function (e) {

  e.preventDefault();

  /* ===== VALIDATION ===== */

  if (!form.checkValidity()) {

    result.innerHTML =
      "❌ Please fill all fields correctly.";

    result.style.color = "red";

    return;

  }

  const button =
    form.querySelector("button[type='submit']");

  button.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Sending...';

  button.disabled = true;

  const formData = new FormData(form);

  try {

    const response = await fetch(
      "https://api.web3forms.com/submit",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    if (data.success) {

      result.innerHTML =
        "✅ Message sent successfully!";

      result.style.color = "green";

      form.reset();

    } else {

      result.innerHTML =
        "❌ Failed to send message.";

      result.style.color = "red";
    }

  } catch (error) {

    result.innerHTML =
      "❌ Network error. Please try again.";

    result.style.color = "red";

  }

  button.innerHTML =
    '<i class="fas fa-paper-plane"></i> Send Message';

  button.disabled = false;

});

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
