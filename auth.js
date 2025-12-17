// ============================================
// Sistema de Autenticación
// ============================================

// Verificar si el usuario está autenticado
function checkAuthentication() {
  const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
  
  // Si no está autenticado y no está en la página de login, redirigir
  if (!isAuthenticated && !window.location.pathname.includes('login.html')) {
    window.location.href = 'login.html';
  }
}

// Ejecutar verificación al cargar la página
checkAuthentication();

// Función para cerrar sesión
function logout() {
  sessionStorage.removeItem('authenticated');
  window.location.href = 'login.html';
}

console.log('Sistema de autenticación cargado');
