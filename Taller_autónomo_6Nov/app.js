// Expresiones regulares para cada campo
const regex = {
  cedula: /^[0-9]{10}$/,
  texto: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,40}$/,
  direccion: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,#-]{5,80}$/,
  telefono: /^09[0-9]{8}$/,
  correo: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  paralelo: /^[a-zA-Z]{1}$/
};

const formulario = document.getElementById("formularioEstudiante");
const cuerpoTabla = document.getElementById("cuerpoTabla");

// Cargar registros existentes al abrir la página
document.addEventListener("DOMContentLoaded", mostrarEstudiantes);

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  // Limpiar mensajes previos
  limpiarErrores();

  // Obtener valores de los campos
  const cedula = document.getElementById("cedula").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const nombres = document.getElementById("nombres").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const facultad = document.getElementById("facultad").value;
  const nivel = document.getElementById("nivel").value;
  const paralelo = document.getElementById("paralelo").value.trim().toUpperCase();

  let esValido = true;

  // Validaciones con regex y reglas básicas
  if (!regex.cedula.test(cedula)) {
    mostrarError("errorCedula", "Debe contener exactamente 10 números.");
    esValido = false;
  }

  if (!regex.texto.test(apellidos)) {
    mostrarError("errorApellidos", "Solo letras y espacios (2 a 40 caracteres).");
    esValido = false;
  }

  if (!regex.texto.test(nombres)) {
    mostrarError("errorNombres", "Solo letras y espacios (2 a 40 caracteres).");
    esValido = false;
  }

  if (!regex.direccion.test(direccion)) {
    mostrarError("errorDireccion", "Dirección inválida (mínimo 5 caracteres).");
    esValido = false;
  }

  if (!regex.telefono.test(telefono)) {
    mostrarError("errorTelefono", "Formato celular inválido (Ej: 09XXXXXXXX).");
    esValido = false;
  }

  if (!regex.correo.test(correo)) {
    mostrarError("errorCorreo", "Correo electrónico con formato incorrecto.");
    esValido = false;
  }

  if (facultad === "") {
    mostrarError("errorFacultad", "Seleccione una facultad.");
    esValido = false;
  }

  if (nivel === "") {
    mostrarError("errorNivel", "Seleccione un nivel.");
    esValido = false;
  }

  if (!regex.paralelo.test(paralelo)) {
    mostrarError("errorParalelo", "Solo 1 letra (Ej. A, B).");
    esValido = false;
  }

  if (!esValido) return;


  const nuevoEstudiante = {
    cedula,
    apellidos,
    nombres,
    direccion,
    telefono,
    correo,
    facultad,
    nivel,
    paralelo
  };


  guardarEnLocalStorage(nuevoEstudiante);

  
  mostrarEstudiantes();
  formulario.reset();
  alert("Estudiante registrado exitosamente.");
});

function mostrarError(idElemento, mensaje) {
  document.getElementById(idElemento).textContent = mensaje;
}

function limpiarErrores() {
  const errores = document.querySelectorAll(".error");
  errores.forEach((elem) => (elem.textContent = ""));
}

function obtenerEstudiantes() {
  const datos = localStorage.getItem("estudiantes");
  return datos ? JSON.parse(datos) : [];
}

function guardarEnLocalStorage(estudiante) {
  const lista = obtenerEstudiantes();
  lista.push(estudiante);
  localStorage.setItem("estudiantes", JSON.stringify(lista));
}

function mostrarEstudiantes() {
  const lista = obtenerEstudiantes();
  cuerpoTabla.innerHTML = "";

  lista.forEach((est) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${est.cedula}</td>
      <td>${est.apellidos} ${est.nombres}</td>
      <td>${est.telefono}</td>
      <td>${est.correo}</td>
      <td>${est.facultad}</td>
      <td>${est.nivel}</td>
      <td>${est.paralelo}</td>
    `;
    cuerpoTabla.appendChild(fila);
  });
}