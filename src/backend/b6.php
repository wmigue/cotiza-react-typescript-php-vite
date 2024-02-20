<?php
require('./dominio-permitido.php');
require("../../../../conexion.php");
//require("../../../conexion.php");

header("Access-Control-Allow-Origin: $dp");
header("Access-Control-Allow-Methods: OPTIONS, GET");



$resultado = $conexion->query("select * from proveedores");
$arr = [];
while ($row = mysqli_fetch_assoc($resultado)) {
    $arr[] = [
        "id" => $row["id"],
        "codigo" => $row["codigo"],
        "nombre" => $row["nombre"],
    ];
}


echo json_encode($arr);
