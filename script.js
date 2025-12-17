// ============================================
// Script Principal - Marcel Barti CV
// ============================================

// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });

  // Cerrar menú al hacer clic en un enlace
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });
}

// Navbar scroll effect
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Formulario de contacto - Formspree maneja el envío automáticamente
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // Formspree maneja el envío, permitimos que el formulario se envíe normalmente
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Despu‡s de 3 segundos, restaurar el botón
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 3000);
  });
}

// Descargar CV
const downloadCVButtons = document.querySelectorAll('[data-download-cv]');
downloadCVButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    // El navegador descargará el archivo automáticamente
    const link = document.createElement('a');
    link.href = 'CV_Marcel_Barti.pdf';
    link.download = 'CV_Marcel_Barti.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Animación de fade-in al cargar
window.addEventListener('load', () => {
  document.querySelectorAll('.fade-in').forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
    }, index * 100);
  });
});

// Validación de formulario en tiempo real
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
  input.addEventListener('blur', () => {
    if (input.value.trim() === '') {
      input.style.borderColor = '#dc2626';
    } else {
      input.style.borderColor = '#e5e7eb';
    }
  });

  input.addEventListener('focus', () => {
    input.style.borderColor = '#10b981';
  });
});

// Copiar email al portapapeles
const emailLinks = document.querySelectorAll('[data-copy-email]');
emailLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const email = 'marcelbartiii@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const originalText = link.textContent;
      link.textContent = '¡Copiado!';
      setTimeout(() => {
        link.textContent = originalText;
      }, 2000);
    });
  });
});

console.log('Script cargado correctamente - Formulario integrado con Formspree');
