<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once __DIR__ . '/CargarDoscarRepository.php';
require_once __DIR__ . '/../comunes/Respuesta.php';
require_once __DIR__ . '/../log/LoggerEvento.php';
require_once __DIR__ . '/../../conexion/conexion.php';


class CargarDoscarEngine
{
    private $repositorio;
    private LoggerEvento $logger;
    private mysqli $conexion;
    public function __construct(mysqli $conexion)
    {
        $this->repositorio = new CargarDoscarRepository();
        $this->logger = new LoggerEvento($conexion);
    }

   

    public function estructurarDatosEnviar():Respuesta
    {
        $respuesta = new Respuesta();
        try {
            $respuesta->setSuccess(true);
            $respuesta->setMensaje("Datos estructurados correctamente.");
           
        } catch (Exception $e) {
            $respuesta->setSuccess(false);
            $respuesta->setMensaje("Error al estructurar los datos: " . $e->getMessage());
            $respuesta->setDatos([]);

            if (isset($this->logger)) {
                $this->logger->guardar("Error al estructurar los datos: " . $e->getMessage(), "Datos", "sistema");
            }
        }

        return $respuesta;
    }
    
  

   
}
