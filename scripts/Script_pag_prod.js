// AGREGAR UN PRODUCTO AL CARRITO
// "boton" es el boton COMPRAR que se presiono
function comprar(boton) {

    // BUSCAR EL NOMBRE Y EL PRECIO DENTRO DE LA MISMA TARJETA
    var tarjeta = boton.parentElement;
    var nombre = tarjeta.querySelector("h2").innerText;
    var textoPrecio = tarjeta.querySelector(".Precio").innerText;

    // QUITAR EL SIMBOLO $ Y LA COMA PARA QUE QUEDE SOLO EL NUMERO
    textoPrecio = textoPrecio.replace("$", "");
    textoPrecio = textoPrecio.replace(",", "");
    var precio = Number(textoPrecio);

    // SACAR LO QUE YA ESTABA GUARDADO EN EL CARRITO
    var carrito = [];
    var guardado = localStorage.getItem("carrito");

    if (guardado != null) {
        carrito = JSON.parse(guardado);
    }

    // REVISAR SI EL PRODUCTO YA ESTA EN EL CARRITO
    var encontrado = false;

    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre == nombre) {
            carrito[i].cantidad = carrito[i].cantidad + 1;
            encontrado = true;
        }
    }

    // SI NO ESTABA, SE AGREGA NUEVO
    if (encontrado == false) {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    // GUARDAR EL CARRITO
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Agregaste al carrito: " + nombre);
}