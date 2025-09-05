function buscarDocumentosEliminados() {
    alert('entro');
    let fechaDesde = $('#fechaDesde').val();
    let fechaHasta = $('#fechaHasta').val();
    if (fechaDesde === "") {
        mostrarAlerta("Seleccione la fecha desde", "#fechaDesde");
        return;
    }
    if (fechaHasta === "") {
        mostrarAlerta("Seleccione la fecha hasta", "#fechaHasta");
        return;
    }
    let data = {
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta,
        tipo: "ELIMINADOS",

    };
    $('#pantallaCarga').css('display', 'flex');
    buscarDocumentosEliminados(data);

}
function documentosEliminados() {

    let fechaDesde = $('#fechaDesde').val();
    let fechaHasta = $('#fechaHasta').val();
    if (fechaDesde === "") {
        mostrarAlerta("Seleccione la fecha desde", "#fechaDesde");
        return;
    }
    if (fechaHasta === "") {
        mostrarAlerta("Seleccione la fecha hasta", "#fechaHasta");
        return;
    }
    let data = {
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta,
        tipo: "ELIMINADOS",

    };
    $('#pantallaCarga').css('display', 'flex');
    buscarDocumentosEliminados(data);
}
// function buscarDocumentosEliminados(datos) {
//     $.ajax({
//         type: "POST",
//         url: "/qillqa/src/PapeleraDocumentos/PapeleraDocumentosController.php",
//         data: JSON.stringify(datos),
//         contentType: 'application/json',
//         cache: false,
//         dataType: 'json',
//         success: function (data) {
//             if (data.success) {
//                 let datosFormulario = data.datos;
//                 mostrarDatosDocumentosEliminados(datosFormulario);
//             } else {
//                 let datosFormulario = data.datos;
//                 mostrarDatosDocumentosEliminados(datosFormulario);
//                 Swal.fire({
//                     icon: 'info',
//                     title: 'Sin resultados',
//                     text: 'No se encontraron documentos eliminados.'
//                 });
//                 $('#pantallaCarga').hide();
//             }
//         },
//         error: function (xhr, status, error) {
//             let mensaje = 'Ha ocurrido un error inesperado.';

//             if (xhr.status === 404) {
//                 mensaje = 'No se encontró el archivo del controlador.\nVerifica la ruta: PapeleraDocumentosController.php';
//             } else {
//                 mensaje = `Error ${xhr.status} - ${xhr.statusText}\n${error}`;
//             }
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error al buscar documentos',
//                 text: mensaje
//             });
//             $('#pantallaCarga').hide();
//         }
//     });
// }
function buscarDocumentosEliminados(datos) {

    $.ajax({
        type: "POST",
        url: "/qillqa/src/PapeleraDocumentos/PapeleraDocumentosController.php",
        data: JSON.stringify(datos),
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                let datosFormulario = data.datos;
                console.log(datosFormulario);
                mostrarDatosDocumentosEliminados(datosFormulario);
            }
            else {
                $('#pantallaCarga').hide();
            }

        },
        error: function (xhr, status, error) {
            console.error(xhr);
            let mensaje = 'Ha ocurrido un error inesperado.';

            if (xhr.status === 404) {
                mensaje = 'No se encontró el archivo del controlador.\nVerifica la ruta: PapeleraDocumentosController.php';
            } else {
                mensaje = `Error ${xhr.status} - ${xhr.statusText}\n${error}`;
            }
            Swal.fire({
                icon: 'error',
                title: 'Error al buscar documentos',
                text: mensaje
            });
            $('#pantallaCarga').hide();
            $('#pantallaCarga').hide();
        }
    });

}

function mostrarDatosDocumentosEliminados(documentosEliminados) {
    $('#pantallaCarga').hide();
    const tabla = $('#tablaEliminados').DataTable();
    tabla.clear();
    $('#tablaEliminados tbody').html(documentosEliminados);
    tabla.rows.add($('#tablaEliminados tbody tr')).draw();
}

function restaurarDocumento(idDocumento) {

    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Se restaurará el documento!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, restaurar'
    }).then((result) => {
        if (result.isConfirmed) {
            $('#pantallaCarga').css('display', 'flex');
            $.ajax({
                type: "POST",
                url: "/qillqa/src/PapeleraDocumentos/PapeleraDocumentosController.php",
                data: JSON.stringify({ idDocumento: idDocumento, tipo: "RESTABLECER" }),
                cache: false,
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Restaurado',
                            text: 'El documento ha sido restaurado correctamente.'
                        });
                        let datos = {
                            fechaDesde: $('#fechaDesde').val(),
                            fechaHasta: $('#fechaHasta').val(),
                            tipo: "ELIMINADOS",
                        };
                        buscarDocumentosEliminados(datos);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.message || 'No se pudo restaurar el documento.'
                        });
                        $('#pantallaCarga').hide();
                    }
                },
                error: function (xhr, status, error) {
                    $('#pantallaCarga').hide();
                    console.error(xhr);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al restaurar documento',
                        text: `Error ${xhr.status} - ${xhr.statusText}\n${error}`
                    });
                }
            });
        }
    });
}

function eliminarDefinitivamente(idDocumento) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡El documento será eliminado de forma definitiva!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            $('#pantallaCarga').css('display', 'flex');
            $.ajax({
                type: "POST",
                url: "/qillqa/src/PapeleraDocumentos/PapeleraDocumentosController.php",
                data: JSON.stringify({ idDocumento: idDocumento, tipo: "ELIMINAR_DEFINITIVAMENTE" }),
                cache: false,
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Eliminado',
                            text: 'El documento ha sido eliminado correctamente.'
                        });
                        let datos = {
                            fechaDesde: $('#fechaDesde').val(),
                            fechaHasta: $('#fechaHasta').val(),
                            tipo: "ELIMINADOS",
                        };
                        buscarDocumentosEliminados(datos);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.message || 'No se pudo eliminar el documento.'
                        });
                        $('#pantallaCarga').hide();
                    }
                },
                error: function (xhr, status, error) {
                    $('#pantallaCarga').hide();
                    console.error(xhr);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al eliminar documento',
                        text: `Error ${xhr.status} - ${xhr.statusText}\n${error}`
                    });
                }
            });
        }
    });
}

$(document).ready(function () {
    $('#tablaEliminados').DataTable({
        language: {
            url: "/qillqa/assets/js/es.json"
        },
        order: [
            [0, "desc"]
        ]
    });
});