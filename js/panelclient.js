$(function(){
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('[data-required=true]').popover('destroy').removeClass('ms-inv');
			$('button.ms-inv').removeClass('ms-inv');
		}
	});
	$(document).on('click','#wrapclientestx',function(evt){
		$('[data-required=true]').popover('destroy').removeClass('ms-inv');
		$('button.ms-inv').removeClass('ms-inv');
		localStorage.setItem('cli','0');
		$(".btnswitch").removeClass('active');
		$(this).addClass('active');
		$("#newclient").hide();

		var uri=localStorage.getItem('uri')+'/allclient';
		$.getJSON(uri+token, function( data ) {
			verificarlogin(data.logout);
			var body=$("#tab1tx tbody");
			$('#tab1tx').dataTable().fnDestroy();
			body.html("");
			$.each(data,function(key,val){
				var row=document.createElement('tr');
				var t1=document.createTextNode(val.rif);
				var td1=document.createElement('td');
				td1.appendChild(t1);
				row.appendChild(td1);
				var t2=document.createTextNode(val.razon);
				var td2=document.createElement('td');
				td2.appendChild(t2);
				row.appendChild(td2);
				var t3=document.createTextNode(val.contacto);
				var td3=document.createElement('td');
				td3.appendChild(t3);
				row.appendChild(td3);
				row.setAttribute('data-info',JSON.stringify(val));
				row.setAttribute('data-idc',val.id);
				body.append(row);
			});
		// $("#tab1tx").addClass('table-hover');
		var table1 = $('#tab1tx').DataTable({
			paging: false,
			info:false,
			language: {
				"search": "Buscar Clientes",
				"zeroRecords": "No se encontraron resultados."
			},
			scrollY: 420
		});
		$("#tab1tx_wrapper").hide();
		$("#tab1tx_filter").css('float','left');
		$("#tab1tx_filter label").css('text-align','left');
		$(".dataTables_scrollHeadInner").css('padding-left','0px');
		$("#tab1tx_filter input").closest('input').addClass('form-control').css('margin-left','0px');

		$("#tagg").show();
		$("#tab1tx_wrapper").show('fast');

		}); //getson clients

});

