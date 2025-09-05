
$('#tbl').DataTable({
    language: {
        url: "//cdn.datatables.net/plug-ins/1.10.11/i18n/Spanish.json"
    },
    order: [[0, "desc"]],
    responsive: true,
    lengthChange: true,
    autoWidth: false,
    pageLength: 10,
    lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, "Todos"]
    ],
    columnDefs: [
        { targets: 'no-sort', orderable: false },
        { targets: 'no-search', searchable: false }
    ],
    dom: 'Bfrtip',
    buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
    ]
});
