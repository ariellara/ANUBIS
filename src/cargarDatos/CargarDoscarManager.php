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
    public function __construct(mysqli $conexion)
    {
        $this->repositorio = new CargarDoscarRepository();
        $this->logger = new LoggerEvento($conexion);
        $this->conexion = $conexion; 
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
            $resultado = $this->repositorio->sincronizarDatos($datosDoscar->getDatos());

            if ($resultado) {
                $respuesta->setSuccess(true);
                $respuesta->setMensaje("Datos desde Doscar Guardados Exitosamente.");
                $respuesta->setDatos([]);
            } else {
                $respuesta->setSuccess(false);
                $respuesta->setMensaje("No se pudo registrar la dependencia.");
                $respuesta->setDatos([]);
            }

        } catch (Exception $e) {
            $respuesta->setSuccess(false);
            $respuesta->setMensaje("Error al registrar la dependencia: " . $e->getMessage());
            $respuesta->setDatos([]);

            if (isset($this->logger)) {
                $this->logger->guardar("Error al guardar dependencia: " . $e->getMessage(), "Dependencia", "sistema");
            }
        }

        return $respuesta;
    }
    
    private function traerDatosDoscar():Respuesta {
        $respuesta = new Respuesta();
        try
        {
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
        $doscarEngine = new CargarDoscarEngine($this->conexion);

        try {
            $datosEstructura = $doscarEngine->estructurarDatosEnviar();


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
