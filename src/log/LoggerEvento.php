<?php
class LoggerEvento
{
    private mysqli $conexion;

    public function __construct(mysqli $conexion)
    {
        $this->conexion = $conexion;
    }

    public function guardar(string $evento, string $modulo, string $usuario): void
    {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';

        $stmt = $this->conexion->prepare("
            INSERT INTO log_eventos (fecha, ip, evento, modulo, usuario)
            VALUES (NOW(), ?, ?, ?, ?)
        ");

        if ($stmt) {
            $stmt->bind_param("ssss", $ip, $evento, $modulo, $usuario);
            $stmt->execute();
            $stmt->close();
        }
    }

    public function listarEventosLogger($data):array
{
    $fechaInicial = $data["fechaDesde"] ?? null;
    $fechaFin = $data["fechaFin"] ?? null;

    $query = "SELECT * FROM log_eventos";
    $params = [];
    $types = '';

    if (!empty($fechaInicial) && !empty($fechaFin)) {
        $fechaInicial .= " 00:00:00";
        $fechaFin .= " 23:59:59";
        $query .= " WHERE fecha BETWEEN ? AND ?";
        $params[] = $fechaInicial;
        $params[] = $fechaFin;
        $types = 'ss';
    }

    $stmt = $this->conexion->prepare($query);
    if (!$stmt) {
        throw new Exception("Error en prepare: " . $this->conexion->error);
    }

    if (!empty($params)) {
        $stmt->bind_param($types, ...$params);
    }

    $stmt->execute();
    $resultado = $stmt->get_result();
    $documentos = $resultado->fetch_all(MYSQLI_ASSOC);
    $stmt->close();

    return $documentos;
}

    
}