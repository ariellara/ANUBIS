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
                        Contraseña incorrecta
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
  <title>Login | GymAccess</title>
  <link rel="icon" type="image/png" href="assets/img/OIP.png">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="assets/plugins/fontawesome-free/css/all.min.css">
  <!-- icheck bootstrap -->
  <link rel="stylesheet" href="assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css">
  <!-- AdminLTE -->
  <link rel="stylesheet" href="assets/dist/css/adminlte.min.css">
</head>

<body class="hold-transition login-page" style="background: linear-gradient(135deg, #f0f4f8, #ffffff);">
  <div class="login-box">

    <!-- Logo + título -->
    <div class="text-center mb-3">
      <img src="assets/img/logo.jpg" width="64" height="64" alt="Zerion" class="mb-2 rounded-circle shadow-sm">
      <h1 class="h4 font-weight-bold text-primary">Zerion</h1>
      <p class="text-muted">Bienvenido</p>
    </div>

    <!-- Card de login -->
    <div class="card shadow-lg rounded">
      <div class="card-body login-card-body">
        <p class="login-box-msg">Ingrese sus credenciales</p>

        <form action="" method="post" autocomplete="off">
          <?php echo (isset($alert)) ? $alert : ''; ?>

          <!-- Email -->
          <div class="input-group mb-3">
            <input type="email" class="form-control" name="correo" placeholder="Correo" required>
            <div class="input-group-append">
              <div class="input-group-text bg-white">
                <span class="fas fa-envelope text-primary"></span>
              </div>
            </div>
          </div>

          <!-- Password -->
          <div class="input-group mb-3">
            <input type="password" class="form-control" name="pass" id="password" placeholder="Contraseña" required>
            <div class="input-group-append">
              <div class="input-group-text bg-white">
                <span class="fas fa-eye text-primary" id="togglePassword" style="cursor:pointer;"></span>
              </div>
            </div>
          </div>

          <!-- Botón -->
          <div class="row justify-content-center">
            <div class="col-6">
              <button type="submit" class="btn btn-primary btn-block">Ingresar</button>
            </div>
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
