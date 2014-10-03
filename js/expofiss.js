$(function() {

	$('.volver').click(function(e){
		e.preventDefault();
		$("#bodytop").stop().scrollTo( 0,500);
	});

	$.getJSON( "http://192.168.1.12/expofiss/index.php/tipoempresa", function( data ) {
		var select=$(".infobody .selectpicker");
		$.each(data, function(index, val) {
			var option=document.createElement('option');
			var text=document.createTextNode(val.tipo_des);
			option.appendChild(text);
			option.setAttribute('value',val.tipo_id);
			select.append(option);
		});
		$('.selectpicker').selectpicker();
	});

	stipo = GetURLParameter('stype')|0;
	sid = GetURLParameter('sid')|0;

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

	$(document).on("click",".infobody .btn",function(evt){
		$.post( "http://192.168.1.12/expofiss/index.php/savenew",($(infoform).serialize()+'&pre_ruta='+stipo+'&pre_rutaid='+sid), function( data ) {
			console.warn("----------Resultado----------");
			console.log(data);
		},"json").fail(function(res){
			console.log("se cago");
		});
	});
});
// 'pre_emp' => $vars['empresa'],
// 'pre_con' => $vars['contacto'],
// 'pre_tel' => $vars['telefono'],
// 'pre_ema' => $vars['email'],
// 'pre_tip' => $vars['tipo'],
// 'pre_ruta' => $vars['ruta'],
// 'pre_rutaid' => $vars['rutaid'],

