
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
                photo: (data.urllogo)?data.urllogo:"images/et.png",
                title: data.nombre,
                content: data.detalle.replace(/\n/g, "<br>"),
                local: data.stand
            });
            $("#locatariomodal").html(postM);
            $('#locatariomodal').modal('show')
    });
    (function(){
        var urirdm=base+'/solicitud/random/12';
        sectionbody=$("#seccion3");
        sectionbody.hide();
        sectionbody.html('<figure class="col-md-offset-6"><img style="margin-top:1.2em;" src="images/728.GIF" width="60" height="64"></figure>').trigger('create');
        sectionbody.show('fast');

        $.get(urirdm,function(data){
            if(data.sucess){
                sectionbody.hide();
                var templateSearch=Handlebars.templates['localSearch'];
                var htmlsearch=templateSearch(data);
                sectionbody.html(htmlsearch);
                if(sectionbody.css('display')=='none')
                    $("#boton_mostrar3").trigger('click');
            }
            else{
                sectionbody.hide();
            }
         },"json");
    })();

    $.get(url,function(data){
        if(data.sucess){
            for (var i = data.items.length - 1; i >= 0; i--) {
                if(!segmentos.some(function(item){
                                if(item.value==data.items[i].segmento.trim())
                                   return true;
                                                })
                    )
                segmentos.push({value: data.items[i].segmento,tipo:"segmento"});

                if (!nombres.some(function(item){
                    if(item.value==data.items[i].nombre.trim())
                        return true;
                }))
                nombres.push({value: data.items[i].nombre,tipo:"stand"});
                var split= new Array();
                    if(data.items[i].keyset.indexOf(",")==-1){
                        split.push(data.items[i].keyset);
                    }
                    else{
                     split=data.items[i].keyset.match(/[^,]+/g)|"";
                    }
                for (var j = split.length - 1; j >= 0; j--) {
                    if (keyset.indexOf(split[j].toUpperCase().trim())==-1)
                        keyset.push(split[j].trim());
                }
            }

            for (var i = keyset.length - 1; i >= 0; i--) {
                if (palabras.indexOf(keyset[i].toUpperCase().trim())==-1)
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
                name: 'Locales',
                displayKey: 'value',
                source: nombre.ttAdapter(),
                templates: {
                    header: '<h3 class="league-name">Locales</h3>'
                }
            },
            {
                name: 'Palabras',
                displayKey: 'value',
                source: palabra.ttAdapter(),
                templates: {
                    header: '<h3 class="league-name">Palabras</h3>'
                }
            }
            ).on('typeahead:selected', function(event, suggestion,name){
                var uri=base+'/solicitud/'+suggestion.tipo+'/'+suggestion.value;
                sectionbody=$("#seccion3");
                sectionbody.hide();
                sectionbody.html('<figure class="col-md-offset-5"><img style="margin-top:1.2em;" src="images/728.GIF" width="60" height="64"></figure>').trigger('create');
                sectionbody.show('fast');

                $.get(uri,function(data){
                    if(data.sucess){
                        sectionbody.hide();
                        var templateSearch=Handlebars.templates['localSearch'];
                        var htmlsearch=templateSearch(data);
                        sectionbody.html(htmlsearch);
                        if(sectionbody.css('display')=='none')
                            $("#boton_mostrar3").trigger('click');
                    }
                    else{
                        sectionbody.hide();
                    }
                 },"json");
            });
            $('#suggest .typeahead').prop("disabled", false);
        }
    },"json");

});

