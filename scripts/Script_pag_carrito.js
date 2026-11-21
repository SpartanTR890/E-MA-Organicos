// BUSCAR LOS ELEMENTOS DEL HTML
var listaCarrito = document.getElementById("ListaCarrito");
var textoTotal = document.getElementById("TextoTotal");
var botonFinalizar = document.getElementById("BotonFinalizar");

// AQUI SE GUARDAN LOS PRODUCTOS
var carrito = [];

// SACAR LO QUE ESTABA GUARDADO EN EL NAVEGADOR
var guardado = localStorage.getItem("carrito");

if (guardado != null) {
    carrito = JSON.parse(guardado);
}

// GUARDAR EL CARRITO EN EL NAVEGADOR
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// MOSTRAR LOS PRODUCTOS EN LA PAGINA
function mostrarCarrito() {
    var html = "";
    var total = 0;

    // SI NO HAY PRODUCTOS
    if (carrito.length == 0) {
        listaCarrito.innerHTML = "<p class='CarritoVacio'>Tu carrito está vacío.</p>";
        textoTotal.innerHTML = "$0.00";
        return;
    }

    // UN PRODUCTO POR CADA VUELTA
    for (var i = 0; i < carrito.length; i++) {
        var producto = carrito[i];
        var subtotal = producto.precio * producto.cantidad;
        total = total + subtotal;

        html = html + "<div class='ProductoCarrito'>";
        html = html + "<h3>" + producto.nombre + "</h3>";
        html = html + "<p>Precio: $" + producto.precio.toFixed(2) + "</p>";
        html = html + "<p>Cantidad: " + producto.cantidad + "</p>";
        html = html + "<p>Subtotal: $" + subtotal.toFixed(2) + "</p>";
        html = html + "<div class='Cantidad'>";
        html = html + "<button class='BotonCantidad BotonRestar' onclick='cambiarCantidad(" + i + ", -1)'>−</button>";
        html = html + "<button class='BotonCantidad BotonSumar' onclick='cambiarCantidad(" + i + ", 1)'>+</button>";
        html = html + "</div>";
        html = html + "<button class='BotonEliminar' onclick='eliminarProducto(" + i + ")'>Eliminar</button>";
        html = html + "</div>";
    }

    listaCarrito.innerHTML = html;
    textoTotal.innerHTML = "$" + total.toFixed(2);
}

// SUMAR O RESTAR UNO A LA CANTIDAD
function cambiarCantidad(posicion, cambio) {
    carrito[posicion].cantidad = carrito[posicion].cantidad + cambio;

    // SI LLEGA A 0 SE QUITA EL PRODUCTO
    if (carrito[posicion].cantidad <= 0) {
        carrito.splice(posicion, 1);
    }

    guardarCarrito();
    mostrarCarrito();
}

// QUITAR UN PRODUCTO
function eliminarProducto(posicion) {
    carrito.splice(posicion, 1);

    guardarCarrito();
    mostrarCarrito();
}

// BOTON FINALIZAR COMPRA
botonFinalizar.onclick = function () {
    if (carrito.length == 0) {
        alert("Tu carrito está vacío. Agrega algún producto.");
        return;
    }

    var resumen = "RESUMEN DE TU COMPRA\n\n";
    var total = 0;

    for (var i = 0; i < carrito.length; i++) {
        var subtotal = carrito[i].precio * carrito[i].cantidad;
        total = total + subtotal;

        resumen = resumen + carrito[i].nombre + "\n";
        resumen = resumen + "Cantidad: " + carrito[i].cantidad + "\n";
        resumen = resumen + "Subtotal: $" + subtotal.toFixed(2) + "\n\n";
    }

    resumen = resumen + "TOTAL: $" + total.toFixed(2);
    alert(resumen);
};

// MOSTRAR EL CARRITO AL ABRIR LA PAGINA
mostrarCarrito();