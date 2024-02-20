<?php

require('./dominio-permitido.php');
require("../../../../conexion.php");
//require("../../../conexion.php");
require_once("utils/JWT-functions.php");
header("Access-Control-Allow-Origin: $dp");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
// Permitir los encabezados personalizados que necesites
header("Access-Control-Allow-Headers: Content-Type, Authorization");



$json = file_get_contents("php://input");
$data = json_decode($json, true); // true para obtener un array asociativo

$nombre = "orden-compra";
$pass = $data["pass"];

try {
    $result = $conexion->prepare("SELECT * FROM log WHERE nombre = ? AND pass = ? ") or die("error en base de datos" . $conexion->error);
    $result->bind_param("ss", $nombre, $pass);
    $result->execute();
    $result = $result->get_result();
    $registros = $result->num_rows;
    $rows = $result->fetch_all(MYSQLI_ASSOC);
    foreach ($rows as $k => $v) {
        $tipo[$k] = $v;
    }
    if ($registros > 0) {
        $token = GenerarTOKEN($tipo[0]['id_log'], $tipo[0]['nombre'], 20); //en minutos
        echo json_encode(array('ok' => $token));
    } else {
        echo json_encode(array('error' => 'credenciales incorrectas.'));
    }
} catch (Throwable $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
