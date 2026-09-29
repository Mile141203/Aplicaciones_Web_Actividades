function validarCedula() {
    var valor = document.getElementById("cedula").value.trim();
    var error = document.getElementById("errorCedula");
    
    if (valor === "") {
        error.textContent = "La cédula es obligatoria.";
        return false;
    }
    if (valor.length !== 10) {
        error.textContent = "La cédula debe tener 10 dígitos.";
        return false;
    }
    for (var i = 0; i < valor.length; i++) {
        var c = valor.charAt(i);
        if (c < "0" || c > "9") {
            error.textContent = "La cédula solo debe contener números.";
            return false;
        }
    }
    
    var provincia = parseInt(valor.substring(0, 2));
    if ((provincia < 1 || provincia > 24) && provincia !== 30) {
        error.textContent = "Código de provincia no válido.";
        return false;
    }
    
    var coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    var verificador = parseInt(valor.charAt(9));
    var suma = 0;
    
    for (var k = 0; k < 9; k++) {
        var prod = parseInt(valor.charAt(k)) * coeficientes[k];
        if (prod >= 10) {
            prod = prod - 9;
        }
        suma = suma + prod;
    }
    
    var digitoCalculado = suma % 10;
    if (digitoCalculado !== 0) {
        digitoCalculado = 10 - digitoCalculado;
    }
    
    if (digitoCalculado !== verificador) {
        error.textContent = "Cédula inválida.";
        return false;
    }
    
    error.textContent = "";
    return true;
}

function validarNombre() {
    var valor = document.getElementById("nombre").value.trim();
    var error = document.getElementById("errorNombre");
    
    if (valor === "") {
        error.textContent = "El nombre es obligatorio.";
        return false;
    }
    if (valor.length > 30) {
        error.textContent = "El nombre no puede tener más de 30 caracteres.";
        return false;
    }
    for (var i = 0; i < valor.length; i++) {
        var c = valor.charAt(i);
        var esLetra = (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c === " " || c === "ñ" || c === "Ñ";
        if (!esLetra) {
            error.textContent = "El nombre solo puede contener letras.";
            return false;
        }
    }
    error.textContent = "";
    return true;
}

function validarDireccion() {
    var valor = document.getElementById("direccion").value.trim();
    var error = document.getElementById("errorDireccion");
    
    if (valor === "") {
        error.textContent = "La dirección es obligatoria.";
        return false;
    }
    if (valor.length > 50) {
        error.textContent = "La dirección no puede tener más de 50 caracteres.";
        return false;
    }
    error.textContent = "";
    return true;
}

function validarTelefono() {
    var valor = document.getElementById("telefono").value.trim();
    var error = document.getElementById("errorTelefono");
    
    if (valor === "") {
        error.textContent = "El celular es obligatorio.";
        return false;
    }
    if (valor.length !== 10) {
        error.textContent = "El celular debe tener 10 dígitos.";
        return false;
    }
    for (var i = 0; i < valor.length; i++) {
        var c = valor.charAt(i);
        if (c < "0" || c > "9") {
            error.textContent = "El celular solo debe contener números.";
            return false;
        }
    }
    if (valor.charAt(0) !== "0" || valor.charAt(1) !== "9") {
        error.textContent = "Debe iniciar con 09.";
        return false;
    }
    error.textContent = "";
    return true;
}

function validarCorreo() {
    var valor = document.getElementById("correo").value.trim();
    var error = document.getElementById("errorCorreo");
    
    if (valor === "") {
        error.textContent = "El correo es obligatorio.";
        return false;
    }
    var posArroba = valor.indexOf("@");
    var posPunto = valor.lastIndexOf(".");
    
    if (posArroba < 1 || posPunto < posArroba + 2 || posPunto + 2 >= valor.length) {
        error.textContent = "Correo electrónico inválido.";
        return false;
    }
    error.textContent = "";
    return true;
}

function validarFormulario() {
    var vCedula = validarCedula();
    var vNombre = validarNombre();
    var vDireccion = validarDireccion();
    var vTelefono = validarTelefono();
    var vCorreo = validarCorreo();
    
    if (vCedula && vNombre && vDireccion && vTelefono && vCorreo) {
        alert("Cliente registrado exitosamente");
        return true;
    }
    return false;
}