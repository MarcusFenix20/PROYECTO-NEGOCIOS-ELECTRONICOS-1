document.addEventListener("DOMContentLoaded", function () {
  const btnCompra = document.getElementById("btnCompra");

  btnCompra.addEventListener("click", function (e) {
    e.preventDefault();

    const logueado = localStorage.getItem("logueado");

    if (logueado === "true") {
      alert("¡Gracias por tu compra! Redirigiendo al carrito...");
      // Aquí podrías redirigir a otra página si lo deseas
    } else {
      mostrarMensajeFlotante("Por favor, regístrate antes de comprar.");
    }
  });
});

function mostrarMensajeFlotante(mensaje) {
  const div = document.createElement("div");
  div.textContent = mensaje;
  div.style.position = "fixed";
  div.style.top = "20px";
  div.style.right = "20px";
  div.style.padding = "15px";
  div.style.backgroundColor = "#ff5252";
  div.style.color = "white";
  div.style.borderRadius = "10px";
  div.style.zIndex = "9999";
  div.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
  document.body.appendChild(div);

  setTimeout(() => {
    document.body.removeChild(div);
  }, 3000);
}
