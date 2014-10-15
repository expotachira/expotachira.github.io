$(function(){
	localStorage.setItem('uri', 'http://expotachira.herokuapp.com/index.php');
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('[data-required=true]').popover('destroy').removeClass('ms-inv');
			$('button.ms-inv').removeClass('ms-inv');
		}
	});
	$(document).on('click','#wrapclientes',function(evt){
		localStorage.setItem('cli','0');
		$(".btnswitch").removeClass('active');
		$(this).addClass('active');
		$("#newclient").hide();

   var uri=localStorage.getItem('uri')+'/allclient';
	$.getJSON(uri, function( data ) {
		var body=$("#tab1 tbody");

		$('#tab1').dataTable().fnDestroy();
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
				$(".dataTables_scrollHeadInner").css('padding-left','0px');
				$("#tab1_filter input").closest('input').addClass('form-control').css('margin-left','0px');

				$("#tagg").show();
				$("#tab1_wrapper").show('fast');

	}); //getson clients

	});

	$(document).on('click','#wrapadd',function(evt){
			localStorage.setItem('cli','0');
			cargarZonas();
			limpiarMTS();
			limpiarStands();
			$(".btnswitch").removeClass('active');
			$(this).addClass('active');
			$("#tab1_wrapper").hide();
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
					cont++;
				}
			}
		});
		if(cont==0){
			var datos=($(form).serialize());
			$.post( localStorage.getItem('uri')+'/saveclient',datos, function( data ) {
				$('.alert').hide();
				if(data.estatus){
					$("#alertmsg").show();
					$("#st_rif, #st_razon, #st_contacto, #st_telf, #st_correo").val('');
					limpiarZonas();
					limpiarMTS();
					limpiarStands();
					cargarZonas();
					// guardado exitoso
				}
				else{
					$("#alerterror").show();
					// currio un error
				}
				bot.removeAttribute('disabled');
			},'json').fail(function(res){
				bot.removeAttribute('disabled');
				$("#alerterror").show();
			});
		}
		else{
			bot.removeAttribute('disabled');
		}
		// Registrar el cliente y actualizar el stand
		// console.log($('#addform').serialize());
	});



	$('#st_zona').change( function() {
		$("button[data-id='st_zona']").removeClass('ms-inv');
		$(this).find(":selected").each(function () {
			if( $(this).val()!=0 ){
				limpiarStands();
				cargarMTS($(this).val());
			}
		});
	});
	$('#st_mts').change( function() {
		$("button[data-id='st_mts']").removeClass('ms-inv');
		$(this).find(":selected").each(function () {
			if( $(this).val()!=0 ){
				cargarStands($('#st_zona').val(),$(this).val());
			}
		});
	});
	$('#st_stand').change( function() {
		$("button[data-id='st_stand']").removeClass('ms-inv');
	});

	function cargarZonas(){
		$('.selectpicker').attr('disabled', 'disabled').selectpicker('refresh');
		$.getJSON( localStorage.getItem('uri')+'/zonas', function( data ) {
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
		$.getJSON( localStorage.getItem('uri')+'/meters/'+idzona, function( data ) {
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
		$.getJSON( localStorage.getItem('uri')+'/stands/'+idzona+'/'+idmts, function( data ) {
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
	$('.selectpicker').selectpicker();
	$('#wrapclientes').trigger('click');

});