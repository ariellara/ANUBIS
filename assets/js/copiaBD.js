function copiaSeguridad() {
   
    Swal.fire({
        title: '¿Estás seguro de que deseas generar una copia de seguridad?',
        text: 'Esto podría tomar un poco de tiempo, dependiendo del tamaño de los datos.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, generar copia',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            $('#pantallaCargaDescargar').css('display', 'flex');
            $.ajax({
                type: "POST",
                url: "/qillqa/src/PapeleraDocumentos/PapeleraDocumentosController.php",
                data: JSON.stringify({ tipo: "COPIASEGURIDAD" }),
                cache: false,
                dataType: 'json',
                success: function (data) {
                    $('#pantallaCargaDescargar').hide();

                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Copia de seguridad generada',
                            text: 'Se ha generado la copia de seguridad correctamente.',
                            confirmButtonText: 'Aceptar'
                        }).then(() => {
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.message || 'No se pudo generar la copia de seguridad.'
                        });
                    }
                },
                error: function (xhr, status, error) {
                    $('#pantallaCargaDescargar').hide();
                    console.error(xhr);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al generar copia de seguridad',
                        text: `Error ${xhr.status} - ${xhr.statusText}\n${error}`
                    });
                }
            });
        } else {
            $('#pantallaCargaDescargar').hide();
        }
    });
}


$(function () {
    $('[data-widget="pushmenu"]').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-collapse');
    });
});

