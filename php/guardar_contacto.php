<?php
$usuario = "root"; //el usuario
$password = "";  //contraseña (en WampServer por defecto va vacía)
$servidor = "localhost";//servidor local
$basededatos = "EMA_ORGANICOS"; //nombre de la base de datos

$conexion = mysqli_connect($servidor, $usuario, $password)
 or die("Error en el servidor, en la Base de Datos");

$db = mysqli_select_db($conexion, $basededatos)
or die("Error al conectarse a la base de Datos");

mysqli_set_charset($conexion, "utf8mb4");

$Nombre = $_POST['nombre'];
$Correo = $_POST['correo'];
$Mensaje = $_POST['mensaje'];

// Consulta preparada: evita que alguien meta código SQL desde el formulario
$sql = "INSERT INTO Contactos (Nombre, Correo, Mensaje) VALUES (?, ?, ?)";
$stmt = mysqli_prepare($conexion, $sql);
mysqli_stmt_bind_param($stmt, "sss", $Nombre, $Correo, $Mensaje);
$ejecutar = mysqli_stmt_execute($stmt); //se manda llamar la conexion y sql donde se encuentran los parametros

if(!$ejecutar){
echo "Hubo un error";
}else{
echo "Datos Guardados Correctamente<br><a href='../Contacto/contacto.html'> volver</a>";
}
?>
