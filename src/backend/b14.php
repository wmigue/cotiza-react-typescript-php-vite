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
        $token = $_SERVER["HTTP_AUTHORIZATION"];
        $token = explode(" ", $token);

        $tokenDecoded = verificarTOKEN($token[1]);
        $id = $tokenDecoded->id;
        $nombre = $tokenDecoded->nombre;

        $result = $conexion->prepare("SELECT * FROM log WHERE nombre = ? AND id_log = ? ");

        if ($result->bind_param("ss", $nombre, $id)) {
            $result->execute();
            $r = $result->get_result();
            if ($r->num_rows > 0) {
                $assoc = $r->fetch_all(MYSQLI_ASSOC);
                $usuario = [];
                foreach ($assoc as $k => $v) {
                    $usuario[$k] = $v;
                }
                echo json_encode(array('ok' => true, 'data' => $nombre));
            } else {
                echo json_encode(array('error' => 'credenciales incorrectas.'));
            }
        } else {
            echo json_encode(array('error' => 'credenciales incorrectas.'));
        }
    } catch (Exception $e) {
        echo json_encode(array('error' => $e->getMessage()));
    }
}
