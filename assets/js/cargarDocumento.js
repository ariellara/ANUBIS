
function crearDocumento(tipo) {
    let codigo = $("#codigo").val().trim();
    let nombre = $("#nombre").val().trim();
    let descripcion = $("#descripcion").val().trim();

    let serie = $("#serieSelect").val();
    let idSubSerie = $("#subSerieSelect").val();
    let dependencia = $('#dependencias').val();
    let idDocumento = $("#idDocumentoSelect").val();
    let fechaDocumento = $("#fechaDocumento").val();
    let fechaRegistro = $("#fechaRegistro").val();
    let responsable = $("#responsable").val().trim();
    let estadoAcceso = $("#estadoAcceso").val();
    let nivelAcceso = $("#nivelAcceso").val();

    if (codigo === "") {
        mostrarAlerta("El campo Código es obligatorio", "#codigo");
        return;
    } else if (codigo.length < 3) {
        mostrarAlerta("El código debe tener al menos 3 caracteres", "#codigo");
        return;
    } else if (nombre === "") {
        mostrarAlerta("El campo Nombre es obligatorio", "#nombre");
        return;
    } else if (nombre.length < 3) {
        mostrarAlerta("El nombre debe tener al menos 3 caracteres", "#nombre");
        return;
    } else if (tipo === "") {
        mostrarAlerta("Debe seleccionar un tipo de subserie", "#tipo");
        return;
    } else if (dependencia === "") {
        mostrarAlerta("Debe seleccionar una dependencia", "#dependencias");
        return;
    }

    if (serie === "") {
        mostrarAlerta("Debe seleccionar una serie", "#serieSelect");
        return;
    }
    if (idSubSerie === "") {
        mostrarAlerta("Debe seleccionar una subserie", "#subSerieSelect");
        return;
    }
    if (idDocumento === "") {
        mostrarAlerta("Debe seleccionar un documento", "#idDocumentoSelect");
        return;
    }
    let archivoInput = $("#archivoDocumento")[0];
    let archivo = archivoInput.files[0];

    if (!archivo) {
        mostrarAlerta("Debe adjuntar un archivo PDF", "#archivoDocumento");
        return false;
    }

    if (archivo.type !== "application/pdf") {
        mostrarAlerta("El archivo debe ser un PDF", "#archivoDocumento");
        return false;
    }

    let documento = {
        codigo: codigo,
        nombre: nombre,
        tipo: tipo,
        serie: serie ? parseInt(serie) : null,
        dependencia: dependencia ? parseInt(dependencia) : null,
        descripcion: descripcion,
        subSerie: idSubSerie ? parseInt(idSubSerie) : null,
        idDocumento: idDocumento ? parseInt(idDocumento) : null,
        fechaDocumento: fechaDocumento,
        fechaRegistro: fechaRegistro,
        responsable: responsable,
        estadoAcceso: estadoAcceso,
        nivelAcceso: nivelAcceso
    };
    let formData = new FormData();
    formData.append("documento", JSON.stringify(documento));
    formData.append("archivo", archivo);
    for (const [clave, valor] of Object.entries(documento)) {
        formData.append(clave, valor);
    }
    $('#pantallaCarga').css('display', 'flex');
    enviarFormularioConArchivo(formData, '/qillqa/src/CargarDocumentos/CargarDocumentosController.php');
}
function eliminarDocumento(id) {
    Swal.fire({
        title: '¿Eliminar documento?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        customClass: {
            popup: 'mi-alerta-personalizada',
            confirmButton: 'btn btn-danger mx-2',
            cancelButton: 'btn btn-secondary'
        },
        buttonsStyling: false
    }).then((result) => {
        if (result.isConfirmed) {
            $('#pantallaCarga').css('display', 'flex');
            let data = {
                id: id,
                tipo: "ELIMINARDOCUMENTO"
            };
            enviarDatosController(data, "/qillqa/src/CargarDocumentos/NegocioDocumentosController.php");
        }
    });
}

function buscarDoucumentosCargados() {
    let codigo = $("#codigo").val().trim();
    let nombre = $("#nombre").val().trim();
    let serie = $("#serie").val();
    let idSubSerie = $("#subSerie").val();
    let dependencia = $('#dependencia').val();
    let idDocumento = $("#uDocumento").val();
    let fechaDesde = $("#fechaDesde").val();
    let fechaFin = $("#fechaHasta").val();
    let estado = $("#estado").val();
    let data = {
        codigo: codigo,
        nombre: nombre,
        serie: serie ? parseInt(serie) : null,
        idSubSerie: idSubSerie ? parseInt(idSubSerie) : null,
        dependencia: dependencia ? parseInt(dependencia) : null,
        idDocumento: idDocumento ? parseInt(idDocumento) : null,
        fechaDesde: fechaDesde,
        fechaFin: fechaFin,
        estado: estado,
        tipo: "CONSULTARDOCUMENTOSCARGADOS"
    };
    $('#pantallaCarga').css('display', 'flex');
    traerConsultaDocumentos(data);

}

