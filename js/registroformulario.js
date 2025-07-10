
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

  const pass = document.getElementById("password").value;
  const confirmPass = document.getElementById("confirmPassword").value;
  const mensaje = document.getElementById("mensajeRegistro");

  if (pass !== confirmPass) {
    mensaje.style.color = "red";
    mensaje.textContent = "Las contraseñas no coinciden.";
    return;
  }

  const usuario = {
    nombre: document.getElementById("nombre").value.trim(),
    domicilio: document.getElementById("domicilio").value.trim(),
    correo: document.getElementById("correo").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    password: pass
  };

  localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));
  localStorage.setItem("logueado", "true");

  mensaje.style.color = "green";
  mensaje.textContent = "🎉 ¡Registro exitoso! Redirigiendo...";

  setTimeout(() => {
    cerrarModal();
    window.location.href = "pedidosimulacion.html";
  }, 2000);
});

// --- FORMULARIO DE LOGIN ---
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const telefono = document.getElementById("loginTelefono").value.trim();
  const password = document.getElementById("loginPassword").value;
  const mensaje = document.getElementById("mensajeLogin");
  const usuario = JSON.parse(localStorage.getItem("usuarioRegistrado"));

  if (!usuario) {
    mensaje.style.color = "red";
    mensaje.textContent = "No hay usuario registrado.";
    return;
  }

  if (telefono === usuario.telefono && password === usuario.password) {
    mensaje.style.color = "green";
    mensaje.textContent = "✅ Inicio de sesión exitoso.";
    localStorage.setItem("logueado", "true");

    setTimeout(() => {
      cerrarLogin();
      window.location.href = "pedidosimulacion.html";
    }, 1500);
  } else {
    mensaje.style.color = "red";
    mensaje.textContent = "Datos incorrectos.";
  }
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

// --- CHECKOUT: Guardar datos de envío y método de pago ---
document.addEventListener("DOMContentLoaded", () => {
  const btnCheckout = document.getElementById("btnCheckout");
  if (!btnCheckout) return;

  btnCheckout.addEventListener("click", (e) => {
    e.preventDefault();

    // Obtener inputs de envío
    const inputs = [...document.querySelectorAll(".billing-details .input")];
    const camposLlenos = inputs.every(input => input.value.trim() !== "");
    if (!camposLlenos) {
      alert("Por favor llena todos los campos de envío.");
      return;
    }

    // Obtener método de pago seleccionado
    const metodoPagoRadio = document.querySelector('input[name="payment"]:checked');
    if (!metodoPagoRadio) {
      alert("Por favor selecciona un método de pago.");
      return;
    }
    const metodoPago = metodoPagoRadio.nextElementSibling.textContent.trim();

    // Guardar datos de envío
    const datosEnvio = {
      nombre: inputs[0].value.trim(),
      apellido: inputs[1].value.trim(),
      correo: inputs[2].value.trim(),
      direccion: inputs[3].value.trim(),
      ciudad: inputs[4].value.trim(),
      pais: inputs[5].value.trim(),
      telefono: inputs[6].value.trim(),
      notas: document.querySelector('.order-notes textarea').value.trim(),
      metodoPago: metodoPago
    };

    localStorage.setItem("shippingData", JSON.stringify(datosEnvio));

    // Verificar login y redirigir
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


