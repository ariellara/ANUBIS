function guardarAsistencia(tipo) {
    $("#loaderAsistencia").show();
    $("#idGuardar").hide();
    const valorTarifa = $("#tablaCliente tr:eq(1) td:eq(3)").text().trim();
    let data =
    {
        tipo: tipo,
        idCliente: $("#clienteSelecionadoAsistencia").val().trim(),
        valorTarifa: valorTarifa,
        idPago: $("#idPago").val(),
        cantidadTiquetes: $("#cantidadTiquetes").val()
    };
    enviarDatos(data);

}

function buscarAsistencias() {
    let fecha = $("#fecha").val().trim();
    if (!fecha) {
        $('.alert-danger').text('Ingrese la fecha').fadeIn().delay(3000).fadeOut();
        $('#fecha').focus();
        setTimeout(() => $('.alert-success').fadeOut(), 3000);
        return;
    }
    let data = {
        fecha: fecha,
        tipo: "DATOSASISTENCIAFECHA"
    };
    traerDatos(data, "DATOSASISTENCIAFECHA");


}

function eliminarAsistencia(tipo, id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Desea eliminar la asistencia?.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let data = {
                id: id,
                tipo: tipo
            };
            enviarDatos(data);
        } else if (result.isDismissed) {

            Swal.fire('Cancelado', 'No se realizaron cambios.', 'info');
        }
    });

}
function eliminarPago(tipo, id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Desea eliminar el  pago.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let data = {
                id: id,
                tipo: tipo
            };
            enviarDatos(data);
        } else if (result.isDismissed) {

            Swal.fire('Cancelado', 'No se realizaron cambios.', 'info');
        }
    });

}

function guardarGasto1(tipo) {
    let tipoGasto = $("#tipoGasto").val();

    if (!tipoGasto) {
        $('.alert-danger').text('Ingrese el nombre del gasto').fadeIn().delay(3000).fadeOut();
        $('#tipoGasto').focus();
        setTimeout(() => {
            $('.alert-success').fadeOut();
        }, 3000);
        return false;
    }
    let data =
    {
        tipo: tipo,
        tipoGasto: tipoGasto,
        id: $("#id").val()
    };
    enviarDatos(data);

}

function editarTipoPago(event) {
    event.preventDefault();
    let fila = $(event.target).closest('tr');

    $("#listaTipos").hide();
    $("#ediciontTipos").show();
    $("#id").val(fila.find('td:eq(0)').text().trim());
    $("#tipoGasto").val(fila.find('td:eq(1)').text().trim());
}

