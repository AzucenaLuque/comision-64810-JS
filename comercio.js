// Lista de tipo de servicio
const tipo = {
  CORPORAL: 'CORPORAL',
  MANOS: 'MANOS',
  PIES: 'PIES'
};

// Lista de servicios
const servicios = [
  { nombre: "Masaje combinado", precio: 35000, descripcion: "Masaje combinado", tipo: tipo.CORPORAL },
  { nombre: "Masajes descontracturante", precio: 30000, descripcion: "Masajes descontracturante", tipo: tipo.CORPORAL },
  { nombre: "Masajes relajante", precio: 25000, descripcion: "Masajes relajante", tipo: tipo.CORPORAL },
  { nombre: "Belleza de pies", precio: 20000, descripcion: "Belleza de pies", tipo: tipo.PIES },
  { nombre: "Esmaltado semipermanente", precio: 8000, descripcion: "Esmaltado semipermanente", tipo: tipo.PIES },
  { nombre: "Pedicuria", precio: 25600, descripcion: "Pedicuria", tipo: tipo.PIES },
  { nombre: "Podoestetica", precio: 30000, descripcion: "Este servicio es una atención más profunda para pies.", tipo: tipo.PIES },
  { nombre: "Spa con Reflexología", precio: 20000, descripcion: "Exfoliar, hidratar y realizar reflexología.", tipo: tipo.PIES },
  { nombre: "Uña Guía", precio: 10000, descripcion: "Solo para personas con malformación ungueal.", tipo: tipo.PIES },
  { nombre: "Caping", precio: 30000, descripcion: "Para personas con uñas quebradizas.", tipo: tipo.MANOS },
  { nombre: "Dipping", precio: 35000, descripcion: "Dipping", tipo: tipo.MANOS },
  { nombre: "Manicura America, Japonesa", precio: 15000, descripcion: "Manicura con tratamiento nutricional.", tipo: tipo.MANOS, rangoPrecio: {min: 15000, max: 18000} },
  { nombre: "Manicura con Semipermanente", precio: 20000, descripcion: "Esmalte que dura de 15 a 20 días.", tipo: tipo.MANOS },
  { nombre: "Manicura rusa", precio: 18000, descripcion: "Ideal para personas con mucha producción de cutículas.", tipo: tipo.MANOS },
  { nombre: "Nail Art", precio: 4800, descripcion: "Diseño artístico para uñas.", tipo: tipo.MANOS },
  { nombre: "Retirado de sistema", precio: 10500, descripcion: "Retiro de sistema de uñas", tipo: tipo.MANOS },
  { nombre: "Retirado Semi", precio: 3000, descripcion: "Retiro de esmalte semi-permanente", tipo: tipo.MANOS },
  { nombre: "Sistema alargamiento de uñas", precio: 40000, descripcion: "Alargamiento de uñas para eventos.", tipo: tipo.MANOS }
];

// Decalaracion de Variables para almacenar los servicios reservados y el total, datos de Usuario
let serviciosReservados = [];
let total = 0;

let nombreUsuario = '';
let emailUsuario = '';
let celu_Usuario = '';


document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('reservarServiciosBtn').addEventListener('click', function() {
      if (capturarDatosFormulario()) {
          const mensajeDiv = document.getElementById('mensaje');
          mensajeDiv.innerHTML = `Datos de contacto registrados: <strong>${nombreUsuario}</strong> (${emailUsuario}, ${celu_Usuario}). Ahora puedes comenzar a reservar servicios.`;
      }
  });

  // Inicializa la página mostrando los servicios
  mostrarServicios();
});

