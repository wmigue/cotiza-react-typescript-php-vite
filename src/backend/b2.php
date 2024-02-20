<?php
require ('./dominio-permitido.php');
require("../../../../conexion.php");

header("Access-Control-Allow-Origin: $dp");
header("Access-Control-Allow-Methods: OPTIONS,GET");



$resultado = $conexion->query("select * from clientes");
$arr = [];
while ($row = mysqli_fetch_assoc($resultado)) {
    $arr[] = [
        "nombre" => $row["nombre"],
        "cuit" => $row["cuit"],
        "direccion" => $row["direccion"],
        "tipo" => $row["tipo"],
        "email" => $row["email"],
    ];
}


echo json_encode($arr);