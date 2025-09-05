
// document.addEventListener('DOMContentLoaded', () => {
//     const input = document.getElementById('cliente');
//     const lista = document.getElementById('sugerencias');
//     const inputOculto = document.getElementById('clienteSelecionado');
//     let timeout = null;

//     input.addEventListener('input', () => {
//         clearTimeout(timeout);

//         timeout = setTimeout(() => {
//             const query = input.value.trim();

//             if (query.length < 2) {
//                 lista.innerHTML = '';
//                 return;
//             }

//             fetch('../src/buscar_clientes.php?query=' + encodeURIComponent(query))
//                 .then(response => response.json())
//                 .then(data => {
//                     lista.innerHTML = '';
//                     data.forEach(cliente => {
//                         const li = document.createElement('li');
//                         li.textContent = `${cliente.nombre} - ${cliente.identificacion}`;
//                         li.addEventListener('click', () => {
//                             input.value = li.textContent;
//                             inputOculto.value = cliente.identificacion;
//                             inputOculto.dispatchEvent(new Event('change'));
//                             lista.innerHTML = '';
//                         });
//                         lista.appendChild(li);
//                     });
//                 })
//                 .catch(err => {
//                     console.error('Error al consultar clientes:', err);
//                 });
//         }, 300);
//     });
// });
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('cliente');
    const lista = document.getElementById('sugerencias');
    const inputOculto = document.getElementById('clienteSelecionado');
    let timeout = null;
    let indiceSeleccionado = -1;

    input.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const query = input.value.trim();
            lista.innerHTML = '';
            indiceSeleccionado = -1;

            if (query.length < 2) {
                return;
            }

            fetch('../src/buscar_clientes.php?query=' + encodeURIComponent(query))
                .then(response => response.json())
                .then(data => {
                    lista.innerHTML = '';
                    data.forEach(cliente => {
                        const li = document.createElement('li');
                        li.textContent = `${cliente.nombre} - ${cliente.identificacion}`;
                        li.addEventListener('click', () => {
                            input.value = li.textContent;
                            inputOculto.value = cliente.identificacion;
                            inputOculto.dispatchEvent(new Event('change'));
                            lista.innerHTML = '';
                            indiceSeleccionado = -1;
                        });
                        lista.appendChild(li);
                    });
                })
                .catch(err => {
                    console.error('Error al consultar clientes:', err);
                });
        }, 300);
    });

    input.addEventListener('keydown', (e) => {
        const items = lista.querySelectorAll('li');
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (indiceSeleccionado < items.length - 1) {
                indiceSeleccionado++;
                actualizarSeleccion(items);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (indiceSeleccionado > 0) {
                indiceSeleccionado--;
                actualizarSeleccion(items);
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (indiceSeleccionado >= 0 && indiceSeleccionado < items.length) {
                items[indiceSeleccionado].click();
            }
        }
    });

    function actualizarSeleccion(items) {
        items.forEach((item, index) => {
            if (index === indiceSeleccionado) {
                item.classList.add('seleccionado');
                item.scrollIntoView({ block: 'nearest' }); // Opcional
            } else {
                item.classList.remove('seleccionado');
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (!lista.contains(e.target) && e.target !== input) {
            lista.innerHTML = '';
            indiceSeleccionado = -1;
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('clienteSelecionado').addEventListener('change', function () {
        const identificacion = this.value;
        if (!identificacion) return;

        fetch(`../src/traerClientePagos.php?identificacion=${identificacion}`)
            .then(response => response.json())
            .then(data => {
                if (!data.estado) {
                    $("#divPagos").hide();
                    $('.alert-danger').text(data.mensaje).fadeIn().delay(3000).fadeOut();
                } else {
                    $("#divPagos").show();
                   
                    llenarTabla(data);
                }
            })
            .catch(err => {
                console.error('Error al traer pagos:', err);
            });
    });
});


function calcularDescuento() {
    const valor = parseFloat(document.getElementById('valor').value) || 0;
    const descuento = parseFloat(document.getElementById('descuento').value) || 0;
    const tipo = document.getElementById('tipo_des').value;
    let total = valor;

    if (tipo === "1") {
        total = valor - (valor * (descuento / 100));
    } else if (tipo === "2") {
        total = valor - descuento;
    }
    $("#t_pagar").val(total.toFixed(2));
    //$("#abono").val(total.toFixed(2));
}

function llenarTabla(cliente) {
    const tabla = document.getElementById("tbl");
    tabla.innerHTML = `
        <tr>
            <td>Código</td>
            <td>Nombres</td>
            <td>Apellidos</td>
            <td>Tarifa</td>
            <td>V último pago</td>
            <td>Fecha inicio</td>
            <td>Fecha Vencimiento</td>
        </tr>
    `;
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${cliente.codigo}</td>
        <td>${cliente.nombres}</td>
        <td>${cliente.apellidos}</td>
        <td>${cliente.tarifa}</td>
        <td>${cliente.ultimo_pago}</td>
        <td>${cliente.fecha_inicio}</td>
        <td>${cliente.fecha_vencimiento}</td>
    `;
    tabla.appendChild(fila);
}

function valoresNuevos() {
    let valor = $("#valor").val();
    $("#t_pagar").val(valor);
    //$("#abono").val(valor);

}

//para asistencias
// document.addEventListener('DOMContentLoaded', () => {
//     const input = document.getElementById('clienteAsistencia');
//     const lista = document.getElementById('sugerenciasAsistencia');
//     const inputOculto = document.getElementById('clienteSelecionadoAsistencia');
//     let timeout = null;

//     input.addEventListener('input', () => {
//         clearTimeout(timeout);

//         timeout = setTimeout(() => {
//             const query = input.value.trim();

//             if (query.length < 2) {
//                 lista.innerHTML = '';
//                 return;
//             }

//             fetch('../src/buscar_clientes.php?query=' + encodeURIComponent(query))
//                 .then(response => response.json())
//                 .then(data => {
//                     lista.innerHTML = '';
//                     data.forEach(cliente => {
//                         const li = document.createElement('li');
//                         li.textContent = `${cliente.nombre} - ${cliente.identificacion}`;
//                         li.addEventListener('click', () => {
//                             input.value = li.textContent;
//                             inputOculto.value = cliente.identificacion;
//                             inputOculto.dispatchEvent(new Event('change'));
//                             lista.innerHTML = '';
//                         });
//                         lista.appendChild(li);
//                     });
//                 })
//                 .catch(err => {
//                     console.error('Error al consultar clientes:', err);
//                 });
//         }, 300);
//     });
// });
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('clienteAsistencia');
    const lista = document.getElementById('sugerenciasAsistencia');
    const inputOculto = document.getElementById('clienteSelecionadoAsistencia');
    let timeout = null;
    let indiceSeleccionado = -1;

    input.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const query = input.value.trim();
            lista.innerHTML = '';
            indiceSeleccionado = -1;

            if (query.length < 2) return;

            fetch('../src/buscar_clientes.php?query=' + encodeURIComponent(query))
                .then(response => response.json())
                .then(data => {
                    lista.innerHTML = '';
                    data.forEach(cliente => {
                        const li = document.createElement('li');
                        li.textContent = `${cliente.nombre} - ${cliente.identificacion}`;
                        li.addEventListener('click', () => {
                            input.value = li.textContent;
                            inputOculto.value = cliente.identificacion;
                            inputOculto.dispatchEvent(new Event('change'));
                            lista.innerHTML = '';
                            indiceSeleccionado = -1;
                        });
                        lista.appendChild(li);
                    });
                })
                .catch(err => {
                    console.error('Error al consultar clientes:', err);
                });
        }, 300);
    });

    input.addEventListener('keydown', (e) => {
        const items = lista.querySelectorAll('li');
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (indiceSeleccionado < items.length - 1) {
                indiceSeleccionado++;
                actualizarSeleccion(items);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (indiceSeleccionado > 0) {
                indiceSeleccionado--;
                actualizarSeleccion(items);
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (indiceSeleccionado >= 0 && indiceSeleccionado < items.length) {
                items[indiceSeleccionado].click();
            }
        } else if (e.key === 'Escape') {
            lista.innerHTML = '';
            indiceSeleccionado = -1;
        }
    });

    function actualizarSeleccion(items) {
        items.forEach((item, index) => {
            if (index === indiceSeleccionado) {
                item.classList.add('seleccionado');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('seleccionado');
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (!lista.contains(e.target) && e.target !== input) {
            lista.innerHTML = '';
            indiceSeleccionado = -1;
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {


    document.getElementById('clienteSelecionadoAsistencia').addEventListener('change', function () {

        const identificacion = this.value;
        if (!identificacion) return;

        fetch(`../src/traerClientePagosAsistencia.php?identificacion=${identificacion}`)
            .then(response => response.json())
            .then(data => {

                llenarTablaAsistencia(data);
                $("#informacion").hide();
            })
            .catch(err => {
                console.error('Error al traer pagos:', err);
            });
    });
});

function llenarTablaAsistencia(cliente) {
    if(cliente.length == 0) 
    {
        $("#informacion").show();
        $("#tablaClienteAsistencia").hide();
        Swal.fire({
            title: 'Información',
            text: "No hay pagos registrados para este cliente.",
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
           
          });
          
        
        return;
    }
    {

    }
   
    $("#idPago").val(cliente.codigo);
    $("#cantidadTiquetes").val(cliente.cantidadTiquetes);
    if (cliente.estadoFecha == 1) {
        $("#botonIngresar").hide();
        $("#crearPago").show();
    } else {
        $("#crearPago").hide();
        $("#botonIngresar").show();
    }
    if (cliente.estadoVen) {
        document.getElementById('alertaMora').style.display = 'flex';
        document.getElementById('fechaVen').textContent =
            new Date(cliente.fechaPlazo).toLocaleDateString('es-CO');
    }
    else
    {
        document.getElementById('alertaMora').style.display = 'none';
    }
   
    if (cliente.cantidadTiquetes == 0 && cliente.tarifa === "Tiquetera") {
        document.getElementById('alertaTiquetes').style.display = 'flex';
        $("#tiquetes").val(cliente.cantidadTiquetes);
        $("#solotiquetes").hide();
        $("#crearPago").show(); 
        $("#idGuardar").hide();
    }
   


    const tabla = document.getElementById("tablaCliente");
    tabla.innerHTML = `
        <tr>
            <td>Código</td>
            <td>Nombres</td>
            <td>Apellidos</td>
            <td>Tarifa Activa</td>
            <td>V último pago</td>
            <td>Fecha inicio</td>
            <td>Fecha Vencimiento</td>
            <td>Estado</td>
        </tr>
    `;
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${cliente.codigo}</td>
        <td>${cliente.cliente}</td>
        <td>${cliente.apellido}</td>
        <td>${cliente.tarifa}</td>
        <td>${Number(cliente.ultimoPago).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
        <td>${cliente.finicio}</td>
        <td>${cliente.fvencimiento}</td>
        <td>
        <span
          class="badge ${cliente.estadoFecha === 1 ? 'bg-danger text-white' : 'bg-success'}">
          ${cliente.estadoFecha === 1 ? 'Vencido' : 'Vigente'}
        </span>
      
      </td>
    `;
    tabla.appendChild(fila);
}



//1/productos cargar