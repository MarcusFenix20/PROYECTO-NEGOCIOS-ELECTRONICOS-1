// Borra datos sensibles al recargar Live Server
localStorage.removeItem("usuarioRegistrado");
localStorage.removeItem("logueado");
localStorage.removeItem("shippingData");

// --- MODALES ---
function abrirModal() {
  document.getElementById("modalRegistro").style.display = "block";
}
function cerrarModal() {
  document.getElementById("modalRegistro").style.display = "none";
}
function mostrarLogin() {
  document.getElementById("modalLogin").style.display = "block";
}
function cerrarLogin() {
  document.getElementById("modalLogin").style.display = "none";
}

// --- CIERRE MODAL AL HACER CLIC FUERA ---
window.onclick = function (event) {
  const modalRegistro = document.getElementById("modalRegistro");
  const modalLogin = document.getElementById("modalLogin");
  if (event.target === modalRegistro) cerrarModal();
  if (event.target === modalLogin) cerrarLogin();
};

// --- FORMULARIO DE REGISTRO ---
document.getElementById("registroForm").addEventListener("submit", function (e) {
  e.preventDefault();

  localStorage.setItem("logueado", "true");
  setTimeout(() => {
    cerrarModal();
    window.location.href = "pedidosimulacion.html";
  }, 1000);
});

// --- FORMULARIO DE LOGIN ---
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  localStorage.setItem("logueado", "true");
  setTimeout(() => {
    cerrarLogin();
    window.location.href = "pedidosimulacion.html";
  }, 1000);
});

// --- Cambiar entre modales ---
function cambiarAlogin() {
  cerrarModal();
  mostrarLogin();
}
function cambiarAregistro() {
  cerrarLogin();
  abrirModal();
}

// --- CHECKOUT: Guardar y redirigir ---
document.addEventListener("DOMContentLoaded", () => {
  const btnCheckout = document.getElementById("btnCheckout");
  if (!btnCheckout) return;

  btnCheckout.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.setItem("shippingData", "true");

    const logueado = localStorage.getItem("logueado");
    if (logueado === "true") {
      window.location.href = "pedidosimulacion.html";
    } else {
      if (typeof abrirModal === "function") {
        abrirModal();
      } else {
        alert("Debes iniciar sesión o registrarte para continuar.");
      }
    }
  });
});
