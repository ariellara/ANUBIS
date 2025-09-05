
function guardarDependencia(tipo) {
    let codigo = $("#codigo").val().trim();
    let nombre = $("#nombre").val().trim();
    let descripcion = $("#descripcion").val().trim();
    let idDependencia = $("#idDependencia").val().trim();

    if (!codigo) {
        mostrarAlerta("El campo código es obligatorio", "#codigo");
    } else if (codigo.length < 3) {
        mostrarAlerta("El código debe tener al menos 3 caracteres", "#codigo");
    } else if (!nombre) {
        mostrarAlerta("El campo nombre es obligatorio", "#nombre");
    } else if (nombre.length < 3) {
        mostrarAlerta("El nombre debe tener al menos 3 caracteres", "#nombre");
    } else if (!descripcion) {
        mostrarAlerta("El campo descripción es obligatorio", "#descripcion");
    } else if (descripcion.length < 3) {
        mostrarAlerta("La descripción debe tener al menos 3 caracteres", "#descripcion");
    } else {
        let dependencia = {
            codigo: codigo,
            nombre: nombre,
            descripcion: descripcion,
            tipo: tipo,
            idDependencia: idDependencia ? parseInt(idDependencia) : null

        };

        $('#pantallaCarga').css('display', 'flex');
        enviarDatosDependencia(dependencia);
    }
}

function traerDependencia(id)
{
    $('#pantallaCarga').css('display', 'flex');
    let data = {
        id: id,
        tipo: "DEPENDENCIAPORID",
    };
    traerDatosDependencia(data, "DEPENDENCIAPORID");
}
function traerDatosDependencia(data, tipo) {
    $.ajax({
        type: "POST",
        url: "/qillqa/src/Dependencias/DependenciaController.php",
        data: JSON.stringify(data),
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data.success) {
            $('#pantallaCarga').hide();
            $("#listarDependencias").hide();
            $("#editarDependencia").show();
                let datosFormulario = data.datos;
                mostrarDatosDependencia(datosFormulario, tipo);
            }
            else {

            }

        },
        error: function (xhr, status, error) {
            console.error(xhr);
        }
    });

}

function mostrarDatosDependencia(datos, tipo) {

        $("#codigo").val(datos.codigo);
        $("#nombre").val(datos.nombre);
        $("#descripcion").val(datos.descripcion);
        $("#idDependencia").val(datos.id);
    
}

function enviarDatosDependencia(datos) {

    $('#idGuardar').attr('disabled', true);
    $.ajax({
        type: "POST",
        url: "/qillqa/src/Dependencias/DependenciaController.php",
        data: JSON.stringify(datos),
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                $('#pantallaCarga').hide();
                Swal.fire({
                    icon: 'success',
                    title: '',
                    text: data.mensaje,
                    timer: 3000,
                    showConfirmButton: false
                });

                $('#idGuardar').attr('disabled', false);

            }
            else {
                $('#pantallaCarga').hide();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.mensaje || 'Ocurrió un error inesperado.',
                    confirmButtonColor: '#d33'
                });

                $('#btnGuardar').attr('disabled', false);
            }

            setTimeout(function () {
                window.location.href = data.url;
            }, 1000);
            $('#idGuardar').attr('disabled', false);
        },
        error: function (xhr, status, error) {
            console.error(xhr);
            $('#idGuardar').attr('disabled', false);
            $('#pantallaCarga').hide();
        }
    });
}

function cambiarEstado(id, estado) {

        let mensajeEstado = (estado == "ACTIVO") ? "activar" : "desactivar";
        let mensaje = "Esta seguro de " + mensajeEstado + " esta dependencia?";

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
            enviarDatosDependencia(data); 
        } else {
           
        }
    });
}

