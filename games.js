//Objetos
let clientes = [
    {
        id: 55555555,
        nombre: 'Mariana', 
        apellidos: 'Casas Orozco',
        telefono:3001234578, 
        email: 'mario@gmail.com',
        fechaNac: '14-06-2000',
        nacionalidad: 'Española',
        puntos:0},

    {
        id: 987654321,
        nombre: 'Javier Noel', 
        apellidos: 'Páez',
        telefono:3001234578, 
        email: 'mario@gmail.com',
        fechaNac: '14-06-2000',
        nacionalidad: 'Colombiana',
        puntos:0},

    {
        id: 654321987,
        nombre: 'Camila', 
        apellidos: 'Páez',
        telefono:3001234578, 
        email: 'camila@gmail.com',
        fechaNac: '14-06-2000',
        nacionalidad: 'Colombiana',
        puntos:0}

];

let videoJuegos = [
    {
        id:1456,
        nombre:"Halo",
        tematica:"Fantasía",
        valor:125000,
        puntos:50
    },
    {
        id:14588,
        nombre:"FIFA",
        tematica:"Fantasía",
        valor:10000,
        puntos:30
    },
    {
        id:9999,
        nombre:"Mario Kart",
        tematica:"Fantasía",
        valor:120000,
        puntos:10
    }
];


//Modulo clientes
const $tablaClientes = document.getElementById('lista-clientes');
const $btnAgregarCliente = document.getElementById('b-agregar-cliente');
const $vAgregarTabla = document.getElementById('agregar-cliente');
const $btnVolverCliente = document.getElementById('b-volver-cliente');

let $formAgregarCliente = document.getElementById('form-add-cliente');
let $formEditarCliente = document.getElementById('form-edit-cliente');//


const $btnCliente= document.getElementById('btn-add-cliente');
const $btnEditCliente= document.getElementById('btn-edit-cliente');//

let $bBuscarCliente = document.getElementById('b-buscar-cliente');
const $buscar =document.getElementById('buscar'); 

//Formulario Clientes
let $documento = document.getElementById('id');
let $nombre = document.getElementById('nombre');
let $apellidos = document.getElementById('apellidos');
let $telefono = document.getElementById('telefono');
let $email = document.getElementById('email');
let $fechaNac = document.getElementById('fechaNac');
let $nacionalidad = document.getElementById('nacionalidad');
//Formulario Editar CLientes
let $documentoE = document.getElementById('idE');
let $nombreE = document.getElementById('nombreE');
let $apellidosE = document.getElementById('apellidosE');
let $telefonoE = document.getElementById('telefonoE');
let $emailE = document.getElementById('emailE');
let $fechaNacE = document.getElementById('fechaNacE');
let $nacionalidadE = document.getElementById('nacionalidadE');



//AddEventListener
document.addEventListener('DOMContentLoaded',function(){
    clientes = JSON.parse(localStorage.getItem('clientes')) || clientes;
    videoJuegos =JSON.parse(localStorage.getItem('videoJuegos')) || videoJuegos;
    
    listaClientes(clientes);
    listarJuegos(videoJuegos);
    listaClientesP(clientes);
    
});
$btnAgregarCliente.addEventListener('click',function(){
    $formEditarCliente.style.display='none';
    $formAgregarCliente.style.display='flex';
});

$btnVolverCliente.addEventListener('click',function(){
    $formAgregarCliente.style.display='none';

});

$btnCliente.addEventListener('click',function(e){
    console.log("holaaa")
    e.preventDefault(); 
    e.stopPropagation();

    let newCliente = {};
    newCliente.id= $documento.value; 
    newCliente.nombre= $nombre.value; 
    newCliente.apellidos= $apellidos.value; 
    newCliente.telefono= $telefono.value; 
    newCliente.email= $email.value; 
    newCliente.fechaNac= $fechaNac.value; 
    newCliente.nacionalidad= $nacionalidad.value; 
    newCliente.puntos = 0;

    //Asignar Nuevo Cliente
    clientes.push(newCliente);
    //Visualización
    listaClientes(clientes);
    listaClientesP(clientes);

    $documento.value=''; $nombre.value=''; $apellidos.value='';  $telefono.value='';
     $email.value=''; $fechaNac.value=''; $nacionalidad.value='';
});

$btnEditCliente.addEventListener('click', function(e){
    e.preventDefault(); 
    e.stopPropagation();

    //Creación de objeto cliente
    let editCliente ={};
    editCliente.id= $documentoE.value; 
    editCliente.nombre= $nombreE.value; 
    editCliente.apellidos= $apellidosE.value; 
    editCliente.telefono= $telefonoE.value; 
    editCliente.email= $emailE.value; 
    editCliente.fechaNac= $fechaNacE.value; 
    editCliente.nacionalidad= $nacionalidadE.value; 
  
    console.log(editCliente);

    //Remplaza el objeto cliente con sus ediciones 
    clientes.forEach(function(element,index){
        if(element.id == editCliente.id){
            editCliente.puntos = Number(element.puntos);
            clientes.splice(index,1,editCliente);
        }
    });

    listaClientes(clientes);
    listaClientesP(clientes);
    
    $formEditarCliente.style.display='none'; 

});

