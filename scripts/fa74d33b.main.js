function formularios() {}

function GetURLParameter(a) {
    for (var b = window.location.search.substring(1), c = b.split("&"), d = 0; d < c.length; d++) {
        var e = c[d].split("=");
        if (e[0] == a) return e[1]
    }
}
$(document).ready(function() {
    formularios()
}), sclient = 0 | GetURLParameter("sclient"), numinit = 0 | GetURLParameter("numinit"), $(function() {
    if (console.log(sclient), console.log(numinit), base = "http://expotachira.herokuapp.com/locatarios/index.php", 0 != sclient) {
        var a = base + "/credenciales/" + sclient + "/" + numinit;
        $.get(a, function(a) {
            if (a) {
                console.log(a);
                var b = Handlebars.templates.credencial,
                    c = b(a);
                $("#idcards").prepend(c)
            }
        }, "json")
    }
}), ! function() {
    var a = Handlebars.template,
        b = Handlebars.templates = Handlebars.templates || {};
    b.credencial = a({
        1: function(a, b, c, d) {
            var e, f = "function",
                g = b.helperMissing,
                h = this.escapeExpression;
            return '<div id="seccion">\n        <div class="col-xs-12 col-ms-3 col-sm-6 col-md-6 title-container ' + h((e = null != (e = b.clase || (null != a ? a.clase : a)) ? e : g, typeof e === f ? e.call(a, {
                name: "clase",
                hash: {},
                data: d
            }) : e)) + '">  \n        <!-- si es el 3 o el 4 tiene que tener title2 -->\n\n            <img class="img-responsive fondo" src="images/' + h((e = null != (e = b.bg || (null != a ? a.bg : a)) ? e : g, typeof e === f ? e.call(a, {
                name: "bg",
                hash: {},
                data: d
            }) : e)) + '">\n\n            <form id="infoform" class="form-horizontal" role="form">\n\n                <header>\n\n                    <div class="log">\n                        <img class="img-responsive logo" src="images/logo.png">\n                    </div>\n\n                </header>\n\n                <section class="infobody" style="background-color:#ececec;padding: 20px 10px 1px 30px;">\n\n                    <div class="fila1">\n                        <div class="row">\n\n                            <div class="col-md-12">\n                                <label for="stand" class="textRequired stand_label">Cedula Identidad</label>\n                            </div>\n\n                        </div>\n\n                        <div class="row">\n\n                            <div class="col-md-8 sta">\n                                ' + h((e = null != (e = b.cedula || (null != a ? a.cedula : a)) ? e : g, typeof e === f ? e.call(a, {
                name: "cedula",
                hash: {},
                data: d
            }) : e)) + '\n                            </div>\n\n                            <div class="col-md-4 foto">\n                                <!--AQUI LA FOTO-->\n                                <img class="img-responsive fot" src="' + h((e = null != (e = b.urlimage || (null != a ? a.urlimage : a)) ? e : g, typeof e === f ? e.call(a, {
                name: "urlimage",
                hash: {},
                data: d
            }) : e)) + '">\n                            </div>\n\n                        </div>\n\n\n                        <div class="row sector">\n\n                            <div class="col-md-12 back">\n                                <label for="sector" class="textRequired se">Razon social</label>\n                            </div>\n\n                        </div>\n\n                        <div class="row sector">\n\n                            <div class="col-md-8 sta2 ">\n                                ' + h((e = null != (e = b.razon || (null != a ? a.razon : a)) ? e : g, typeof e === f ? e.call(a, {
                name: "razon",
                hash: {},
                data: d
            }) : e)) + '\n\n                            </div>\n\n                        </div>\n                    </div>\n                    <!--FIN FILA1-->\n\n                    <div class="fila2">\n                        <div class="row nombre">\n\n                            <div class="col-md-12">\n                                <div class="nom"></div>\n                                <img class="img-responsive nombre_img" src="images/nombre.png" style=" width: 70px; height:15px; position:relative;top:-30px;left:17px;  ">\n                                <label for="nombre" class="textRequired nomb">Nombre</label>\n                            </div>\n\n                        </div>\n\n                        <div class="row nombre">\n\n                            <div class="col-md-12 sta3">\n                                ' + h((e = null != (e = b.nombre || (null != a ? a.nombre : a)) ? e : g, typeof e === f ? e.call(a, {
                name: "nombre",
                hash: {},
                data: d
            }) : e)) + '\n                            </div>\n\n                        </div>\n\n\n                        <div class="row locatar">\n\n                            <div class="col-md-4">\n                                <div class="loca"></div>\n                                <img class="img-responsive locatario_img" src="images/Locatario.png" style=" width: 80px; height:15px; position:relative;top:-65px;left:17px;  ">\n                                <label for="locatario" class="textRequired locar">Locatario</label>\n                            </div>\n\n                            <div class="col-md-8 sta4">\n                                 ' + h((e = null != (e = b.nombrecomercial || (null != a ? a.nombrecomercial : a)) ? e : g, typeof e === f ? e.call(a, {
                name: "nombrecomercial",
                hash: {},
                data: d
            }) : e)) + '\n                            </div>\n\n                        </div>\n                    </div>\n                    <!--FIN FILA2-->\n\n                    <div class="fila3">\n                        <div class="row validacion">\n\n\n                            <div class="col-md-6 val va sta5">\n                                <label class="val_text">Validacion</label>\n                                <img class="img-responsive st5" src="images/foto.png">\n                                <img class="img-responsive firma" src="images/firma.jpg">\n                            </div>\n\n                            <div class="col-md-6 val va2 sta6">\n                                <label class="val_text2">' + h((e = null != (e = b.idtk || (null != a ? a.idtk : a)) ? e : g, typeof e === f ? e.call(a, {
                name: "idtk",
                hash: {},
                data: d
            }) : e)) + '</label>\n                                  <label class="val_text2">' + h((e = null != (e = b.stand || (null != a ? a.stand : a)) ? e : g, typeof e === f ? e.call(a, {
                name: "stand",
                hash: {},
                data: d
            }) : e)) + '</label>\n                               \n                            </div>\n\n                        </div>\n\n                    </div>\n                    <!--FIN FILA 3-->\n\n                </section>\n\n            </form>\n\n        </div>\n        <img class="img-responsive barra" src="images/barra.png">\n    </div>\n'
        },
        compiler: [6, ">= 2.0.0-beta.1"],
        main: function(a, b, c, d) {
            var e, f = "";
            return e = b.each.call(a, null != a ? a.credenciales : a, {
                name: "each",
                hash: {},
                fn: this.program(1, d),
                inverse: this.noop,
                data: d
            }), null != e && (f += e), f
        },
        useData: !0
    })
}();
