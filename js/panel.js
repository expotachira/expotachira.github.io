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
		var table1 = $('#tab1').DataTable({
		    paging: false,
		    info:false,
			language: {
			    "search": "Buscar Clientes",
			    "zeroRecords": "No se encontraron resultados."
			  },
			  scrollY: 400
		});
		$("#tab1_filter input").closest('input').addClass('form-control');
		$("#tab1").addClass('table-hover');

		// new $.fn.dataTable.FixedHeader(table1);
});

$.getJSON('json/listcli.json', function( data ) {
	var body=$("#tab2 tbody");
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
		var table1 = $('#tab2').DataTable({
		    paging: false,
		    info:false,
			language: {
			    "search": "Buscar Tareas",
			    "zeroRecords": "No se encontraron resultados."
			  },
			  scrollY: 400
		});
		$("#tab2_filter input").closest('input').addClass('form-control');
		$("#tab2").addClass('table-hover');
		// new $.fn.dataTable.FixedHeader(table1);
});

$(document).on('click','#tab1 tbody>tr',function(evt){
	var estruct=$(this).data('info');
	$(this).addClass('active');
	console.log(estruct);
});

$(document).on('click','.btnswitch',function(evt){
	$(this).addClass('active');
	$('.tables').hide();
	$($(this).data('target')).show('fast');

});


});
