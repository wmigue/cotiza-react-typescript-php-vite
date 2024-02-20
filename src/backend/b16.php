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

$proveedor = $data['proveedor_id'];
$typing = $data['typing_product'];

if ($proveedor !== "") {
    $result = $conexion->query("SELECT * FROM productodeproveedor WHERE id_proveedor ='$proveedor' AND nombre LIKE '%$typing%'") or die("error en base de datos" . $conexion->error);
    if ($result) {
        $numRows = mysqli_num_rows($result);
        if ($numRows > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $found[] = $row["nombre"];
            }
            echo json_encode(array("ok" => "productos encontrados", "productos" => $found));
        } else {
            echo json_encode(array("error" => "no existen productos de este proveedor." . $conexion->error));
        }
    } else {
        echo json_encode(array("error" => "Error al ejecutar la consulta: " . $conexion->error));
    }
} else {
    echo json_encode(array("error" => "❌ rellenar proveedor antes de consultar productos del mismo. " . $conexion->error));
}
