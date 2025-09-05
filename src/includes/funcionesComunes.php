<?php
date_default_timezone_set('America/Bogota');
function obtenerProveedores($conexion)
{
    $resultado["estado"] = true;
    $resultado["datos"] = [];
    try {
        $sql = "SELECT Id, Nombre FROM t_proveedores ";
        if ($result = mysqli_query($conexion, $sql)) {
            while ($row = mysqli_fetch_row($result)) {
                $resultado["datos"][] = $row;
            }
        }

    } catch (Exception $e) {
        $resultado["estado"] = false;
    }
    return $resultado;

}

function guardarTarifa($conexion, $data)
{
    $respuesta = array();
    $respuesta["success"] = true;
    $respuesta["datos"] = [];
    try {
        $nombre = $data["nombre"];
        $tipoTarifa = $data["tipo_tarifa"];
        $valor = $data["valor"];
        $cantidadDias = $data["cantidad_dias"];
        $cantidadTiquetes = $data["cantidad_tiquetes"];
        $modificarPrecio = $data["modificar_precio"];
        $estado = $data["estado"];
        $horaDesde = $data["hora_desde"];
        $horaHasta = $data["hora_hasta"];
        $horaDesde1 = $data["hora_desde1"];
        $horaHasta1 = $data["hora_hasta1"];
        $diasDisponibles = $data["dias_disponibles"];

        $sql = "INSERT INTO t_tarifas (
            nombre, 
            tipo, 
            valor, 
            cantidad_dias, 
            cantidad_tiquetes, 
            modificar_precio, 
            Estado, 
            hora_desde, 
            hora_hasta, 
            hora_desde_1, 
            hora_hasta_1
        ) VALUES (
            '$nombre', 
            '$tipoTarifa', 
            '$valor', 
            '$cantidadDias', 
            '$cantidadTiquetes', 
            '$modificarPrecio', 
            '$estado', 
            '$horaDesde', 
            '$horaHasta', 
            '$horaDesde1', 
            '$horaHasta1'
        )";

        $result = mysqli_query($conexion, $sql);
        if ($result) {
            $tarifaId = mysqli_insert_id($conexion);
            foreach ($diasDisponibles as $dia) {
                $sqlDias = "INSERT INTO t_dias_disponibles (tarifa_id, dia) VALUES ('$tarifaId', '$dia')";
                mysqli_query($conexion, $sqlDias);
            }

            $respuesta["mensaje"] = "Tarifa y días registrados correctamente";

        } else {
            $respuesta["success"] = false;
            $respuesta["mensaje"] = mysqli_error($conexion);
        }

    } catch (Exception $e) {
        $respuesta["success"] = false;
        $respuesta["mensaje"] = $e->getMessage();
    }
    return $respuesta;

}

function datosTarifa($conexion, $data)
{
    $respuesta = array();
    $respuesta["success"] = true;
    $id = $data["Id"];
    $datos = array();
    try {
        $sql = "SELECT * FROM t_tarifas WHERE Id = '$id'";
        if ($result = mysqli_query($conexion, $sql)) {
            while ($row = mysqli_fetch_row($result)) {
                $datos["id"] = $row[0];
                $datos["nombre"] = $row[1];
                $datos["tipo"] = $row[2];
                $datos["valor"] = $row[3];
                $datos["cantidad_dias"] = $row[4];
                $datos["cantidad_tiquetes"] = $row[5];
                $datos["modificar_precio"] = $row[6];
                $datos["Estado"] = $row[7];
                $datos["hora_desde"] = $row[8];
                $datos["hora_hasta"] = $row[9];
                $datos["hora_desde_1"] = $row[10];
                $datos["hora_hasta_1"] = $row[11];
            }
            $sqlDias = "SELECT dia FROM t_dias_disponibles WHERE tarifa_id = '$id'";
            $resultDias = mysqli_query($conexion, $sqlDias);

            $diasDisponibles = array();
            while ($rowDia = mysqli_fetch_assoc($resultDias)) {
                $diasDisponibles[] = $rowDia["dia"];
            }
            $datos["dias_disponibles"] = $diasDisponibles;
        }
        $respuesta["datos"] = $datos;
        $respuesta["mensaje"] = "Exito";

    } catch (Exception $e) {
        $respuesta["success"] = false;
        $respuesta["mensaje"] = $e->getMessage();
    }
    return $respuesta;

}

