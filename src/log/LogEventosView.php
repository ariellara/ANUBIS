<?php
session_start();
if ($_SESSION['rol'] == 1 || $_SESSION['rol'] == 2) {
    include "../../conexion/conexion.php";
    require_once '../comunes/Respuesta.php';

    include_once "../includes/header.php";

    ?>
    <div class="card" id="listarDocumentosCargados">
        <div class="card-body">
            <div class="row align-items-center mb-3">
                <div class="col">
                    <h5 class="text-primary mb-1">
                        <i class="fas fa-file-alt"></i> Registro de log de Eventos QillQasQa.
                    </h5>
                    <p class="text-muted mb-0">
                        <i class="fas fa-info-circle"></i> Utilize los filtros para buscar los eventos en el sistema

                    </p>
                </div>

            </div>
            <div class="card">
                <div class="card-body">
                    <form id="filtrosForm">
                        <div class="form-row">

                            <div class="form-group col-md-2">
                                <label for="fechaDesde">Fecha desde</label>
                                <input type="date" class="form-control form-control-sm" id="fechaDesde">
                            </div>
                            <div class="form-group col-md-2">
                                <label for="fechaHasta">Fecha hasta</label>
                                <input type="date" class="form-control form-control-sm" id="fechaHasta"
                                    value="<?php echo date('Y-m-d'); ?>">

                            </div>
                            <div class="form-group col-md-1 align-self-end">
                                <button type="button" class="btn btn-success btn-sm btn-block" title="Filtrar"
                                    onclick="buscarEventos()">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                            <div class="form-group col-md-1 align-self-end">
                                <button type="reset" class="btn btn-warning btn-sm btn-block" title="Limpiar">
                                    <i class="fas fa-eraser"></i>
                                </button>
                            </div>
                        </div>


                </div>



                </form>
            </div>
        </div>


        <div class="col-md-12">
            <div class="card">
                <div class="card-body">

                    <div class="table-responsive">
                        <table class="table table-striped table-bordered table-sm" id="tbl">

                            <thead>
                                <tr>
                                    <th><i class="bi bi-hash"></i> Id Evento</th>
                                    <th><i class="bi bi-calendar-event"></i> Fecha</th>
                                    <th><i class="bi bi-person"></i> Responsable</th>
                                    <th><i class="bi bi-grid-3x3-gap"></i> Módulo</th>
                                    <th><i class="bi bi-bell"></i> Evento</th>
                                    <th><i class="bi bi-wifi"></i> IP</th>
                                </tr>
                            </thead>
                            <tbody>


                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="pantallaCarga" class="pantalla-carga">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="texto-carga">Buscando...</p>
    </div>

    <div class="alert alert-warning" role="alert" style="display: none;"></div>
    <div class="alert alert-success" style="display:none;"></div>
    <?php include_once "../includes/footer.php";
} else {
    header('Location: /qillqa/src/permisos.php');
}
?>
<script src="/QILLQA/assets/js/comunes.js"></script>
<script src="/QILLQA/assets/js/logEventos.js"></script>