$bBuscarCliente.addEventListener('submit',function(e){
    e.preventDefault(); // Evitar el envío del formulario
    e.stopPropagation();

    let listaBuscar = [];
    let clienteBuscar = $buscar.value.toUpperCase();

    if(clienteBuscar==''){
        listaClientes(clientes);
        return
    }
    //Se recorre la lista de clientes buscando coincidencias 
    clientes.forEach(function(e){
        
        let nombre = e.nombre.toUpperCase();
        let apellidos = e.apellidos.toUpperCase();
        let id = e.id;

        if(nombre.includes(clienteBuscar) || apellidos.includes(clienteBuscar)|| String(id).includes(clienteBuscar)){
            listaBuscar.push(e)
        }
    });

    if(listaBuscar.length>0){
        listaClientes(listaBuscar);
    }else{
        Swal.fire({
            //title: 'Sweet!',
            text: 'No hay coincidencias para su busqueda...',
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/3746/3746929.png',
            imageWidth: 200,
            imageAlt: 'Custom image',
        })
    }
});

//Botones Editar y Eliminar
document.addEventListener('click', function(event) {
    //Eliminar Cliente
    if(event.target.className.includes('bi-trash')) {
        let targetId = event.target.id.slice(1); //Elimina el primer carácter para solo tener el id identificador
        eliminarCliente(targetId);
    };
    //Editar Cliente
    if(event.target.className.includes('bi-pencil-square')){
        let targetId = event.target.id.slice(1);
        editarCliente(targetId);
    };

    //Eliminar Ruta
    if(event.target.className.includes('imgBorrarJuego')){
        let targetId = event.target.id;
        eliminarJuego(targetId);
    };
});

//Funciones
function listaClientes(clientes){
    $tablaClientes.innerHTML ='';
    let contador =1;
    clientes.forEach(function(e){
        let {id,nombre,apellidos,telefono,email,fechaNac,nacionalidad} = e;
        let html = `<tr>
                        <th scope="row">${contador}</th>
                        <td>${id}</td>
                        <td>${nombre}</td>
                        <td>${apellidos}</td>
                        <td>${telefono}</td>
                        <td>${email}</td>
                        <td>${fechaNac}</td>
                        <td>${nacionalidad}</td>
                        <td>
                            <button id="E${id}" type="button" class="btn btn-warning bi bi-pencil-square"
                                style="color: rgb(255, 255, 255);"></button>
                            <button id="D${id}" type="button" class="btn btn-danger bi bi-trash"></button>
                        </td>
                    </tr>`

        contador +=1;
        
        $tablaClientes.insertAdjacentHTML('beforeend', html);
    });
    addlocalStorageC();
    clientesSelector();


};

function addlocalStorageC(){
    localStorage.setItem('clientes', JSON.stringify(clientes));
};

function eliminarCliente(targetId){
    clientes = clientes.filter(function(e){
        return e.id != targetId
    }); 
    listaClientes(clientes);
};

function editarCliente(targetId){
    $formAgregarCliente.style.display='none';
    $formEditarCliente.style.display='flex';
    
    clientes.forEach(function(e){

        if(e.id == targetId){
            let {id,nombre,apellidos,telefono,email,fechaNac,nacionalidad} = e;
            console.log(e)
            $documentoE.value = id;
            $nombreE.value = nombre;
            $apellidosE.value = apellidos;
            $telefonoE.value = telefono;
            $emailE.value = email;
            $fechaNacE.value = String(fechaNac);
            $nacionalidadE.value = nacionalidad;
            return
        }
        
    });
};


//MODULO GESTIÓN DE VIDEOJUEGOS
const $btnAgregarJuego = document.getElementById('btn-agregar-juego');
const $btnVolverJuego = document.getElementById('btn-volver-juegos');
const $listaVideoJuegos = document.getElementById('carta-videoJuegos');
let $formAgregarJuego = document.getElementById('form-add-juego');
const $btnJuego = document.getElementById('btn-add-juego');


//Formulario Agregar Juego
let $nombreJuego = document.getElementById('nombre-juego');
let $tematicaJuego = document.getElementById('tematica');
let $valorJuego = document.getElementById('valor');
let $puntosJuego = document.getElementById('puntos');

//AddEventListener
$btnAgregarJuego.addEventListener('click',function(){
    $formAgregarJuego.style.display='flex';
});

$btnVolverJuego.addEventListener('click',function(){
    $formAgregarJuego.style.display='none';

});

$btnJuego.addEventListener('click',function(e){
    console.log("holaaaJuego")
    e.preventDefault(); 
    e.stopPropagation();

    let newJuego = {};
    newJuego.id=  uuid.v1(); //ID aleatorio
    newJuego.nombre= $nombreJuego.value; 
    newJuego.tematica= $tematicaJuego.value; 
    newJuego.valor= $valorJuego.value; 
    newJuego.puntos= Number($puntosJuego.value); 


    //Asignar Nuevo Juego
    videoJuegos.push(newJuego);
    //Visualización
    listarJuegos(videoJuegos);

    $nombreJuego.value=''; $tematicaJuego.value=''; $valorJuego.value=''; $puntosJuego.value='';

});

