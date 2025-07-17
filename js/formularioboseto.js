// Mostrar y cerrar el modal de registro
function abrirModal() {
  document.getElementById("modalRegistro").style.display = "block";
}

function cerrarModal() {
  document.getElementById("modalRegistro").style.display = "none";
}

function cerrarLogin() {
  document.getElementById("modalLogin").style.display = "none";
}

// Registro de usuario
document.addEventListener("DOMContentLoaded", function () {
  const registroForm = document.getElementById("registroForm");
  const mensajeRegistro = document.getElementById("mensajeRegistro");

  registroForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const domicilio = document.getElementById("domicilio").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      mensajeRegistro.textContent = "Las contraseñas no coinciden.";
      mensajeRegistro.style.color = "red";
      return;
    }

    const usuario = {
      nombre,
      domicilio,
      correo,
      telefono,
      password
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));
    mensajeRegistro.textContent = "Registro exitoso. Ahora inicia sesión.";
    mensajeRegistro.style.color = "green";

    setTimeout(() => {
      cerrarModal();
      document.getElementById("modalLogin").style.display = "block";
    }, 1500);
  });

  // Inicio de sesión
  const loginForm = document.getElementById("loginForm");
  const mensajeLogin = document.getElementById("mensajeLogin");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const tel = document.getElementById("loginTelefono").value;
    const pass = document.getElementById("loginPassword").value;

    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioGuardado) {
      mensajeLogin.textContent = "No hay usuarios registrados.";
      mensajeLogin.style.color = "red";
      return;
    }

    if (usuarioGuardado.telefono === tel && usuarioGuardado.password === pass) {
      localStorage.setItem("logueado", "true");
      mensajeLogin.textContent = "Inicio de sesión exitoso.";
      mensajeLogin.style.color = "green";
      setTimeout(() => {
        cerrarLogin();
      }, 1500);
    } else {
      mensajeLogin.textContent = "Teléfono o contraseña incorrectos.";
      mensajeLogin.style.color = "red";
    }
  });
});
