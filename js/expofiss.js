$(function() {
	stipo = GetURLParameter('stype')|0;
	sid = GetURLParameter('sid')|0;
	localStorage.setItem('uri', 'http://127.0.0.1/expotachira_apisite/index.php');
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
