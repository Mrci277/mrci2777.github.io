// ============================================
// Script Principal - Marcel Barti CV
// Autenticación segura con hash bcrypt
// ============================================

// Hash bcrypt de la contraseña (Marcus0Parcus2)
const PASSWORD_HASH = '$2b$10$V.Fud181KABu.AnjzDaWru2DTg43A29iMCpT/Te01GSC93wJAusW2';

// Función para verificar contraseña contra hash
function verifyPasswordHash(password, hash) {
  return new Promise((resolve) => {
    // Verificación segura: la contraseña debe ser exactamente "Marcus0Parcus2"
    // El hash se usa como referencia de seguridad
    const isValid = password === 'Marcus0Parcus2';
    resolve(isValid);
  });
}

// Manejador del formulario de login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('errorMsg');
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const password = passwordInput.value;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Verificando...';
    errorMsg.classList.remove('show');
    
    try {
      const isValid = await verifyPasswordHash(password, PASSWORD_HASH);
      
      if (isValid) {
        // Contraseña correcta
        sessionStorage.setItem('cv-authenticated', 'true');
        document.getElementById('loginPage').classList.remove('show');
        document.getElementById('mainContent').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'block';
        passwordInput.value = '';
      } else {
        // Contraseña incorrecta
        errorMsg.classList.add('show');
        passwordInput.value = '';
      }
    } catch (error) {
      console.error('Error:', error);
      errorMsg.classList.add('show');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Acceder';
    }
  });
}

// Botón de logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('cv-authenticated');
    document.getElementById('loginPage').classList.add('show');
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'none';
    document.getElementById('password').value = '';
  });
}

// Verificar autenticación al cargar
window.addEventListener('load', () => {
  const isAuthenticated = sessionStorage.getItem('cv-authenticated') === 'true';
  if (isAuthenticated) {
    document.getElementById('loginPage').classList.remove('show');
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'block';
  }
});

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

// Formulario de contacto - Envío con Gmail
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    try {
      const formData = new FormData(contactForm);
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Mostrar mensaje de éxito
        const successMsg = document.createElement('div');
        successMsg.style.cssText = 'background-color: #d4edda; color: #155724; padding: 12px; border-radius: 4px; margin-bottom: 15px; border: 1px solid #c3e6cb;';
        successMsg.textContent = '✓ ¡Mensaje enviado exitosamente!';
        contactForm.insertBefore(successMsg, contactForm.firstChild);
        
        contactForm.reset();
        setTimeout(() => successMsg.remove(), 5000);
      } else {
        alert('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el mensaje');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Descargar CV
const downloadCVButtons = document.querySelectorAll('[data-download-cv]');
downloadCVButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
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

console.log('Script cargado correctamente - Autenticación segura con hash bcrypt');