// Valida el formato del correo electrónico
function esEmailValido(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

// Valida el formato del Nro de Celu ingresado
function esTelefonoValido(telefono) {
  const regexTelefono = /^[0-9]{10}$/; // Numeros, tienen que ser 10 caracteres
  return regexTelefono.test(telefono);
}

// Ingreso de los datos para reservar
function capturarDatosFormulario() {
  // Ingreso los datos del Usuario
  nombreUsuario = document.getElementById('nombre').value;
  emailUsuario = document.getElementById('email').value;
  celu_Usuario = document.getElementById('celu').value;

  // Validar que todos los campos estén completos
  if (!nombreUsuario || !emailUsuario || !celu_Usuario) {
      alert('Por favor, complete todos los campos.');
      return false; // Si algún campo está vacío, no se puede reservar
  }

  // Validar el formato del correo electrónico
  if (!esEmailValido(emailUsuario)) {
    // Muestra mensaje en pantalla
    document.getElementById('errorEmail').style.display = 'inline';
    
    // Blanquea el campo de correo electrónico si no es válido
    document.getElementById('email').value = ''; 

    return false; // Si el correo no es válido, no se puede reservar
  }

  if (!esTelefonoValido(celu_Usuario)) {
    //alert('Por favor, ingrese un número de teléfono válido (10 dígitos).');
     // Mostrar el mensaje de error por pantalla
     document.getElementById('errorcelu').style.display = 'inline'
     //Blanqueo el campo
     document.getElementById('celu').value = ''; 
    return false;
  }

  // Si todos los campos son válidos, permite que el usuario reserve
  return true;
}

// Función para manejar la reserva de un servicio
function reservarServicio(nombreServicio, precioServicio) {
  // Verificar si los datos del formulario han sido ingresados
  if (!nombreUsuario || !emailUsuario || !celu_Usuario) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.innerHTML = 'Por favor, complete el formulario de reserva antes de seleccionar los servicios.';
    return;
  }

  // Guardar los servicios reservados en localStorage
function guardarReservasEnLocalStorage() {
  const reservasJSON = JSON.stringify(serviciosReservados);
  localStorage.setItem('serviciosReservados', reservasJSON); //guarda los servicios
  localStorage.setItem('total', total); // Guardar también el total
}

// Cargar las reservas desde localStorage
function cargarReservasDesdeLocalStorage() {
  const reservasJSON = localStorage.getItem('serviciosReservados');
  const totalGuardado = localStorage.getItem('total');

  if (reservasJSON) {
    serviciosReservados = JSON.parse(reservasJSON);
    total = parseFloat(totalGuardado) || 0;
  }
}

// Eliminar las reservas del localStorage, para limpiar todo
function eliminarReservasDelLocalStorage() {
  localStorage.removeItem('serviciosReservados');
  localStorage.removeItem('total');
}

  // Verificar si el servicio ya ha sido reservado
  const servicioExistente = serviciosReservados.find(servicio => servicio.nombre === nombreServicio);

  if (servicioExistente) {
    // Si el servicio ya existe, mostramos un mensaje
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.innerHTML = `<strong>¡Este servicio ya ha sido reservado!</strong>`;
    return; // Salir de la función para evitar que se agregue nuevamente
  }

  // Si no existe, agregar el servicio reservado a la lista
  serviciosReservados.push({ nombre: nombreServicio, precio: precioServicio });

  // Actualizar el total
  total += precioServicio;

  // Mostrar el mensaje de reserva
  const mensajeDiv = document.getElementById('mensaje');
  mensajeDiv.innerHTML = `Has reservado el servicio: <strong>${nombreServicio}</strong> por <strong>$${precioServicio}</strong>.`;

  // Actualizar el total acumulado
  actualizarTotal();

  // Actualizar la lista de servicios reservados
  mostrarServiciosReservados();

  // Guardar en localStorage
  guardarReservasEnLocalStorage();
}

// Función para mostrar los servicios
function mostrarServicios() {
  const container = document.getElementById('servicios-container');
  container.innerHTML = '';  // Limpiar el contenedor

  servicios.forEach(servicio => {
    const servicioDiv = document.createElement('div');
    servicioDiv.classList.add('servicio');
    
    // 
    let precioTexto = `$${servicio.precio}`;
    if (servicio.rangoPrecio) {
      precioTexto = `$${servicio.rangoPrecio.min} - $${servicio.rangoPrecio.max}`;
    }

    servicioDiv.innerHTML = `
      <div class="servicio-info">
        <h3>${servicio.nombre} - ${servicio.descripcion} - <span class="precio">${precioTexto}</span></h3>
        <button class="reservar-btn" onclick="reservarServicio('${servicio.nombre}', ${servicio.precio})">Reservar</button>
      </div>
    `;
    container.appendChild(servicioDiv);
  });
}

//Actualiza Lista de Reservados y Total, cuando se elimina uno de la reserva
function eliminarServicio(nombreServicio) {
  // Filtrar el servicio de la lista de reservados
  serviciosReservados = serviciosReservados.filter(servicio => servicio.nombre !== nombreServicio);

  // Restar el precio del total
  const servicioEliminado = servicios.find(servicio => servicio.nombre === nombreServicio);
  total -= servicioEliminado.precio;

  // Actualizar la lista de los servicios reservados y el total, que se muestran por pantalla
  mostrarServiciosReservados();
  actualizarTotal();
}

// Función para actualizar el total acumulado
function actualizarTotal() {
  const totalDiv = document.getElementById('total');
  totalDiv.innerHTML = `Total acumulado: <strong>$${total}</strong>`;
}

// Función para mostrar los servicios reservados con la opción de eliminar
function mostrarServiciosReservados() {
  const listaReservados = document.getElementById('lista-reservados');
  listaReservados.innerHTML = ''; // Limpiar la lista de servicios reservados

  if (serviciosReservados.length === 0) {
    listaReservados.innerHTML = '<p>No has reservado ningún servicio aún.</p>';
  } else {
    const fragment = document.createDocumentFragment();  // para evitar múltiples manipulaciones del DOM.
    serviciosReservados.forEach(servicio => {
      const servicioDiv = document.createElement('div');
      servicioDiv.classList.add('servicio-reservado');
      servicioDiv.innerHTML = `
        <p><strong>${servicio.nombre}</strong> - $${servicio.precio} 
        <button onclick="eliminarServicio('${servicio.nombre}')">Eliminar</button></p>
      `;
      fragment.appendChild(servicioDiv);
    });
    listaReservados.appendChild(fragment);  // Solo actualiza el DOM una vez.
  }
}

// Evento para el botón "Reservar Servicios"
document.getElementById('reservarServiciosBtn').addEventListener('click', function() {
  if (capturarDatosFormulario()) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.innerHTML = `Datos de contacto registrados: <strong>${nombreUsuario}</strong> (${emailUsuario}, ${celu_Usuario}). Ahora puedes comenzar a reservar servicios.`;
  }
});

// Inicializar la página mostrando los servicios
mostrarServicios();

