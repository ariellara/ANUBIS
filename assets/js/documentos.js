
async function traerSubseries ()
{
    let select = $("#subSerieSelect");
    select.empty();
    let serie = $('#serieSelect').val();
    if (serie === "") return;
    const data = {
        id: serie,
        tipo: "SUBSERIESPORSERIES",
    };

    try {
        $("#spinnersubSeries").show();
        const datos = await traerDatosController(data, "/qillqa/src/SubSeries/SubSeriesController.php");

        if (datos && Object.keys(datos).length > 0) {
            llenarSelectSubSerie(datos);
        } else {
            mostrarAlerta("No se encontraron datos para la subserie seleccionada", "#codigo");
            $("#spinnersubSeries").hide();
        }

    } catch (error) {
        $('#pantallaCarga').hide();
        console.error("Error al traer la serie:", error);
        mostrarAlerta("Ocurrió un error al consultar la subserie.", "#codigo");
    }
    
}
function llenarSelectSubSerie(datos) {
    $("#spinnersubSeries").hide();
    let select = $("#subSerieSelect");
    select.empty();
    select.append('<option value="">Seleccione una SubSerie</option>');

    datos.forEach(subserie => {
        select.append(`<option value="${subserie.id}">${subserie.nombre}</option>`);
    });
}
function crearUnidadDocumento(tipo)
{
    
    let codigo = $("#codigo").val().trim();
    let nombre = $("#nombre").val().trim();
    let descripcion = $("#descripcion").val().trim();

    let serie = $("#serieSelect").val();
    let idSubSerie = $("#subSerieSelect").val();
    let dependencia = $('#dependencias').val();
    let idDocumento = $("#idDocumento").val();

    if (codigo === "") {
        mostrarAlerta("El campo Código es obligatorio", "#codigo");
        return;
    }
    else if (codigo.length < 3) {
        mostrarAlerta("El código debe tener al menos 3 caracteres", "#codigo");
        return;
    }
    else if (nombre === "") {
        mostrarAlerta("El campo Nombre es obligatorio", "#nombre");
        return;
    }
    else if (nombre.length < 3) {
        mostrarAlerta("El nombre debe tener al menos 3 caracteres", "#nombre");
        return;
    }
    else if (tipo === "") {
        mostrarAlerta("Debe seleccionar un tipo de subserie", "#tipo");
        return;
    }
    else if (dependencia === "") {
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

    let documento = {
        codigo: codigo,
        nombre: nombre,
        tipo: tipo,
        serie: serie ? parseInt(serie) : null,
        dependencia: dependencia ? parseInt(dependencia) : null,
        descripcion: descripcion,
       subSerie : idSubSerie ? parseInt(idSubSerie) : null,
        idDocumento: idDocumento ? parseInt(idDocumento) : null

    };
    $('#pantallaCarga').css('display', 'flex');
    $("#idGuardar").prop("disabled", true);
    enviarDatosController(documento, "/qillqa/src/Documentos/DocumentosController.php");
    $("#idGuardar").prop("disabled", false);

}
async function traerDocumento(id)
{
    $('#pantallaCarga').css('display', 'flex');

    const data = {
        id: id,
        tipo: "TRAERDOCUMENTOID",
    };

    try {
        const datos = await traerDatosController(data, "/qillqa/src/Documentos/DocumentosController.php");
        $('#pantallaCarga').hide();
        if (datos && Object.keys(datos).length > 0) {
            mostrarDatosDocumento(datos);
        } else {
            mostrarAlerta("No se encontraron datos para el documento seleccionada", "#codigo");
        }

    } catch (error) {
        $('#pantallaCarga').hide();
        console.error("Error al traer la subserie:", error);
        mostrarAlerta("Ocurrió un error al consultar el documento.", "#codigo");
    }   

}
function mostrarDatosDocumento(datos) {
    console.log(datos);
    $("#editarDocumento").show();
    $("#listarDocumentos").hide();
    $("#codigo").val(datos.codigo);
    $("#idDocumento").val(datos.id);
    $("#nombre").val(datos.nombre);
    $("#descripcion").val(datos.descripcion);
    $("#serieSelect").val(datos.id_serie);
    $("#subSerieSelect").val(datos.id_sub_serie);
    $("#dependencias").val(datos.id_dependencia);
    $("#estado").val(datos.estado);

}
function cambiarEstadoDocumento(id,estado)
{
    let mensajeEstado = (estado == "1") ? "activar" : "desactivar";
    let mensaje = "Esta seguro de " + mensajeEstado + " este documento?";

    Swal.fire({
        title: '',
        text: mensaje,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, ' + mensajeEstado,
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            $('#pantallaCarga').css('display', 'flex');
            let data = {
                id: id,
                estado: estado,
                tipo: "CAMBIOESTADO"
            };
            enviarDatosController(data,"/qillqa/src/Documentos/DocumentosController.php");
        } else {

        }
    });
}
async function traerDocumentosSelect()
{
    let select = $("#idDocumentoSelect");
    select.empty();
    let subserie = $('#subSerieSelect').val();
    if (subserie === "") return;
    const data = {
        id: subserie,
        tipo: "DOCUMENTOSPORSUBSERIE",
    };

    try {
        $("#spinnerUnidad").show();
        const datos = await traerDatosController(data, "/qillqa/src/Documentos/DocumentosController.php");

        if (datos && Object.keys(datos).length > 0) {
            llenarSelectDocumentos(datos);
        } else {
            mostrarAlerta("No se encontraron datos para la sub serie seleccionada", "#codigo");
            $("#spinnerUnidad").hide();
        }

    } catch (error) {
        $('#pantallaCarga').hide();
        console.error("Error al traer la serie:", error);
        mostrarAlerta("Ocurrió un error al consultar la serie.", "#codigo");
    }

}
function llenarSelectDocumentos(datos) {
    $("#spinnerUnidad").hide();
    let select = $("#idDocumentoSelect");
    select.empty();
    select.append('<option value="">Seleccione un Documento</option>');

    datos.forEach(documento => {
        select.append(`<option value="${documento.id}">${documento.nombre}</option>`);
    });
}