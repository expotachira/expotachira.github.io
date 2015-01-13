$(function() {
	stipo = GetURLParameter('stype')|0;
	sid = GetURLParameter('sid')|0;
	localStorage.setItem('uri', 'http://expotachira.herokuapp.com/index.php');
	//localStorage.setItem('uri', 'http://127.0.0.1/expotachira_api/index.php');
	//
	var rama=[{"tipo_id":"31","tipo_des":"Alimentos y Bebidas"},{"tipo_id":"41","tipo_des":"Licores"},{"tipo_id":"51","tipo_des":"Articulos del Hogar"},{"tipo_id":"61","tipo_des":"Articulos del Taller"},{"tipo_id":"71","tipo_des":"Automoviles y Vehiculos"},{"tipo_id":"81","tipo_des":"Articulos para bebes"},{"tipo_id":"91","tipo_des":"Hogar y Decoracion"},{"tipo_id":"101","tipo_des":"Construcci\u00f3n y Herramientas"},{"tipo_id":"111","tipo_des":"Cosmetica y Perfumeria"},{"tipo_id":"121","tipo_des":"Electrodomesticos"},{"tipo_id":"131","tipo_des":"Fotografia"},{"tipo_id":"141","tipo_des":"Computacion"},{"tipo_id":"151","tipo_des":"Instrumentos Musicales"},{"tipo_id":"161","tipo_des":"Joyeria"},{"tipo_id":"171","tipo_des":"Libros"},{"tipo_id":"181","tipo_des":"Ropa Moda y Accesorios"},{"tipo_id":"191","tipo_des":"Pet Shop"},{"tipo_id":"201","tipo_des":"Telefonia "},{"tipo_id":"211","tipo_des":"Turismo"},{"tipo_id":"221","tipo_des":"Otros"}];
		$.each(rama, function(index, val) {
			$('.infobody .selectpicker').append($("<option></option>").attr("value", val.tipo_id).text(val.tipo_des));
		});
		$('.selectpicker').selectpicker();
		$('.selectpicker.btn').css('border','none');
	//
	// $.getJSON( 'rama.json', function( data ) {
	// 	$.each(data, function(index, val) {
	// 		$('.infobody .selectpicker').append($("<option></option>").attr("value", val.tipo_id).text(val.tipo_des));
	// 	});
	// 	$('.selectpicker').selectpicker();
	// 	$('.selectpicker.btn').css('border','none');
	// });
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('[data-required=true]').popover('destroy').removeClass('ms-inv');
		}
	});

	$(document).on('click','.volver',function(e){
		e.preventDefault();
		$('#bodytop').stop().scrollTo( 0,500);
	});

	$(document).on('click','.infobody .submit',function(evt){
		bot=this;
		bot.setAttribute('disabled','disabled');
		evt.preventDefault();
		var form=$('#infoform');
		var cont=0;
		var validar= new Validador();
		$.each(form.find('[data-required=true]'),function(val,element){
			var fun=$(element).data('fun');

			if($(element).val()==''){
				$(element).popover('destroy');
				$(element).data('content','Campo obligatorio');
				$(element).popover('show');
				cont++;
			}
			else if(fun!==undefined){
				if(!validar[fun]($(element).val())){
					var content=$(element).data('msgfun');
					$(element).popover('destroy');
					$(element).data('content',content);
					$(element).popover('show');
					cont++;
				}
			}
		});
		if(cont==0){
			var data=($(infoform).serialize()+'&pre_ruta='+stipo+'&pre_rutaid='+sid);
			$.post( localStorage.getItem('uri')+'/savenew',data, function( data ) {
				if(data.estatus){
					$('.infobody').hide().css('padding','20px 20px');
					$('.infobody').load("result.html",function() {
						$('.infobody').show('fast');
					});
				}
				else{
					$.each(data.error,function(key,val){
						var element=$('#'+val);
						if(element.data('fun')!=undefined){
							element.popover('destroy');
							element.data('content',element.data('msgfun'));
							element.popover('show');
						}
						else{
							element.popover('destroy');
							element.data('content','Campo obligatorio');
							element.popover('show');
						}
					});
				}
				bot.removeAttribute('disabled');
			},'json').fail(function(res){
				bot.removeAttribute('disabled');
				console.log('se cago');
			});
		}
		else{
			bot.removeAttribute('disabled');

		}
	});

$(document).on('blur','[data-required=true]',function(e){
	e.preventDefault();
	if($(this).val().length==0){
		$(this).popover('destroy');
		$(this).data('content','Campo obligatorio..');
		$(this).addClass('ms-inv');
		$(this).popover('show');
	}
	else
	{
		$(this).popover('destroy').removeClass('ms-inv');
	}
});



function GetURLParameter(sParam)
{
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++)
	{
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam)
		{
			return sParameterName[1];
		}
	}
}
function Validador()
{
	//argument[0] value
	this.ValidateEmail=function (){
		return /\S+@\S+\.\S+/.test(arguments[0]);
	}
	 //argument[0] value
	 this.ValidatePhone=function (){
	 	return /^\d{11}$/.test(arguments[0]);
	 }
	}
	var nigga= $("a.btn-nigga.submit");
	var watcherbot = scrollMonitor.create(nigga);
	watcherbot.lock();

	watcherbot.enterViewport(function() {
		$("header.container").addClass('take');
	});
	watcherbot.exitViewport(function() {
		$("header.container").removeClass('take');
	});



});
