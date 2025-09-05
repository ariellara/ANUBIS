
    document.addEventListener('DOMContentLoaded', function () {
  const botonesVerPDF = document.querySelectorAll('.btnVerPDF');
    const iframe = document.getElementById('iframePDF');

  botonesVerPDF.forEach(boton => {
        boton.addEventListener('click', function () {
            const ruta = this.getAttribute('data-ruta');
            iframe.src = ruta;
            $('#modalPDF').modal('show');
        });
  });
    $('#modalPDF').on('hidden.bs.modal', function () {
        iframe.src = '';
  });
});

