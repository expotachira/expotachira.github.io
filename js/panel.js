$(function() {

	// Obtener lista de clietes.
$.getJSON('json/listcli.json', function( data ) {
	var body=$("#tab1 tbody");
	var ruta={1:"Google",2:"Facebook",3:"Directo",4:"Sistema"};
	var est={1:"Recien registrado",2:"Recien revisado",3:"-Contactado",4:" En comunicación",5:"No cliente"};
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

		var table1 = $('#tab1').DataTable({
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
});

$.getJSON('json/listask.json', function( data ) {
	var body=$("#tab2 tbody");
	var tipoTarea={1:"Normal",2:"Rápida",3:"Urgente"};
	var estadoTarea={0:"Creada",1:"En proceso",2:"Finalizada"};
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
		var t4=document.createTextNode(estadoTarea[val.pre_est]!==undefined?estadoTarea[val.pre_est]:"Desconocido");
		var td4=document.createElement('td');
		td4.appendChild(t4);
		row.appendChild(td4);
		row.setAttribute('data-info',JSON.stringify(val));
		body.append(row);
	});
		var table2 = $('#tab2').DataTable({
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
});

$(document).on('click','#tab1 tbody>tr',function(evt){
	var estruct=$(this).data('info');
	$("#val_nom").html(estruct.pre_con);
	$("#val_emp").html(estruct.pre_emp);
	$("#val_cor").html(estruct.pre_ema);
	$("#val_tel").html(estruct.pre_tel);
	$("#tab1 tbody>tr").removeClass('active');
	$(this).addClass('active');
});

$(document).on('click','.btnswitch',function(evt){
	$(".btnswitch").removeClass('active');
	$(this).addClass('active');
	$("#sectionclient,#sectiontask").hide();
	$("#tab1_wrapper,#tab2_wrapper").hide();
		$.getJSON('json/taskusr.json', function( data ) {
			var body=$("#tab3 tbody");
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
				var t4=document.createTextNode(estadoTarea[val.pre_est]!==undefined?estadoTarea[val.pre_est]:"Desconocido");
				var td4=document.createElement('td');
				td4.appendChild(t4);
				row.appendChild(td4);
				row.setAttribute('data-info',JSON.stringify(val));
				body.append(row);
			});
				 if(typeof(table3)==="undefined"){
					table3 = $('#tab3').DataTable({
					    paging: false,
					    info:false,
						language: {
						    "search": "Buscar Tarea",
						    "zeroRecords": "No se encontraron resultados."
						  },
						  scrollY: 218
					});
					$("#tab3_filter").css('float','left')
					$("#tab3_filter").css('width','50%');
					$("#tab3_filter label").css('text-align','left');
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
				 }

		});
	$($(this).data('target')).show('fast');
	$($(this).data('conte')).show();

});


});