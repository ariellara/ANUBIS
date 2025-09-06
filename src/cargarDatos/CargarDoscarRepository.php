<?php
include "../../conexion/conexion.php";

class CargarDoscarRepository
{
    private $conexion;

    public function __construct()
    {
        global $conexion;
        $this->conexion = $conexion;
    }

    public function guardarDependencia($datos)
    {
        $codigo = $datos['codigo'] ?? '';
        $nombre = $datos['nombre'] ?? '';
        $descripcion = $datos['descripcion'] ?? '';

        $stmt = $this->conexion->prepare("INSERT INTO t_dependencias (codigo, nombre, descripcion) VALUES (?, ?, ?)");

        if (!$stmt) {
            return false;
        }

        $stmt->bind_param("sss", $codigo, $nombre, $descripcion);
        $resultado = $stmt->execute();
        $stmt->close();

        return $resultado;
    }
    public function sincronizarDatos($datos)
    {
        return true;
    }



}
