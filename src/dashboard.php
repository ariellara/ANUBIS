<?php
session_start();
if ($_SESSION['rol'] == 1 || $_SESSION['rol'] == 2) {
    include "../conexion.php";
    include_once "includes/header.php";

    ?>
    <div class="card shadow-lg" id="cargarDoscar">
        <div class="card-body">

            <!-- Encabezado -->
            <div class="mb-4">
                <h5 class="text-primary fw-bold mb-2">
                    <i class="fas fa-thumbtack me-2"></i>
                    Cargue desde este apartado a la BD Cloud Doscar
                </h5>
                <p class="text-muted">
                    <i class="fas fa-info-circle me-2"></i>
                    Seleccione cargar para sincronizar los datos desde Doscar a la base de datos Cloud Doscar.
                </p>
            </div>

            <!-- Formulario -->
            <form action="" method="post" autocomplete="off" id="formulario" enctype="multipart/form-data">
                <?php echo isset($alert) ? $alert : ''; ?>

                <div class="mb-3">
                    <label class="fw-semibold">Operación</label>
                    <hr>
                </div>

                <!-- Botón centrado -->
                <div class="text-center">
                    <button type="button" class="btn btn-success btn-lg px-5" id="idExcel"
                        onclick="cargarDoscar('CARGARDOSCAR')">
                        <i class="fas fa-cloud-upload-alt me-2"></i> Cargar
                    </button>
                </div>
            </form>

        </div>
    </div>
    <div id="pantallaCarga" class="pantalla-carga">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="texto-carga">Cargando...</p>
    </div>
    <?php
    include_once "includes/footer.php";
} else {
    header('Location: permisos.php');
}
?>
<?php include_once "includes/footer.php"; ?>
<script src="../assets/js/cargarDoscar.js"></script>