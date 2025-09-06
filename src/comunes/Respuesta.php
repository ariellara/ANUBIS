<?php

class Respuesta
{
    private mixed $datos = null;
    private bool $success = false;
    private string $mensaje = "";
    private string $url = "";

    public function setDatos(mixed $datos): void
    {
        $this->datos = $datos; 
    }

    public function setSuccess(bool $success): void
    {
        $this->success = $success;
    }

    public function setMensaje(string $mensaje): void
    {
        $this->mensaje = $mensaje;
    }

    public function setUrl(string $url): void
    {
        $this->url = $url;
    }
    public function getSuccess(): bool
    {
        return $this->success;
    }

    public function getMensaje(): string
    {
        return $this->mensaje;
    }

    public function getDatos(): mixed
    {
        return $this->datos;
    }

    public function getUrl(): string
    {
        return $this->url;
    }


    public function toArray(): array
    {
        return [
            "success" => $this->success,
            "mensaje" => $this->mensaje,
            "datos" => $this->datos,
            "url" => $this->url
        ];
    }

    public function toJson(): string
{
    return json_encode($this->toArray(), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

}
