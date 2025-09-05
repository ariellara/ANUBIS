
function crearSerie(tipo) {
    let codigo = $("#codigo").val().trim();
    let nombre = $("#nombre").val().trim();
    let descripcion = $("#descripcion").val().trim();
    let idSerie = $("#idSerie").val().trim();
    let dependencia = $("#dependencias").val();
    if (!codigo) {
        mostrarAlerta("El campo código es obligatorio", "#codigo");
    }
    else if (codigo.length < 3) {
        mostrarAlerta("El código debe tener al menos 3 caracteres", "#codigo");
    }
    else if (!nombre) {
        mostrarAlerta("El campo nombre es obligatorio", "#nombre");
    } else if (nombre.length < 3) {
        mostrarAlerta("El nombre debe tener al menos 3 caracteres", "#nombre");
    } else if (dependencia == "" || dependencia == null) {
        mostrarAlerta("El campo dependencia es obligatorio", "#descripcion");
    } else if (descripcion.length < 3) {
        mostrarAlerta("La descripción debe tener al menos 3 caracteres", "#descripcion");
    } else if (!descripcion) {
        mostrarAlerta("El campo decripción es obligatorio", "#dependencia");
    } else {
        let serie = {
            codigo: codigo,
            nombre: nombre,
            descripcion: descripcion,
            tipo: tipo,
            idSerie: idSerie ? parseInt(idSerie) : null,
            dependencia: dependencia ? parseInt(dependencia) : null
        };

        $('#pantallaCarga').css('display', 'flex');
        enviarDatosController(serie, "/qillqa/src/Series/SeriesController.php");
    }


}

async function traerSerie(id) {
    $('#pantallaCarga').css('display', 'flex');

    const data = {
        id: id,
        tipo: "SERIEPORID",
    };

    try {
        const datos = await traerDatosController(data, "/qillqa/src/Series/SeriesController.php");

        $('#pantallaCarga').hide();

        if (datos && Object.keys(datos).length > 0) {
            mostrarDatosSerie(datos);
        } else {
            mostrarAlerta("No se encontraron datos para la serie seleccionada", "#codigo");
        }

    } catch (error) {
        $('#pantallaCarga').hide();
        console.error("Error al traer la serie:", error);
        mostrarAlerta("Ocurrió un error al consultar la serie.", "#codigo");
    }
}

function mostrarDatosSerie(datos) {
    $("#codigo").val(datos.codigo);
    $("#idSerie").val(datos.id);
    $("#nombre").val(datos.nombre);
    $("#descripcion").val(datos.descripcion);
    $("#idSerie").val(datos.id);
    $("#dependencias").val(datos.id_dependencia);

    $("#editarSerie").show();
    $("#listarSeries").hide();


}
function cambiarEstado(id, estado) {

    let mensajeEstado = (estado == "1") ? "activar" : "desactivar";
    let mensaje = "Esta seguro de " + mensajeEstado + " esta serie?";

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
            enviarDatosController(data,"/qillqa/src/Series/SeriesController.php");
        } else {

        }
    });
}