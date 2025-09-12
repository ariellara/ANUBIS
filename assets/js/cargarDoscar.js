function cargarDoscar(tipo) {
    $('#pantallaCarga').fadeIn(200).css('display', 'flex')
    let datos = { tipo: tipo };
    enviarController(datos, '../src/cargarDatos/CargarDoscarController.php');

}

function enviarController(datos, ruta) {
    $.ajax({
        type: "POST",
        url: ruta,
        data: JSON.stringify(datos),
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                $('#pantallaCarga').fadeOut(200);
                let datosNobe = { tipo: "CARGARDATOSNUBE" };
               // enviarDatosNube(datosNobe, '../src/cargarDatos/CargarDoscarController.php');
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: data.mensaje,
                    timer: 3000,
                    showConfirmButton: false
                });

            } else {
                $('#pantallaCarga').fadeOut(200);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.mensaje || 'Ocurrió un error inesperado.',
                    confirmButtonColor: '#d33'
                });
            }

        },
        error: function (xhr, status, error) {
            $('#pantallaCarga').fadeOut(200);
            let mensaje = 'Ocurrió un error de conexión.';
            if (xhr.status === 404) {
                mensaje = 'La ruta especificada no existe (404).';
            } else if (xhr.status === 500) {
                mensaje = 'Error interno en el servidor (500).';
            }

            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: mensaje,
                confirmButtonColor: '#d33'
            });

            console.error("Error AJAX:", status, error, xhr);
        }
    });
}


function enviarDatosNube(datos, ruta) {
    $('#pantallaCarga').fadeIn(200).css('display', 'flex')
    $.ajax({
        type: "POST",
        url: ruta,
        data: JSON.stringify(datos),
        cache: false,
        dataType: 'json',
        success: function (data) {
            $('#pantallaCarga').fadeOut(200);
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: data.mensaje,
                    timer: 3000,
                    showConfirmButton: false
                });

            } else {
                $('#pantallaCarga').fadeOut(200);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.mensaje || 'Ocurrió un error inesperado.',
                    confirmButtonColor: '#d33'
                });
            }

        },
        error: function (xhr, status, error) {
            $('#pantallaCarga').fadeOut(200);

            // Mensajes personalizados según el caso
            let mensaje = 'Ocurrió un error de conexión.';
            if (xhr.status === 404) {
                mensaje = 'La ruta especificada no existe (404).';
            } else if (xhr.status === 500) {
                mensaje = 'Error interno en el servidor (500).';
            }

            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: mensaje,
                confirmButtonColor: '#d33'
            });

            console.error("Error AJAX:", status, error, xhr);
        }
    });
}