$(document).on('click','#wrapadd',function(evt){
	$("#infoclient, #infostand").hide();
	localStorage.setItem('cli','0');
	$(".btnswitch").removeClass('active');
	$(this).addClass('active');
	$("#tab1tx_wrapper").hide();
	$('.alert').hide();
	$("#newclient").show('fast');
		// ocultar los paneles de la derecha.
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
$(document).on('click','#regbuttom',function(evt){
	bot=this;
	bot.setAttribute('disabled','disabled');
	evt.preventDefault();
	$("#st_rif").val(($("#st_rif").val()).toUpperCase());
	var form=$('#addform');
	var cont=0;
	var validar= new Validador();
	$.each(form.find('[data-required=true]'),function(val,element){
		var fun=$(element).data('fun');

		if($(element).val()==''){
			$(element).popover('destroy');
			$(element).data('content','Campo obligatorio');
			$(element).popover('show');
			$(element).trigger("focus");
			cont++;
		}
		else if($(element).hasClass('selectpicker') && $(element).val()==0){
			var boton= $("button[data-id='"+$(element).attr('name')+"']");
			boton.addClass('ms-inv');
			cont++;
		}
		else if(fun!==undefined){
			if(!validar[fun]($(element).val())){
				var content=$(element).data('msgfun');
				$(element).popover('destroy');
				$(element).data('content',content);
				$(element).popover('show');
				$(element).trigger("focus");
				cont++;
			}
		}
	});
	if(cont==0){
		var datos=($(form).serialize())+"&tokenid="+postoken;
		$.post( localStorage.getItem('uri')+'/saveclient',datos, function( data ) {
			verificarlogin(data.logout);
			$('.alert').hide();
			if(data.estatus){
				$("#alertmsgtx").show();
				$("#st_rif, #st_razon, #st_contacto, #st_telf, #st_correo").val('');
			}
			else{
				$("#alerterrortx").show();
					// currio un error
				}
				bot.removeAttribute('disabled');
			},'json').fail(function(res){
				bot.removeAttribute('disabled');
				$("#alerterrortx").show();
			});
		}
		else{
			bot.removeAttribute('disabled');
		}
		// Registrar el cliente y actualizar el stand
		// console.log($('#addform').serialize());
	});

$(document).on('click','#tab1tx tbody>tr',function(){
	var tr=$(this);
	var estruct=JSON.parse(tr.attr('data-info'));
	var form= $("#infoclient form");
	$(form).find(".rif").html(estruct.rif);
	$(form).find(".razon").html(estruct.razon);
	$(form).find(".contacto").html(estruct.contacto);
	$(form).find(".telefono").html(estruct.telefono);
	$(form).find(".correo").html(estruct.correo);
	$("#modiclietx").attr('data-id',estruct.id);

	$("#tab1tx tbody>tr").removeClass('active');
	tr.addClass('active');
	localStorage.setItem("clientx",JSON.stringify(estruct));
	actualizarStandUsr();
	$("#infoclient").show();
	// $("#infoclient, #infostand").hide();
});

$(document).on('click','#editinfoclient',function(){
	var estruct=JSON.parse(localStorage.getItem('clientx'));
	var form=$("#edittaskformx");
	$(form).find(".rif").val(estruct.rif);
	$(form).find(".razon").val(estruct.razon);
	$(form).find(".contacto").val(estruct.contacto);
	$(form).find(".telefono").val(estruct.telefono);
	$(form).find(".correo").val(estruct.correo);
	$("#alertmsg5").hide();
	$('[data-required=true]').removeClass('ms-inv');
	$("#modal5").modal();
});

$(document).on('hide.bs.modal','#modal5',function(){
	$('#edittaskformx input[data-required=true]').popover('destroy').removeClass('ms-inv');
});

$(document).on('click',"#modiclietx",function(){
	var bot=this;
	var id=$(bot).attr('data-id');
	bot.setAttribute('disabled','disabled');
	$("#edittaskformx input[name='rif']").val(($("#edittaskformx input[name='rif']").val()).toUpperCase());
	var form=$('#edittaskformx');
	var cont=0;
	var validar= new Validador();
	$.each(form.find('[data-required=true]'),function(val,element){
		var fun=$(element).data('fun');
		if($(element).val()==''){
			$("#alertmsg5").html("Campo requerido");
			$("#alertmsg5").show();
			$(element).trigger("focus");
			cont++;
		}
		else if(fun!==undefined){
			if(!validar[fun]($(element).val())){
				var content=$(element).data('msgfun');
				$("#alertmsg5").html(content);
				$("#alertmsg5").show();
				$(element).trigger("focus");
				cont++;
			}
		}
	});
	if(cont==0){
		// ACTUALIZAR EL CLIENTE
		var formstatic= $("#infoclient form");
		var cli=JSON.parse(localStorage.getItem('clientx'));
		var datos=($(form).serialize())+"&tokenid="+postoken;
		$.post( localStorage.getItem('uri')+'/update/cliventa/'+id,datos, function( data ) {
			verificarlogin(data.logout);
			$('.alert').hide();
			if(data.estatus){
				var tr=$("#tab1tx tr[data-idc="+id+"]");
				cli.rif=$(form).find(".rif").val();
				cli.razon=$(form).find(".razon").val();
				cli.contacto=$(form).find(".contacto").val();
				cli.telefono=$(form).find(".telefono").val();
				cli.correo=$(form).find(".correo").val();
				$(formstatic).find(".rif").html(cli.rif);
				$(formstatic).find(".razon").html(cli.razon);
				$(formstatic).find(".contacto").html(cli.contacto);
				$(formstatic).find(".telefono").html(cli.telefono);
				$(formstatic).find(".correo").html(cli.correo);
				localStorage.setItem("clientx",JSON.stringify(cli));
				tr.attr('data-info',JSON.stringify(cli));
				tr.find("td:nth-child(1)").html(cli.rif);
				tr.find("td:nth-child(2)").html(cli.razon);
				tr.find("td:nth-child(3)").html(cli.contacto);
				$('#modal5').modal('hide');
				$(form).find(".rif, .razon, .contacto, .telefono, .correo").val('');

			}
			else{
				$("#alerterrortx").html("No se realizaron modificaciones.");
				$("#alerterrortx").show();
			}
			bot.removeAttribute('disabled');
		},'json').fail(function(res){
			bot.removeAttribute('disabled');
			$("#alerterrortx").html("Ocurrio un error.");
			$("#alerterrortx").show();
		});
	}
	else{
		bot.removeAttribute('disabled');
	}
});

$(document).on("click","#agregarStands",function(){
	cargarZonas();
	limpiarMTS();
	limpiarStands();
	$("#st_condi").val('0').selectpicker('refresh');
	$("#modal7").modal();
});

$(document).on("click","#tab2tx tbody>tr",function(){
	var stand=JSON.parse($(this).attr("data-info"));
	$("#estadostand").val(stand.status);
	$('#estadostand').selectpicker('refresh');
	$("#editstandform .lugar").html(inte[stand.tipo]);
	$("#editstandform .numero").html(stand.nro);
	$("#editstandform .metros").html(stand.mts);
	$("#modistand").attr("data-id",stand.id);
	$("#libestand").attr("data-id",stand.id);
	$("#alertmsg2tx").hide();
	$("#modal6").modal();
});

$(document).on("click","#libestand",function(evt){
	evt.preventDefault();
	var id=this.getAttribute("data-id");
	var uri=localStorage.getItem('uri')+"/update/freestand/"+id;
	var datos="tokenid="+postoken;
	bot=this;
	bot.setAttribute('disabled','disabled');

	$.post( uri,datos, function( data ) {
		verificarlogin(data.logout);
		$('.alert').hide();
		if(data.estatus){
			actualizarStandUsr();
			$("#modal6").modal("hide");
		}
		else{
			$("#alertmsg2tx").show();
		}
		bot.removeAttribute('disabled');
	},'json').fail(function(res){
		bot.removeAttribute('disabled');
		$("#alertmsg2tx").show();
	});
});

$(document).on("click","#modistand",function(evt){
	evt.preventDefault();
	var id=this.getAttribute("data-id");
	var uri=localStorage.getItem('uri')+"/update/standcond/"+id;
	var datos="condi="+$("#estadostand").val()+"&tokenid="+postoken;
	bot=this;
	bot.setAttribute('disabled','disabled');

	$.post( uri,datos, function( data ) {
		verificarlogin(data.logout);
		$('.alert').hide();
		if(data.estatus){
			actualizarStandUsr();
			$("#modal6").modal("hide");
		}
		else{
			$("#alertmsg2tx").show();
		}
		bot.removeAttribute('disabled');
	},'json').fail(function(res){
		bot.removeAttribute('disabled');
		$("#alertmsg2tx").show();
	});
});

$(document).on("click","#addstand",function(evt){
	bot=this;
	evt.preventDefault();
	var form=$('#addstandform');
	var cont=0;
	$("#alertmsg3tx").hide();
	$.each(form.find('[data-required=true]'),function(val,element){
		if($(element).hasClass('selectpicker') && $(element).val()==0){
			var boton= $("button[data-id='"+$(element).attr('name')+"']");
			boton.addClass('ms-inv');
			cont++;
		}
	});
	if(cont==0){
		var idClient=JSON.parse(localStorage.getItem('clientx')).id;
		var datos=($(form).serialize())+"&id="+idClient+"&tokenid="+postoken;
		var uri=localStorage.getItem('uri')+"/savestand";
		$.post( uri,datos, function( data ) {
			verificarlogin(data.logout);
			$('.alert').hide();
			if(data.estatus){
				limpiarZonas();
				limpiarMTS();
				limpiarStands();
				cargarZonas();
				actualizarStandUsr();
				$("#modal7").modal("hide");
			}
			else{
				$("#alertmsg3tx").html("No se guardaron los cambios realizados.");
				$("#alertmsg3tx").show();
			}
			bot.removeAttribute('disabled');
		},'json').fail(function(res){
			bot.removeAttribute('disabled');
			$("#alertmsg3tx").html("Ha ocurrido un error.");
			$("#alertmsg3tx").show();
		});
	}
	else{
		$("#alertmsg3tx").html("Debe seleccionar todos los campos");
		$("#alertmsg3tx").show();
		bot.removeAttribute('disabled');
	}
});

$(document).on('change','#st_zona', function() {
	$("button[data-id='st_zona']").removeClass('ms-inv');
	$(this).find(":selected").each(function () {
		if( $(this).val()!=0 ){
			limpiarStands();
			cargarMTS($(this).val());
		}
	});
});
$(document).on('change','#st_mts',function() {
	$("button[data-id='st_mts']").removeClass('ms-inv');
	$(this).find(":selected").each(function () {
		if( $(this).val()!=0 ){
			cargarStands($('#st_zona').val(),$(this).val());
		}
	});
});
$(document).on('change','#st_stand',function() {
	$("button[data-id='st_stand']").removeClass('ms-inv');
});



function cargarZonas(){
	$('.selectpicker').attr('disabled', 'disabled').selectpicker('refresh');
	$.getJSON( localStorage.getItem('uri')+'/zonas'+token, function( data ) {
		verificarlogin(data.logout);
		var select=$('#st_zona');
		limpiarZonas();
		$.each(data, function(index, val) {
			var option=document.createElement('option');
			var text=document.createTextNode(val);
			option.appendChild(text);
			option.setAttribute('value',index);
			select.append(option);
		});
		$('.selectpicker').removeAttr('disabled').selectpicker('refresh');
		// $('#st_zona').selectpicker("render");
	});
}
function limpiarZonas(){
	$("#st_zona option").remove();
	var option=document.createElement('option');
	var text=document.createTextNode('Seleccione');
	option.appendChild(text);
	option.setAttribute('value','0');
	$("#st_zona").append(option);
	$("#st_zona").selectpicker('refresh');
}

function cargarMTS(idzona){
	$('.selectpicker').attr('disabled', 'disabled').selectpicker('refresh');
	$.getJSON( localStorage.getItem('uri')+'/meters/'+idzona+token, function( data ) {
		verificarlogin(data.logout);
		var select=$('#st_mts');
		limpiarMTS();
		$.each(data, function(index, val) {
			var option=document.createElement('option');
			var text=document.createTextNode(val);
			option.appendChild(text);
			option.setAttribute('value',index);
			select.append(option);
		});
		$('.selectpicker').removeAttr('disabled').selectpicker('refresh');
	});
}

function limpiarMTS(){
	$("#st_mts option").remove();
	var option=document.createElement('option');
	var text=document.createTextNode('Seleccione');
	option.appendChild(text);
	option.setAttribute('value','0');
	$("#st_mts").append(option);
	$("#st_mts").selectpicker('refresh');
}

function cargarStands(idzona,idmts){
	$('.selectpicker').attr('disabled', 'disabled').selectpicker('refresh');
	$.getJSON( localStorage.getItem('uri')+'/stands/'+idzona+'/'+idmts+token, function( data ) {
		verificarlogin(data.logout);
		var select=$('#st_stand');
		limpiarStands();
		$.each(data, function(index, val) {
			var option=document.createElement('option');
			var text=document.createTextNode(val.name);
			option.appendChild(text);
			option.setAttribute('value',val.id);
			select.append(option);
		});
		select.selectpicker('refresh');
		$('.selectpicker').removeAttr('disabled').selectpicker('refresh');
	});

}

function limpiarStands(){
	$("#st_stand option").remove();
	var option=document.createElement('option');
	var text=document.createTextNode('Seleccione');
	option.appendChild(text);
	option.setAttribute('value','0');
	$("#st_stand").append(option);
	$("#st_stand").selectpicker('refresh');
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
		 this.ValidateRIF=function (){
		 	return /^(V|v|E|e|J|j|G|g)\d+$/.test(arguments[0]);
		 }
		}

		function actualizarStandUsr(){
			var idcli=JSON.parse(localStorage.getItem('clientx')).id;
			var uri=localStorage.getItem('uri')+'/listands/'+idcli;
			$.getJSON( uri+token, function( data ) {
				verificarlogin(data.logout);
				var body=$("#tab2tx tbody");
				$('#tab2tx').dataTable().fnDestroy();
				body.html("");
				$.each(data,function(key,val){
					var row=document.createElement('tr');
					var t1=document.createTextNode(inte[val.tipo]);
					var td1=document.createElement('td');
					td1.appendChild(t1);
					row.appendChild(td1);
					var t2=document.createTextNode(val.nro);
					var td2=document.createElement('td');
					td2.appendChild(t2);
					td2.setAttribute("style","text-align:center;")
					row.appendChild(td2);
					var t3=document.createTextNode(standedo[val.status]);
					var td3=document.createElement('td');
					td3.appendChild(t3);
					td3.setAttribute("style","text-align:center;")
					row.appendChild(td3);
					var t4=document.createTextNode(val.mts);
					var td4=document.createElement('td');
					td4.appendChild(t4);
					td4.setAttribute("style","text-align:center;")
					row.appendChild(td4);
					row.setAttribute('data-info',JSON.stringify(val));
					body.append(row);
				});
				table2tx = $('#tab2tx').DataTable({
					paging: false,
					info:false,
					language: {
						"search": "Buscar Stands",
						"zeroRecords": "No se encontraron resultados."
					},
					scrollY: 198
				});
				$("#tab2tx_filter").css('float','left')
				$("#tab2tx_filter").css('width','50%');
				$("#tab2tx_filter label").css('text-align','left');
				$("#tab2tx_filter label").css('float','left');
				$("#tab2tx_filter input").closest('input').addClass('form-control').css('margin-left','0px');
				var div= document.createElement('div');
				div.setAttribute('style','display:inline;');
				var label=document.createElement('label');
				label.setAttribute('style','width:50%');
				var bot=document.createElement('button');
				bot.setAttribute('type','button');
				bot.setAttribute('class','btn btn-default btn-md');
				bot.setAttribute('id','agregarStands');
				bot.setAttribute('style','margin-left:10px;margin-top:20px;float:right;');
				var span=document.createElement('span');
				span.setAttribute('class','glyphicon glyphicon-plus');
				bot.appendChild(span);
				label.appendChild(bot);
				div.appendChild(label);
				$("#tab2tx_filter").after(div);
			}, "json").fail(function(evt){console.log("Ocurrio un error")});
}
});