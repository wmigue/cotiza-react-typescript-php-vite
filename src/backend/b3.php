<?php
require ('./dominio-permitido.php');
require("../../../../conexion.php");

header("Access-Control-Allow-Origin: $dp");
header("Access-Control-Allow-Methods: OPTIONS,GET");


$resultado = $conexion->query("select COUNT(*) as ultimo from cotizador");
$row = mysqli_fetch_assoc($resultado);

$resultado2 = $conexion->query("select max(lista) as lista_actual from listas");
$row2 = mysqli_fetch_assoc($resultado2);


echo json_encode(array("ultimo"=>$row["ultimo"], "lista"=>$row2["lista_actual"])   );