function guardarFacturaPago(tipo) {
    let fecha = $("#fecha").val();
    let proveedor = $("#proveedor").val();
    let formaPago = $("#formaPago").val();
    let factura = $("#referencia").val();
    if (!fecha) {
        $('.alert-danger').text('Seleccione la fecha').fadeIn().delay(1000).fadeOut();
        $('#fechaCompra').focus();
        setTimeout(() => {
            $('.alert-success').fadeOut();
        }, 1000);
        return false;
    }
    if (!proveedor) {
        $('.alert-danger').text('Seleccione el proveedor').fadeIn().delay(1000).fadeOut();
        $('#proveedor').focus();
        setTimeout(() => {
            $('.alert-success').fadeOut();
        }, 1000);
        return false;
    }
    if (!formaPago) {
        $('.alert-danger').text('Seleccione la forma de pago').fadeIn().delay(1000).fadeOut();
        $('#formaPago').focus();
        setTimeout(() => {
            $('.alert-success').fadeOut();
        }, 1000);
        return false;
    }
    const productos = obtenerProductosDesdeTabla();
    console.log(productos);
    if (productos.length === 0) {
        $('.alert-danger').text('Agregar al menos un producto').fadeIn().delay(1000).fadeOut();
        setTimeout(() => {
            $('.alert-success').fadeOut();
        }, 1000);
        return false;
    }
    const data = {
        fecha: fecha,
        proveedor: proveedor,
        forma_pago: formaPago,
        numero_factura: factura,
        productos: productos,
        tipo: tipo
    };
    enviarDatosV1(data);
}
function guardarFacturaVenta(tipo) {
    let fecha = $("#fecha").val();
    let clienteSelecionado = $("#clienteSelecionado").val();
    let formaPago = $("#formaPago").val();
    let estado = $("#estado").val();
    let estadoValidar = $("#estadoValidar").val();
    let fechaVencimiento = $("#fechaVen").val();
    if (!fecha) {
        $('.alert-danger').text('Seleccione la fecha').fadeIn().delay(1000).fadeOut();
        $('#fechaCompra').focus();
        setTimeout(() => {
            $('.alert-success').fadeOut();
        }, 1000);
        return false;
    }
    if (!clienteSelecionado) {
        $('.alert-danger').text('Seleccione el cliente').fadeIn().delay(1000).fadeOut();
        $('#clienteSelecionado').focus();
        setTimeout(() => {
            $('.alert-success').fadeOut();
        }, 1000);
        return false;
    }
    if (!formaPago) {
        $('.alert-danger').text('Seleccione la forma de pago').fadeIn().delay(1000).fadeOut();
        $('#formaPago').focus();
        setTimeout(() => {
            $('.alert-success').fadeOut();
        }, 1000);
        return false;
    }
    if (!estado) {
        $('.alert-danger').text('Seleccione el estado').fadeIn().delay(1000).fadeOut();
        $('#estado').focus();
        setTimeout(() => {
            $('.alert-success').fadeOut();
        }, 1000);
        return false;
    }

    const productos = obtenerProductosDesdeTabla();

    if (productos.length === 0) {
        $('.alert-danger').text('Agregar al menos un producto').fadeIn().delay(1000).fadeOut();
        setTimeout(() => {
            $('.alert-success').fadeOut();
        }, 1000);
        return false;
    }
    let saldo = 0;
    let abono = 0;


    if (estadoValidar == 1) {
        if (!fechaVencimiento) {
            $('.alert-danger').text('Seleccione la fecha de vencimiento').fadeIn().delay(1000).fadeOut();
            $('#fechaVen').focus();
            setTimeout(() => {
                $('.alert-success').fadeOut();
            }, 1000);
            return false;
        }
        saldo = $("#saldo").val();
        abono = $("#abono").val();

    }
    if (fechaVencimiento == "") fechaVencimiento = null;
    if (saldo == "") saldo = 0;
    if (abono == "") abono = 0;
    const data = {
        fecha: fecha,
        clienteSelecionado: clienteSelecionado,
        forma_pago: formaPago,
        estado: estado,
        productos: productos,
        tipo: tipo,
        saldo: saldo,
        abono: abono,
        fechaVencimiento: fechaVencimiento
    };
    enviarDatosV1(data);
}



function obtenerProductosDesdeTabla() {
    let productos = [];
    const filas = document.querySelectorAll("#tablaProductos tbody tr");

    filas.forEach(fila => {
        const nombre = fila.cells[1]?.textContent.trim() || '';
        const costo = parseFloat(fila.cells[3]?.textContent) || 0;
        const cantidadInput = fila.querySelector("input.cantidad");
        const cantidad = cantidadInput ? parseInt(cantidadInput.value) || 1 : 1;
        const subtotal = costo * cantidad;
        const producto_id = cantidadInput ? cantidadInput.getAttribute("data-id") : '';
        if (nombre && producto_id) {
            productos.push({
                producto_id: producto_id,
                nombre: nombre,
                costo_unitario: costo,
                cantidad: cantidad,
                subtotal: subtotal
            });
        }
    });

    return productos;
}

function buscarComprasEgreso(tipo) {

    let data = {
        fechaInicio: $('#fe_inicio').val(),
        fechaFin: $('#fe_vencimiento').val(),
        proveedor: $('#proveedor').val(),
        estado: $('#estado').val(),
        tipo: tipo
    };
    traerDatosV1(data, tipo);

}
function buscarComprasInforme(tipo) {
    $("#spinnerCarga").show();
    $("#idExcel").hide();
    let data = {
        fechaInicio: $('#fe_inicio').val(),
        fechaFin: $('#fe_vencimiento').val(),
        proveedor: $('#proveedor').val(),
        estado: $('#estado').val(),
        tipo: tipo
    };
    traerDatosV1(data, "INFOMESEGRESOSCOMPRAS");

}
function buscarGastoInforme(tipo) {
    $("#spinnerCarga").show();
    $("#idExcel").hide();
    let data = {
        id: $("#id").val(),
        fechaInicio: $("#fe_inicio").val(),
        fechaFin: $("#fe_vencimiento").val(),
        tipoGasto: $("#tipoGasto1").val(),
        beneficiario: $("#beneficiario").val(),
        tipo: tipo
    };
    traerDatosV1(data, "INFOMESEGRESOSGASTOS");

}
function buscarEgresosTotales(tipo) {
    const fechaInicio = $('#fe_inicio').val().trim();
    const fechaFin = $('#fe_vencimiento').val().trim();

    if (!fechaInicio) {
        mostrarAlerta('Ingrese fecha inicial', '#fe_inicio');
        return;
    }

    if (!fechaFin) {
        mostrarAlerta('Ingrese fecha final', '#fe_vencimiento');
        return;
    }

    $("#spinnerCarga").show();
    $("#idExcel").hide();

    const data = {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        tipo: tipo
    };
    traerDatosV1(data, "BUSCAREGRESOTOTAL");
}

