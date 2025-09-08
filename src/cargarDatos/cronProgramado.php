<?php

date_default_timezone_set('America/Bogota');

require_once __DIR__ . '/../comunes/Respuesta.php';
require_once __DIR__ . '/../../conexion/conexion.php';
require_once __DIR__ . '/CargarDoscarManager.php';
require_once __DIR__ . '/../log/LoggerEvento.php';

/**
 * Clase responsable de sincronizar los datos de Doscar
 * autor Ariel Lara Jimenez
 * fecha: 2025-09-07
 * Liz
 */
class SincronizadorDeDatos
{
    private $conexion;
    private $loggerEvento;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
        $this->loggerEvento = new LoggerEvento($conexion);
    }

    public function ejecutar($data)
    {
        try {
            $cargarDoscarManager = new CargarDoscarManager($this->conexion);
            $respuesta = $cargarDoscarManager->sincronizarDatos($data);
            $this->loggerEvento->guardar("Sincronización exitosa en cronProgramado", "CargarDatos:" .$respuesta->getMensaje() , "sistema");

        } catch (Exception $e) {
            $this->loggerEvento->guardar("Error en cronProgramado: " . $e->getMessage(), "CargarDatos", "sistema");
        }
    }
}
$sincronizador = new SincronizadorDeDatos($conexion);
$sincronizador->ejecutar(1); 