function actualizarTarifa($conexion, $data)
{
    $respuesta = array();
    $respuesta["success"] = true;
    $respuesta["datos"] = [];
    try {
        $nombre = $data["nombre"];
        $tipoTarifa = $data["tipo_tarifa"];
        $valor = $data["valor"];
        $cantidadDias = $data["cantidad_dias"];
        $cantidadTiquetes = $data["cantidad_tiquetes"];
        $modificarPrecio = $data["modificar_precio"];
        $estado = $data["estado"];
        $horaDesde = $data["hora_desde"];
        $horaHasta = $data["hora_hasta"];
        $horaDesde1 = $data["hora_desde1"];
        $horaHasta1 = $data["hora_hasta1"];
        $diasDisponibles = $data["dias_disponibles"];
        $id = $data["id"];

        $sql = "UPDATE t_tarifas 
        SET nombre = '$nombre', 
            tipo = '$tipoTarifa', 
            valor = '$valor', 
            cantidad_dias = '$cantidadDias', 
            cantidad_tiquetes = '$cantidadTiquetes', 
            modificar_precio = '$modificarPrecio', 
            estado = '$estado', 
            hora_desde = '$horaDesde', 
            hora_hasta = '$horaHasta', 
            hora_desde_1 = '$horaDesde1', 
            hora_hasta_1 = '$horaHasta1'
        WHERE id = '$id'";
        $result = mysqli_query($conexion, $sql);
        $sqlEliminarDias = "DELETE FROM t_dias_disponibles WHERE tarifa_id = '$id'";
        $resultEliminarDias = mysqli_query($conexion, $sqlEliminarDias);
        foreach ($diasDisponibles as $dia) {
            $sqlDias = "INSERT INTO t_dias_disponibles (tarifa_id, dia) VALUES ('$id', '$dia')";
            $resultDias = mysqli_query($conexion, $sqlDias);
        }

        if ($result) {
            $respuesta["mensaje"] = "Tarifa Actualizado";

        } else {
            $respuesta["success"] = false;
            $respuesta["mensaje"] = mysqli_error($conexion);
        }
    } catch (Exception $e) {
        $respuesta["success"] = false;
        $respuesta["mensaje"] = $e->getMessage();
    }
    return $respuesta;

}

function traerTarifas($conexion)
{
    $resultado["estado"] = true;
    $resultado["datos"] = [];
    try {
        $sql = "SELECT id, nombre FROM t_tarifas ";
        if ($result = mysqli_query($conexion, $sql)) {
            while ($row = mysqli_fetch_row($result)) {
                $resultado["datos"][] = $row;
            }
        }

    } catch (Exception $e) {
        $resultado["estado"] = false;
    }
    return $resultado;

}

function datosValorTarifa($conexion, $data)
{
    date_default_timezone_set('America/Bogota');
    $id = $data["idTarifa"];
    $resultado["success"] = true;
    $resultado["datos"] = "";
    $resultado["mensaje"] = "";
    try {
        $sql = "SELECT valor, cantidad_dias,  cantidad_tiquetes FROM t_tarifas where id = '$id'";
        if ($result = mysqli_query($conexion, $sql)) {
            while ($row = mysqli_fetch_row($result)) {
                $respuesta["valor"] = $row[0];
                $respuesta["fechaInicio"] = date("Y-m-d");
                $respuesta["fechaFinal"] = obtenerFechaFin($row[1]);
                $respuesta["cantidadTiquetes"] = $row[2];
                $respuesta["cantidad_dias"] = $row[1];
            }
        }
        $resultado["datos"] = $respuesta;
    } catch (Exception $e) {
        $resultado["estado"] = false;
    }
    return $resultado;
}
function obtenerFechaFin($cantidad)
{
    $fechaActual = date('Y-m-d');
    return date('Y-m-d', strtotime($fechaActual . " + $cantidad days"));

}