function buscarPagosinforme(tipo) {
    $("#spinnerCarga").show();
    $("#idExcel").hide();
    let data = {
        fechaInicio: $('#fe_inicio').val(),
        fechaFin: $('#fe_vencimiento').val(),
        tarifa: $('#tarifa').val(),
        estado: $('#estado').val(),
        identificacion: $('#identificacion').val(),
        tipo: tipo
    };
    traerDatosPagos(data, "BUSCARPAGOSINFORME");

}
function traerDatosPagos(data, tipo) {
    $.ajax({
        type: "POST",
        url: "../src/guardarManager.php",
        data: JSON.stringify(data),
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data.success) {

                let datosFormulario = data.datos;
                mostrarDatosV1(datosFormulario, tipo);
            }
            else {

            }

        },
        error: function (xhr, status, error) {
            console.error(xhr);
        }
    });

}


function mostrarAlerta(mensaje, selectorFocus) {
    $('.alert-danger').text(mensaje).fadeIn().delay(3000).fadeOut();
    $(selectorFocus).focus();
    setTimeout(() => {
        $('.alert-success').fadeOut();
    }, 3000);
}

function enviarDatosV1(datos) {

    $('#idGuardar').attr('disabled', true);
    $.ajax({
        type: "POST",
        url: "../src/negocio/negocioManager.php",
        data: JSON.stringify(datos),
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: '',
                    text: data.mensaje,
                    timer: 2000,
                    showConfirmButton: false
                });

                $('#btnGuardar').attr('disabled', false);
                $('.alert-success').text(data.mensaje).fadeIn().delay(3000).fadeOut();

                setTimeout(function () {
                    $('.alert-success').fadeOut();
                }, 3000);

                if (datos.tipo === 'GUARDARGASTO') {
                    window.open('../src/reciboEgreso.php?id=' + data.datos, '_blank');

                }
                if (datos.tipo === 'GUARDARFCTURAVENTA') {
                    window.open('../src/reciboVenta.php?id=' + data.datos, '_blank');

                }

                if (datos.tipo === "ELIMINAREGRESO") {

                    buscarGasto('BUSCARGASTO');
                    $('#idGuardar').attr('disabled', false);
                    return;
                }


            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.mensaje || 'Ocurrió un error inesperado.',
                    confirmButtonColor: '#d33'
                });

                $('#btnGuardar').attr('disabled', false);
                $('.alert-danger').text(data.mensaje).fadeIn().delay(3000).fadeOut();

                setTimeout(function () {
                    $('.alert-danger').fadeOut();
                }, 3000);
            }

            setTimeout(function () {
                window.location.href = data.url;
            }, 1000);
            $('#idGuardar').attr('disabled', false);
        },
        error: function (xhr, status, error) {
            console.error(xhr);
            $('#cargando').hide();
            $('#btnGuardar').attr('disabled', false);
        }
    });
}

