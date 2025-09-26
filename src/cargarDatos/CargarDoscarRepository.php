<?php
/*
 * Autor: Daniel Rodriguez
 * Fecha: 2025-09-07
 * Descripcion: Clase para manejar la carga de datos desde Doscar
 */
include __DIR__ . "/../../conexion/conexion.php";
include __DIR__ . "/../../src/includes/datos.php";


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
            $datos[] = (array) $fila;
        }

        return $datos;
    }

    public function obtenerLineasTiquets($conn_access, $entidad, $idTickets)
    {
        if (empty($idTickets)) {
            return [];
        }
        $ids = implode(",", $idTickets);
        $sql = "SELECT * FROM $entidad WHERE Numero IN ($ids)";

        $datos = [];
        $rs_access = odbc_exec($conn_access, $sql);
        while ($fila = odbc_fetch_object($rs_access)) {
            $datos[] = (array) $fila;
        }
        return $datos;
    }

    public function cabeceraFacturaVenta($conn_access, $entidad, $fecha_control)
    {
        $sql = "SELECT * FROM $entidad WHERE Fecha >= #$fecha_control# ORDER BY Fecha ASC";

        $datos = [];
        $rs_access = odbc_exec($conn_access, $sql);

        while ($fila = odbc_fetch_object($rs_access)) {
            $datos[] = (array) $fila;
        }
        return !empty($datos) ? $datos : [];
    }

    public function obtenerLineaFacturasVenta($conn_access, $entidad, $idFacturas)
    {
        if (empty($idFacturas)) {
            return [];
        }
        $ids = implode(",", $idFacturas);
        $sql = "SELECT * FROM $entidad WHERE Numero IN ($ids)";

        $datos = [];
        $rs_access = odbc_exec($conn_access, $sql);
        while ($fila = odbc_fetch_object($rs_access)) {
            $datos[] = (array) $fila;
        }
        return $datos;
    }

    public function cabeceraTicketsVenta($conn_access, $entidad, $fecha_control)
    {
        $sql = "SELECT * FROM $entidad WHERE Fecha >= #$fecha_control# ORDER BY Fecha ASC";

        $datos = [];
        $rs_access = odbc_exec($conn_access, $sql);

        while ($fila = odbc_fetch_object($rs_access)) {
            $datos[] = (array) $fila;
        }
        return !empty($datos) ? $datos : [];
    }



    public function obtenerDatosDoscarLogOperaciones($conn_access, $entidad, $fecha_control)
    {
        $sql = "SELECT  * FROM $entidad WHERE fechaHora >= #$fecha_control#";

        $datos = [];
        $rs_access = odbc_exec($conn_access, $sql);
        while ($fila = odbc_fetch_object($rs_access)) {
            $datos[] = (array) $fila;
        }
        return $datos;
    }

    public function obtenerDatosDoscarLogUsuarios($conn_access, $entidad, $fecha_control)
    {
        $sql = "SELECT   * FROM $entidad WHERE fecha >= #$fecha_control#";

        $datos = [];
        $rs_access = odbc_exec($conn_access, $sql);
        while ($fila = odbc_fetch_object($rs_access)) {
            $datos[] = (array) $fila;
        }
        return $datos;
    }

    public function obtenerCabeceraFacturasCompra($conn_access, $entidad, $fecha_control)
    {
        $sql = "SELECT * FROM $entidad WHERE Fecha >= #$fecha_control# ORDER BY Fecha ASC";

        $datos = [];
        $rs_access = odbc_exec($conn_access, $sql);

        while ($fila = odbc_fetch_object($rs_access)) {
            $datos[] = (array) $fila;
        }
        return !empty($datos) ? $datos : [];
    }

    public function obtenerLineaFacturasCompra($conn_access, $entidad, $idFacturas)
    {
        if (empty($idFacturas)) {
            return [];
        }
        $ids = implode(",", $idFacturas);
        $sql = "SELECT * FROM $entidad WHERE Numero IN ($ids)";

        $datos = [];
        $rs_access = odbc_exec($conn_access, $sql);
        while ($fila = odbc_fetch_object($rs_access)) {
            $datos[] = (array) $fila;
        }
        return $datos;
    }

    public function obtenerCabeceraAlbaranes($conn_access, $entidad, $fecha_control)
    {
        $sql = "SELECT * FROM $entidad WHERE Fecha >= #$fecha_control# ORDER BY Fecha ASC";

        $datos = [];
        $rs_access = odbc_exec($conn_access, $sql);

        while ($fila = odbc_fetch_object($rs_access)) {
            $datos[] = (array) $fila;
        }
        return !empty($datos) ? $datos : [];
    }
    public function obtenerLineasAlbaranes($conn_access, $entidad, $idAlbaranes)
    {
        if (empty($idAlbaranes)) {
            return [];
        }
        $ids = implode(",", $idAlbaranes);
        $sql = "SELECT * FROM $entidad WHERE Numero IN ($ids)";

        $datos = [];
        $rs_access = odbc_exec($conn_access, $sql);
        while ($fila = odbc_fetch_object($rs_access)) {
            $datos[] = (array) $fila;
        }
        return $datos;
    }

    public function obtenerHistoricoCierres($conn_access, $entidad, $fecha_control)
    {
        $sql = "SELECT * FROM $entidad WHERE Fecha >= #$fecha_control# ORDER BY Fecha ASC";

        $datos = [];
        $rs_access = odbc_exec($conn_access, $sql);

        while ($fila = odbc_fetch_object($rs_access)) {
            $datos[] = (array) $fila;
        }
        return !empty($datos) ? $datos : [];
    }

    public function obtenerDatosCamareros($conn_access, $entidad, $fecha_control)
    {
        $fecha_control = date("Y-m-d", strtotime($fecha_control));
        $sql = "SELECT * FROM $entidad WHERE [Fecha Libramiento] >= #$fecha_control#";

        $datos = [];
        $rs_access = odbc_exec($conn_access, $sql);

        while ($fila = odbc_fetch_object($rs_access)) {
            $datos[] = (array) $fila;
        }
        return !empty($datos) ? $datos : [];
        
    }
    public function obtenerDatosProveedores($conn_access, $entidad, $fecha_control)
    {
        $fecha_control = date("Y-m-d", strtotime($fecha_control));
        $sql = "SELECT * FROM $entidad WHERE[Fecha Libramiento] >= #$fecha_control#";

        $datos = [];
        $rs_access = odbc_exec($conn_access, $sql);

        while ($fila = odbc_fetch_object($rs_access)) {
            $datos[] = (array) $fila;
        }
        return !empty($datos) ? $datos : [];
        
    }
    public function obtenerDatosRepresentantes($conn_access, $entidad, $fecha_control)
    {
        $fecha_control = date("Y-m-d", strtotime($fecha_control));
        $sql = "SELECT * FROM $entidad WHERE [Fecha Libramiento] >= #$fecha_control#";

        $datos = [];
        $rs_access = odbc_exec($conn_access, $sql);

        while ($fila = odbc_fetch_object($rs_access)) {
            $datos[] = (array) $fila;
        }
        return !empty($datos) ? $datos : [];
        
    }

    public function obtenerDatosRecibos($conn_access, $entidad, $fecha_control)
    {
        $fecha_control = date("Y-m-d", strtotime($fecha_control));
        $sql = "SELECT * FROM $entidad WHERE [Fecha Libramiento] >= #$fecha_control#";

        $datos = [];
        $rs_access = odbc_exec($conn_access, $sql);

        while ($fila = odbc_fetch_object($rs_access)) {
            $datos[] = (array) $fila;
        }
        return !empty($datos) ? $datos : [];
    }
    public function obtenerDatosGastos($conn_access, $entidad, $fecha_control)
    {
        $fecha_control = date("Y-m-d", strtotime($fecha_control));
        $sql = "SELECT * FROM $entidad WHERE Fecha >= #$fecha_control#";

        $datos = [];
        $rs_access = odbc_exec($conn_access, $sql);

        while ($fila = odbc_fetch_object($rs_access)) {
            $datos[] = (array) $fila;
        }
        return !empty($datos) ? $datos : [];
        
    }



    public function obtenerApiKey()
    {
        $sql = "SELECT api_key FROM api_key_local WHERE id = 1";
        $resultado = $this->conexion->query($sql);
        if ($resultado && $resultado->num_rows > 0) {
            $fila = $resultado->fetch_assoc();
            return $fila['api_key'];
        }
        return "";
    }

    public function obtenerFechaControl()
    {
        $sql = "SELECT  fechaCargue FROM api_key_local  WHERE  id = 1";
        $resultado = $this->conexion->query($sql);
        if ($resultado && $resultado->num_rows > 0) {
            $fila = $resultado->fetch_assoc();
            return $fila['fechaCargue'];
        }
        return null;
    }
    public function actualizarFechaActualizacion()
    {
        date_default_timezone_set("America/Bogota");
        $fecha_actual = date("Y-m-d ");
        $sql = "UPDATE api_key_local SET fechaCargue = '$fecha_actual' WHERE id = 1";
        return $this->conexion->query($sql);
    }
    public function obtenerUrlApi():string
    {
        $sql = "SELECT api_url FROM api_key_local WHERE id = 1";
        $resultado = $this->conexion->query($sql);
        if ($resultado && $resultado->num_rows > 0) {
            $fila = $resultado->fetch_assoc();
            return $fila['api_url'];
        }
        return "";
    }



}
