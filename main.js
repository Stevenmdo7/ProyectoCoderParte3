const pacientesAlmacenados = localStorage.getItem('datosPacientes');
let pacientes = pacientesAlmacenados ? JSON.parse(pacientesAlmacenados) : [];

if (pacientes.length === 0) {
    pacientes = [
        {
            nombre: "Homero J.",
            apellido: "Simpson",
            edad: 36,
            direccion: "Calle siempreviva 742",
            diagnostico: "Crayon en el cerebro",
            fechaHoraIngreso: "16/10/2022 06:46 AM"
        },
        {
            nombre: "Peter",
            apellido: "Parker",
            edad: 16,
            direccion: "69th Road, en Forest Hills",
            diagnostico: "Delirios de poderes por picadura de araña radioactiva",
            fechaHoraIngreso: "9/03/2023 04:22 AM"
        },
        {
            nombre: "Bruce",
            apellido: "Wayne",
            edad: 40,
            direccion: "Mansion Wayne",
            diagnostico: "quiroptofobia.",
            fechaHoraIngreso: "11/09/2001 08:46 AM"
        }
    ];
}
function mostrarMensaje(mensaje, bgColor, textColor) {
    const contenedorMensaje = document.getElementById("contenedor-mensaje");
    contenedorMensaje.innerHTML = mensaje;
    contenedorMensaje.style.backgroundColor = bgColor;
    contenedorMensaje.style.color = textColor;
    contenedorMensaje.style.display = "block";
    contenedorMensaje.style.animation = "animacion-mensaje 2.5s ease-out";
    setTimeout(function() {
        contenedorMensaje.style.display = "none";
    }, 2500);
}

document.getElementById("boton-recuperar-contrasena").addEventListener("click", function () {
    const respuesta = prompt("¿Quién ganó la Copa Mundial Qatar 2022?\n1-Uruguay\n2-Argentina\n3-Brasil\n4-Yo soy mas del anime");
    if (respuesta === "4") {
        mostrarMensaje("ESAAAA AGUANTE ONE PIECE PAPAAAAA... Ah cierto, Respuesta incorrecta señor usuario.", "#dc3545", "#fff");
    }else if (respuesta === "1" || respuesta === "3"){
    mostrarMensaje("Donde vivis!?!\n Dentro de una tetera?")
    }
     else if (respuesta === "2") {
        const nombreUsuario = prompt("Por favor, ingresa el nombre del usuario para recuperar la contraseña:");
        
        const usuarioEncontrado = usuariosRegistrados.find(user => user.username === nombreUsuario);
        
        if (!usuarioEncontrado) {
            mostrarMensaje("Usuario no encontrado o mal escrito.", "#dc3545", "#fff");
        } else {
            const contrasena = usuarioEncontrado.contrasena;
            mostrarMensaje(`Contraseña para ${nombreUsuario}: ${contrasena}`, "#28a745", "#fff");
        }
    } else if (isNaN(respuesta)){
        mostrarMensaje("Por favor ingrese solamente un numero del 1 al 4 como respuesta\nDe lo contrario usted sera considerado como tosco!")
    }
});



function iniciarSesion(usuario, contraseña) {
    const usuarioEncontrado = usuariosRegistrados.find(user => user.username === usuario && user.contrasena === contraseña);
    if (usuarioEncontrado || (usuario === credencialesOriginales.usuario && contraseña === credencialesOriginales.contrasena)) {
        return true;
    }
    return false;
}

function agregarPaciente(nombre, apellido, edad, direccion, diagnostico) {
    if (!nombre || !apellido || isNaN(edad) || !direccion || !diagnostico) {
        mostrarMensaje("Por favor, ingrese datos válidos para el paciente.", "#dc3545", "#fff");
        return false;
    }
    const fechaHoraIngreso = new Date();
    const horaIngreso = `${fechaHoraIngreso.getHours()}:${fechaHoraIngreso.getMinutes()} ${fechaHoraIngreso.getHours() >= 12 ? 'PM' : 'AM'}`;
    const fechaIngreso = `${fechaHoraIngreso.getDate()}/${fechaHoraIngreso.getMonth() + 1}/${fechaHoraIngreso.getFullYear()}`;
    pacientes.push({
        nombre,
        apellido,
        edad,
        direccion,
        diagnostico,
        fechaHoraIngreso: `${fechaIngreso} ${horaIngreso}`
    });
    mostrarMensaje("Paciente agregado con éxito.", "#17a2b8", "#fff");
    actualizarListaPacientes();
    localStorage.setItem('datosPacientes', JSON.stringify(pacientes));
    return true;
}

function eliminarPaciente(indice) {
    pacientes.splice(indice, 1);
    actualizarListaPacientes();
    localStorage.setItem('datosPacientes', JSON.stringify(pacientes));
}

