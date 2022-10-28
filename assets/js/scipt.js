//Funcion para validar login
function login(){

    user = document.getElementById("usuario").value;
    password = document.getElementById("contraseña").value;

    user == "usuario" && password == "12345" ? window.location = "./pages/home.html" : console.log("Los datos ingresados son incorrectos")

}

//Luxon JS
let DateTime = luxon.DateTime
let fechaAhora = DateTime.now()
let fechaCompleta = fechaAhora.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)
let fecha = fechaAhora.toLocaleString(DateTime.DATE_FULL)

//funciones constructoras de objetos

function crearArticulo(id , categoria, modelo, fabricante, proveedor, lugar, ingreso, precio, cantidad){
    this.id = id;
    this.categoria = categoria,
    this.modelo = modelo,
    this.fabricante = fabricante,
    this.proveedor = proveedor,
    this.lugar = lugar,
    this.ingreso = ingreso,
    this.precio = precio,
    this.cantidad = cantidad
}

function crearCliente(id, nombre, apellido, telefono, email, direccion, provincia){
    this.id= id,
    this.nombre = nombre,
    this.apellido = apellido,
    this.telefono = telefono,
    this.email = email,
    this.direccion = direccion,
    this.provincia = provincia
}

//Creacion de Arrays
let articulos = []
let clientes = []
let modelos = []
let cantidad = []
let categoria = []

//Guardar clientes en el storage
if(localStorage.getItem("clientes")){
    clientes = JSON.parse(localStorage.getItem("clientes"))
}else{
//clientes.push(cliente1, cliente2, cliente3, cliente4, cliente5, cliente6, cliente7, cliente8, cliente9, cliente10)
localStorage.setItem("clientes", JSON.stringify(clientes))
console.log("Se inicio sesion por primera vez correctamente, gracias por usar mi aplicacion :)")
}

//Guardar articulos en el storage
if(localStorage.getItem("articulos")){
    articulos = JSON.parse(localStorage.getItem("articulos"))
}else{
//articulos.push(articulo1, articulo2, articulo3, articulo4)
localStorage.setItem("articulos", JSON.stringify(articulos))
}

//Guardar modelos en el storage
if(localStorage.getItem("modelos")){
    modelos = JSON.parse(localStorage.getItem("modelos"))
}else{
localStorage.setItem("modelos", JSON.stringify(modelos))
}

//Guardar cantidad en el storage
if(localStorage.getItem("cantidad")){
    cantidad = JSON.parse(localStorage.getItem("cantidad"))
}else{
localStorage.setItem("cantidad", JSON.stringify(modelos))
}

//Guardar categoria en el storage
if(localStorage.getItem("categoria")){
    categoria = JSON.parse(localStorage.getItem("categoria"))
}else{
localStorage.setItem("categoria", JSON.stringify(categoria))
}

//modal de registro de eventos

let divModal = document.getElementById("modal-body")

//funcion para mostrar la cantidad de productos disponibles

let acumulador = 0

articulos.forEach((valor)=>{
    acumulador = acumulador + valor.cantidad
})

let divCantArticulos = document.getElementById("cantArticulos")
divCantArticulos.innerHTML = `${acumulador}`

//funcion para mostrar la cantidad de clientes

let cantClientes = clientes.length

let divCantClientes = document.getElementById("cantClientes")
divCantClientes.innerHTML = `${cantClientes}`

//funcion para mostrar el capital (suma de los precios multiplicado por la cantidad)

let capital = 0

articulos.forEach((valor)=>{
    capital = capital + valor.precio * valor.cantidad
})

let divCapital = document.getElementById("capital")
divCapital.innerHTML = `$${capital}`

//funcion para ver los dashboard

function verDashboard(){
    divClientes.innerHTML = ""
    divProductos.innerHTML = ""
    document.getElementById("nuevoProducto").style.display = "none";
    document.getElementById("nuevoCliente").style.display = "none";
    document.getElementById("main").style.display = "block";
}


let btnMostrarDashboard = document.getElementById("botonVerDashboard")
btnMostrarDashboard.addEventListener("click", ()=>{
    verDashboard()
    divModal.insertAdjacentHTML('afterend', `<p>${fechaCompleta} - Se mostro correctamente los dashboard</p>`);
})

//Funcion para ver el formulario que agrega nuevo cliente

function nuevoCliente(){
    divClientes.innerHTML = ""
    divProductos.innerHTML = ""
    document.getElementById("nuevoProducto").style.display = "none";
    document.getElementById("main").style.display = "none";
    document.getElementById("nuevoCliente").style.display = "block";
}


let btnMostrarFormularioClientes = document.getElementById("botonVerFormularioCliente")
btnMostrarFormularioClientes.addEventListener("click", ()=>{
    nuevoCliente()
    divModal.insertAdjacentHTML('afterend', `<p>${fechaCompleta} - Se mostro correctamente el formulario para agregar clientes</p>`);
})