function traerConsultaDocumentos(data) {

    $.ajax({
        type: "POST",
        url: "/qillqa/src/CargarDocumentos/NegocioDocumentosController.php",
        data: JSON.stringify(data),
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                let datosFormulario = data.datos;
                mostrarDatosDocumentos(datosFormulario);
            }
            else {
                $('#pantallaCarga').hide();
            }

        },
        error: function (xhr, status, error) {
            console.error(xhr);
            $('#pantallaCarga').hide();
        }
    });
}
function mostrarDatosDocumentos(htmlFilas) {
    $('#pantallaCarga').hide();
    const tabla = $('#tbl').DataTable();
    tabla.clear(); 
    $('#tbl tbody').html(htmlFilas); 
    tabla.rows.add($('#tbl tbody tr')).draw(); 
}



$(document).on('click', '.btnVerPDF', function () {
    const ruta = $(this).data('ruta');
    $('#iframePDF').attr('src', ruta);
    $('#modalPDF').modal('show');
});

function editarDocumento(id) {
    $('#pantallaCarga').css('display', 'flex');
    let data = { id: id, tipo: "EDITARDOCUMENTOCARGADO" };
    $.ajax({
        type: "POST",
        url: "/qillqa/src/CargarDocumentos/NegocioDocumentosController.php",
        data: JSON.stringify(data),
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                let datosFormulario = data.datos;
                pintarDatosEditar(datosFormulario);
            }
            else {
                $('#pantallaCarga').hide();
            }

        },
        error: function (xhr, status, error) {
            console.error(xhr);
            $('#pantallaCarga').hide();
        }
    });


}
function pintarDatosEditar(datosFormulario) {
    console.log(datosFormulario);
    $('#pantallaCarga').hide();
    $('#idDocumento').val(datosFormulario.id);
    $('#modalEditarDocumento').modal('show');
    $('#editarDocumentoId').val(datosFormulario.id);
    $('#editarNombre').val(datosFormulario.nombre);
    $('#editarFechaDocumento').val(datosFormulario.fechaDocumento);
    $('#editarResponsable').val(datosFormulario.responsable);
    $('#editarDescripcion').val(datosFormulario.descripcion);
    $('#infoDependencia').text(datosFormulario.dependencia);
    $('#infoSerie').text(datosFormulario.serie);
    $('#infoSubserie').text(datosFormulario.subserie);
    $('#infoUnidadDocumental').text(datosFormulario.unidad_documental);
    $('#editarEstado').val(datosFormulario.estado);
    $('#editarAcceso').val(datosFormulario.nivel_acceso);
    $('#editarArchivoPDF').val('');
}
function editarDocumentoCargado() {
    let idDocumento = $("#idDocumento").val();
    let nombre = $("#editarNombre").val();
    let fechaDocumento = $("#editarFechaDocumento").val();
    let responsable = $("#editarResponsable").val();
    let estado = $("#editarEstado").val();
    let acceso = $("#editarAcceso").val();
    let descripcion = $("#editarDescripcion").val();
    let archivoPDF = $("#editarArchivoPDF")[0].files[0];

    let documento = {
        idDocumento: idDocumento,
        nombre: nombre.trim(),
        fechaDocumento: fechaDocumento,
        responsable: responsable.trim(),
        estadoAcceso: estado,
        nivelAcceso: acceso,
        descripcion: descripcion.trim(),
        tipo: "GUARDARDOCUMENTOEDITADO"
    };
    let formData = new FormData();
    formData.append("documento", JSON.stringify(documento));
    formData.append("archivo", archivoPDF);
    for (const [clave, valor] of Object.entries(documento)) {
        formData.append(clave, valor);
    }
    $('#pantallaCarga').css('display', 'flex');
    enviarFormularioConArchivoEditar(formData, '/qillqa/src/CargarDocumentos/CargarDocumentosController.php');


}
function enviarFormularioConArchivoEditar(formData, ruta) {
    $('#idGuardar').attr('disabled', true);
    $.ajax({
        type: "POST",
        url: ruta,
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (data) {
            $('#pantallaCarga').hide();
            $('#modalEditarDocumento').modal('hide');

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: '',
                    text: data.mensaje,
                    timer: 3000,
                    showConfirmButton: false
                });
                setTimeout(() => window.location.href = data.url, 1000);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.mensaje || 'Ocurrió un error inesperado.',
                    confirmButtonColor: '#d33'
                });
            }

            $('#idGuardar').attr('disabled', false);
        },
        error: function (xhr, status, error) {
            console.error(xhr);
            $('#pantallaCarga').hide();
            $('#idGuardar').attr('disabled', false);
        }
    });
}
function verAnexos(idDocumentoPrincipal) {
    const data = {
        tipo: "consultarAnexosPorDocumento",
        idDocumento: idDocumentoPrincipal
    };
    $('#pantallaCarga').css('display', 'flex');
    $.ajax({
        type: "POST",
        url: "/qillqa/src/CargarDocumentos/NegocioDocumentosController.php",
        data: JSON.stringify(data),
        cache: false,
        contentType: "application/json",
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                $('#pantallaCarga').hide();
                mostrarDatosDocumentosAnexos(response.datos);
                $('#modalVerAnexos').modal('show');
            } else {
                $('#pantallaCarga').hide();
                Swal.fire({
                    icon: 'warning',
                    title: 'Sin anexos disponibles',
                    text: 'Este documento no tiene anexos cargados.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Entendido'
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar anexos:", error);
            $('#pantallaCarga').hide();
        }
    });
}


function mostrarDatosDocumentosAnexos(anexos) {
    let tbody = $('#tablaAnexosBody');
    tbody.empty();

    if (anexos.length === 0) {
        tbody.append('<tr><td colspan="3" class="text-center">No hay anexos disponibles.</td></tr>');
        return;
    }

    anexos.forEach(function (anexo, index) {
        console.log(anexo.ruta_archivo);
        let fila = `
                <tr>
                    <td>${anexo.id}</td>
                    <td>Anexo ${index + 1}</td>
                    <td>${anexo.fecha_cargado}</td>
                    <td>${anexo.usuario_carga}</td>
                    <td>
                    <button class="btn btn-sm btn-outline-danger btnVerPDFAnexo" 
                    data-ruta="/qillqa/${anexo.ruta_archivo}">
                    <i class="fas fa-file-pdf"></i>
                    </button>
                    </td>
                </tr>`;
        tbody.append(fila);
    });
}

function exportarExcel()
{
    let codigo = $("#codigo").val().trim();
    let nombre = $("#nombre").val().trim();
    let serie = $("#serie").val();
    let idSubSerie = $("#subSerie").val();
    let dependencia = $('#dependencia').val();
    let idDocumento = $("#uDocumento").val();
    let fechaDesde = $("#fechaDesde").val();
    let fechaFin = $("#fechaHasta").val();
    let estado = $("#estado").val();
    let data = {
        codigo: codigo,
        nombre: nombre,
        serie: serie ? parseInt(serie) : null,
        idSubSerie: idSubSerie ? parseInt(idSubSerie) : null,
        dependencia: dependencia ? parseInt(dependencia) : null,
        idDocumento: idDocumento ? parseInt(idDocumento) : null,
        fechaDesde: fechaDesde,
        fechaFin: fechaFin,
        estado: estado,
        tipo: "DESCARGAREXCEL"
    };
    $('#pantallaCarga').css('display', 'flex');
    $.ajax({
        type: "POST",
        url: "/qillqa/src/CargarDocumentos/NegocioDocumentosController.php",
        data: JSON.stringify(data),
        cache: false,
        dataType: 'json',
        success: function (data) {
            $('#pantallaCarga').hide();
            if (data.success) {
                console.log(data.datos);
                const enlace = document.createElement('a');
                enlace.href = data.datos.url;
                enlace.download = 'documentos_cargados.xlsx';
                document.body.appendChild(enlace);
                enlace.click();
                document.body.removeChild(enlace);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.datos.mensaje || 'Ocurrió un error inesperado.',
                    confirmButtonColor: '#d33'
                });
            }
        },
        error: function (xhr, status, error) {
            console.error(xhr);
            console.error(xhr);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al restaurar documento',
                        text: `Error ${xhr.status} - ${xhr.statusText}\n${error}`
                    });
        }
    });
}

$(document).on('click', '.btnVerPDFAnexo', function() {
    const rutaPdf = $(this).data('ruta'); 
    $('#iframePDFAnexo').attr('src', rutaPdf); 
    $('#modalPDFAnexo').modal('show'); 
});