function guardarPagosCliente($conexion, $data)
{
    $respuesta = array();
    $respuesta["success"] = true;
    $respuesta["datos"] = [];
    try {
        $clienteI = $data["clienteId"];
        $tarifa = $data["tarifa"];
        $valor_t = $data["valor"];
        $vendedor = $data["vendedor"];
        $tipo_descuento = $data["tipoDescuento"];
        $descuento = $data["descuento"];
        $t_pagar = $data["totalPagar"];
        $forma_pago = $data["formaPago"];
        $fecha_inicio = $data["fechaInicio"];
        $fecha_vencimiento = $data["fechaVencimiento"];
        $cantidadTiquetes = $data["cantidadTiquetes"];
        $fechaVencimientoAbono = ($data["fechaVencimientoAbonos"] == "") ? '1900-01-01' : $data["fechaVencimientoAbonos"];
        $estado = ($data["abono"] >= 0) ? 0 : 1;
        $abonoAux = $data["abono"];
        $abono = empty($data["abono"]) ? 0 : $data["abono"];
        if ($data["abono"] == 0) {
            $saldo = $t_pagar;
        } else if ($data["abono"] == "") {
            $saldo = 0;
        } else {
            $saldo = $t_pagar - $abono;
        }

        date_default_timezone_set('America/Bogota');
        $fecha = date("Y-m-d");
        $sql = "INSERT INTO t_pagos_cliente (
            cliente,
            tarifa,
            valor_t,
            vendedor,
            tipo_descuento,
            descuento,
            t_pagar,
            forma_pago,
            fecha_inicio,
            fecha_vencimiento,
            abono, 
            estado,
            fechaPago,
            fechaVencimiento,
            estadoPago,
            saldo,
            cantidadTiquetes,
            cantidadTiquetesRestante
        ) VALUES (
            '$clienteI',
            '$tarifa',
            '$valor_t',
            '$vendedor',
            '$tipo_descuento',
            '$descuento',
            '$t_pagar',
            '$forma_pago',
            '$fecha_inicio',
            '$fecha_vencimiento',
            '$abono',
            '$estado',
            '$fecha',
            '$fechaVencimientoAbono',
            '1', 
            '$saldo',
            '$cantidadTiquetes',
            '$cantidadTiquetes'
        )";
        $result = mysqli_query($conexion, $sql);
        if ($result) {
            $idPago = mysqli_insert_id($conexion);
            if ($estado == 0 && $abono > 0) {
                $fecha = date("Y-m-d");
                $nuevoSaldo = $t_pagar - $abono;

                $sqlAbonos = "INSERT INTO t_abono_pagoc (idPago,valorAbono,fecha,forma_pago, saldo) VALUES ('$idPago','$abono','$fecha','$forma_pago', '$nuevoSaldo')";
                mysqli_query($conexion, $sqlAbonos);

            }
            $respuesta["mensaje"] = "Pago Cliente Registrado";
            $respuesta["datos"] = $idPago;
        } else {
            $respuesta["success"] = false;
            $respuesta["mensaje"] = mysqli_error($conexion);
        }

    } catch (Exception $e) {
        $respuesta["success"] = false;
        $respuesta["mensaje"] = $e->getMessage();
    }
    return $respuesta;

}
function buscarPagos($conexion, $data)
{
    $respuesta = array();
    $respuesta["success"] = true;
    $respuesta["datos"] = [];
    $respuesta["mensaje"] = "";
    try {
        $fechaInicio = $data["fechaInicio"];
        $fechaFin = $data["fechaFin"];
        $tarifa = $data["tarifa"];
        $estado = $data["estado"];
        $identificacion = $data["identificacion"];
        $where = "1 = 1";
        if (!empty($fechaInicio) && !empty($fechaFin)) {
            $where .= " AND pc.fechaPago BETWEEN '" . $fechaInicio . "' AND '" . $fechaFin . "'";
        }
        if (!empty($tarifa)) {
            $where .= " AND pc.tarifa = '" . $tarifa . "'";
        }
        if ($estado !== "") {
            $where .= " AND pc.estado = '" . $estado . "'";
        }
        if (!empty($identificacion)) {
            $where .= " AND pc.cliente = '" . $identificacion . "'";
        }

        $sql = "
            SELECT 
                pc.id, 
                pc.cliente, 
                CONCAT(c.Nombres, ' ', c.Apellidos) AS nombre_completo,
                t.nombre, 
                pc.fechaPago,
                pc.t_pagar, 
                pc.descuento, 
                pc.forma_pago,
                pc.fecha_inicio as fecha_inicio,
                pc.fecha_vencimiento as fecha_vencimiento,
                pc.saldo as saldo,
                CASE 
                    WHEN pc.estado = 1 THEN 'Pagado'
                    WHEN pc.estado = 0 THEN 'Pendiente'
                    ELSE 'Desconocido'
                END AS estado,
                c.Apellidos
            FROM 
                t_pagos_cliente pc
            JOIN t_clientes c ON c.Identificacion = pc.cliente
            JOIN t_tarifas t ON pc.tarifa = t.id
            WHERE $where
            ORDER BY pc.fechaPago DESC
        ";
        $result = mysqli_query($conexion, $sql);
        if ($result = mysqli_query($conexion, $sql)) {
            $tablaHtml = '';
            while ($row = mysqli_fetch_row($result)) {
                $respuesta["datos"][] = $row;
            }
            mysqli_free_result($result);
        }


    } catch (Exception $e) {
        $respuesta["success"] = false;
        $respuesta["mensaje"] = $e->getMessage();
    }

    return $respuesta;

}