//Funcion para ver el formulario que agrega nuevo articulos

function nuevoProducto(){
    divClientes.innerHTML = ""
    divProductos.innerHTML = ""
    document.getElementById("nuevoCliente").style.display = "none";
    document.getElementById("main").style.display = "none";
    document.getElementById("nuevoProducto").style.display = "block";
}


let btnMostrarFormularioProductos = document.getElementById("botonVerFormularioProducto")
btnMostrarFormularioProductos.addEventListener("click", ()=>{
    nuevoProducto()
    divModal.insertAdjacentHTML('afterend', `<p>${fechaCompleta} - Se mostro correctamente el formulario para agregar Articulos</p>`);
})

//Funcion para ver la lista de clientes

let divClientes = document.getElementById("clientes")

function mostrarClientes(array){
    divClientes.innerHTML = "<h4>Lista de clientes</h4>"
    divProductos.innerHTML = ""
    document.getElementById("nuevoProducto").style.display = "none";
    document.getElementById("nuevoCliente").style.display = "none";
    document.getElementById("main").style.display = "none";
    array.forEach((cliente)=>{
       let nuevoCliente = document.createElement("div")
           nuevoCliente.innerHTML = `<table class="table table-hover">
                                    <td>ID: ${cliente.id}</td>
                                    <td>Nombre: ${cliente.nombre}</td>
                                    <td>Apellido: ${cliente.apellido}</td>
                                    <td>Telefono: ${cliente.telefono}</td>
                                    <td>Email: ${cliente.email}</td>
                                    <td>Direccion: ${cliente.direccion}</td>
                                    <td>Provincia: ${cliente.provincia}</td>
                                    <td><button type="button" class="btn btn-danger" id="botonEliminar${cliente.id}"><i class="fa-solid fa-trash"></i></button></td>
                                    </table>`
            divClientes.append(nuevoCliente)
    })  

//Eliminar clientes
array.forEach((articulo, indice)=>{
    document.getElementById(`botonEliminar${articulo.id}`).addEventListener("click",()=>{
            array.splice(indice, 1)
            console.log(array)
            localStorage.setItem("articulos", JSON.stringify(array))
            mostrarProductos(array)
    })
})
}

let btnMostrarClientes = document.getElementById("botonVerClientes")
btnMostrarClientes.addEventListener("click", ()=>{
    mostrarClientes(clientes)
    divModal.insertAdjacentHTML('afterend', `<p>${fechaCompleta} - Se mostro correctamente la lista de clientes</p>`);
})

//Funcion para ver la lista de articulos

let divProductos = document.getElementById("productos")

function mostrarProductos(array){
    divClientes.innerHTML = ""
    divProductos.innerHTML = "<h4>Lista de productos disponibles</h4>"
    document.getElementById("nuevoProducto").style.display = "none";
    document.getElementById("nuevoCliente").style.display = "none";
    document.getElementById("main").style.display = "none";
    array.forEach((articulo)=>{
       let nuevoArticulo = document.createElement("div")
           nuevoArticulo.innerHTML = `<table class="table table-hover">
                                    <td>ID: ${articulo.id}</td>
                                    <td>Categoria: ${articulo.categoria}</td>
                                    <td>Modelo: ${articulo.modelo}</td>
                                    <td>Fabricante: ${articulo.fabricante}</td>
                                    <td>Proveedor: ${articulo.proveedor}</td>
                                    <td>Lugar: ${articulo.lugar}</td>
                                    <td>Fecha de ingreso: ${articulo.ingreso}</td>
                                    <td>Precio: $${articulo.precio}</td>
                                    <td>Cantidad disponible: ${articulo.cantidad}</td>
                                    <td><button type="button" class="btn btn-danger" id="botonEliminar${articulo.id}"><i class="fa-solid fa-trash"></i></button></td>
                                    </table>`
            divProductos.append(nuevoArticulo) 
    })


//Eliminar articulos
    array.forEach((articulo, indice)=>{
        document.getElementById(`botonEliminar${articulo.id}`).addEventListener("click",()=>{
                array.splice(indice, 1)
                localStorage.setItem("articulos", JSON.stringify(array))
                mostrarProductos(array)
        })
    })
}

let btnMostrarArticulos = document.getElementById("botonVerArticulos")
btnMostrarArticulos.addEventListener("click", ()=>{
    mostrarProductos(articulos)
    divModal.insertAdjacentHTML('afterend', `<p>${fechaCompleta} - Se mostro correctamente la lista de productos</p>`);
})


//Funcion para agregar clientes

