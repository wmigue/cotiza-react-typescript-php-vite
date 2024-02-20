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

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
} else {

    try {

        $codigo = $data["codigo"];
        $result = $conexion->prepare("DELETE FROM proveedores WHERE codigo = ? ");
        if ($result->bind_param("s", $codigo)) {
            $result->execute();
            if ($result->affected_rows > 0) {
                echo json_encode(array('ok' => true, 'message' => 'Registro eliminado exitosamente.'));
            } else {
                echo json_encode(array('error' => 'No se encontró el registro para eliminar.'));
            }
        } else {
            echo json_encode(array('error' => 'error.'));
        }
    } catch (Exception $e) {
        echo json_encode(array('error' => $e->getMessage()));
    }
}
