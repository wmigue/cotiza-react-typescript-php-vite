<?php
require ('./dominio-permitido.php');
require("../../../../conexion.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: OPTIONS,GET");



$resultado = $conexion->query("select * from productos");
$arr = [];
while ($row = mysqli_fetch_assoc($resultado)) {
    $arr[] = [
        "nombre" => $row["nombre"],
        "unidad" => $row["unidad"],
        "precio" => $row["precio"],
        "unidad" => $row["unidad"],
    ];
}


echo json_encode($arr);