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
    public function obtenerArticulosDoscar(): Respuesta
    {
        $respuesta = new Respuesta();
        $estructuraDatos = [];
        try {
            if ($conn_access = odbc_connect("DATADOSCAR", "", "")) {
                $estructuraDatos["articulos"] = $this->repositorio->obtenerDatosDoscar($conn_access, "Articulos");
                $estructuraDatos["articulosCompuestos"] = $this->repositorio->obtenerDatosDoscar($conn_access, "[Articulos Compuestos]");


                $respuesta->setDatos($estructuraDatos);
                $respuesta->setSuccess(true);
                $respuesta->setMensaje("Datos obtenidos correctamente desde Doscar.");
                odbc_close($conn_access);
            } else {
                $respuesta->setSuccess(false);
                $respuesta->setMensaje("Error de conexión a la base de datos Doscar.");
                $respuesta->setDatos([]);
            }
        } catch (Exception $e) {
            $respuesta->setSuccess(false);
            $respuesta->setMensaje("Error al obtener los datos: " . $e->getMessage());
            $respuesta->setDatos([]);

            if (isset($this->logger)) {
                $this->logger->guardar("Error al obtener los datos: " . $e->getMessage(), "Datos", "sistema");
            }
        }

        return $respuesta;

    }


    public function estructurarDatosEnviar(): Respuesta
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
