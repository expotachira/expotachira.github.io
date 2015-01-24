function evento() {

    var person = [];
    var i = 0;

    $.ajax({
            url: "evento.json",
            cache: false
        })
        .done(function(data) {

            sessionStorage.setItem('eventos', JSON.stringify(data.items));

            // Carga de imagenes en La lista
            $.each(data.items, function(i, item) {

                var date = new Date(item.fini);
                var dia = date.getDate();
                if (!person[dia]) {
                    person[dia] = i;
                };
                i++;

                //$("#into ul").append('<li><img src="'+item.urlflayer+'" alt="image 2" data-toggle="modal" data-target="#myModal"></li>');

                //$("#into ul").append('<div class="liImagen "> <img src="'+item.urlflayer+'" alt="image 2" data-toggle="modal" data-target="#myModal"> </div> <div class="lifecha"> 28 </div> <div class="liTitulo"> Texto </div>');

                $("#into ul").append('<li><div class="liImagen"> <a href="#/eventos/'+item.id+'"><img src="' + item.urlflayer + '" alt="image 2" class="img-responsive"> </a></div> <div class="lifecha"> ' + dia + ' </div> <div class="liTitulo"> ' + item.nombre + '  </div> </li>');

            });


            // Detecto del dia de hoy - mañana y pasado
            var dia = new Date();
            var hoy = dia.getDate();
            var ayer = hoy - 1;
            var manana = hoy + 1;
            $("#bardias").append('<a href="#" class=" bullet botonnav" data-slide="' + person[ayer] + '"> Ayer </a>');
            $("#bardias").append('<a href="#" class=" bullet botonnav" id = "hoy" data-slide="' + person[hoy] + '"> Hoy </a>');
            $("#bardias").append('<a href="#" class=" bullet botonnav"  data-slide="' + person[manana] + '"> Mañana </a>');


            // Carrusel Inicio
            $("#slider1").tinycarousel({
                bullets: true,
                // interval: true,
            });
            $("#hoy").click();
        });

}




function evento2() {


     //OCULTA LOS BOTONES
    $("#input_locatario").css("display", "none");
    $("#boton_mostrar1").css("display", "none");
    $("#boton_mostrar2").css("display", "none");
    $("#boton_mostrar3").css("display", "none");
    $("#boton_mostrar4").css("display", "none");

    $("#boton_ocultar3").css("display", "inline");
    $("#boton_ocultar4").css("display", "inline");
    // $("#seccion3").css("display", "none");
    // $("#slider1").css("display", "none");

    //OCULTA LOS BOTONES DE NAVEGACION DE NOTICIAS
    // $("#cont_input").removeClass("col-xs-5");;
    // $("#locatarios").removeClass("col-xs-7");
    // $("#locatarios").addClass("col-lg-12");
    // $("#loc").css("margin-left","40%");
    //REMUEVE LAS CLASES DE LOS BOTONES

}


