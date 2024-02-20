<?php
require('./dominio-permitido.php');
require("../../../../conexion.php");
//require("../../../conexion.php");
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: $dp");
// Permitir los métodos HTTP especificados (GET, POST, etc.)
header("Access-Control-Allow-Methods: POST, OPTIONS");
// Permitir los encabezados personalizados que necesites
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Permitir el envío de cookies en las solicitudes
//header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
} else {

    $json = file_get_contents("php://input");
    $data = json_decode($json, true); // true para obtener un array asociativo

    $numero = $data['numero'];
    $jsonData = json_encode($data['json']);

    try {

        $result = $conexion->query(" INSERT INTO `orden-compra`(numero, json) values('$numero', '$jsonData') ")
            or die("error en base de datos" . $conexion->error);
        if ($result) {
            $filasAfectadas = $conexion->affected_rows;
            if ($filasAfectadas > 0) {
                echo json_encode(array("ok" => "✔ datos insertados con exito.", "data" => $jsonData));
            }
        } else {
            echo json_encode(array("error" => "❌ NO SE PUDO INSERTAR. " . $conexion->error));
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}
