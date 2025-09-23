<?php
/*
 * Clase CargarDoscarEngine
 * Maneja la lógica para cargar y enviar datos desde Doscar a la nube.
 * 
 * Autor: Ariel Lara
 * Fecha: 2025-09-19
 */
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once __DIR__ . '/CargarDoscarRepository.php';
require_once __DIR__ . '/../comunes/Respuesta.php';
require_once __DIR__ . '/../log/LoggerEvento.php';
require_once __DIR__ . '/../../conexion/conexion.php';
include_once __DIR__ . '/EstructuraDatosDTO.php';



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
        $datosEstructura = new EstructuraDatosDTO();
        $fechaControl = $this->repositorio->obtenerFechaControl();

        try {
            if ($conn_access = odbc_connect("DATADOSCAR", "", "")) {

                $datosEstructura->articulos = $this->repositorio->obtenerDatosDoscar($conn_access, "Articulos");
                $datosEstructura->articulosCompuestos = $this->repositorio->obtenerDatosDoscar($conn_access, "[Articulos Compuestos]");
               
                $datosEstructura->cabeceraAlbaranesCompra = $this->repositorio->obtenerCabeceraAlbaranes($conn_access, "[Cabecera Albaranes de Compra]", $fechaControl);
                $idAlbaranesCompra = array_column($datosEstructura->cabeceraAlbaranesCompra, "Numero");
                $datosEstructura->lineasAlbaranesCompra = $this->repositorio->obtenerLineasAlbaranes($conn_access, "[Lineas Albaranes de Compra]", $idAlbaranesCompra);
             
                $datosEstructura->cabeceraFacturasCompra = $this->repositorio->obtenerCabeceraFacturasCompra($conn_access, "[Cabecera Facturas de Compra]", $fechaControl);
                $idFacturasCompra = array_column($datosEstructura->cabeceraFacturasCompra, "Numero");
                $datosEstructura->lineasFacturasCompra = $this->repositorio->obtenerLineaFacturasCompra($conn_access, "[Lineas Facturas de Compra]", $idFacturasCompra);
               
                $datosEstructura->cabeceraFacturaVenta = $this->repositorio->cabeceraFacturaVenta($conn_access, "[Cabecera Facturas de Venta]",$fechaControl);
                $idFacturas = array_column($datosEstructura->cabeceraFacturaVenta, "Numero");
                $datosEstructura->lineasFacturaVenta = $this->repositorio->obtenerLineaFacturasVenta($conn_access, "[Lineas Facturas de Venta]",$idFacturas);
               
                $datosEstructura->cabeceraTicketsVenta = $this->repositorio->cabeceraTicketsVenta($conn_access, "[Cabecera Tickets de Venta]", $fechaControl);
                $idTickets = array_column($datosEstructura->cabeceraTicketsVenta, "Numero");
                $datosEstructura->lineasTicketsVenta = $this->repositorio->obtenerLineasTiquets($conn_access, "[Lineas Tickets de Venta]", $idTickets);
                
                $datosEstructura->cajas = $this->repositorio->obtenerDatosDoscar($conn_access, "Cajas");
                $datosEstructura->camareros = $this->repositorio->obtenerDatosDoscar($conn_access, "Camareros");
                $datosEstructura->clientes = $this->repositorio->obtenerDatosDoscar($conn_access, "Clientes");
                $datosEstructura->datosEmpresa = $this->repositorio->obtenerDatosDoscar($conn_access, "[Datos Empresa]");
                $datosEstructura->familias = $this->repositorio->obtenerDatosDoscar($conn_access, "Familias");
                $datosEstructura->formasPago = $this->repositorio->obtenerDatosDoscar($conn_access, "[Formas de Pago]");
                $datosEstructura->gastos = $this->repositorio->obtenerDatosDoscar($conn_access, "Gastos");
                $datosEstructura->historicoCierresCaja = $this->repositorio->obtenerHistoricoCierres($conn_access, "[Historico Cierres Caja]", $fechaControl);
                $datosEstructura->ingresos = $this->repositorio->obtenerDatosDoscar($conn_access, "Ingresos"); 
                $datosEstructura->logControlModificaciones = $this->repositorio->obtenerDatosDoscar($conn_access, "LogControlModificaciones");
                $datosEstructura->logOperaciones = $this->repositorio->obtenerDatosDoscarLogOperaciones($conn_access, "LogOperaciones", $fechaControl);
                $datosEstructura->logUsuarios = $this->repositorio->obtenerDatosDoscarLogUsuarios($conn_access, "Logusuarios", $fechaControl);
                $datosEstructura->mesas = $this->repositorio->obtenerDatosDoscar($conn_access, "Mesas");
                $datosEstructura->motivoSalidas = $this->repositorio->obtenerDatosDoscar($conn_access, "MotivoSalidas");
                $datosEstructura->pagosACamareros = $this->repositorio->obtenerDatosCamareros($conn_access, "[Pagos a Camareros]", $fechaControl);
                $datosEstructura->pagosAProveedores = $this->repositorio->obtenerDatosProveedores($conn_access, "[Pagos a Proveedores]", $fechaControl);
                $datosEstructura->pagosARepresentantes = $this->repositorio->obtenerDatosRepresentantes($conn_access, "[Pagos a Representantes]", $fechaControl);
                $datosEstructura->proveedores = $this->repositorio->obtenerDatosDoscar($conn_access, "Proveedores");
                $datosEstructura->recibosDeClientes = $this->repositorio->obtenerDatosRecibos($conn_access, "[Recibos de Clientes]", $fechaControl);
                $datosEstructura->representantes = $this->repositorio->obtenerDatosDoscar($conn_access, "Representantes");
                $datosEstructura->tiposDeImpuestos = $this->repositorio->obtenerDatosDoscar($conn_access, "[Tipos de Impuestos]");

                $respuesta->setDatos($datosEstructura);
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

    public static function normalizaDatos($mixed)
    {
        if (is_array($mixed)) {
            $normalized = [];
            foreach ($mixed as $key => $value) {
                $newKey = mb_convert_encoding($key, 'UTF-8', 'ISO-8859-1');
                $normalized[$newKey] = self::normalizaDatos($value);
            }
            return $normalized;
        } elseif (is_object($mixed)) {
            foreach ($mixed as $key => $value) {
                $newKey = mb_convert_encoding($key, 'UTF-8', 'ISO-8859-1');
                unset($mixed->$key);
                $mixed->$newKey = self::normalizaDatos($value);
            }
        } elseif (is_string($mixed)) {
            $mixed = mb_convert_encoding($mixed, 'UTF-8', 'ISO-8859-1, Windows-1252');
        }
        return $mixed;
    }


    public function debugJsonEncoding($dto): void
    {
        foreach (get_object_vars($dto) as $prop => $value) {
            $encoded = json_encode($value, JSON_UNESCAPED_UNICODE);
    
            if ($encoded === false) {
                $error = json_last_error_msg();
                if (isset($this->logger)) {
                    $this->logger->guardar(
                        "Error al json_encode en tabla '{$prop}': {$error}",
                        "DebugJson",
                        "sistema"
                    );
                }
            }
        }
    }
    public function enviarDatosNube( string $datos, string $url): Respuesta
    {
        $respuesta = new Respuesta();
        try {
            $apiKey = $this->repositorio->obtenerApiKey();
    
            $ch = curl_init($url);
            curl_setopt_array($ch, [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_HTTPHEADER => [
                    'Content-Type: application/json',
                    "X-API-KEY: $apiKey" 
                ],
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => json_encode($datos, JSON_UNESCAPED_UNICODE),
                CURLOPT_CONNECTTIMEOUT => 10,
                CURLOPT_TIMEOUT => 30,
            ]);
    
            $result = curl_exec($ch);
    
            if (curl_errno($ch)) {
                $error = "Error en la solicitud cURL: " . curl_error($ch);
                $respuesta->setSuccess(false);
                $respuesta->setMensaje($error);
                $respuesta->setDatos([]);
                $this->logger?->guardar($error, "EnvioDatosNube", "sistema");
            } else {
                $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                if ($httpCode >= 200 && $httpCode < 300) {
                    $decoded = json_decode($result, true);
                    if (json_last_error() === JSON_ERROR_NONE) {
                        $respuesta->setSuccess(true);
                        $respuesta->setMensaje($decoded['mensaje'] ?? 'Datos enviados correctamente');
                        $respuesta->setDatos($decoded);
                        $this->logger?->guardar("Datos enviados correctamente a la nube.", "EnvioDatosNube", "sistema");
                    } else {
                        $respuesta->setSuccess(false);
                        $respuesta->setMensaje($decoded['mensaje'] ?? 'Error al decodificar la respuesta JSON');
                        $respuesta->setDatos([]);
                    }
                } else {
                    $decoded = json_decode($result, true);
                    $error = "Error en la respuesta del servidor: Código HTTP " . $httpCode . " - " . ($decoded['mensaje'] ?? 'Respuesta no exitosa');
                    $respuesta->setSuccess(false);
                    $respuesta->setMensaje($error);
                    $respuesta->setDatos([]);
                    $this->logger?->guardar($error, "EnvioDatosNube", "sistema");
                }
            }
            curl_close($ch);
        } catch (Exception $e) {
            $error = "Excepción al enviar datos a la nube: " . $e->getMessage();
            $respuesta->setSuccess(false);
            $respuesta->setMensaje($error);
            $respuesta->setDatos([]);
            $this->logger?->guardar($error, "EnvioDatosNube", "sistema");
        }
        return $respuesta;
    }
    
    
    







}
