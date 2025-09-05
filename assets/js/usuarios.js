

function editarUsuarios(id)
{
    $("#nuevo").hide();
    $("#editar").show();
    let data = {
        id: id,
        tipo : "EDITARUSUARIO"
    };
    traerDatosUsuario(data, "EDITARUSUARIO");

}

function traerDatosUsuario(data, tipo) {
    $.ajax({
        type: "POST",
        url: "/qillqa/src/usuarios/usuariosController.php",

        data: JSON.stringify(data),
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data.success) {                          

                let datosFormulario = data.datos;
                mostrarDatosUsuario(datosFormulario, tipo);
            }
            else {

            }

        },
        error: function (xhr, status, error) {
            console.error(xhr);
        }
    });

}
function mostrarDatosUsuario(datos, tipo) {
    if (tipo === "EDITARUSUARIO") {
        $("#pass").prop("disabled", true);

        $("#id").val(datos.id);
        $("#nombre").val(datos.nombre);
        $("#correo").val(datos.correo);
        $("#rol").val(datos.rol);
        $("#pass").val("");
        $("#estado").val(datos.estado);
      
    } else if (tipo === "VERUSUARIO") {
      
    }

}
function actualizaUsuarios(tipo)
{
    let id = $("#id").val();
    let nombre = $("#nombre").val();
    let correo = $("#correo").val();
    let rol = $("#rol").val();
    let pass = $("#pass").val();
    let estado = $("#estado").val();

   

        let data = {
            id: id,
            nombre: nombre,
            correo: correo,
            rol: rol,
            pass: pass,
            estado: estado,
            tipo: "ACTUALIZARUSUARIO"
        };

        $('#pantallaCarga').css('display', 'flex');
        $.ajax({
            type: "POST",
            url: "/qillqa/src/usuarios/usuariosController.php",
            data: JSON.stringify(data),
            cache: false,
            dataType: 'json',
            success: function (data) {
                $('#pantallaCarga').hide();
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario actualizado',
                        text: 'El usuario se ha actualizado correctamente.',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar usuario',
                        text: data.message || 'No se pudo actualizar el usuario.'
                    });
                }
            },
            error: function (xhr, status, error) {
                $('#pantallaCarga').hide();
                console.error(xhr);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al actualizar usuario',
                    text: `Error ${xhr.status} - ${xhr.statusText}\n${error}`
                });
            }
        });
    }

    function guardarUsuario()
    {
        let nombre = $("#nombre").val();
        let correo = $("#correo").val();
        let rol = $("#rol").val();
        let pass = $("#pass").val();
        let estado = $("#estado").val();

        if (nombre === "" || correo === "" || rol === "" || pass === "") {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, completa todos los campos obligatorios.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
        if(pass.count < 6)
        {
            Swal.fire({
                icon: 'warning',
                title: 'Contraseña débil',
                text: 'La contraseña debe tener al menos 6 caracteres.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        let data = {
            nombre: nombre,
            correo: correo,
            rol: rol,
            pass: pass,
            estado: estado,
            tipo: "GUARDARUSUARIO"
        };

        $('#pantallaCarga').css('display', 'flex');
        $.ajax({
            type: "POST",
            url: "/qillqa/src/usuarios/usuariosController.php",
            data: JSON.stringify(data),
            cache: false,
            dataType: 'json',
            success: function (data) {
                $('#pantallaCarga').hide();
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario guardado',
                        text: 'El usuario se ha guardado correctamente.',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al guardar usuario',
                        text: data.message || 'No se pudo guardar el usuario.'
                    });
                }
            },
            error: function (xhr, status, error) {
                $('#pantallaCarga').hide();
                console.error(xhr);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar usuario',
                    text: `Error ${xhr.status} - ${xhr.statusText}\n${error}`
                });
            }
        });
    }



