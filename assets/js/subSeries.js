
async function traerSeries() {
    let select = $("#serieSelect");
    select.empty();
    let dependencia = $('#dependencias').val();
    if (dependencia === "") return;
    const data = {
        id: dependencia,
        tipo: "SERIESPORDEPENDENCIA",
    };

    try {
        $('#spinnerSerie').show();
        const datos = await traerDatosController(data, "/qillqa/src/Series/SeriesController.php");

        if (datos && Object.keys(datos).length > 0) {
            llenarSelectSerie(datos);
        } else {
            mostrarAlerta("No se encontraron datos para la serie seleccionada", "#codigo");
            $('#spinnerSerie').hide();
        }

    } catch (error) {
        $('#pantallaCarga').hide();
        console.error("Error al traer la serie:", error);
        mostrarAlerta("Ocurrió un error al consultar la serie.", "#codigo");
    }

}
function llenarSelectSerie(datos) {
    $('#spinnerSerie').hide();
    let select = $("#serieSelect");
    select.empty();
    select.append('<option value="">Seleccione una serie</option>');

    datos.forEach(serie => {
        select.append(`<option value="${serie.id}">${serie.nombre}</option>`);
    });
}

function crearSubSerie(tipo) {
    
    let codigo = $("#codigo").val().trim();
    let nombre = $("#nombre").val().trim();
    let descripcion = $("#descripcion").val().trim();

    let serie = $("#serieSelect").val();
    let dependencia = $('#dependencias').val();
    let idSubSerie = $("#idSubSerie").val();

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
    let subSerie = {
        codigo: codigo,
        nombre: nombre,
        tipo: tipo,
        serie: serie ? parseInt(serie) : null,
        dependencia: dependencia ? parseInt(dependencia) : null,
        descripcion: descripcion,
        idSubSerie: idSubSerie ? parseInt(idSubSerie) : null
    };
    $('#pantallaCarga').css('display', 'flex');
    $("#idGuardar").prop("disabled", true);
    enviarDatosController(subSerie, "/qillqa/src/SubSeries/SubSeriesController.php");
    $("#idGuardar").prop("disabled", false);

}

async function traerSubSerie(id)
{
    $('#pantallaCarga').css('display', 'flex');

    const data = {
        id: id,
        tipo: "SUBSERIEPORID",
    };

    try {
        const datos = await traerDatosController(data, "/qillqa/src/SubSeries/SubSeriesController.php");
        $('#pantallaCarga').hide();
        if (datos && Object.keys(datos).length > 0) {
            mostrarDatosSubSerie(datos);
        } else {
            mostrarAlerta("No se encontraron datos para la subserie seleccionada", "#codigo");
        }

    } catch (error) {
        $('#pantallaCarga').hide();
        console.error("Error al traer la subserie:", error);
        mostrarAlerta("Ocurrió un error al consultar la subserie.", "#codigo");
    }
}
function mostrarDatosSubSerie(datos) {
    $("#editarSubSerie").show();
    $("#listarSubSeries").hide();
    $("#codigo").val(datos.codigo);
    $("#idSubSerie").val(datos.id);
    $("#nombre").val(datos.nombre);
    $("#descripcion").val(datos.descripcion);
    $("#serieSelect").val(datos.id_serie);
    $("#dependencias").val(datos.id_dependencia);
    $("#estado").val(datos.estado);
}
function cambiarEstado(id, estado) {

    let mensajeEstado = (estado == "1") ? "activar" : "desactivar";
    let mensaje = "Esta seguro de " + mensajeEstado + " esta Subserie?";

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
            enviarDatosController(data,"/qillqa/src/SubSeries/SubSeriesController.php");
        } else {

        }
    });
}