function traerDatosV1(data, tipo) {
    $.ajax({
        type: "POST",
        url: "../src/negocio/negocioManager.php",
        data: JSON.stringify(data),
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data.success) {

                let datosFormulario = data.datos;
                mostrarDatosV1(datosFormulario, tipo);
            }
            else {

            }

        },
        error: function (xhr, status, error) {
            console.error(xhr);
        }
    });

}
function mostrarDatosV1(datos, tipo) {

    switch (tipo) {
        case "BUSCARCOMPRASEGRESO":
            datosPagosEgresos(datos);
            break;
        case "EDITARPAGOEGRESO":
            editarPagosEgresos(datos);
            break;
        case "BUSCARGASTO":
            datosGastos(datos);
            break;
        case "DATOSGASTO":
            datosGastosEditar(datos);
            break;
        case "BUSCARVENTAS":
            datosVentas(datos);
            break;
        case "INFOMESEGRESOSCOMPRAS":
            datosInformesEgresosVentas(datos);
            break;
        case "INFOMESEGRESOSGASTOS":
            datosInformesEgresosGastos(datos);
            break;
        case "BUSCAREGRESOTOTAL":
            datosEgresosTotales(datos);
            break;
        case "BUSCARPAGOSINFORME":
            datosPagosInformes(datos);
            break;
        case "DATOSVENTA":
            datosVentaEditar(datos);
            break;
        case "BUSCARASISTENCIASINFORME":
            datosAsistenciasInforme(datos);
            break;
        case "BUSCARINFORMACIONCLIENTE":
            informacionClienteTable(datos);
            break;

    }
}
function informacionClienteTable(datos) {
    console.log(datos);
    $("#spinnerCarga").hide();
    $("#buscar").show();
    $("#verDatosCliente").show();

    $('label[for="nombre"]').text((datos.Nombres ?? '') + ' ' + (datos.Apellidos ?? ''));
    $('label[for="identificacion"]').text("Identificación: " + (datos.Identificacion ?? ''));
    $('label[for="celular"]').text("Teléfono: " + (datos.Telefono ?? ''));
    $('label[for="fVencimiento"]').text("Correo: " + (datos.fecha_vencimiento ?? ''));
    $('label[for="tarifa"]').text("Tarifa: " + (datos.tarifa ?? ''));
    $('label[for="estado"]').text("Estado: " + (datos.estado ?? ''));
    $('label[for="saldo"]').text("Saldo: " + (datos.saldo ?? ''));



}
function datosAsistenciasInforme(datos) {
    console.log(datos);
    $("#spinnerCarga").hide();
    $("#buscar").show();
    if (!datos || datos.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Sin datos',
            text: 'No se encontraron datos para exportar.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }
    const headers = ['Id', 'Identificación', 'Nombre', 'Fecha', 'Hora', 'Tarifa'];
    const datosConvertidos = datos.map(row => {
        return [
            row["id"],
            row["idCliente"],
            row["nombre"] + ' ' + row["apellidos"],
            row["fecha"],
            row["hora"],
            row["tiquetera"]
        ];
    });
    const datosConEncabezados = [headers, ...datosConvertidos];
    const ws = XLSX.utils.aoa_to_sheet(datosConEncabezados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Informe Asistencias');
    XLSX.writeFile(wb, 'InformeAsistencias.xlsx');


}


function datosVentaEditar(datos) {
    $("#listaVentas").hide();
    $("#edicionVenta").show();
    $("#idVenta").val(datos.datosFactura.id);
    $("#fecha1").val(datos.datosFactura.fecha);
    $("#identificacion").val(datos.datosFactura.cliente_id);
    $("#formaPago1").val(datos.datosFactura.forma_pago);
    $("#estado1").val(datos.datosFactura.estado);
    $("#saldo").val(datos.datosFactura.saldo);
    $("#abono").val(datos.datosFactura.abono);
    $("#fechaVen").val(datos.datosFactura.fecha_vencimiento);
    if (datos.datosFactura.estadoVenta == 0) {
        $('#botonAnular').hide();
    }
    {

    }

    let $tbody1 = $('#tablaProductos1 tbody');
    $tbody1.empty();
    let datosTabla = datos.detalles;
    let total = 0;
    datosTabla.forEach((item, index) => {
        total += parseFloat(item["subtotal"] || 0);
        let id = item["id"];
        let row = `
            <tr>  
                <td>${id}</td>
                <td>${item["producto"]}</td> 
                <td>${parseFloat(item["costoUnidad"]).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                <td>${item["cantidad"]}</td> 
                <td>${parseFloat(item["subtotal"]).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
            </tr>
        `;
        $tbody1.append(row);
    });
    $("#totalGeneral").text(total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }));
}

function anularVenta(tipo) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción anulará la venta.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, anular',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let id = $("#idVenta").val();
            let data = {
                id: id,
                tipo: tipo
            };
            enviarDatosV1(data);
        }
    });
}

