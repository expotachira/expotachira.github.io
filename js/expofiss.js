$(function() {

	$('.volver').click(function(e){
		e.preventDefault();
		$("#bodytop").stop().scrollTo( 0,500);
	});

	$.getJSON( "json/tipoSegmento.json", function( data ) {
		console.log(data);
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
});

// 'pre_emp' => $vars['empresa'],
// 'pre_con' => $vars['contacto'],
// 'pre_tel' => $vars['telefono'],
// 'pre_ema' => $vars['email'],
// 'pre_tip' => $vars['tipo'],
// 'pre_ruta' => $vars['ruta'],
// 'pre_rutaid' => $vars['rutaid'],

