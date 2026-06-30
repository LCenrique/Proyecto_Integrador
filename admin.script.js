function handleAdminLogin(event) {
  event.preventDefault();
  
  const passwordInput = document.getElementById("login-password").value;
  const CONTRASEÑA_CORRECTA = "admin123"; // Cambia tu contraseña aquí 🔑

  if (passwordInput === CONTRASEÑA_CORRECTA) {
    // Intercambiar pantallas
    document.getElementById("admin-login-view").style.display = "none";
    document.getElementById("admin-dashboard-view").style.display = "block";
    showAdminToast("🔓 Acceso concedido");
    
    // Aquí puedes llamar a la función que cargue la tabla de productos más adelante
  } else {
    showAdminToast("❌ Contraseña incorrecta");
  }
}

function handleLogout() {
  // Limpiar contraseña y regresar al login
  document.getElementById("login-form").reset();
  document.getElementById("admin-dashboard-view").style.display = "none";
  document.getElementById("admin-login-view").style.display = "flex";
}

function showAdminToast(mensaje) {
  const toast = document.getElementById("admin-toast");
  toast.innerText = mensaje;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}