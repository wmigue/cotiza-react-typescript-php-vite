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

    $id_proveedor = $data['proveedor']; //viene el id
    $producto = $data['producto'];

    if ($producto !== "" && $id_proveedor !== "") {
        $result = $conexion->query(" INSERT INTO productodeproveedor(nombre, id_proveedor) VALUES('$producto','$id_proveedor') ") or die("error en base de datos" . $conexion->error);
        if ($result) {
            $filasAfectadas = $conexion->affected_rows;
            if ($filasAfectadas > 0) {
                echo json_encode(array("ok" => "✔ datos insertados con exito."));
            } else {
                echo json_encode(array("error" => "Error al ejecutar la consulta: " . $conexion->error));
            }
        }
    } else {
        echo json_encode(array("error" => "❌ rellenar formulario. datos vacios " . $conexion->error));
    }
}
