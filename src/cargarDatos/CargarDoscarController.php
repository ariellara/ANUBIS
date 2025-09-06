

<?php
require_once '../comunes/Respuesta.php';
require_once '../../conexion/conexion.php';
require_once 'CargarDoscarManager.php';

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
    $cargarDoscarManager = new CargarDoscarManager($conexion);

    switch ($data["tipo"] ?? "") {
        case "CARGARDOSCAR":
            if (!isset($data)) {
                throw new Exception("Falta los datos");
            }
            $respuesta = $cargarDoscarManager->sincronizarDatos($data);
            $respuesta->setUrl("");
            break;
         case "CARGARDATOSNUBE":
            if (!isset($data)) {
                throw new Exception("Falta los datos");
            }
            $respuesta = $cargarDoscarManager->cargarDatosNube($data);
            $respuesta->setUrl("");
            break;   

        default:
            $respuesta->setSuccess(false);
            $respuesta->setMensaje("Operación desconocida");
            $respuesta->setDatos([]);
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