function evento3() {
    /*********************************
        BOTON2
  *********************************/

    //MOVIMIENTO VERTICAL, OCULTA EL BOTON OCULTAR Y SE MUESTRA EL BOTON MOSTRAR
    $("#boton_ocultar2").click(function() {
        $(this).css("color", "white");
        $("#seccion2").slideToggle(1000);
        $(this).css("display", "none");
        $("#boton_mostrar2").css("display", "inline");
    });


    //AL SALIR EL MAUSE DEL BOTON OCULTAR NO SE MUESTRA LA DECORACION DEL BOTON
    $("#boton_ocultar2").mouseout(function() {
        $(this).css("text-decoration", "none");
    });

    //MOVIMIENTO VERTICAL, OCULTA EL BOTON MOSTRAR Y SE MUESTRA EL BOTON OCULTAR
    $("#boton_mostrar2").click(function() {
        $(this).css("color", "white");
        $("#seccion2").slideToggle(1000);
        $(this).css("display", "none");
        $("#boton_ocultar2").css("display", "inline");
    });

    //SE DIRIGE A LA SECCION DEL ELEMENTO BOTON MOSTRAR
    $("#boton_ocultar2").click(function(event) {
        event.stopPropagation();
        var Position = jQuery('[id="seccion2"]').offset().top;
        jQuery('html, body').animate({
            scrollTop: Position
        }, 1100);
        return false;
    });

    //SE DIRIGE A LA SECCION DEL ELEMENTO BOTON MOSTRAR
    $("#boton_mostrar2").click(function(event) {
        event.stopPropagation();
        var Position = jQuery('[id="seccion2"]').offset().top;
        jQuery('html, body').animate({
            scrollTop: Position
        }, 1100);
        return false;
    });


    /*********************************
        BOTON3
  *********************************/


    //MOVIMIENTO VERTICAL, OCULTA EL BOTON OCULTAR Y SE MUESTRA EL BOTON MOSTRAR
    $("#boton_ocultar3").click(function() {
        $(this).css("color", "white");
        $("#seccion3").slideToggle(300);
        $(this).css("display", "none");
        $("#boton_mostrar3").css("display", "inline");
        $("#busqueda").css("display", "none");
        var x = $(document).width();
        //console.log(x);

        if (x > 977) {
            $("#loc").css("margin-left", "-6%");
        }
        if (x < 977) {
            $("#loc").css("margin-left", "-14%");
        }
        if (x < 694) {
            $("#loc").css("margin-left", "-19%");
        }

        if (x < 596) {
            $("#loc").css("margin-left", "-23%");

        }
        if (x < 559) {
            $("#loc").css("margin-left", "-24%");
        }
        if (x < 528) {
            $("#loc").css("margin-left", "-26%");
        }
        if (x < 494) {
            $("#loc").css("margin-left", "-28%");
        }
        if (x < 455) {
            $("#loc").css("margin-left", "-34%");
        }
        if (x < 407) {
            $("#loc").css("margin-left", "-36%");
        }



    });

    //AL SALIR EL MAUSE DEL BOTON OCULTAR NO SE MUESTRA LA DECORACION DEL BOTON
    $("#boton_ocultar3").mouseout(function() {
        $(this).css("text-decoration", "none");
    });


    //MOVIMIENTO VERTICAL, OCULTA EL BOTON MOSTRAR Y SE MUESTRA EL BOTON OCULTAR
    $("#boton_mostrar3").click(function() {
        $(this).css("color", "white");
        $("#seccion3").slideToggle(300);
        $(this).css("display", "none");
        $("#boton_ocultar3").css("display", "inline");
        $("#busqueda").css("display", "inline");
        var x = $(document).width();
        //console.log(x);
        if (x > 977) {
             $("#loc").css("margin-left", "-6%");
        }

        if (x < 977) {
            $("#loc").css("margin-left", "-14%");
        }
        if (x < 694) {
            $("#loc").css("margin-left", "-19%");
        }

        if (x < 596) {
            $("#loc").css("margin-left", "-23%");

        }
        if (x < 559) {
            $("#loc").css("margin-left", "-24%");
        }
        if (x < 528) {
            $("#loc").css("margin-left", "-26%");
        }
        if (x < 494) {
            $("#loc").css("margin-left", "-28%");
        }
        if (x < 455) {
            $("#loc").css("margin-left", "-34%");
        }
        if (x < 407) {
            $("#loc").css("margin-left", "-36%");
        }


    });

    //SE DIRIGE A LA SECCION DEL ELEMENTO BOTON MOSTRAR
    $("#boton_ocultar3").click(function(event) {
        event.stopPropagation();
        var Position = jQuery('[id="seccion3"]').offset().top;
        jQuery('html, body').animate({
            scrollTop: Position
        }, 1100);
        return false;
    });

    //SE DIRIGE A LA SECCION DEL ELEMENTO BOTON MOSTRAR
    $("#boton_mostrar3").click(function(event) {
        event.stopPropagation();
        var Position = jQuery('[id="seccion3"]').offset().top;
        jQuery('html, body').animate({
            scrollTop: Position
        }, 1100);
        return false;
    });


    /*********************************
        BOTON4
  *********************************/

    //MOVIMIENTO VERTICAL, OCULTA EL BOTON OCULTAR Y SE MUESTRA EL BOTON MOSTRAR
    $("#boton_ocultar4").click(function() {
        $(this).css("color", "white");
        $("#seccion4").slideToggle(1000);
        $(this).css("display", "none");
        $("#boton_mostrar4").css("display", "inline");
    });

    //AL SALIR EL MAUSE DEL BOTON OCULTAR NO SE MUESTRA LA DECORACION DEL BOTON
    $("#boton_ocultar4").mouseout(function() {
        $(this).css("text-decoration", "none");
    });

    //MOVIMIENTO VERTICAL, OCULTA EL BOTON MOSTRAR Y SE MUESTRA EL BOTON OCULTAR
    $("#boton_mostrar4").click(function() {
        $(this).css("color", "white");
        $("#seccion4").slideToggle(1000);
        $(this).css("display", "none");
        $("#boton_ocultar4").css("display", "inline");
        $("body").animate({
            scrollTop: 3880
        }, '400');
    });

    //SE DIRIGE A LA SECCION DEL ELEMENTO BOTON MOSTRAR
    $("#boton_ocultar4").click(function(event) {
        event.stopPropagation();
        var Position = jQuery('[id="seccion4"]').offset().top;
        jQuery('html, body').animate({
            scrollTop: Position
        }, 1100);
        return false;
    });

    //SE DIRIGE A LA SECCION DEL ELEMENTO BOTON MOSTRAR
    $("#boton_mostrar4").click(function(event) {
        event.stopPropagation();
        var Position = jQuery('[id="seccion4"]').offset().top;
        jQuery('html, body').animate({
            scrollTop: Position
        }, 1100);
        return false;
    });



}


