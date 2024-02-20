<?php
require('./dominio-permitido.php');
require("../../../../conexion.php");
//require("../../../conexion.php");

header("Access-Control-Allow-Origin: $dp");
header("Access-Control-Allow-Methods: OPTIONS,GET");
// Permitir los encabezados personalizados que necesites
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$resultado = $conexion->query("select COUNT(*) as ultimo from `orden-compra`");
$row = mysqli_fetch_assoc($resultado);


echo json_encode(array("ultimo" => $row["ultimo"]));
