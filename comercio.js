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
  
  function buscarDatosReserva (){
    let servicio_array = []
    let i = 0
    let j = 0
    alert (servicios_reservados)

    for(servicio of servicios_reservados){
      i++
      j = servicios_reservados.values(i) +- 
      alert(j)
      alert(servicios_ofrecidos.descripcion[j])
      alert(servicios_ofrecidos[j].precio)

      const dato_array = {
        descripcion: servicios_ofrecidos[j].descripcion,
        precio: servicios_ofrecidos[j].precio
      } 

      alert('Alta Dato')
      // Lo agrego al array
      servicio_array.push(dato_array)
      alert(servicio_array)
      
    }
  
  }
  function mostrarReserva(){
        let listaReserva = "Los Servicios Reservados:"
        let i = 0
        for(servicio of servicios_reservados){
          i++
          listaReserva += `\n ${i} - ${servicio}`
        }
        alert(listaReserva)
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