//Funciones
function listarJuegos(juegos){
    $listaVideoJuegos.innerHTML='';

    juegos.forEach(function(e){
        let {id, nombre, tematica, valor, puntos} = e;
        let html = `<div class="card" style="width: 18rem; display: flex;align-items: center;">
                        <img src="https://cdn-icons-png.flaticon.com/512/75/75472.png" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title  justify-content-center">${nombre}</h5>
                            <p class="card-text"><b>Temática:</b>${tematica}</p>
                            <p class="card-text"><b>Valor: $</b>${valor}</p>
                            <div class="estrella"><img src="img/estrella2.png" alt="Puntos" class="img-puntos" style="text-align: center;"></div>
                            <p class="card-text"><b>Puntos:</b>${puntos}</p>
                            
                        </div>
                        <button class="eliminarRuta">
                            <img src="img/borrar.png" alt="eliminar" class="imgBorrarJuego" id="${id}">
                        </button>
                    </div>`;

        $listaVideoJuegos.insertAdjacentHTML('beforeend',html)
    });
    juegosSelector();
    addlocalStorageJ();
};
function addlocalStorageJ(){
    localStorage.setItem('videoJuegos', JSON.stringify(videoJuegos));
}
function eliminarJuego(targetId){
    videoJuegos = videoJuegos.filter(function(e){
        return e.id != targetId
    });
    listarJuegos(videoJuegos);
};

//MODULO COMPRAS
let $seleccionarCliente = document.getElementById('seleccionar-cliente');
let $seleccionarJuego = document.getElementById('seleccionar-juego');

const $botonConfirmarCompra = document.getElementById('confirmar-compra');
const $factura = document.getElementById('factura');
//AddEventListener
$botonConfirmarCompra.addEventListener('click',function(){
    
    if($seleccionarJuego.value!='Seleccionar juego' &&  $seleccionarCliente.value!= 'Seleccionar cliente'){
        videoJuegos.forEach(function(e){
            if(e.id == $seleccionarJuego.value){
                let juego = e.nombre;
                let precio = e.valor;
                
                let puntos = Number(e.puntos);
    
                clientes.forEach(function(a){
                    if(a.id == $seleccionarCliente.value){
                        let nombre = a.nombre +" "+a.apellidos;
                        let suma = Number(a.puntos)+ puntos;
                        a.puntos =suma;
    
                        factura(nombre,juego,precio)
                    };
                    return
                });
                return
            }
    
        });
        listaClientes(clientes);
        Swal.fire({
            text:'¡Compra realizada exitosamente!',
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/148/148767.png',
            imageWidth: 100,
            imageAlt: 'Custom image'
        });
        clientesSelector();
        juegosSelector();

    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Selecciona todos los campos!',
          })
    };
   
});

//Funciones
//Llenar dinámicamente select clientes
function clientesSelector(){
    $seleccionarCliente.innerHTML = '<option selected>Seleccionar cliente</option';
    
    clientes.forEach(opcionCliente =>{
        const opcion = document.createElement('option');
        opcion.value = opcionCliente.id;
        opcion.textContent = opcionCliente.nombre +" "+opcionCliente.apellidos;
    
        $seleccionarCliente.appendChild(opcion);
    })
};
//Llenar dinámicamente select juegos
function juegosSelector(){
    $seleccionarJuego.innerHTML = '<option selected>Seleccionar juego</option';
    videoJuegos.forEach(opcionJuego =>{
        const opcion = document.createElement('option');
        opcion.value = opcionJuego.id;
        opcion.textContent = opcionJuego.nombre;
    
        $seleccionarJuego.appendChild(opcion);
    })
};

//Resumen de Compra
function factura(nombre,juego,precio){
    let iva = precio*0.16;
    let impuesto = precio*0.04;
    let total = precio+iva+impuesto;


    $factura.innerHTML = `<h4><b>Compra:</b>${" "+juego}</h4>
                            <p><b>Cliente:</b>${" "+nombre}</p>
                            <p><b>IVA: $</b>${iva}</p>
                            <p><b>Impuesto especial: $</b>${impuesto}</p>
                            <p><b>TOTAL: $</b>${total}</p>`;

    listaClientesP(clientes)
    $factura.style.display="block"    

};


//Modulo fidelización
const $tablaClientesP =document.getElementById('template-clientesP');

//Puntos de los clientes 
function listaClientesP(clientes){
    $tablaClientesP.innerHTML="";
    let contador = 1;
    clientes.forEach(e => {
        let html =`<tr>
                        <th scope="row">${contador}</th>
                        <td>${e.id}</td>
                        <td>${e.nombre}</td>
                        <td>${e.apellidos}</td>
                        <td>${e.telefono}</td>
                        <td>${e.puntos}</td>
                    </tr>`
        contador +=1;
        $tablaClientesP.insertAdjacentHTML("beforeend", html);
    }
)};
