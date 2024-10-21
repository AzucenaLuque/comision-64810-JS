
const servicios_ofrecidos = [
   {descripcion : 'CAPING'          , precio: 1},
   {descripcion : 'DIPPYNG'         , precio: 2},
   {descripcion : 'MANOS COMUN'     , precio: 3},
   {descripcion : 'MANOS SEMI'      , precio: 4},
   {descripcion : 'MANOS RUSA'      , precio: 5},
   {descripcion : 'RETIRADO SEMI'   , precio: 6}
 ]

let servicios_reservados = []

function mostrarServicios(){
  //Muestra el listado de los "Servicios Ofrecidos" en el centro de estetica
  let listaServicios = "Los Servicios Ofrecidos son:"

  let i = 0
  for(servicio of servicios_ofrecidos){
    i++
    listaServicios += `\n ${i} - ${servicio.descripcion} - Precio:  ${servicio.precio}`
  }

  alert(listaServicios)
}


function agregarServicio(numero){
  const existeEnLista = servicios_reservados.includes(numero)
  const esNumero = typeof numero === "number"
 
  //alert(esNumero)
  //alert(existeEnLista)
   //Controlo que el nro que ingresa esta en la lista 
  if(existeEnLista){
    //Sino muestro Mensaje de Error
    console.warn(`El número ${numero} ya existe en la lista`)
  } else if(!esNumero){
    console.warn("El valor ingresado no es un número")
  } else{
    //Si existe, lo inserto en la reserva
    servicios_reservados.push(numero)
  }
}

  function agregarReserva(){
    //Agrega una "Reserva de Servicio"
    let servicio = parseInt(prompt("Ingrese el Nro del servicio que quiere reservar:"))   
    
    if (servicio > 0 && servicio <= servicios_ofrecidos.length){
      agregarServicio(servicio)      
    } else{
      alert (`Igreso un numero inválido. Debe ingresar un valor entre 0 y ${servicios_ofrecidos.length} `)
    }  
  }
  
  
function buscarDatosReserva() {
  let servicio_array = [];

  for (let i = 0; i < servicios_reservados.length; i++) {
      const j = servicios_reservados[i] - 1; // Restar 1 para que coincida con el índice

      if (j >= 0 && j < servicios_ofrecidos.length) {
          const dato_array = {
              descripcion: servicios_ofrecidos[j].descripcion,
              precio: servicios_ofrecidos[j].precio
          };
          servicio_array.push(dato_array);
      } else {
          console.warn(`El número de servicio ${servicios_reservados[i]} es inválido`);
      }
  }

  return servicio_array; // Devuelve el array con los servicios reservados
}

function mostrarReserva() {
  let listaReserva = "Los Servicios Reservados:";
  let i = 0;
  const serviciosDetalles = buscarDatosReserva(); // Obtengo los servicios reservados

  for (let servicio of serviciosDetalles) {
      i++;
      listaReserva += `\n ${i} - ${servicio.descripcion} - Precio: ${servicio.precio}`;
  }
  
  alert(listaReserva);
}
  
  function reservarServicio(){
    agregarReserva()
    mostrarReserva ()
  }

  function calcularTotalReserva() {
    const serviciosDetalles = buscarDatosReserva(); // Consulto los servicios reservados
    //let total = 0;
    //for (let servicio of serviciosDetalles) {
    //    total += servicio.precio; // Calculo el total, sumando los precios
    //}    
    //alert(`El monto total de su reserva es: $${total}`);
    // return total

    return serviciosDetalles.reduce((total, servicio) => total + servicio.precio, 0);
  }

  function mostrarReservaTotal() {
    let listaReservaTotal = "Los Servicios Reservados:";
    let totalreserva = 0
    let i = 0;
    const serviciosDetalles = buscarDatosReserva(); // Obtengo los servicios reservados
  
    for (let servicio of serviciosDetalles) {
        i++;
        listaReservaTotal += `\n ${i} - ${servicio.descripcion} - Precio: ${servicio.precio}`;
    }
    
    totalreserva =  calcularTotalReserva() 
    listaReservaTotal += `\n Total de la Reserva es:  ${totalreserva}`;

    alert(listaReservaTotal); 
  }

  function seleccionarOpcion(opcion){
    switch(opcion){
      case 1: 
        //Muestra los servicios Ofrecidos por la Estetica
        mostrarServicios()
        break;
      case 2:
        //Permite ingresar el Nro del Servicio
        reservarServicio()
        break;      
      case 3:
        //Calcula el Monto Total de la Reserva
        mostrarReservaTotal()
        break; 
      case 4:
        alert('Gracias por utilizar nuestros servicios.')
        break; 
      default:
        alert("Se ingreso un dato no válido")
    }
  }

  function app(){
    let loop = true
    alert("Buenos días")
    while(loop){
      let opcion = parseInt(prompt("Operaciones a realizar: \n 1 - Mostrar Servicios Ofrecidos \n 2 - Reservar Servicio \n 3-  Pagar Reserva \n 4- Finalizar Operaciones"))
      seleccionarOpcion(opcion)
      if (opcion !== 4) {
        loop = confirm("¿Desea seguir realizando operaciones?")
      } else {
          loop = false
          //console.log (loop)
        }
    }
    alert("Que tenga un buen día")
  }
  
  app()