function agregarCliente(array){
    let inputNombreCliente = document.getElementById("inputNombreCliente")
    let inputApellidoCliente = document.getElementById("inputApellidoCliente")
    let inputTelefonoCliente = document.getElementById("inputTelefonoCliente")
    let inputEmailCliente = document.getElementById("inputEmailCliente")
    let inputDireccionCliente = document.getElementById("inputDireccionCliente")
    let inputProvinciaCliente = document.getElementById("inputProvinciaCliente")
    let clienteCreado = new crearCliente(Math.random()*10000000000000000, inputNombreCliente.value, inputApellidoCliente.value, inputTelefonoCliente.value, inputEmailCliente.value, inputDireccionCliente.value, inputProvinciaCliente.value)
    array.push(clienteCreado)
    localStorage.setItem("clientes", JSON.stringify(array))
    //resetear formulario
    inputNombreCliente.value = ""
    inputApellidoCliente.value = ""
    inputTelefonoCliente.value = ""
    inputEmailCliente.value = ""
    inputDireccionCliente.value = ""
    inputProvinciaCliente.value = ""
}

let btnCrearCliente = document.getElementById("crearCliente")
btnCrearCliente.addEventListener("click",()=>{
    if(inputNombreCliente.value == "" || inputApellidoCliente.value == "" || inputTelefonoCliente.value == "" || inputEmailCliente.value == "" || inputDireccionCliente.value == "" || inputProvinciaCliente.value == ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor complete correctamente los campos'
          })
    }else{
    agregarCliente(clientes)
    divModal.insertAdjacentHTML('afterend', `<p>${fechaCompleta} - El nuevo cliente se agrego correctamente</p>`);
    }
})

//Funcion para agregar articulos


function agregarArticulo(array){
    let inputCategoriaArticulo = document.getElementById("inputCategoriaArticulo")
    let inputModeloArticulo = document.getElementById("inputModeloArticulo")
    let inputFabricanteArticulo = document.getElementById("inputFabricanteArticulo")
    let inputProveedorArticulo= document.getElementById("inputProveedorArticulo")
    let inputLugarArticulo = document.getElementById("inputLugarArticulo")
    let inputPrecioArticulo= document.getElementById("inputPrecioArticulo")
    let inputCantidadArticulo = document.getElementById("inputCantidadArticulo")
    let articuloCreado = new crearArticulo(Math.random()*10000000000000000, inputCategoriaArticulo.value, inputModeloArticulo.value, inputFabricanteArticulo.value, inputProveedorArticulo.value, inputLugarArticulo.value, fecha, inputPrecioArticulo.value, Number(inputCantidadArticulo.value))
    let modeloCharts = inputModeloArticulo.value
    let cantidadCharts = inputCantidadArticulo.value
    let categoriaCharts = inputCategoriaArticulo.value
    modelos.push(modeloCharts)
    cantidad.push(cantidadCharts)
    categoria.push(categoriaCharts)
    array.push(articuloCreado)
    localStorage.setItem("modelos", JSON.stringify(modelos))
    localStorage.setItem("cantidad", JSON.stringify(cantidad))
    localStorage.setItem("categoria", JSON.stringify(categoria))
    localStorage.setItem("articulos", JSON.stringify(array))
    //resetear formulario
    inputModeloArticulo.value = ""
    inputFabricanteArticulo.value = ""
    inputProveedorArticulo.value = ""
    inputLugarArticulo.value = ""
    inputPrecioArticulo.value = ""
    inputCantidadArticulo.value = ""
}

let btnCrearArticulo = document.getElementById("crearArticulo")
btnCrearArticulo.addEventListener("click",()=>{
    if(inputModeloArticulo.value == "" || inputFabricanteArticulo.value == "" || inputProveedorArticulo.value == "" || inputLugarArticulo.value == "" || inputPrecioArticulo.value == "" || inputCantidadArticulo.value == ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor complete correctamente los campos'
          })
    }else{
    agregarArticulo(articulos)
    divModal.insertAdjacentHTML('afterend', `<p>${fechaCompleta} - El nuevo articulo se agrego correctamente</p>`);
    }
})

// graficos charts (todavia no funcionan)

const ctx = document.getElementById('lineChart').getContext('2d');
const myChart1 = new Chart(ctx, {
    type: 'line',
    data: {
        labels: modelos,
        datasets: [{
            label: '# of Votes',
            data: cantidad,
            backgroundColor: [
                'rgb(85, 85, 85, 1)'
            ],
            borderColor: [
                'rgb(41, 155, 99)'
            ],
            borderWidth: 1
        }]
    },
    options: {
            responsive: true
    }
});

const cty = document.getElementById('doughnut').getContext('2d');
const myChart2 = new Chart(cty, {
    type: 'doughnut',
    data: {
        labels: categoria,
        datasets: [{
            label: 'Employes',
            data: cantidad,
            backgroundColor: [
                'rgba(41, 155, 99, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(120, 46, 139, 1)'
            ],
            borderColor: [
                'rgba(41, 155, 99, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(120, 46, 139, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});