function datosPagoCliente($conexion, $data)
{
    $id = $data["Id"];
    $respuesta = array();
    $respuesta["success"] = true;
    $respuesta["datos"] = [];
    $respuesta["mensaje"] = "";
    try {
        $resultado = array();
        $sql = "SELECT tpc.id, t.nombre, tpc.forma_pago, tpc.valor_t, tpc.tipo_descuento, tpc.descuento , 
        tpc.t_pagar, tpc.fecha_inicio, tpc.fecha_vencimiento, tpc.abono, tpc.fechaPago,
        tpc.estado, t.cantidad_dias
        FROM t_pagos_cliente tpc , t_tarifas t where tpc.id = '$id'
        AND
        tpc.tarifa = t.id";
        if ($result = mysqli_query($conexion, $sql)) {
            while ($row = mysqli_fetch_row($result)) {
                $resultado["id"] = $row[0];
                $resultado["tarifa"] = $row[1];
                $resultado["forma_pago"] = $row[2];
                $resultado["valor_t"] = $row[3];
                $resultado["tipo_descuento"] = $row[4];
                $resultado["descuento"] = $row[5];
                $resultado["t_pagar"] = $row[6];
                $resultado["fecha_inicio"] = $row[7];
                $resultado["fecha_vencimiento"] = $row[8];
                $resultado["abono"] = $row[9];
                $resultado["fechaPago"] = $row[10];
                $resultado["estado"] = $row[11];
                $resultado["cantidad_dias"] = $row[12];
            }
        }

        $obtenerAbonos = obtenerAbonos($resultado["estado"], $id, $conexion);
        $resultado["datosAbono"] = $obtenerAbonos["datos"];
        $obtenerSumatoriaAbonos = obtenerSumatoriaAbonos($id, $conexion);
        $resultado["sumatoriaAbonos"] = $obtenerSumatoriaAbonos["datos"];
        $resultado["estadoBoton"] = $resultado["t_pagar"] - $obtenerSumatoriaAbonos["datos"];
        $respuesta["datos"] = $resultado;
    } catch (Exception $e) {
        $respuesta["estado"] = false;
    }
    return $respuesta;

}

function obtenerSumatoriaAbonos($id, $conexion)
{
    $respuesta = array();
    $respuesta["datos"] = 0;

    try {
        $sql = "SELECT COALESCE(SUM(valorAbono), 0) FROM t_abono_pagoc WHERE idPago = '$id' and estado = 1";
        if ($result = mysqli_query($conexion, $sql)) {
            if ($row = mysqli_fetch_row($result)) {
                $respuesta["datos"] = $row[0];
            }
        }
        $respuesta["estado"] = true;
    } catch (Exception $e) {
        $respuesta["estado"] = false;
    }

    return $respuesta;
}

