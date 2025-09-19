<?php
include __DIR__ . "/../../conexion/conexion.php";


class CargarDoscarRepository
{
    private $conexion;

    public function __construct()
    {
        global $conexion;
        $this->conexion = $conexion;
    }

    public function obtenerDatosDoscar($conn_access, $entidad)
    {
        $sql = "SELECT * FROM $entidad";
        $datos = [];

        $rs_access = odbc_exec($conn_access, $sql);
        while ($fila = odbc_fetch_object($rs_access)) {
            $datos[] = (array)$fila;
        }
        return $datos ;
    }

    public function obtenerApiKey()
    {
        $sql = "SELECT api_key FROM api_key_local WHERE id = 1";
        $resultado = $this->conexion->query($sql);
        if ($resultado && $resultado->num_rows > 0) {
            $fila = $resultado->fetch_assoc();
            return $fila['api_key'];
        }
        return null;
    }



}
