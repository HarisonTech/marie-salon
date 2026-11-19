const HEADER_HTML = `
<header>
  <div class="contain header-container">
    <a href="#" class="logo">
      <img src="images/44444.jpeg" alt="Marie Beauty Studio Logo">
      <div class="logo-text">
        MARIE <span>BEAUTY STUDIO</span>
      </div>
    </a>
    <nav>
      <ul>
        <li><a href="dashboard.html">DASHBOARD</a></li>
        <li><a href="home.html">HOME</a></li>
        <li><a href="about.html">ABOUT</a></li>
        <li><a href="services.html">SERVICES</a></li>
        <li><a href="pricing.html">PRICING</a></li>
      </ul>
    </nav>
    <div class="nav-buttons">
      <a href="form.html" class="btn btn-secondary">Sign In</a>
      <a href="" class="btn btn-primary">Contact us</a>
    </div>
  </div>
</header>
`;

const FOOTER_HTML = `
<footer>
  <div class="lastlast">
    <div class="footer-content">
      <div class="footer-column">
        <h3>About Marie Beauty</h3>
        <p>Marie beauty Studio dedicated to quality, sustainability and the perfect styles.</p><br>
        <h3>Follow Us On</h3>
        <div class="social-links">
          <a href="https://www.instagram.com/mariebeautystudios254" target="_blank"><i class="fab fa-instagram"></i></a>
          <a href="https://www.tiktok.com/@mariebeautystudio254" target="_blank"><i class="fab fa-tiktok"></i></a>
          <a href="https://www.facebook.com/profile.php?id=100092289681241" target="_blank"><i class="fab fa-facebook"></i></a>
          <a href="https://www.pinterest.com/Marie Beauty Studio" target="_blank"><i class="fab fa-pinterest"></i></a>
        </div>
      </div>
      <div class="footer-column">
        <h3>Quick links</h3>
        <ul class="footer-links">
          <li><a href="home.html">HOME</a></li>
          <li><a href="about.html">ABOUT</a></li>
          <li><a href="services.html">SERVICES</a></li>
          <li><a href="pricing.html">PRICING</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h3>Contact Us</h3>
        <ul class="footer-links">
          <li><a href="https://www.google.com/maps/search/?api=1&query=Marie+Beauty+Studio" target="_blank" rel="noopener noreferrer"><i class="fas fa-map-marker-alt"></i> <span>Kilimani Nairobi, Kenya</span></a></li>
          <li><a href="tel:+254792157132"><i class="fas fa-phone"></i> <span>+254792157132</span></a></li>
          <li><a href="mailto:mariebeautystudio254@gmail.com"><i class="fas fa-envelope"></i><span>mariebeautystudio254@gmail.com</span></a></li>
          <li><i class="fas fa-clock"></i> <span>Mon-Sat: 7am-8pm, Sun: 9am-7pm</span></li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      Copyright &copy; Marie Beauty Studio, <span>Created by <button>Marie Beauty Studio</button></span>.
    </div>
  </div>
</footer>
`;

const TOP_BAR_HTML = `
<div class="had">
  <p>Free delivery for all orders above ksh 7000. Within Nairobi.</p>
</div>
<div class="contact">
  <div class="socials">
    <ul>
      <li><a href="https://www.facebook.com/Marie Beauty Studio" target="_blank"><i class="fab fa-facebook"></i>Facebook</a></li>
      <li><a href="https://www.instagram.com/@mariebeautystudio254" target="_blank"><i class="fab fa-instagram"></i>Instagram</a></li>
      <li><a href="https://www.tiktok.com/@mariebeautystudio254" target="_blank"><i class="fab fa-tiktok"></i>TikTok</a></li>
    </ul>
  </div>
  <div class="about">
    <ul>
      <li class="ab"><a href="about.html">About</a></li>
      <li class="ab"><a href="services.html">Blog</a></li>
      <li class="ab"><a href="">Help</a></li>
    </ul>
  </div>
</div>
`;

function injectComponents() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  const topBarPlaceholder = document.getElementById('top-bar-placeholder');

  if (headerPlaceholder) headerPlaceholder.innerHTML = HEADER_HTML;
  if (footerPlaceholder) footerPlaceholder.innerHTML = FOOTER_HTML;
  if (topBarPlaceholder) topBarPlaceholder.innerHTML = TOP_BAR_HTML;

  setActiveNavLink();
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'home.html';
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'home.html')) {
      link.classList.add('active');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectComponents);
} else {
  injectComponents();
}