function evento4() {

}



function evento5() {

    $(window).ready(function() {

    var x = $(document).width();
    //console.log(x);

    if(x<977){

    //OCULTA LOS BOTONES DE NAVEGACION DE NOTICIAS
    $("#bot1").css("display","none");
    $("#bot2").css("display","none");
    //REMUEVE LAS CLASES DE LOS BOTONES
    $("#bot1").removeClass("col-xs-1 col-md-1");
    $("#bot2").removeClass("col-xs-1 col-md-1");
    //AGREGA LA NUEVA CLASE A LAS NOTICIAS
    $("#newsPost").removeClass("col-xs-10 col-sm-10 col-md-10 col-lg-10");
    $("#newsPost").addClass("col-xs-12 col-sm-12 col-md-12 col-lg-12");

    }


    });

     $(window).resize(function() {

    var y = $(document).width();
   // console.log(y);

    if(y<977){

  //OCULTA LOS BOTONES DE NAVEGACION DE NOTICIAS
    $("#bot1").css("display","none");
    $("#bot2").css("display","none");
    //REMUEVE LAS CLASES DE LOS BOTONES
    $("#bot1").removeClass("col-xs-1 col-md-1");
    $("#bot2").removeClass("col-xs-1 col-md-1");
    //AGREGA LA NUEVA CLASE A LAS NOTICIAS
    $("#newsPost").removeClass("col-xs-10 col-sm-10 col-md-10 col-lg-10");
    $("#newsPost").addClass("col-xs-12 col-sm-12 col-md-12 col-lg-12");

    }else{

    //AGREGA LA CLASE DE BOTONES DE NAVEGACION DE NOTICIAS
    $("#bot1").addClass("col-xs-1 col-md-1");
    $("#bot2").addClass("col-xs-1 col-md-1");
    //AGREGA LOS BOTONES DE NAVEGACION DE NOTICIAS
    $("#bot1").css("display","inline");
    $("#bot2").css("display","inline");
    //AGREGA LA CLASE ORIGINAL A LAS NOTICIAS
    $("#newsPost").addClass("col-xs-10 col-sm-10 col-md-10 col-lg-10");
    $("#newsPost").removeClass("col-xs-12 col-sm-12 col-md-12 col-lg-12");


    }


    });


}



    $(document).ready(function() {

        evento();
        evento2();
        evento3();
        evento4();
        evento5();

        $(document).on("submit","#tokenform",function(evt){
           evt.preventDefault();
            var concat=$("#token").val();
            window.location = 'form.html?sclient='+concat;
        });


    });