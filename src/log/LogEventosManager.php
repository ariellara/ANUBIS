<?php
require_once '../comunes/Respuesta.php';
require_once '../log/LoggerEvento.php';
require_once '../../conexion/conexion.php';

class LogEventosManager
{
    private $repositorio;
    private LoggerEvento $logger;
    private mysqli $conexion;
    public function __construct(mysqli $conexion)
    {

        $this->logger = new LoggerEvento($conexion);
    }

    public function listarEventosLogger($datos)
    {
        $respuesta = new Respuesta();
        try {
            $resultado = $this->logger->listarEventosLogger($datos);

            if ($resultado) {
                $respuesta->setSuccess(true);
                $respuesta->setMensaje("Eventos consultados correctamente.");
                $contruirTabla = $this->construirTabla($resultado);
                $respuesta->setDatos($contruirTabla);
            } else {
                $respuesta->setSuccess(true);
                $respuesta->setMensaje("No se obtuvieron resultados");
                $vacio = '<tr><td colspan="8" class="text-center">No hay logs eventos para mostrar</td></tr>';
                $respuesta->setDatos($vacio);
            }

        } catch (Exception $e) {
            $respuesta->setSuccess(false);
            $respuesta->setMensaje("Error al consultar Logger: " . $e->getMessage());
            $respuesta->setDatos([]);

            if (isset($this->logger)) {
                $this->logger->guardar("Error al consultar Loger: " . $e->getMessage(), "Dependencia", "sistema");
            }
        }

        return $respuesta;
    }

    private function construirTabla($logs): string
    {
        $html = '';
        foreach ($logs as $evento) {
            $html .= '<tr>';
            $html .= '<td>' . htmlspecialchars($evento['id']) . '</td>';
            $html .= '<td>' . htmlspecialchars($evento['fecha']) . '</td>';
            $html .= '<td>' . htmlspecialchars($evento['usuario']) . '</td>';
            $html .= '<td>' . htmlspecialchars($evento['modulo']) . '</td>';
            $html .= '<td>' . htmlspecialchars($evento['evento']) . '</td>';
            $html .= '<td>' . htmlspecialchars($evento['ip']) . '</td>';
            $html .= '</tr>';
        }

        return $html;
    }


}
