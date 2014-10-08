$(function() {

	localStorage.setItem('uri', 'http://127.0.0.1/laexpofiss/api/index.php/');
	localStorage.setItem('client','0');
	tipoTarea={1:"Normal",2:"Rápida",3:"Urgente"};
	estadoTarea={0:"Creada",1:"En proceso",2:"Finalizada"};

	$('#tar_fechrea').datetimepicker( {language: 'es',
		showToday: true,
		sideBySide: true,
		ampm: true,
		useStrict:true
	});
	$('#tar_fechrea').data("DateTimePicker").setMinDate(moment().subtract(1, 'days'));

	$(document).on('click','#agregarTask',function(evt){
		$("#tar_des").val("");
		$("#tar_fechrea").val("");

		if(localStorage.getItem('client')==0){
			$('#modal2').modal();
		}
		else{
			$("#alertmsg").hide();
			$('#myModal').modal();
		}

	});
	$(document).on('click','#editclient',function(evt){
		var estruct=JSON.parse(localStorage.getItem('client'));
		$("#edittaskform .usr_name").html(estruct.pre_con);
		$("#edittaskform .usr_emp").html(estruct.pre_emp);
		$("#edittaskform .usr_correo").html(estruct.pre_ema);
		$("#edittaskform .usr_phone").html(estruct.pre_tel);
		$("#edittaskform .usr_est").val(estruct.pre_est);
		$("#edittaskform .usr_int").val(estruct.pre_int);
		$("#alertmsg3").hide();
		$("#modal4").modal();
	});
	$(document).on('click','#modiclie',function(evt){
		var uri=localStorage.getItem('uri')+'/update/clipre/'+JSON.parse(localStorage.getItem('client')).pre_id;
		$("#alertmsg2").hide();
		modicliente=this;
		modicliente.setAttribute('disabled','disabled');
		$.post( uri, $("#edittaskform").serialize(), function( data ) {
			if(data.estatus){
				$('#modal4').modal('hide');
			}
			else{
				$("#alertmsg3").hide();
				$("#alertmsg3").html("Ha ocurrido un error intente nuevamente.");
				$("#alertmsg3").show('fast');
			}
			modicliente.removeAttribute('disabled');

		}, "json").fail(function(){
			modicliente.removeAttribute('disabled');
			$("#alertmsg3").hide();
			$("#alertmsg3").html("Ha ocurrido un error intente nuevamente.");
			$("#alertmsg3").show('fast');
		});
	})
	$(document).on('click','#moditask',function(evt){
		moditask=this;
		moditask.setAttribute('disabled','disabled');
		var text=$('#tsk_edo').val();
		var text2=$('#tsk_not').val();
		if(text==""||text2==""){
			$("#alertmsg2").hide();
			$("#alertmsg2").html("Debe ingresar todos los campos.");
			$("#alertmsg2").show('fast');
			moditask.removeAttribute('disabled');
		}
		else{
			var uri=localStorage.getItem('uri')+'update/task/'+$(moditask).data('task');
			$("#alertmsg2").hide();
			$.post( uri, $("#moditaskform").serialize(), function( data ) {
				if(data.estatus){
					if(taskusr)
						actualizarTaskUsr();
					else
						actualizarTaskAll();
					$('#modal3').modal('hide');
				}
				else{
					$("#alertmsg2").hide();
					$("#alertmsg2").html("Ha ocurrido un error intente nuevamente.");
					$("#alertmsg2").show('fast');
				}
				moditask.removeAttribute('disabled');

			}, "json").fail(function(){
				moditask.removeAttribute('disabled');
				$("#alertmsg2").hide();
				$("#alertmsg2").html("Ha ocurrido un error intente nuevamente.");
				$("#alertmsg2").show('fast');
			});
		}
	});


$(document).on('click','#addtask',function(evt){
	newtaskusr=this;
	newtaskusr.setAttribute('disabled','disabled');
	var text=$('#tar_des').val();
	var text2=$('#tar_fechrea').val();

	if(text==""||text2==""){
		$("#alertmsg").hide();
		$("#alertmsg").html("Debe ingresar todos los campos.");
		$("#alertmsg").show('fast');
		newtaskusr.removeAttribute('disabled');
	}
	else{
		var uri=localStorage.getItem('uri')+'newtask/'+JSON.parse(localStorage.getItem('client')).pre_id;
		$("#alertmsg").hide();
		$.post( uri, $("#taskform").serialize(), function( data ) {
			if(data.estatus){
				$('#myModal').modal('hide');
				actualizarTaskUsr();
			}
			else{
				$("#alertmsg").hide();
				$("#alertmsg").html("Ha ocurrido un error intente nuevamente.");
				$("#alertmsg").show('fast');
			}
			newtaskusr.removeAttribute('disabled');

		}, "json").fail(function(){
			newtaskusr.removeAttribute('disabled');
			$("#alertmsg").hide();
			$("#alertmsg").html("Ha ocurrido un error intente nuevamente.");
			$("#alertmsg").show('fast');
		});
	}
});

$(document).on('click','#wrapclientes',function(evt){
	taskusr=true;
	localStorage.setItem('client','0');
	$(".btnswitch").removeClass('active');
	$(this).addClass('active');
	$("#sectionclient,#sectiontask").hide();
	$("#tab1_wrapper,#tab2_wrapper").hide();
	var uri=localStorage.getItem('uri')+'listclie';
	$.getJSON(uri, function( data ) {
		var body=$("#tab1 tbody");
		var ruta={1:"Google",2:"Facebook",3:"Directo",4:"Sistema"};
		var est={1:"Recien registrado",2:"Recien revisado",3:"-Contactado",4:" En comunicación",5:"No cliente"};
		body.html("");
		$.each(data,function(key,val){

			var row=document.createElement('tr');
			var t1=document.createTextNode(val.pre_emp);
			var td1=document.createElement('td');
			td1.appendChild(t1);
			row.appendChild(td1);
			var t2=document.createTextNode(val.pre_con);
			var td2=document.createElement('td');
			td2.appendChild(t2);
			row.appendChild(td2);
			var t3=document.createTextNode(ruta[val.pre_ruta]!==undefined?ruta[val.pre_ruta]:"Desconocido");
			var td3=document.createElement('td');
			td3.appendChild(t3);
			row.appendChild(td3);
			var t4=document.createTextNode(est[val.pre_est]!==undefined?est[val.pre_est]:"Desconocido");
			var td4=document.createElement('td');
			td4.appendChild(t4);
			row.appendChild(td4);
			row.setAttribute('data-info',JSON.stringify(val));
			body.append(row);
		});
				// $("#tab1").addClass('table-hover');
				if(typeof(table1)==="undefined"){
					table1 = $('#tab1').DataTable({
						paging: false,
						info:false,
						language: {
							"search": "Buscar Clientes",
							"zeroRecords": "No se encontraron resultados."
						},
						scrollY: 400
					});
					$("#tab1_wrapper").hide();
					$("#tab1_filter").css('float','left');
					$("#tab1_filter label").css('text-align','left');
					$("#tab1_filter input").closest('input').addClass('form-control').css('margin-left','0px');
				}
				$("#tagg").show();
				$("#tab1_wrapper").show('fast');

	}); //getson clients

}); //on click

$(document).on('click','#wraptask',function(evt){
	taskusr=false;
	localStorage.setItem('client','0');
	$(".btnswitch").removeClass('active');
	$(this).addClass('active');
	$("#sectionclient,#sectiontask").hide();
	$("#tab1_wrapper,#tab2_wrapper").hide();

	actualizarTaskAll();
});

$(document).on('click','#tab1 tbody>tr',function(evt){
	var estruct=$(this).data('info');
	$("#val_nom").html(estruct.pre_con);
	$("#val_emp").html(estruct.pre_emp);
	$("#val_cor").html(estruct.pre_ema);
	$("#val_tel").html(estruct.pre_tel);
	$("#tab1 tbody>tr").removeClass('active');
	$(this).addClass('active');
	localStorage.setItem("client",JSON.stringify(estruct));
	actualizarTaskUsr();
	$("#sectionclient").show();

});
$(document).on('click','#tab2 tbody>tr',function(evt){
	$("#tab2 tbody>tr").removeClass('active');
	$(this).addClass('active');
	modificarTarea($(this).data('info'));
});
$(document).on('click','#tab3 tbody>tr',function(evt){
	$("#tab3 tbody>tr").removeClass('active');
	$(this).addClass('active');
	modificarTarea($(this).data('info'));
});

function actualizarTaskAll(){
	var uri=localStorage.getItem('uri')+'listtask/all';
	$.post( uri, function( data ) {
		var body=$("#tab2 tbody");
		var tipoTarea={1:"Normal",2:"Rápida",3:"Urgente"};
		var estadoTarea={0:"Creada",1:"En proceso",2:"Finalizada"};
		body.html("");
		$.each(data,function(key,val){
			var row=document.createElement('tr');
			var t1=document.createTextNode(val.tar_fechrea);
			var td1=document.createElement('td');
			td1.appendChild(t1);
			row.appendChild(td1);
			var t2=document.createTextNode(val.tar_des);
			var td2=document.createElement('td');
			td2.appendChild(t2);
			row.appendChild(td2);
			var t3=document.createTextNode(tipoTarea[val.tar_tip]!==undefined?tipoTarea[val.tar_tip]:"Desconocido");
			var td3=document.createElement('td');
			td3.appendChild(t3);
			row.appendChild(td3);
			var t4=document.createTextNode(estadoTarea[val.tar_est]!==undefined?estadoTarea[val.tar_est]:"Desconocido");
			var td4=document.createElement('td');
			td4.appendChild(t4);
			row.appendChild(td4);
			row.setAttribute('data-info',JSON.stringify(val));
			body.append(row);
		});
		if(typeof(table2)==="undefined"){
			$('#tab2').show();
			table2 = $('#tab2').DataTable({
				paging: false,
				info:false,
				language: {
					"search": "Buscar Tareas",
					"zeroRecords": "No se encontraron resultados."
				},
				scrollY: 400
			});
			$("#tab2_wrapper").hide();
			$("#tab2_filter").css('float','left');
			$("#tab2_filter label").css('text-align','left');
			$("#tab2_filter input").closest('input').addClass('form-control').css('margin-left','0px');
		}
		$("#tab2_wrapper").show('fast');
		$("#sectiontask").show();

	}, "json").fail(function(evt){console.log("Ocurrio un error")});
}


function actualizarTaskUsr(){
	var idcli=JSON.parse(localStorage.getItem('client')).pre_id;
	var uri=localStorage.getItem('uri')+'/listtask/unicper';
	$.post( uri,{"id":idcli}, function( data ) {
		var body=$("#tab3 tbody");
		$('#tab3').dataTable().fnDestroy();

		body.html("");

		$.each(data,function(key,val){
			var row=document.createElement('tr');
			var t1=document.createTextNode(val.tar_fechrea);
			var td1=document.createElement('td');
			td1.appendChild(t1);
			row.appendChild(td1);
			var t2=document.createTextNode(val.tar_des);
			var td2=document.createElement('td');
			td2.appendChild(t2);
			row.appendChild(td2);
			var t3=document.createTextNode(tipoTarea[val.tar_tip]!==undefined?tipoTarea[val.tar_tip]:"Desconocido");
			var td3=document.createElement('td');
			td3.appendChild(t3);
			row.appendChild(td3);
			var t4=document.createTextNode(estadoTarea[val.tar_est]!==undefined?estadoTarea[val.tar_est]:"Desconocido");
			var td4=document.createElement('td');
			td4.appendChild(t4);
			row.appendChild(td4);
			row.setAttribute('data-info',JSON.stringify(val));
			body.append(row);
		});
		$('#tab3').show();
		table3 = $('#tab3').DataTable({
			paging: false,
			info:false,
			language: {
				"search": "Buscar Tarea",
				"zeroRecords": "No se encontraron resultados."
			},
			scrollY: 215
		});
		$("#tab3_filter").css('float','left')
		$("#tab3_filter").css('width','50%');
		$("#tab3_filter label").css('text-align','left');
		$("#tab3_filter label").css('float','left');
		$("#tab3_filter input").closest('input').addClass('form-control').css('margin-left','0px');

		var div= document.createElement('div');
		div.setAttribute('style','display:inline;');
		var label=document.createElement('label');
		label.setAttribute('style','width:50%');
		var bot=document.createElement('button');
		bot.setAttribute('type','button');
		bot.setAttribute('class','btn btn-default btn-md');
		bot.setAttribute('id','agregarTask');
		bot.setAttribute('style','margin-left:10px;margin-top:20px;float:right;');
		var span=document.createElement('span');
		span.setAttribute('class','glyphicon glyphicon-plus');
		bot.appendChild(span);
		label.appendChild(bot);
		div.appendChild(label);
		$("#tab3_filter").after(div);

	}, "json").fail(function(evt){console.log("Ocurrio un error")});
}

function modificarTarea(info){
	$("#alertmsg,#alertmsg2").hide();

	var uri=localStorage.getItem("uri")+"clipre/"+info.pre_id;
	// http://192.168.1.12/expofiss/index.php/clipre/12
	$.getJSON(uri, function( data ) {
		localStorage.setItem("client",JSON.stringify(data));
		setTareaInfo(info);
	});

	$('#modal3').modal();

}

function setTareaInfo(info){
	var estruct=JSON.parse(localStorage.getItem('client'));
	$("#usrtaskform .usr_name").html(estruct.pre_con);
	$("#usrtaskform .usr_emp").html(estruct.pre_emp);
	$("#usrtaskform .usr_correo").html(estruct.pre_ema);
	$("#usrtaskform .usr_phone").html(estruct.pre_tel);

	$("#tsk_ini").html(info.tar_fechcre);
	$("#tsk_fin").html(info.tar_fechrea);
	$("#tsk_tipo").html(tipoTarea[info.tar_tip]);
	$("#tsk_des").html(info.tar_des);
	$("#tsk_edo").val(info.tar_est);
	$("#tsk_not").val(info.tar_not);
	$("#moditask").data('task',info.tar_id);
}

$('#wrapclientes').trigger('click');


}); //FUNCTION READY