function datosPagosInformes(datos) {
    $("#spinnerCarga").hide();
    $("#idExcel").show();
    if (!datos || datos.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Sin datos',
            text: 'No se encontraron datos para exportar.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }
    const headers = ['ID', 'Identificacion ', 'Nombre', 'Tarifa', 'Fecha', 'Valor', 'Forma de Pago', 'Fecha incio', 'Fecha Fin', 'Saldo'];
    const tipoPagoMap = {
        1: 'Efectivo',
        2: 'Daviplata',
        3: 'Nequi',
        4: 'Datafono'
    };
    const datosConvertidos = datos.map(row => {
        return [
            row[0],
            row[1],
            row[2],
            row[3],
            row[4],
            row[5] ? row[5] : '0',
            tipoPagoMap[row[7]] || 'Desconocido',
            row[8],
            row[9],
            row[10] ? row[10] : '0'
        ];
    });
    const datosConEncabezados = [headers, ...datosConvertidos];
    const ws = XLSX.utils.aoa_to_sheet(datosConEncabezados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Informe Pagos');
    XLSX.writeFile(wb, 'InformePagos.xlsx');
    x
}

function datosEgresosTotales(datos) {
    console.log(datos);
    $("#spinnerCarga").hide();
    $("#idExcel").show();

    // Verificamos que los datos existan
    if (!datos || !datos.datosExcel) {
        Swal.fire({
            icon: 'warning',
            title: 'Sin datos',
            text: 'No se encontraron datos para exportar.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    // Extraemos los valores
    let data = datos.datosExcel;
    const totalEgresos = parseFloat(data.totalEgresos) || 0;
    const totalGastos = parseFloat(data.totalVentas) || 0;
    const totalGeneral = parseFloat(data.totalGastos) || 0;

    const headers = ['Total Compras realizadas', 'Total ventas realizados', 'Total gastos'];
    const datosConvertidos = [[
        totalEgresos.toFixed(2),
        totalGastos.toFixed(2),
        totalGeneral.toFixed(2)
    ]];

    const datosConEncabezados = [headers, ...datosConvertidos];
    const ws = XLSX.utils.aoa_to_sheet(datosConEncabezados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Informe Totales Egresos');
    XLSX.writeFile(wb, 'InformeTotalesEgresos.xlsx');
}


function datosInformesEgresosGastos(datos) {
    $("#spinnerCarga").hide();
    $("#idExcel").show();

    if (!datos || datos.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Sin datos',
            text: 'No se encontraron datos para exportar.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    const headers = ['ID', 'Nombre Gasto', 'Tipo', 'Fecha', 'Total', 'Forma de Pago'];
    const tipoPagoMap = {
        1: 'Efectivo',
        2: 'Daviplata',
        3: 'Nequi',
        4: 'Datafono'
    };

    const datosConvertidos = datos.map(row => {
        return [
            row.id,
            row.tipo_gasto,
            row.beneficiario,
            row.fecha,
            row.total,
            tipoPagoMap[row.forma_pago] || 'Desconocido'
        ];
    });

    const datosConEncabezados = [headers, ...datosConvertidos];

    const ws = XLSX.utils.aoa_to_sheet(datosConEncabezados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Informe');

    XLSX.writeFile(wb, 'InformeEgresosGastos.xlsx');
}

function datosInformesEgresosVentas(datos) {
    $("#spinnerCarga").hide();
    $("#idExcel").show();

    if (!datos || datos.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Sin datos',
            text: 'No se encontraron datos para exportar.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }


    const headers = ['ID', 'Factura', 'Proveedor', 'Fecha', 'Valor', 'Estado', 'Tipo de Pago'];

    const tipoPagoMap = {
        1: 'Efectivo',
        2: 'Daviplata',
        3: 'Nequi',
        4: 'Datafono'
    };

    const datosConvertidos = datos.map(row => {
        const nuevoRow = [...row];
        const tipoPagoCod = nuevoRow[6];
        nuevoRow[6] = tipoPagoMap[tipoPagoCod] || 'Desconocido';
        return nuevoRow;
    });

    const datosConEncabezados = [headers, ...datosConvertidos];

    const ws = XLSX.utils.aoa_to_sheet(datosConEncabezados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Informe');

    XLSX.writeFile(wb, 'InformeEgresosVentas.xlsx');
}



// function datosVentas(datos) {
//     let $tbody = $('#tbl tbody');
//     $tbody.empty();
//     if (datos.length === 0) {
//         $tbody.append('<tr><td colspan="9" class="text-center">No se encontraron resultados</td></tr>');
//         return;
//     }
//     datos.forEach((item) => {
//         let id = item["0"];
//         let row = `
//             <tr>  
//                 <td>${id}</td>
//                 <td>${item["1"]}</td> 
//                 <td>${item["2"]}</td> 
//                 <td>${item["3"]}</td>
//                 <td>${item["4"]}</td>
//                 <td>${item["5"]}</td>
//                 <td>
//                 <a href="#" onclick="editarGasto(${id}, 'DATOSVENTA')" class="btn btn-info btn-sm">
//                 <i class='fas fa-edit'></i>
//                 </a>
//                 <a href="#" onclick="imprimirGasto(${id})" class="btn btn-secondary btn-sm" title="Imprimir">
//                 <i class="fas fa-print"></i>
//                 </a>
//                 </td>
//             </tr>
//         `;
//         $tbody.append(row);
//     });
// }
function datosVentas(datos) {
    if (!$.fn.DataTable.isDataTable('#tbl')) {
        console.error("La tabla no ha sido inicializada como DataTable.");
        return;
    }

    const tabla = $('#tbl').DataTable();
    tabla.clear();

    if (!Array.isArray(datos) || datos.length === 0) {
        tabla.draw(); // Muestra tabla vacía
        return;
    }

    datos.forEach(item => {
        let id = item["0"];
        tabla.row.add([
            id,
            item["1"],
            item["2"],
            item["3"],
            item["4"],
            item["5"],
            item["6"],
            `
            <a href="#" onclick="editarVenta(${id}, 'DATOSVENTA')" class="btn btn-info btn-sm">
                <i class='fas fa-edit'></i>
            </a>
            <a href="#" onclick="imprimirVenta(${id})" class="btn btn-secondary btn-sm" title="Imprimir">
                <i class="fas fa-print"></i>
            </a>
            `
        ]);
    });

    tabla.draw();
}
function editarVenta(id, tipo) {
    $("#listaVentas").hide();
    $("#edicionVentas").show();
    let data = {
        id: id,
        tipo: tipo
    };
    traerDatosV1(data, tipo);
}

function datosGastosEditar(datos) {
    $("#id").val(datos.id);
    $("#nombre").val(datos.beneficiario);
    $("#fecha").val(datos.fecha);
    $("#tipoGasto").val(datos.tipo_gasto_id);
    $("#total").val(datos.total);
    $("#forma_pago").val(datos.forma_pago);
    $("#comentario").val(datos.comentario);
}
// function datosGastos(datos) {
//     let $tbody = $('#tbl tbody');
//     $tbody.empty();
//     if (datos.length === 0) {
//         $tbody.append('<tr><td colspan="9" class="text-center">No se encontraron resultados</td></tr>');
//         return;
//     }
//     datos.forEach((item) => {
//         let id = item["id"];
//         let row = `
//             <tr>  
//                 <td>${id}</td>
//                 <td>${item["tipo_gasto"]}</td> 
//                 <td>${item["beneficiario"]}</td> 
//                 <td>${item["fecha"]}</td> 
//                 <td>${parseFloat(item["total"]).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
//                 <td>
//                 <a href="#" onclick="editarGasto(${id}, 'DATOSGASTO')" class="btn btn-info btn-sm">
//                 <i class='fas fa-edit'></i>
//                 </a>
//                 <a href="#" onclick="imprimirGasto(${id})" class="btn btn-secondary btn-sm" title="Imprimir">
//                 <i class="fas fa-print"></i>
//                 </a>
//                 <a href="#" onclick="eliminarGasto(${id},'ELIMINAREGRESO')" class="btn btn-danger btn-sm" title="Eliminar">
//                <i class="fas fa-trash-alt"></i>
//                </a>
//                 </td>
//             </tr>
//         `;
//         $tbody.append(row);
//     });

// }
function datosGastos(datos) {
    if (!$.fn.DataTable.isDataTable('#tbl')) {
        console.error("La tabla no ha sido inicializada como DataTable.");
        return;
    }

    const tabla = $('#tbl').DataTable();
    tabla.clear();

    if (!Array.isArray(datos) || datos.length === 0) {
        tabla.draw(); // Muestra la tabla vacía
        return;
    }

    datos.forEach((item) => {
        const id = item["id"];
        tabla.row.add([
            id,
            item["tipo_gasto"],
            item["beneficiario"],
            item["fecha"],
            parseFloat(item["total"]).toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
            `
            <a href="#" onclick="editarGasto(${id}, 'DATOSGASTO')" class="btn btn-info btn-sm">
                <i class='fas fa-edit'></i>
            </a>
            <a href="#" onclick="imprimirGasto(${id})" class="btn btn-secondary btn-sm" title="Imprimir">
                <i class="fas fa-print"></i>
            </a>
            <a href="#" onclick="eliminarGasto(${id},'ELIMINAREGRESO')" class="btn btn-danger btn-sm" title="Eliminar">
                <i class="fas fa-trash-alt"></i>
            </a>
            `
        ]);
    });

    tabla.draw();
}

function editarGasto(id, tipo) {
    $("#listaGasto").hide();
    $("#edicionGasto").show();
    let data = {
        id: id,
        tipo: tipo
    };
    traerDatosV1(data, tipo);
}
function imprimirGasto(id) {
    window.open('../src/reciboEgreso.php?id=' + id, '_blank');
}
function imprimirVenta(id) {
    window.open('../src/reciboVenta.php?id=' + id, '_blank');
}
function eliminarGasto(id, tipo) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción eliminara el egreso.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, anular',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let data = {
                id: id,
                tipo: tipo
            };
            enviarDatosV1(data);
        }
    });


}

function editarPagosEgresos(datos) {
    $("#idPagoEgreso").val(datos.id);
    $("#referencia").val(datos.factura);
    $("#proveedor1").val(datos.proveedor);
    $("#formaPago").val(datos.formaPago);
    if (datos.estado == 0) {
        $('#botonAnular').hide();

    }


    let $tbody1 = $('#tablaProductos1 tbody');
    $tbody1.empty();
    let datosTabla = datos.detalles;
    let total = 0;
    datosTabla.forEach((item, index) => {
        total += parseFloat(item["subtotal"] || 0);
        let id = item["id"];
        let row = `
            <tr>  
                <td>${id}</td>
                <td>${item["producto"]}</td> 
                <td>${parseFloat(item["costoUnidad"]).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                <td>${item["cantidad"]}</td> 
                <td>${parseFloat(item["subtotal"]).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
            </tr>
        `;
        $tbody1.append(row);
    });
    $("#totalGeneral").text(total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }));
}

// function datosPagosEgresos(datos) {
//     let $tbody = $('#tbl tbody');
//     $tbody.empty();

//     if (datos.length === 0) {
//         $tbody.append('<tr><td colspan="9" class="text-center">No se encontraron resultados</td></tr>');
//         return;
//     }

//     datos.forEach((item, index) => {
//         let id = item[0];
//         let row = `
//             <tr>  
//                 <td>${id}</td>
//                 <td>${item[1]}</td> 
//                 <td>${item[2]}</td> 
//                 <td>${item[3]}</td> 
//                 <td>${parseFloat(item[4]).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
//                 <td>
//                     <span class="badge ${item[5] == 'Pagado' ? 'bg-success' : 'bg-warning text-dark'}">
//                         ${item[5]}
//                     </span>
//                 </td>
//                 <td>
//                 <a href="#" onclick="editarPagoEgreso(${id}, 'EDITARPAGOEGRESO')" class="btn btn-info btn-sm">
//                 <i class='fas fa-edit'></i>
//             </a>
//                 </td>
//             </tr>
//         `;
//         $tbody.append(row);
//     });
// }
function datosPagosEgresos(datos) {
    if (!$.fn.DataTable.isDataTable('#tbl')) {
        console.error("La tabla no ha sido inicializada como DataTable.");
        return;
    }

    const tabla = $('#tbl').DataTable();
    tabla.clear();

    if (!Array.isArray(datos) || datos.length === 0) {
        tabla.draw();
        return;
    }

    datos.forEach((item) => {
        const id = item[0];
        tabla.row.add([
            id,
            item[1],
            item[2],
            item[3],
            parseFloat(item[4]).toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
            `<span class="badge ${item[5] == 'Pagado' ? 'bg-success' : 'bg-warning text-dark'}">${item[5]}</span>`,
            `<a href="#" onclick="editarPagoEgreso(${id}, 'EDITARPAGOEGRESO')" class="btn btn-info btn-sm">
                <i class='fas fa-edit'></i>
            </a>`
        ]);
    });

    tabla.draw();
}


function editarPagoEgreso(id, tipo) {
    $("#listaPagoEgreso").hide();
    $("#edicionPagoEgreso").show();
    let data = {
        id: id,
        tipo: tipo
    };
    traerDatosV1(data, tipo);
}

function anularFacturaPago(tipo) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción anulará la factura.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, anular',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let id = $("#idPagoEgreso").val();
            let data = {
                id: $("#idPagoEgreso").val(),
                tipo: tipo
            };
            enviarDatosV1(data);
        }
    });

}
function guardarGasto(tipo) {
    let id = $("#id").val();
    let beneficiario = $("#nombre").val();
    let fecha = $("#fecha").val();
    let tipoGasto = $("#tipoGasto").val();
    let total = $("#total").val();
    let formaPago = $("#forma_pago").val();
    let comentario = $("#comentario").val();
    if (!beneficiario) {
        $('.alert-danger').text('Seleccione el beneficiario').fadeIn().delay(1000).fadeOut();
        $('#nombre').focus();
        setTimeout(() => {
            $('.alert-success').fadeOut();
        }, 1000);
        return false;
    }

    if (!fecha) {
        $('.alert-danger').text('Seleccione la fecha del gasto').fadeIn().delay(1000).fadeOut();
        $('#fecha').focus();
        return false;
    }

    if (!tipoGasto) {
        $('.alert-danger').text('Seleccione un tipo de gasto').fadeIn().delay(1000).fadeOut();
        $('#tipoGasto').focus();
        return false;
    }

    if (!total || parseFloat(total) <= 0) {
        $('.alert-danger').text('Ingrese un total válido mayor que cero').fadeIn().delay(1000).fadeOut();
        $('#total').focus();
        return false;
    }

    if (!formaPago) {
        $('.alert-danger').text('Seleccione una forma de pago').fadeIn().delay(1000).fadeOut();
        $('#forma_pago').focus();
        return false;
    }
    let data = {
        id: $("#id").val(),
        beneficiario: $("#nombre").val(),
        fecha: $("#fecha").val(),
        tipoGasto: $("#tipoGasto").val(),
        total: $("#total").val(),
        formaPago: $("#forma_pago").val(),
        comentario: $("#comentario").val(),
        tipo: tipo
    };
    enviarDatosV1(data);

}
function buscarGasto(tipo) {
    let data = {
        id: $("#id").val(),
        fechaInicio: $("#fe_inicio").val(),
        fechaFin: $("#fe_vencimiento").val(),
        tipoGasto: $("#tipoGasto1").val(),
        beneficiario: $("#beneficiario").val(),
        tipo: tipo
    };
    traerDatosV1(data, tipo);
}

