<?php
require('./dominio-permitido.php');
require("../../../../conexion.php");
//require("../../../conexion.php");
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: $dp");
// Permitir los métodos HTTP especificados (GET, POST, etc.)
header("Access-Control-Allow-Methods: POST");
// Permitir los encabezados personalizados que necesites
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Permitir el envío de cookies en las solicitudes
//header("Access-Control-Allow-Credentials: true");



$json = file_get_contents("php://input");
$data = json_decode($json, true); // true para obtener un array asociativo

$proveedor = $data['p'];

if ($proveedor !== "") {
    $result = $conexion->query(" SELECT id FROM proveedores WHERE nombre ='$proveedor'") or die("error en base de datos" . $conexion->error);
    if ($result) {
        $numRows = mysqli_num_rows($result);
        if ($numRows > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $found =  $row["id"];
            }
            $result = $conexion->query(" SELECT * FROM productodeproveedor WHERE id_proveedor ='$found'") or die("error en base de datos" . $conexion->error);
            while ($row = mysqli_fetch_assoc($result)) {
                $found2[] = $row["nombre"];
            }
            echo json_encode(array("ok" => "✔ datos insertados con exito.", "productos" => $found2));
        } else {
            echo json_encode(array("error" => "no existen productos." . $conexion->error));
        }
    } else {
        echo json_encode(array("error" => "Error al ejecutar la consulta: " . $conexion->error));
    }
} else {
    echo json_encode(array("error" => "❌ rellenar proveedor antes de consultar productos del mismo. " . $conexion->error));
}