function obtenerAbonos($estado, $id, $conexion)
{
    $respuesta = array();
    $respuesta["datos"] = [];

    try {
        $sql = "SELECT id, valorAbono, fecha, forma_pago,saldo , estado FROM t_abono_pagoc WHERE idPago = '$id' ORDER BY id DESC";
        if ($result = mysqli_query($conexion, $sql)) {
            while ($row = mysqli_fetch_row($result)) {
                $respuesta["datos"][] = [
                    "id" => $row[0],
                    "valorAbono" => $row[1],
                    "fecha" => $row[2],
                    "forma_pago" => obtenerFormaPago($row[3]),
                    "saldo" => $row[4],
                    "estado" => $row[5]
                ];
            }
        }
        $respuesta["estado"] = true;
    } catch (Exception $e) {
        $respuesta["estado"] = false;
    }

    return $respuesta;
}

function actualizarPagoCliente($conexion, $data)
{
    $id = $data["id"];
    $respuesta = array();
    $respuesta["success"] = true;
    $respuesta["datos"] = [];
    $respuesta["mensaje"] = "";
    try {
        $formaPago = $data["formaPago"];
        $fechaInicio = $data["fechaInicio"];
        $fechaFinal = $data["fechaVencimiento"];

        $sql = "UPDATE t_pagos_cliente SET forma_pago = '$formaPago', fecha_inicio = '$fechaInicio', fecha_vencimiento = '$fechaFinal'
                WHERE 
                id = '$id'";
        $result = mysqli_query($conexion, $sql);
        if ($result) {
            $respuesta["mensaje"] = "Pago Actualizado";
        } else {
            $respuesta["success"] = false;
            $respuesta["mensaje"] = mysqli_error($conexion);
        }
    } catch (Exception $e) {
        $respuesta["estado"] = false;
    }
    return $respuesta;

}

function construirPDF($data, $conexion)
{
    $tarifa = $data["tarifa"];
    $clienteI = $data["clienteId"];
    $fecha_inicio = $data["fechaInicio"];
    $fecha_vencimiento = $data["fechaVencimiento"];
    $abono = $data["abono"];
    $valor_t = $data["valor"];
    $t_pagar = $data["totalPagar"];
    $obtenerDatosCliente = obtenerDatosCliente($clienteI, $conexion);

}

function obtenerDatosCliente($cliente, $conexion)
{
    $respuesta = array();
    $respuesta["success"] = true;
    $respuesta["datos"] = [];
    try {
        $sql = "SELECT * FROM t_clientes WHERE Identificacion = '$cliente'";
        if ($result = mysqli_query($conexion, $sql)) {
            while ($row = mysqli_fetch_row($result)) {
                $respuesta["datos"] = $row;
            }
        }
    } catch (Exception $e) {
        $respuesta["success"] = false;
        $respuesta["mensaje"] = $e->getMessage();
    }
    return $respuesta;
}

function obtenerFormaPago($codigo)
{
    switch ($codigo) {
        case '1':
            return 'Efectivo';
        case '2':
            return 'Daviplata';
        case '3':
            return 'Nequi';
        case '4':
            return 'Datafono';
        default:
            return 'Desconocido';
    }
}

