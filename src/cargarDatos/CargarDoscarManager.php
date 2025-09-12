<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once 'CargarDoscarRepository.php';
require_once 'CargarDoscarEngine.php';
require_once __DIR__ . '/../comunes/Respuesta.php';
require_once __DIR__ . '/../log/LoggerEvento.php';
require_once __DIR__ . '/../../conexion/conexion.php';


class CargarDoscarManager
{
    private $repositorio;
    private LoggerEvento $logger;
    private mysqli $conexion;
    private CargarDoscarEngine $doscarEngine;
    public function __construct(mysqli $conexion)
    {
        $this->repositorio = new CargarDoscarRepository();
        $this->logger = new LoggerEvento($conexion);
        $this->conexion = $conexion; 
        $this->doscarEngine = new CargarDoscarEngine($conexion);
    }

    public function sincronizarDatos($datos)
    {
        $respuesta = new Respuesta();

        try {
            $datosDoscar = $this->traerDatosDoscar();
            if (!$datosDoscar->getSuccess()) {
                $respuesta->setSuccess(false);
                $respuesta->setMensaje("Error al obtener datos desde doscar" . $datosDoscar->getMensaje());
                $respuesta->setDatos([]);
                $this->logger->guardar("Error al obtener datos desde doscar: " . $datosDoscar->getMensaje(), "Dependencia", "sistema");
                return $respuesta;
            }
            $normalizarDatos = $this->doscarEngine->normalizaDatos($datosDoscar->getDatos());
            $this->doscarEngine->debugJsonEncoding($normalizarDatos);
            $datosEnviarBaseCludd = json_encode($normalizarDatos, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            $enviarCloudDoscar = $this->doscarEngine->enviarDatosNube($datosEnviarBaseCludd);
            
            if ($enviarCloudDoscar->getSuccess()) {
                $respuesta->setSuccess(true);
                $respuesta->setMensaje($enviarCloudDoscar->getMensaje());
                $respuesta->setDatos([]);
            } else {
                $respuesta->setSuccess(false);
                $respuesta->setMensaje($enviarCloudDoscar->getMensaje());
                $respuesta->setDatos([]);
            }

        } catch (Exception $e) {
            $respuesta->setSuccess(false);
            $respuesta->setMensaje("Error procesando doscar: " . $e->getMessage());
            $respuesta->setDatos([]);

            if (isset($this->logger)) {
                $this->logger->guardar("Error Procesando doscar: " . $e->getMessage(), "Dependencia", "sistema");
            }
        }

        return $respuesta;
    }
    
    private function traerDatosDoscar():Respuesta {
        $respuesta = new Respuesta();
      
        try
        {
            $obtenerDatosDoscar = $this->doscarEngine->obtenerArticulosDoscar();
            if (!$obtenerDatosDoscar->getSuccess())
            {
                $respuesta->setSuccess(false);
                $respuesta->setMensaje("Error al obtener datos desde Doscar: " . $obtenerDatosDoscar->getMensaje());
                $respuesta->setDatos([]);
                return $respuesta;
            }
            $respuesta->setDatos($obtenerDatosDoscar->getDatos());
            $respuesta->setSuccess(true);
            $respuesta->setMensaje("Datos obtenidos correctamente desde Doscar.");
            
        }
        catch (Exception $e)
        {
            $respuesta->setSuccess(false);
            $respuesta->setMensaje("Error al obtener los datos desde Doscar: " . $e->getMessage());
            $respuesta->setDatos([]);
        }
        return $respuesta;
    }

    public function cargarDatosNube($datos)
    {
        $respuesta = new Respuesta();

        try {
            $datosEstructura = $this->doscarEngine->estructurarDatosEnviar();


            if ($datosEstructura->getSuccess()) {
                $respuesta->setSuccess(true);
                $respuesta->setMensaje("Datos cargados a la nube exitosamente.");
                $respuesta->setDatos([]);
            } else {
                $respuesta->setSuccess(false);
                $respuesta->setMensaje("No se pudo cargar los datos a la nube.");
                $respuesta->setDatos([]);
            }

        } catch (Exception $e) {
            $respuesta->setSuccess(false);
            $respuesta->setMensaje("Error al cargar los datos a la nube: " . $e->getMessage());
            $respuesta->setDatos([]);

            if (isset($this->logger)) {
                $this->logger->guardar("Error al cargar datos a la nube: " . $e->getMessage(), "CargarDatosNube", "sistema");
            }
        }

        return $respuesta;
    }
}
