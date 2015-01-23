	base='http://expotachira.herokuapp.com/index.php';
	sclient = GetURLParameter('sclient')||0;

	var spanish = {
		errorTitle: 'No se pudo guardar!',
		requiredFields: 'Debes llenar este campo.',
		badTime: 'You have not given a correct time',
		badEmail: 'You have not given a correct e-mail address',
		badTelephone: 'You have not given a correct phone number',
		badSecurityAnswer: 'You have not given a correct answer to the security question',
		badDate: 'You have not given a correct date',
		lengthBadStart: 'Debe contener entre ',
		lengthBadEnd: ' caracteres minimo',
		lengthTooLongStart: 'Contraseña muy larga. ',
		lengthTooShortStart: 'Contraseña muy corta. ',
		notConfirmed: 'Verifica que las contraseñas sean iguales.',
		badDomain: 'Incorrect domain value',
		badUrl: 'The answer you gave was not a correct URL',
		badCustomVal: 'Revisa los valores introducidos, tienes un error.',
		badInt: 'The answer you gave was not a correct number',
		badSecurityNumber: 'Your social security number was incorrect',
		badUKVatAnswer: 'Incorrect UK VAT Number',
		badStrength: 'The password isn\'t strong enough',
		badNumberOfSelectedOptionsStart: 'You have to choose at least ',
		badNumberOfSelectedOptionsEnd: ' answers',
		badAlphaNumeric: 'The answer you gave must contain only alphanumeric characters ',
		badAlphaNumericExtra: ' and ',
		wrongFileSize: 'El archivo debe ser menor a 1Mb de tamaño',
		wrongFileType: 'The file you are trying to upload is of wrong type',
		groupCheckedRangeStart: 'Please choose between ',
		groupCheckedTooFewStart: 'Please choose at least ',
		groupCheckedTooManyStart: 'Please choose a maximum of ',
		groupCheckedEnd: ' item(s)'
	};



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

	$(function(){
	$.formUtils.addValidator({
		name : 'phoneVe',
		validatorFunction : function(value, $el, config, language, $form) {
			var patt = new RegExp(/^(0414|0424|0412|0416|0426)\d{7}$/g);
			var res = patt.test(value);
			return res
		},
		errorMessage : 'Formato de teléfono inválido.',
		errorMessageKey: 'badEvenNumber'
	});

	$.formUtils.addValidator({
		name : 'cedulaVe',
		validatorFunction : function(value, $el, config, language, $form) {
			var patt2 = new RegExp(/^[VvEePpJj]\d{6,11}$/g);
			var res2 = patt2.test(value);
			return res2
		},
		errorMessage : 'Formato de cédula inválido.',
		errorMessageKey: 'badEvenNumber'
	});
		$.validate({
			modules : 'file',
			form:"#form1",
			language: spanish
		});
		$('[rel=tooltip]').tooltip();
		$('#fdetalle').restrictLength( $('#pres-max-length') );
		$('#fnombrecomer').restrictLength( $('#pres-max-length2') );
		var rama=[{"tipo_id":"Alimentos y Bebidas","tipo_des":"Alimentos y Bebidas"},{"tipo_id":"Licores","tipo_des":"Licores"},{"tipo_id":"Articulos del Hogar","tipo_des":"Articulos del Hogar"},{"tipo_id":"Articulos del Taller","tipo_des":"Articulos del Taller"},{"tipo_id":"Automoviles y Vehiculos","tipo_des":"Automoviles y Vehiculos"},{"tipo_id":"Articulos para bebes","tipo_des":"Articulos para bebes"},{"tipo_id":"Hogar y Decoracion","tipo_des":"Hogar y Decoracion"},{"tipo_id":"Construcci\u00f3n y Herramientas","tipo_des":"Construcci\u00f3n y Herramientas"},{"tipo_id":"Cosmetica y Perfumeria","tipo_des":"Cosmetica y Perfumeria"},{"tipo_id":"Electrodomesticos","tipo_des":"Electrodomesticos"},{"tipo_id":"Fotografia","tipo_des":"Fotografia"},{"tipo_id":"Computacion","tipo_des":"Computacion"},{"tipo_id":"Instrumentos Musicales","tipo_des":"Instrumentos Musicales"},{"tipo_id":"Joyeria","tipo_des":"Joyeria"},{"tipo_id":"Libros","tipo_des":"Libros"},{"tipo_id":"Ropa Moda y Accesorios","tipo_des":"Ropa Moda y Accesorios"},{"tipo_id":"Pet Shop","tipo_des":"Pet Shop"},{"tipo_id":"Telefonia","tipo_des":"Telefonia "},{"tipo_id":"Turismo","tipo_des":"Turismo"},{"tipo_id":"Repuestos de vehiculos","tipo_des":"Repuestos de vehiculos"},{"tipo_id":"Otros","tipo_des":"Otros"}];
		$('.bodyform .selectpicker').append('<option></option>');
		$.each(rama, function(index, val) {
			$('.bodyform .selectpicker').append($("<option></option>").attr("value", val.tipo_id).text(val.tipo_des));
		});
		$('.selectpicker').selectpicker();

	if(sclient!=0){

			$("#paso1,#paso2").hide();
			var uri=base+"/infoclient/"+sclient;

			$.get(uri, function(data){

				if(data.sucess){
					info=data;
					if(data.activa==0){
						$("#fnombre").html(data.items.nombre);
						$("#fpabellon").html(data.items.pabellon);
						$("#fstands").html(data.items.stand);
						$("#paso3,#paso2").hide();
						$("#paso1").show();
					}
					else{
						$("#paso1,#paso2").hide();
						fillpaso3();
						$("#paso3").show();
					}
				}
				else{
					window.location.assign("index.html")
				}

			},"json");

			Parse.initialize("Lms9wcmgrtdlh3Xx2U1eAcOYc58j51I01asnjLdJ", "4GFJGXCj83lyvScyKT33IRgchYISxtLlkK5Xg7Yt");
			$(document).on("change",".uploadimage", function(e) {
				if(this.files[0].size&&this.files[0].size<=1048576){
					var fileUploadControl = $(this)[0];
					$(fileUploadControl).closest('form').find("button[type='submit']").prop( "disabled", true );;
					var load=$(fileUploadControl).next();
					load.removeClass("errorajax sucessajax").addClass("loadajax");
					load.show('fast');
					var file = fileUploadControl.files[0];
					if(typeof file !="undefined"){
						var name = file.name.replace(/[^a-zA-Z\d\.]/g);
						var parseFile = new Parse.File(name, file);

						parseFile.save().then(function() {
							var jobApplication = new Parse.Object("JobApplication");
							jobApplication.set("applicantName", "Expotachira");
							jobApplication.set("profileImage", parseFile);
							jobApplication.save(null,
							{
								success: function(result) {
									var photo = result.get("profileImage");
									$(fileUploadControl).attr("value",photo.url());
									load.removeClass("errorajax loadajax").addClass("sucessajax");
									$(fileUploadControl).closest('form').find("button[type='submit']").prop( "disabled", false );;

								},
								error: function(result, error) {
									load.removeClass("sucessajax loadajax").addClass("errorajax");
									$(fileUploadControl).closest('form').find("button[type='submit']").prop( "disabled", false );;

								}
							});
						}, function(error) {
							load.removeClass("sucessajax loadajax").addClass("errorajax");
						});
					}
					else{
						$(fileUploadControl).attr("value","");
						load.hide('fast');
					}
		}//Si el size <= 1M
		else{
			return false;
		}
	});//evento agregados a todas los files con clase uploadimage
	$("#form2").submit(function(data){
		var images=new Array();
		$.each( $("#form2 .uploadimage"),function(key,val){
			var tamp=val.getAttribute('value');
			images.push(tamp);
		});
		var cedulas=new Array();
		$.each( $("#form2 .cedula"),function(key,val){
			cedulas.push(val.value);
		});
		var nombres=new Array();
		$.each( $("#form2 .nombre"),function(key,val){
			nombres.push(val.value);
		});
		var telefonos=new Array();
		$.each( $("#form2 .telefono"),function(key,val){
			telefonos.push(val.value);
		});

		form2={img:images,ci:cedulas,nombrs:nombres, telef:telefonos};
	});

	$(document).on("submit","#form2",function(evet){
		evet.preventDefault();
		var boton=$(this).find("button[type='submit']");
		boton.button("loading");

		$.post((base+"/create/stand/"+info.items.id),JSON.stringify(form2),function(data){
			if(data.sucess){
				$("#paso2").hide();
				 //CARGAR EL TEMPLTE DE IMPRESION
				// datacredi=new Array(parseInt(info.items.credencial));
				// var crediTemplate = Handlebars.templates['fillCredencial'];
				// var htmlCredi = crediTemplate(datacredi);
				// $("#form2").prepend(htmlCredi);
				fillpaso3();
				$("#paso3").show('slow');
			}
			else{
				boton.button("reset");
			}
		},"json").fail(function() {
			boton.button("reset");
		});
	});

	function fillpaso3(){
		var uri= base+'/credenciales/'+info.items.id;
		$.get(uri,function(data){
			if(data.sucess){
				var html='<div class="list-group">';
				$.each(data.items, function(index, val) {
					var link='imprimir.html'+val;
  						html=html+'<a href='+link+' target="_blank" class="list-group-item">Pg. '+(index+1)+'</a>';
				});
				html=html+'</div>';
		}
			$("#showprint").html(html);
		},"json");

	}
	$("#form1").submit(function(data){
		form1={
			segmento:document.getElementById("selectpick").value,
			fkeyset:document.getElementById("fkeyset").value,
			fdetalle:document.getElementById("fdetalle").value,
			fnombrecomer:document.getElementById("fnombrecomer").value,
			urllocal:document.getElementById("urllocal").getAttribute("value")
		};
	});

	$(document).on("submit","#form1",function(evet){
		evet.preventDefault();
		var boton=$(this).find("button[type='submit']");
		boton.button("loading");
		if(info.activa==0){
			$.post((base+"/update/"+info.items.id),JSON.stringify(form1),function(data){
				if(data.sucess){
					$("#paso1").hide();
					datacredi=new Array(parseInt(info.items.credencial));
					var crediTemplate = Handlebars.templates['fillCredencial'];
					var htmlCredi = crediTemplate(datacredi);
					$("#form2").prepend(htmlCredi);
					var errorPlace = $('#errormsg')
					$.validate({
						form : '#form2',
						modules : 'file',
						language: spanish,
						 validateOnBlur : true, // disable validation when input looses focus
						 errorMessagePosition : errorPlace,
						 scrollToTopOnError : false,
						 showHelpOnFocus : false,
						 addSuggestions : false
					 });
					$("#paso2").show('slow');
				}
				else{
					boton.button("reset");
				}
			},"json").fail(function() {
				boton.button("reset");
			});
		}
		else{
			$("#paso1").hide();
				// llenar el paso de imprimir
				// $("#form2").prepend(htmlCredi);
				// $("#paso2").show('slow');
				boton.button("reset");
			}
			// hacer la logia de validacion y guardado.
		});



	} //sclient!=0
	else{
		window.location.assign("index.html")
	}


});
