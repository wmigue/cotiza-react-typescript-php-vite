<?php
require ('./dominio-permitido.php');
require("../../../../conexion.php");

header("Access-Control-Allow-Origin: $dp");
header("Access-Control-Allow-Methods: OPTIONS,GET");


$resultado = $conexion->query("select * from transporte_excedente_localidades");
$arr = [];
while ($row = mysqli_fetch_assoc($resultado)) {
    $arr[] = [
        "localidad" => $row["localidad"],
        "excedente" => $row["excedente"],
    ];
}

echo json_encode($arr);