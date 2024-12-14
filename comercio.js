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

// Declaración de Variables para almacenar los servicios reservados y el total
let serviciosReservados = [];
let total = 0;

let nombreUsuario = '';
let emailUsuario = '';
let celu_Usuario = '';

document.addEventListener('DOMContentLoaded', function() {
  // Evento para el botón "Reservar Servicios"
  document.getElementById('reservarServiciosBtn').addEventListener('click', function() {
    if (capturarDatosFormulario()) {

      // Mostrar mensaje con los datos capturados
      const mensajeDiv = document.getElementById('mensaje');
      mensajeDiv.classList.add('show'); // Añadir la clase para mostrar el mensaje

      // Rellenar el mensaje con los datos del formulario
      mensajeDiv.innerHTML = `
      Datos de contacto registrados: <strong>${nombreUsuario}</strong> (${emailUsuario}, ${celu_Usuario}). <br>
      Ahora puedes comenzar a reservar servicios.`;

      // Opcional: Ocultar el mensaje después de unos segundos
      setTimeout(function() {
        mensajeDiv.classList.remove('show'); // Eliminar la clase después de 3 segundos
      }, 3000);
    }
  });

  // Evento para el botón "Limpiar Reservas"
    document.getElementById('limpiarReservasBtn').addEventListener('click', function() {
      limpiarReservas();  // Llama a la función para limpiar las reservas
    });

    // Cargar reservas desde localStorage al cargar la página
    cargarReservasDesdeLocalStorage();

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
  const regexTelefono = /^[0-9]{10}$/;
  return regexTelefono.test(telefono);
}

// Ingreso de los datos para reservar
function capturarDatosFormulario() {
  nombreUsuario = document.getElementById('nombre').value;
  emailUsuario = document.getElementById('email').value;
  celu_Usuario = document.getElementById('celu').value;

  if (!nombreUsuario || !emailUsuario || !celu_Usuario) {
    Swal.fire({
      title: 'Error',
      text: 'Por favor, complete todos los campos.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return false;
  }

  if (!esEmailValido(emailUsuario)) {
    document.getElementById('errorEmail').style.display = 'inline';
    document.getElementById('email').value = '';
    Swal.fire({
      title: 'Error',
      text: 'El correo electrónico no es válido. Por favor ingrese uno válido.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return false;
  }

  if (!esTelefonoValido(celu_Usuario)) {
    document.getElementById('errorcelu').style.display = 'inline';
    document.getElementById('celu').value = '';
    Swal.fire({
      title: 'Error',
      text: 'Por favor, ingrese un número de teléfono válido (10 dígitos).',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return false;
  }

  return true;
}

// Función para manejar la reserva de un servicio
function reservarServicio(nombreServicio, precioServicio) {
  if (!nombreUsuario || !emailUsuario || !celu_Usuario) {
    const mensajeDiv = document.getElementById('mensaje');

    Swal.fire({
      title: 'Error',
      text: 'Por favor, ingrese los datos de contacto antes de seleccionar los servicios.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const servicioExistente = serviciosReservados.find(servicio => servicio.nombre === nombreServicio);
  if (servicioExistente) {
    Swal.fire({
      title: '¡Servicio ya reservado!',
      text: 'Este servicio ya ha sido reservado.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  serviciosReservados.push({ nombre: nombreServicio, precio: precioServicio });
  total += precioServicio;

  Swal.fire({
    title: '¡Servicio reservado!',
    text: `Has reservado el servicio: ${nombreServicio} por $${precioServicio}.`,
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });

  actualizarTotal();
  mostrarServiciosReservados();

  // Guardar en localStorage
  guardarReservasEnLocalStorage();
}

// Función para guardar reservas en localStorage
function guardarReservasEnLocalStorage() {
  localStorage.setItem('serviciosReservados', JSON.stringify(serviciosReservados));
  localStorage.setItem('total', total);
}

// Función para cargar reservas desde localStorage
function cargarReservasDesdeLocalStorage() {
  const reservasJSON = localStorage.getItem('serviciosReservados');
  const totalGuardado = localStorage.getItem('total');
  if (reservasJSON) {
    serviciosReservados = JSON.parse(reservasJSON);
    total = parseFloat(totalGuardado) || 0;
    actualizarTotal();
    mostrarServiciosReservados();
  }
}

// Función para actualizar el total acumulado
function actualizarTotal() {
  const totalDiv = document.getElementById('total');
  totalDiv.innerHTML = `Total acumulado: <strong>$${total}</strong>`;
}

// Función para mostrar los servicios reservados con la opción de eliminar
function mostrarServiciosReservados() {
  const listaReservados = document.getElementById('lista-reservados');
  listaReservados.innerHTML = '';
  if (serviciosReservados.length === 0) {
    listaReservados.innerHTML = '<p>No has reservado ningún servicio aún.</p>';
  } else {
    const fragment = document.createDocumentFragment();
    serviciosReservados.forEach(servicio => {
      const servicioDiv = document.createElement('div');
      servicioDiv.classList.add('servicio-reservado');

      servicioDiv.innerHTML = `
      <div class="servicio-info">
        <span <strong>${servicio.nombre}</strong> - $${servicio.precio}  </span>
        <button class="eliminar-btn" onclick="eliminarServicio('${servicio.nombre}')">Eliminar</button>
    </div>
    `;
      fragment.appendChild(servicioDiv);
    });
    listaReservados.appendChild(fragment);
  }
}

// Función para eliminar un servicio
function eliminarServicio(nombreServicio) {
  serviciosReservados = serviciosReservados.filter(servicio => servicio.nombre !== nombreServicio);
  total -= servicios.find(servicio => servicio.nombre === nombreServicio).precio;
  mostrarServiciosReservados();
  actualizarTotal();
  guardarReservasEnLocalStorage();

  Swal.fire({
    title: 'Servicio eliminado',
    text: `Has eliminado el servicio: ${nombreServicio}`,
    icon: 'info',
    confirmButtonText: 'Aceptar'
  });
}

 // Función para limpiar todas las reservas
 function limpiarReservas() {
  // Borrar todos los servicios reservados
  serviciosReservados = [];
  total = 0;

  // Actualizar la interfaz de usuario
  mostrarServiciosReservados();
  actualizarTotal();

  // Borrar reservas del localStorage
  localStorage.removeItem('serviciosReservados');
  localStorage.removeItem('total');

  // Mostrar mensaje de confirmación
  Swal.fire({
    title: '¡Reservas limpiadas!',
    text: 'Todas las reservas han sido eliminadas.',
    icon: 'info',
    confirmButtonText: 'Aceptar'
  });
}

// Función para mostrar los servicios disponibles
function mostrarServicios() {
  const container = document.getElementById('servicios-container');
  container.innerHTML = '';

  // Agrupar los servicios por tipo
  const serviciosPorTipo = {
    [tipo.CORPORAL]: [],
    [tipo.MANOS]: [],
    [tipo.PIES]: []
  };

  // Llenar el objeto de agrupación
  servicios.forEach(servicio => {
    serviciosPorTipo[servicio.tipo].push(servicio);
  });

 
  // Crear un fragmento para agregar los servicios a la página
  const fragment = document.createDocumentFragment();

   // Iterar sobre cada tipo de servicio
  for (const tipoServicio in serviciosPorTipo) {
    if (serviciosPorTipo[tipoServicio].length > 0) {
      // Crear un contenedor para cada tipo
      const tipoDiv = document.createElement('div');
      tipoDiv.classList.add('tipo-servicio');
      
      // Título de la sección (tipo de servicio)
      tipoDiv.innerHTML = `<h2>${tipoServicio}</h2>`;

      // Crear los servicios dentro de cada tipo
      const serviciosDiv = document.createElement('div');
      serviciosPorTipo[tipoServicio].forEach(servicio => {
        let precioTexto = `$${servicio.precio}`;
        if (servicio.rangoPrecio) {
          precioTexto = `$${servicio.rangoPrecio.min} - $${servicio.rangoPrecio.max}`;
        }

        const servicioDiv = document.createElement('div');
        servicioDiv.classList.add('servicio');

          servicioDiv.innerHTML = `
                <div class="servicio-info">
                  <span class="nombre-servicio">${servicio.nombre} - ${servicio.descripcion}                        </span>
                  <span class="precio-servicio">${precioTexto}</span>
                  <button class="reservar-btn" onclick="reservarServicio('${servicio.nombre}', ${servicio.precio})">Reservar</button>
                </div>
              `;
        serviciosDiv.appendChild(servicioDiv);
      });

      tipoDiv.appendChild(serviciosDiv);
      fragment.appendChild(tipoDiv);
    }
  }

  // Añadir el fragmento de servicios al contenedor
  container.appendChild(fragment);
}
