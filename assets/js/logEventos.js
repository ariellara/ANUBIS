function buscarEventos() {
    let fechaDesde = $("#fechaDesde").val();
    let fechaFin = $("#fechaHasta").val();
    if (!fechaDesde) {
        mostrarAlerta("Seleccione fecha inicial", "#fechaDesde");
        return;
    }
    if (!fechaFin) {
        mostrarAlerta("Seleccione fecha final", "#fechaHasta");
        return;
    }
    let data =
    {
        fechaDesde: fechaDesde,
        fechaFin: fechaFin,
        tipo: "LISTARLOGGER"
    };
    $('#pantallaCarga').css('display', 'flex');
    traerConsultaLogger(data);
}
function traerConsultaLogger(data) {
    $.ajax({
        type: "POST",
        url: "/qillqa/src/log/LogEventosController.php",
        data: JSON.stringify(data),
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                $('#pantallaCarga').hide();
                const tabla = $('#tbl').DataTable();

                tabla.clear(); 
                $('#tbl tbody').html(data.datos); 
                tabla.rows.add($('#tbl tbody tr')).draw(); 
                
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

function inicializarTabla() {

    $('#tbl').DataTable({
        responsive: true,
        scrollX: true,
        columnDefs: [
            { width: '100px', targets: 0 },
            { width: '180px', targets: 1 },
            { width: '180px', targets: 3 } // Primera columna (Id Evento)
        ],
        language: {
            "url": "//cdn.datatables.net/plug-ins/1.10.11/i18n/Spanish.json"
        },
        "order": [
            [0, "desc"]
        ]

    });
}