function mostrarOcultar() {
    let tipo = $("#estado").val();
    if (tipo == "1") {
        $("#credito").show();
        $("#estadoValidar").val(1);
    } else {
        $("#credito").hide();
        $("#estadoValidar").val(0);
    }
}

function calcularSaldo() {
    const total = parseFloat(document.getElementById('totalGeneral').textContent.replace(',', '')) || 0;
    const abono = parseFloat(document.getElementById('abono').value) || 0;
    document.getElementById('saldo').value = (total - abono).toFixed(2);
}

function buscarVentas(tipo) {
    let data = {
        fechaInicio: $('#fe_inicio').val(),
        fechaFin: $('#fe_vencimiento').val(),
        cliente: $('#clienteSelecionado').val(),
        estado: $('#estadoFiltro').val(),
        tipo: tipo
    };
    traerDatosV1(data, tipo);
}

function exportarExcel() {
    const tabla = document.querySelector("#tbl"); // tu tabla
    const wb = XLSX.utils.table_to_book(tabla, { sheet: "Ventas" });
    XLSX.writeFile(wb, "ventas.xlsx");
}
function buscarAsistenciasInforme() {

    let fechaInicio = $('#fechaInicio').val();
    let fechaFin = $('#fechaFin').val();
    if (fechaInicio == "" || fechaInicio == null) {
        $('.alert-danger').text('Seleccione la inicial').fadeIn().delay(1000).fadeOut();
        $('#fechaInicio').focus();
        setTimeout(() => {
            $('.alert-success').fadeOut();
        }, 1000);
        return false;

    }
    if (fechaFin == "" || fechaFin == null) {
        $('.alert-danger').text('Seleccione la fecha final').fadeIn().delay(1000).fadeOut();
        $('#fechaFin').focus();
        setTimeout(() => {
            $('.alert-success').fadeOut();
        }, 1000);
        return false;

    }
    $("#spinnerCarga").show();
    $("#buscar").hide();
    let data = {
        fechaInicio: $('#fechaInicio').val(),
        fechaFin: $('#fechaFin').val(),
        empleado: $('#clienteSelecionado').val(),
        tipo: "BUSCARASISTENCIASINFORME"
    };
    traerDatosV1(data, "BUSCARASISTENCIASINFORME");
}

function buscarInformacionCliente() {
    let cliente = $("#clienteSelecionado").val();
    if (cliente == "" || cliente == null) {
        $('.alert-danger').text('Seleccione un cliente').fadeIn().delay(1000).fadeOut();
        $('#cliente').focus();
        setTimeout(() => {
            $('.alert-success').fadeOut();
        }, 1000);
        return false;
    }
    $("#spinnerCarga").show();
    $("#buscar").hide();
    let data = {
        cliente: cliente,
        tipo: "BUSCARINFORMACIONCLIENTE"
    };
    traerDatosV1(data, "BUSCARINFORMACIONCLIENTE");

}