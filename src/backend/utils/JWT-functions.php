<?php

include_once "JWT-Class.php";



function GenerarTOKEN($id, $nombre, $validez)
{
    $jwt = new JWT();
    $secret_key = "muy-secreto-de-mas";
    $exp_time = time() + (60 * $validez); //pasarle en minutos

    $data = array(
        "id" => $id,
        "nombre" => $nombre,
        "exp" => $exp_time
    );

    // Crear el token
    $token = $jwt->encode($data, $secret_key, 'HS256');

    return $token;
}

function verificarTOKEN($token)
{
    $jwt = new JWT();
    $secret_key = "muy-secreto-de-mas";
    try {
        $decoded = $jwt->decode($token, $secret_key);
        return $decoded; //de aqui extraigo los campos incrustados en el token .
    } catch (Exception $e) {
        return $e;
        // return 0;
    }
}
