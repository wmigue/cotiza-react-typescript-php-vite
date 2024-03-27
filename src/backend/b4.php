<?php
require('./dominio-permitido.php');
require("../../../../conexion.php");
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: $dp");
// Permitir los métodos HTTP especificados (GET, POST, etc.)
header("Access-Control-Allow-Methods: POST, OPTIONS");
// Permitir los encabezados personalizados que necesites
header("Access-Control-Allow-Headers: Content-Type");
// Permitir el envío de cookies en las solicitudes
header("Access-Control-Allow-Credentials: true");



$json = file_get_contents("php://input");
$data = json_decode($json, true); // true para obtener un array asociativo

$numero = $data['numero'];
$jsonData = json_encode($data['json']);
$result = $conexion->query(" INSERT INTO cotizador(numero, json) values('$numero', '$json') ") or die("error en base de datos" . $conexion->error);