function datosNuevoAbono($conexion, $data)
{
    $respuesta = array();
    $respuesta["success"] = true;
    $respuesta["datos"] = [];
    $respuesta["mensaje"] = "";
    try {
        $id = $data["id"];
        $sql = "SELECT c.Nombres, c.Apellidos , tpc.fechaVencimiento, tpc.t_pagar FROM t_pagos_cliente tpc , t_clientes c
        WHERE 
        tpc.id = '$id'
        AND 
        tpc.cliente = c.Identificacion;";
        date_default_timezone_set('America/Bogota');
        if ($result = mysqli_query($conexion, $sql)) {
            while ($row = mysqli_fetch_row($result)) {
                $resultado["id"] = $id;
                $resultado["nombres"] = $row[0] . " " . $row[1];
                $resultado["fecha"] = date('Y-m-d');
                $resultado["fechaVencimientoSaldo"] = $row[2];
                $resultado["totalPagar"] = $row[3];
                $sumaAbonos = obtenerSumatoriaAbonos($id, $conexion);
                $resultado["saldo"] = $row[3] - $sumaAbonos["datos"];
            }
        }
        $respuesta["datos"] = $resultado;
    } catch (Exception $e) {
        $respuesta["success"] = false;
        $respuesta["mensaje"] = $e->getMessage();
    }
    return $respuesta;
}
function guardarAbonoCliente($conexion, $data)
{
    $respuesta = array();
    $respuesta["success"] = true;
    $respuesta["datos"] = [];
    $respuesta["mensaje"] = "";

    try {
        $id = $data["idPago"];
        $fechaAbono = $data["fechaAbono"];
        $valorAbono = $data["valorAbono"];
        $formaPago = $data["formaPago"];
        $t_pagar = $data["t_pagar"];
        $saldos = obtenerSumatoriaAbonos($id, $conexion);
        $saldos = $t_pagar - ($saldos["datos"] + $valorAbono);
        $sql = "INSERT INTO t_abono_pagoc(idPago,valorAbono,fecha,forma_pago,saldo)
                                          VALUES('$id',
                                                  '$valorAbono',
                                                  '$fechaAbono',
                                                  '$formaPago',
                                                  '$saldos')";

        $result = mysqli_query($conexion, $sql);
        if ($result) {
            $idAbono = mysqli_insert_id($conexion);
            $respuesta["mensaje"] = "Abono exitoso";
            $respuesta["datos"] = $idAbono . "-" . $id;
            actualizarSaldo($conexion, $saldos, $id);
            actualizaEstado($id, $conexion);
        } else {
            $respuesta["success"] = false;
            $respuesta["mensaje"] = mysqli_error($conexion);
        }
    } catch (Exception $e) {
        $respuesta["estado"] = false;
    }
    return $respuesta;
}

function actualizarSaldo($conexion, $saldos, $id)
{
    try {
        $sql = "UPDATE t_pagos_cliente SET saldo = '$saldos' WHERE id = '$id'  ";
        $result = mysqli_query($conexion, $sql);
        return $result;
    } catch (Exception $e) {
        return false;
    }
}

function actualizaEstado($id, $conexion)
{
    try {
        $consularUltimoSaldo = ultimoSaldo($id, $conexion);
        if ($consularUltimoSaldo == 0) {
            $sql = "UPDATE t_pagos_cliente set estado = 1 WHERE id = '$id'";
            $result = mysqli_query($conexion, $sql);
        }
        return true;
    } catch (Exception $e) {
        return false;
    }
}

function ultimoSaldo($id, $conexion)
{
    $saldo = "YDCC";
    $sql = "SELECT saldo FROM t_abono_pagoc WHERE idPago = '$id' and estado = 1 ORDER BY id DESC LIMIT 1";
    if ($result = mysqli_query($conexion, $sql)) {
        while ($row = mysqli_fetch_row($result)) {
            $saldo = $row[0];
        }
    }
    return $saldo;
}

function anularAbono($conexion, $data)
{
    $respuesta = array();
    $respuesta["success"] = true;
    $respuesta["datos"] = [];
    $respuesta["mensaje"] = "";
    try {
        $id = $data["id"];
        $idPago = $data["idPago"];
        $sql = "UPDATE  t_abono_pagoc SET estado = 0 WHERE id = '$id ' and idPago = '$idPago'";

        $result = mysqli_query($conexion, $sql);
        if ($result) {
            $obtenerValorApagar = obtenerValorApagar($conexion, $idPago);
            $sumatoriaSaldo = obtenerSumatoriaAbonos($idPago, $conexion);
            $saldos = $obtenerValorApagar - $sumatoriaSaldo["datos"];
            actualizarSaldo($conexion, $saldos, $idPago);
            actualizaEstado($idPago, $conexion);
            $respuesta["mensaje"] = "Abono No " . $id . " anulado";
            $respuesta["datos"] = $idPago;

        } else {
            $respuesta["mensaje"] = "Error al anular el abono No " . $id . ": " . mysqli_error($conexion);
        }
    } catch (Exception $e) {
        $respuesta["success"] = false;
        $respuesta["mensaje"] = $e->getMessage();
    }
    return $respuesta;

}
function obtenerValorApagar($conexion, $id)
{
    $valorPagar = 0;
    try {
        $sql = "SELECT t_pagar FROM t_pagos_cliente WHERE id = '$id'";
        if ($result = mysqli_query($conexion, $sql)) {
            while ($row = mysqli_fetch_row($result)) {
                $valorPagar = $row[0];
            }
        }
    } catch (Exception $e) {

    }
    return $valorPagar;
}

