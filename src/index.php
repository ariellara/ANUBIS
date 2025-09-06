<?php
session_start();
if ($_SESSION['rol'] == 1 || $_SESSION['rol'] == 3) {
include_once "includes/header.php";

?>

<?php include_once "includes/footer.php";
} else {
    header('Location: permisos.php');
}
?>