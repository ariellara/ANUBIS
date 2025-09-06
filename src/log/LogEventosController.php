<?php
require_once '../comunes/Respuesta.php';
require_once '../../conexion/conexion.php';
require_once 'LogEventosManager.php';


header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "mensaje" => "Método no permitido"]);
    exit;
}

$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data, true);
usleep(500000);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(["success" => false, "mensaje" => "JSON inválido"]);
    exit;
}
$respuesta = new Respuesta();

try {
    $loggerEvento = new LogEventosManager($conexion);

    switch ($data["tipo"] ?? "") {
        case "LISTARLOGGER":
            if (!isset($data)) {
                throw new Exception("Falta los datos");
            }
            $respuesta = $loggerEvento->listarEventosLogger($data);
            $respuesta->setUrl("");
            break;
        }

} catch (Exception $e) {
    $respuesta->setSuccess(false);
    $respuesta->setMensaje("Error en el servidor: " . $e->getMessage());
    $respuesta->setDatos([]);
    $respuesta->setUrl("");
}

echo $respuesta->toJson();

