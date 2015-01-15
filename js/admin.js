$(function() {
    est = {
        0: "Nuevo",
        1: "Revisado",
        2: "Contactado",
        3: "Rechazado",
        4: "Finalizado"
    };
    inte = {
        2: "Pabellón Colombia",
        1: "Pabellón Venezuela",
        3: "Feria Comida"
    };
    standedo = {
        2: "Reserva",
        3: "Compra"
    };
    $(document).on('click', '.operador a', function() {
        $("#ventatxt").html($(this).data('txt'));
        $('[data-required=true]').popover('destroy').removeClass('ms-inv');
        $('button.ms-inv').removeClass('ms-inv');
        $('.operador').removeClass('active');
        $(this).closest('li').addClass('active');
        var uri = $(this).data('target');
        $("#contenedor").load(uri, function() {
            if (uri == "panel.html") {
                $('#tar_fechrea').datetimepicker({
                    language: 'es',
                    showToday: true,
                    sideBySide: true,
                    ampm: true,
                    useStrict: true
                });
                $(".selectpicker").selectpicker();
                $('#tar_fechrea').data("DateTimePicker").setMinDate(moment().subtract(1, 'days'));
                $('#wrapclientes').trigger('click');
            } else if (uri == "panelclient.html") {
                $('.selectpicker').selectpicker();
                $('#wrapclientestx').trigger('click');

            } else if (uri == "panelcredenciales.html") {
                credenciales();
            } else if (uri == "inicio.html") {
                $("#username").text(localStorage.getItem('usuario'));
            }
        });

    });

    $(document).on("click", "#salir", function() {
        $.getJSON(localStorage.getItem('uri') + "/cerrar" + token, function(data) {
            localStorage.setItem('token', '');
            localStorage.setItem('usuario', '');
            localStorage.setItem('uri', '');
            window.location.href = "login.html";
        });
    });

    $(".operador>a[data-target='inicio.html']").trigger('click');

});




function credenciales() {
    $.getJSON( "http://expotachira.herokuapp.com/locatarios/index.php/comercios", function( data ) {   
        var items = [];
        $.each(data, function(key, val) {
            items.push("<tr><td>" + val.nombre + "</td><td>" + val.stand + "</td><td>" + val.pabellon + "</td><td data-pk=" +val.ids+" class='editable'><a href=''>"+ val.credencial +"</a></td></tr>");
        });



        var html = items.join("")        
        $("#comerciosCre").append(html);
        $('.editable').editable({
            url: function(params) {            	
                var d = new $.Deferred;
                $.post( "http://expotachira.herokuapp.com/locatarios/index.php/update/comercios/"+ params.pk, { numero: params.value } );
                if (params.value === 0) {
                    return d.reject('error message'); 
                } else {
                     d.resolve();
                    return d.promise();
                }
            },
            type: 'text',
            name: 'username',
            title: '# Credenciales'

        });
    });


}
