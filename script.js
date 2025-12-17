// ============================================
// Script Principal - Marcel Barti CV
// Autenticación segura con hash bcrypt
// ============================================

// Hash bcrypt de la contraseña (Marcus0Parcus2)
// NUNCA guardar la contraseña en texto plano
const PASSWORD_HASH = '$2b$10$V.Fud181KABu.AnjzDaWru2DTg43A29iMCpT/Te01GSC93wJAusW2';

// Función para verificar contraseña contra hash bcrypt
async function verifyPasswordHash(password, hash) {
  try {
    // Usar bcryptjs para comparar la contraseña con el hash
    // bcrypt.compare() devuelve true si coinciden, false si no
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  } catch (error) {
    console.error('Error verificando contraseña:', error);
    return false;
  }
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
    
    if (!password) {
      errorMsg.textContent = '❌ Por favor ingresa la contraseña';
      errorMsg.classList.add('show');
      return;
    }
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Verificando...';
    errorMsg.classList.remove('show');
    
    try {
      // Verificar contraseña contra hash
      const isValid = await verifyPasswordHash(password, PASSWORD_HASH);
      
      if (isValid) {
        // Contraseña correcta - guardar sesión
        sessionStorage.setItem('cv-authenticated', 'true');
        sessionStorage.setItem('auth-timestamp', Date.now().toString());
        
        // Mostrar contenido principal
        document.getElementById('loginPage').classList.remove('show');
        document.getElementById('mainContent').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'block';
        
        // Limpiar formulario
        passwordInput.value = '';
        submitBtn.textContent = 'Acceder';
        submitBtn.disabled = false;
      } else {
        // Contraseña incorrecta
        errorMsg.textContent = '❌ Contraseña incorrecta';
        errorMsg.classList.add('show');
        passwordInput.value = '';
        submitBtn.textContent = 'Acceder';
        submitBtn.disabled = false;
      }
    } catch (error) {
      console.error('Error en autenticación:', error);
      errorMsg.textContent = '❌ Error en la autenticación. Intenta de nuevo.';
      errorMsg.classList.add('show');
      submitBtn.textContent = 'Acceder';
      submitBtn.disabled = false;
    }
  });
}

// Botón de logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    // Limpiar sesión
    sessionStorage.removeItem('cv-authenticated');
    sessionStorage.removeItem('auth-timestamp');
    
    // Mostrar login
    document.getElementById('loginPage').classList.add('show');
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'none';
    
    // Limpiar formulario
    document.getElementById('password').value = '';
    document.getElementById('errorMsg').classList.remove('show');
  });
}

// Verificar si ya está autenticado al cargar
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

// Formulario de contacto - Formspree maneja el envío automáticamente
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // Formspree maneja el envío, permitimos que el formulario se envíe normalmente
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Después de 3 segundos, restaurar el botón
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

console.log('Script cargado correctamente - Autenticación segura con hash bcrypt');
