<?php
/*
*Autor: Ariel Lara
*Fecha: 2025-09-07
*Descripción: Controlador para manejar las solicitudes de sincronización de datos.
*/
require_once __DIR__ . '/../comunes/Respuesta.php';
require_once __DIR__ . '/../../conexion/conexion.php';
require_once __DIR__ . '/CargarDoscarManager.php';

class ControladorSincronizacion
{
    private $conexion;
    private $cargarDoscarManager;
    private $respuesta;
    public function __construct($conexion)
    {
        $this->conexion = $conexion;
        $this->cargarDoscarManager = new CargarDoscarManager($conexion);
        $this->respuesta = new Respuesta();
    }

    public function procesarRequest()
    {
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
        try {
            $this->procesarOperacion($data);
        } catch (Exception $e) {
            $this->respuesta->setSuccess(false);
            $this->respuesta->setMensaje("Error en el servidor: " . $e->getMessage());
            $this->respuesta->setDatos([]);
            $this->respuesta->setUrl("");
        }
        echo $this->respuesta->toJson();
    }

    private function procesarOperacion($data)
    {
        switch ($data["tipo"] ?? "") {
            case "CARGARDOSCAR":
                if (!isset($data)) {
                    throw new Exception("Faltan los datos");
                }
                $this->respuesta = $this->cargarDoscarManager->sincronizarDatos($data);
                $this->respuesta->setUrl("");
                break;

            case "CARGARDATOSNUBE":
                if (!isset($data)) {
                    throw new Exception("Faltan los datos");
                }
                $this->respuesta = $this->cargarDoscarManager->cargarDatosNube($data);
                $this->respuesta->setUrl("");
                break;

            default:
                $this->respuesta->setSuccess(false);
                $this->respuesta->setMensaje("Operación desconocida");
                $this->respuesta->setDatos([]);
                $this->respuesta->setUrl("");
                break;
        }
    }
}
$controlador = new ControladorSincronizacion($conexion);
$controlador->procesarRequest();