function actualizarListaPacientes() {
    const listaPacientes = document.getElementById("lista-pacientes");
    listaPacientes.innerHTML = "";

    pacientes.forEach((paciente, indice) => {
        const itemPaciente = document.createElement("li");
        itemPaciente.innerHTML = `
            <div>
                <b>${paciente.nombre} ${paciente.apellido}</b><br>
                Edad: ${paciente.edad}<br>
                Direccion: ${paciente.direccion}<br>
                Hora y Fecha de Ingreso: ${paciente.fechaHoraIngreso}<br>
                Diagnóstico: ${paciente.diagnostico}
            </div>
            <button class="eliminar-paciente" data-indice="${indice}">Eliminar</button>
        `;

        const botonEliminar = itemPaciente.querySelector(".eliminar-paciente");
        botonEliminar.addEventListener("click", function() {
            const indice = this.getAttribute("data-indice");
            eliminarPaciente(indice);
            mostrarMensaje("Paciente eliminado con éxito.", "#581845", "#F3FF7A");
        });

        listaPacientes.appendChild(itemPaciente);
    });
}

function cerrarSesion() {
    const contenedorLogin = document.querySelector(".contenedor-login");
    contenedorLogin.style.display = "block";
    const contenedorAdmin = document.querySelector(".contenedor-admin");
    contenedorAdmin.style.display = "none";
    document.getElementById("usuario").value = "";
    document.getElementById("contraseña").value = "";
    document.getElementById("contenedor-mensaje").style.display = "none";
}

function Usuario(nombre, edad, email, sexo, username, contrasena) {
    this.nombre = nombre;
    this.edad = edad;
    this.email = email;
    this.sexo = sexo;
    this.username = username;
    this.contrasena = contrasena;
}

const usuariosRegistrados = [
    {
    nombre: "Codersito",
    edad: 0, 
    email: "correo@coder.com",
    sexo: "M",
    username: "Coder", 
    contrasena: "lapelucaloca123"
}
];

document.getElementById("boton-registrarse").addEventListener("click", function () {
    const contenedorLogin = document.querySelector(".contenedor-login");
    contenedorLogin.style.display = "none";
    const contenedorRegistro = document.querySelector(".contenedor-registro");
    contenedorRegistro.style.display = "block";
});

document.getElementById("formulario-registro").addEventListener("submit", function (evento) {
    evento.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const email = document.getElementById("email").value;
    const sexo = document.getElementById("sexo").value;
    const username = document.getElementById("username").value;
    const contrasena = document.getElementById("contrasena").value;
    const confirmarContrasena = document.getElementById("confirmar-contrasena").value;

    if (contrasena !== confirmarContrasena) {
        mostrarMensaje("Las contraseñas no coinciden. Intente de nuevo.", "#dc3545", "#fff");
        return;
    }

    const nuevoUsuario = new Usuario(nombre, edad, email, sexo, username, contrasena);
    if (usuariosRegistrados.find(user => user.username === nuevoUsuario.username)) {
        mostrarMensaje("Ese usuario ya existe, sé un poco más original.", "#dc3545", "#fff");
    } else {
        usuariosRegistrados.push(nuevoUsuario);
        mostrarMensaje(`Se ha registrado al usuario ${username} correctamente.`, "#28a745", "#fff");
     
        document.getElementById("nombre").value = "";
        document.getElementById("edad").value = "";
        document.getElementById("email").value = "";
        document.getElementById("sexo").value = "";
        document.getElementById("username").value = "";
        document.getElementById("contrasena").value = "";
        document.getElementById("confirmar-contrasena").value = "";

        const contenedorLogin = document.querySelector(".contenedor-login");
        contenedorLogin.style.display = "block";
        const contenedorRegistro = document.querySelector(".contenedor-registro");
        contenedorRegistro.style.display = "none";
    }
});
document.getElementById("formulario-login").addEventListener("submit", function (evento) {
    evento.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;

    if (iniciarSesion(usuario, contraseña)) {
        const contenedorLogin = document.querySelector(".contenedor-login");
        contenedorLogin.style.display = "none";
        const contenedorAdmin = document.querySelector(".contenedor-admin");
        contenedorAdmin.style.display = "block";
        actualizarListaPacientes();
    } else {
        mostrarMensaje("Credenciales incorrectas. Intente de nuevo.", "#dc3545", "#fff");
    }
});

document.getElementById("boton-cerrar-sesion").addEventListener("click", cerrarSesion);

document.getElementById("boton-agregar-paciente").addEventListener("click", function () {
    const superposicion = document.getElementById("superposicion");
    superposicion.style.display = "block";
    document.getElementById("formulario-paciente").style.display = "block";
});

document.getElementById("cerrarFormulario").addEventListener("click", function () {
    const superposicion = document.getElementById("superposicion");
    superposicion.style.display = "none";
    document.getElementById("formulario-paciente").style.display = "none";
});

document.getElementById("confirmarPaciente").addEventListener("click", function () {
    const nombre = document.getElementById("nombre-paciente").value;
    const apellido = document.getElementById("apellido-paciente").value;
    const edad = document.getElementById("edad-paciente").value;
    const direccion = document.getElementById("direccion-paciente").value;
    const diagnostico = document.getElementById("diagnostico-paciente").value;

    if (agregarPaciente(nombre, apellido, edad, direccion, diagnostico)) {
        const superposicion = document.getElementById("superposicion");
        superposicion.style.display = "none";
        document.getElementById("formulario-paciente").style.display = "none";
    }
});