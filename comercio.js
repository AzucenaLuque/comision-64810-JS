
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


function agregarNumeros(numero){
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
    agregarNumeros(servicio)        
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

  function seleccionarOpcion(opcion){
    switch(opcion){
      case 1: 
        mostrarServicios()
        break;
      case 2:
        reservarServicio()
        break;      
      case 3:
        //alert("Finalizar Operaciones")
        buscarDatosReserva ()
        break; 
      default:
        alert("Se ingreso un dato no válido")
    }
  }

  function app(){
    let loop = true
    alert("Buenos días")
    while(loop){
      let opcion = parseInt(prompt("Operaciones a realizar: \n 1 - Mostrar Servicios Ofrecidos \n 2 - Reservar Servicio \n 3-  Pagar Reserva"))
      seleccionarOpcion(opcion)
      loop = confirm("¿Desea seguir realizando operaciones?")
    }
    alert("Que tenga un buen día")
  }
  
  app()