function registrarAsistencia($conexion, $data)
{
    date_default_timezone_set("America/Bogota");
    $respuesta = array();
    $respuesta["success"] = true;
    $respuesta["datos"] = [];
    $respuesta["mensaje"] = "";

    try {
        $cliente = $data["idCliente"];
        $idPago = $data["idPago"];
        $tarifa = $data["valorTarifa"];
        $fecha = date("Y-m-d");
        $hora = date("H:i:s");
        $sql = "INSERT INTO t_asistencias (idCliente,fecha,hora,idPago,tiquetera)
                                    VALUES('$cliente', '$fecha','$hora','$idPago','$tarifa')";
        $result = mysqli_query($conexion, $sql);
        if ($result) {
            $validar = actualizarTiquetera($conexion, $data);
            $respuesta["mensaje"] = "Asistencia Registrada...";
        } else {
            $respuesta["success"] = false;
            $respuesta["mensaje"] = mysqli_error($conexion);
        }
    } catch (Exception $e) {
        $respuesta["estado"] = false;
    }
    return $respuesta;

}
function actualizarTiquetera($conexion, $data)
{
    $resultado = true;
    try {
        $id = $data["idPago"];
        $cantidad = $data["cantidadTiquetes"] - 1;
        $sql = "UPDATE t_pagos_cliente SET cantidadTiquetesRestante = $cantidad WHERE id = '$id' ";
        $result = mysqli_query($conexion, $sql);
        if ($result) {

        } else {
            $resultado = false;
        }


    } catch (Exception $e) {
        $resultado = false;
    }
    return $resultado;
}

function actualizarPagos($conexion)
{
    date_default_timezone_set('America/Bogota');
    $resultado = false;
    try {
        $fechaHoy = date("Y-m-d");
        $validarActualizacion = validarActualizacion($conexion, $fechaHoy);
        if ($validarActualizacion) {
            $sql = "UPDATE t_pagos_cliente SET estadoPago = 0 WHERE fecha_vencimiento < ? AND estadoPago = 1";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("s", $fechaHoy);
            $result = $stmt->execute();
            $stmt->close();
            $resultado = true;
            actualizarControl($conexion, $fechaHoy);

        }
    } catch (Exception $e) {
        $resultado = false;
    }
    return $resultado;
}

