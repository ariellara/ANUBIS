<?php
session_start();
if (!empty($_SESSION['active'])) {
  header('location: src/');
} else {
  if (!empty($_POST)) {
    $alert = '';
    if (empty($_POST['correo']) || empty($_POST['pass'])) {
      $alert = '<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        Ingrese correo y contraseña
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>';
    } else {
      require_once "conexion.php";
      $user = mysqli_real_escape_string($conexion, $_POST['correo']);
      $pass = md5(mysqli_real_escape_string($conexion, $_POST['pass']));
      $query = mysqli_query($conexion, "SELECT * FROM usuarios WHERE correo = '$user' AND pass = '$pass'");
      mysqli_close($conexion);
      $resultado = mysqli_num_rows($query);
      if ($resultado > 0) {
        $dato = mysqli_fetch_array($query);
        $_SESSION['active'] = true;
        $_SESSION['idUser'] = $dato['id'];
        $_SESSION['nombre'] = $dato['nombre'];
        $_SESSION['rol'] = $dato['rol'];
        header('Location: src/dashboard.php');
      } else {
        $alert = '<div class="alert alert-danger alert-dismissible fade show" role="alert">
                        Datos incorrectos
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>';
        session_destroy();
      }
    }
  }
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Login | Zerion</title>
  <link rel="icon" type="image/png" href="assets/img/OIP.png">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="assets/plugins/fontawesome-free/css/all.min.css">
  <!-- icheck bootstrap -->
  <link rel="stylesheet" href="assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css">
  <!-- AdminLTE -->
  <link rel="stylesheet" href="assets/dist/css/adminlte.min.css">
</head>

<body class="hold-transition login-page" style="background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);">

  <div class="login-box">

    <!-- Logo + título -->
    <div class="text-center mb-3">
      <img src="assets/img/logo.jpg" width="64" height="64" alt="Zerion" class="mb-2 rounded-circle shadow-sm">
      <h1 class="h4 font-weight-bold text-primary">Zerion</h1>
      <p class="text-muted">Bienvenido</p>
    </div>

    <!-- Card de login -->
    <div class="card shadow-lg border-0 rounded-4"
      style="backdrop-filter: blur(12px); background: rgba(255,255,255,0.85);">
      <div class="card-body login-card-body p-4">

        <!-- Título -->
        <h5 class="text-center text-dark mb-4 fw-bold">Ingrese sus credenciales</h5>

        <form action="" method="post" autocomplete="off">
          <?php echo (isset($alert)) ? $alert : ''; ?>

          <!-- Email -->
          <div class="input-group mb-3">
            <input type="email" class="form-control rounded-start" name="correo" placeholder="Correo" required>
            <span class="input-group-text bg-white">
              <i class="fas fa-envelope text-primary"></i>
            </span>
          </div>

          <!-- Password -->
          <div class="input-group mb-4">
            <input type="password" class="form-control rounded-start" name="pass" id="password" placeholder="Contraseña"
              required>
            <span class="input-group-text bg-white">
              <i class="fas fa-eye text-primary" id="togglePassword" style="cursor:pointer;"></i>
            </span>
          </div>

          <!-- Botón -->
          <div class="d-flex justify-content-center mt-3">
            <button type="submit" class="btn btn-primary btn-lg fw-semibold px-5">
              <i class="fas fa-sign-in-alt me-2"></i> Ingresar
            </button>
          </div>

          <!-- Opciones extras -->
          <div class="mt-3 text-center">
            <a href="#" class="small text-decoration-none text-primary">Desarrollado por Zerion
              <?php print date("Y"); ?></a>
          </div>
        </form>
      </div>
    </div>


  </div>
  <!-- /.login-box -->

  <!-- Scripts -->
  <script src="assets/plugins/jquery/jquery.min.js"></script>
  <script src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/dist/js/adminlte.min.js"></script>

  <script>
    // Mostrar/ocultar contraseña
    document.getElementById('togglePassword').addEventListener('click', function () {
      const password = document.getElementById('password');
      const icon = this;

      if (password.type === 'password') {
        password.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        password.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
      }
    });
  </script>
</body>

</html>