function mostrarAlerta(mensaje, selectorFocus) {
    $('.alert-warning').text(mensaje).fadeIn().delay(1000).fadeOut();
    $(selectorFocus).focus();

}
function enviarDatosController(datos, ruta) {

    $('#idGuardar').attr('disabled', true);
    $.ajax({
        type: "POST",
        url: ruta,
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
async function traerDatosController(datos, url) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });

        const data = await response.json();
        $('#pantallaCarga').hide();

        if (data.success) {
            return data.datos;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}
function enviarFormularioConArchivo(formData, ruta) {
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

function inicializarTabla()
{
    $('#tbl').DataTable({
        language: {
            "url": "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
        },
        "order": [
            [0, "desc"]
        ]
    });
}