function validarActualizacion($conexion, $fechaHoy)
{
    try {
        $result = mysqli_query($conexion, "SELECT fecha_actualizacion FROM control_actualizacion LIMIT 1");
        return !$result || mysqli_num_rows($result) == 0 || mysqli_fetch_assoc($result)['fecha_actualizacion'] != $fechaHoy;
    } catch (Exception $e) {
        return false;
    }
}
function actualizarControl($conexion, $fechaHoy)
{
    try {
        $sql = "REPLACE INTO control_actualizacion (id, fecha_actualizacion) VALUES (1, ?)";
        $stmt = mysqli_prepare($conexion, $sql);
        mysqli_stmt_bind_param($stmt, "s", $fechaHoy);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
        return true;
    } catch (Exception $e) {
        return false;
    }
}
function cargarDatosAsistencia($conexion, $fecha = null)
{
    date_default_timezone_set('America/Bogota');
    $fecha = $fecha ?: date('Y-m-d');
    $respuesta = array();
    $respuesta["success"] = true;
    $respuesta["datos"] = [];
    $respuesta["mensaje"] = "";

    try {
        $sql = "SELECT a.id,
                a.idCliente, c.Nombres, c.Apellidos, a.fecha, a.hora, a.tiquetera, tpc.estado
            FROM t_asistencias a
            JOIN t_clientes c ON c.Identificacion = a.idCliente
            JOIN t_pagos_cliente tpc ON a.idPago = tpc.id
            WHERE a.fecha = ?";

        if ($stmt = $conexion->prepare($sql)) {
            $stmt->bind_param("s", $fecha);
            $stmt->execute();
            $result = $stmt->get_result();
            $resultado = $result->fetch_all(MYSQLI_ASSOC);
            $stmt->close();
            $respuesta["datos"] = $resultado;
        }
    } catch (Exception $e) {
        $respuesta["success"] = false;
    }

    return $respuesta;
}
function eliminarAsistencia($conexion, $data)
{
    $respuesta = ["success" => true, "datos" => [], "mensaje" => ""];
    try {
        $id = $data["id"];
        if (!is_numeric($id))
            throw new Exception("ID inválido");
        $stmt = $conexion->prepare("DELETE FROM t_asistencias WHERE id = ?");
        $stmt->bind_param("i", $id);
        if (!$stmt->execute())
            throw new Exception("Error al eliminar: " . $stmt->error);
        $stmt->close();
        $respuesta["mensaje"] = "Asistencia eliminada correctamente.";
    } catch (Exception $e) {
        $respuesta["success"] = false;
        $respuesta["mensaje"] = $e->getMessage();
    }
    return $respuesta;
}


function eliminarPago($conexion, $data)
{
    $respuesta = ["success" => true, "datos" => [], "mensaje" => ""];
    try {
        $id = $data["id"];
        if (!is_numeric($id))
            throw new Exception("ID inválido");
        $stmt = $conexion->prepare("DELETE FROM t_pagos_cliente WHERE id = ?");
        $stmt->bind_param("i", $id);
        if (!$stmt->execute())
            throw new Exception("Error al eliminar: " . $stmt->error);
        $stmt->close();
        $respuesta["mensaje"] = "Pago eliminado correctamente.";
    } catch (Exception $e) {
        $respuesta["success"] = false;
        $respuesta["mensaje"] = $e->getMessage();
    }
    return $respuesta;
}
function guardarTipoGasto($conexion, $data)
{
    $respuesta = ["success" => true, "datos" => [], "mensaje" => ""];
    try {
        $stmt = mysqli_prepare($conexion, "INSERT INTO t_tipo_gasto (descripcion) VALUES (?)");
        mysqli_stmt_bind_param($stmt, "s", $data["tipoGasto"]);
        if (mysqli_stmt_execute($stmt)) {
            $respuesta["mensaje"] = "Tipo de gasto registrado.";
            $respuesta["datos"]["id"] = mysqli_insert_id($conexion);
        } else {
            $respuesta["success"] = false;
            $respuesta["mensaje"] = mysqli_error($conexion);
        }
        mysqli_stmt_close($stmt);
    } catch (Exception $e) {
        $respuesta["success"] = false;
        $respuesta["mensaje"] = "Error: " . $e->getMessage();
    }
    return $respuesta;
}

function editarTipoGasto($conexion, $data)
{
    $respuesta = ["success" => true, "datos" => [], "mensaje" => ""];

    $descripcion = $data["tipoGasto"];
    $id = $data["id"];

    try {
        if (!$stmt = $conexion->prepare("UPDATE t_tipo_gasto SET descripcion = ? WHERE id = ?")) {
            throw new Exception($conexion->error);
        }

        $stmt->bind_param("si", $descripcion, $id);
        if (!$stmt->execute()) {
            throw new Exception($stmt->error);
        }

        $respuesta["mensaje"] = $stmt->affected_rows > 0
            ? "Tipo de gasto actualizado correctamente."
            : "No se realizaron cambios.";

        $stmt->close();
    } catch (Exception $e) {
        $respuesta["success"] = false;
        $respuesta["mensaje"] = "Error: " . $e->getMessage();
    }

    return $respuesta;
}


