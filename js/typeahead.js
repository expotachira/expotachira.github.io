
$(function(){
    base='http://expotachira.herokuapp.com/locatarios/index.php';
    var url=base+'/typeahead';
    var segmentos=new Array();
    var palabras=new Array();
    var keyset=new Array();
    var nombres=new Array();

    Handlebars.registerHelper('stringify', function (context, option) {
        var result = JSON.stringify(context);
        return result;
    });
    $(document).on("click",".busquedaimg",function(evt){
        var data=$(this).data("info");
        var postTemplate = Handlebars.templates['modalLocatario'];
            var postM = postTemplate({
                photo: (data.urllocal)?data.urllocal:"images/et.png",
                title: data.nombre,
                content: data.detalle.replace(/\n/g, "<br>"),
                local: data.stand
            });
            $("#locatariomodal").html(postM);
            $('#locatariomodal').modal('show')
    });

    $.get(url,function(data){
        if(data.sucess){
            for (var i = data.items.length - 1; i >= 0; i--) {
                if(!segmentos.some(function(item){
                                if(item.value==data.items[i].segmento.trim())
                                   return true;
                                                })
                    )
                   segmentos.push({value: data.items[i].segmento,tipo:"segmento"});


                nombres.push({value: data.items[i].nombre,tipo:"stand"});
                var split=data.items[i].keyset.match(/[^,]+/g)|""
                for (var j = split.length - 1; j >= 0; j--) {
                    if (keyset.indexOf(split[j].trim())==-1)
                        keyset.push(split[j].trim());
                }
            }
            for (var i = keyset.length - 1; i >= 0; i--) {
                palabras.push({value: keyset[i],tipo:"palabra"});
            }

            var segmento = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: segmentos
            });
            var palabra = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: palabras
            });
            var nombre = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: nombres
            });
            segmento.initialize();
            palabra.initialize();
            nombre.initialize();

            $('#suggest .typeahead').typeahead({
                hint: true,
                highlight: true,
                minLength: 1,
            },
            {
                name: 'Segmentos',
                displayKey: 'value',
                source: segmento.ttAdapter(),
                templates: {
                    header: '<h3 class="league-name">Segmeto</h3>',
                }
            },
            {
                name: 'Palabras',
                displayKey: 'value',
                source: palabra.ttAdapter(),
                templates: {
                    header: '<h3 class="league-name">Palabras</h3>'
                }
            },
            {
                name: 'Locales',
                displayKey: 'value',
                source: nombre.ttAdapter(),
                templates: {
                    header: '<h3 class="league-name">Locales</h3>'
                }
            }
            ).on('typeahead:selected', function(event, suggestion,name){
                var uri=base+'/solicitud/'+suggestion.tipo+'/'+suggestion.value;
                $.get(uri,function(data){
                    if(data.sucess){
                        var section=$("#seccion3");
                        var templateSearch=Handlebars.templates['localSearch'];
                        var htmlsearch=templateSearch(data);
                        section.html(htmlsearch);
                        if(section.css('display')=='none')
                            $("#boton_mostrar3").trigger('click');
                    }
                 },"json");
            });
        }
    },"json");

});
