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

// Si la solicitud es OPTIONS, responde con éxito Y SALE.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
} else {
    $json = file_get_contents("php://input");
    $data = json_decode($json, true); // true para obtener un array asociativo

    $c = $data['codigo'];
    $n = $data['nombre'];

    if ($c !== "" && $n !== "") {
        $result = $conexion->query(" SELECT codigo FROM proveedores WHERE codigo ='$c' ") or die("error en base de datos" . $conexion->error);
        $found = "";
        $row = mysqli_fetch_assoc($result);
        $found = $row["codigo"];
        if ($found) {
            echo json_encode(array("error" => "ya existe ese proveedor o codigo de proveedor"));
        } else {
            $result = $conexion->query(" INSERT INTO proveedores(codigo, nombre) values('$c', '$n') ") or die("error en base de datos" . $conexion->error);

            if ($result) {
                $filasAfectadas = $conexion->affected_rows;
                if ($filasAfectadas > 0) {
                    echo json_encode(array("ok" => "✔ datos insertados con exito."));
                } else {
                    echo json_encode(array("error" => "No se pudo insertar el proveedor"));
                }
            } else {
                echo json_encode(array("error" => "Error al ejecutar la consulta: " . $conexion->error));
            }
        }
    } else {
        echo json_encode(array("error" => "❌ rellenar formulario. datos vacios " . $conexion->error));
    }
}
