	base='http://expotachira.herokuapp.com/locatarios/index.php';
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
	$("#modulo1").show('fast');
	$(document).on("submit","#formprint",function(evt){
		evt.preventDefault();

		var inputval=$(this).find("input").val();
		var boton=$(this).find("button");
		var form=this;
		$(form).find('p').remove();
		boton.button("loading");
		var uri=base+'/validartoken/'+inputval;
		$.get(uri, function(data){
			if(data.sucess){
				$("#modulo1").hide();
				$.validate({
					form : '#formgenerar',
					language: spanish,
					 validateOnBlur : true, // disable validation when input looses focus
					 errorMessagePosition : 'top',
					 scrollToTopOnError : false,
					 showHelpOnFocus : false,
					addSuggestions : false
				});
				$("#modulo2").show('fast');
			}
			else{
				boton.button("reset");
				$(form).append("<p class='error' style='color:red;'> Error en el token.</p>")
			}
		},"json").fail(function() {
			boton.button("reset");
		});
	});

	$(document).on("submit","#formgenerar",function(evt){
		evt.preventDefault();
		 canti=$("#selectcanti").val();
		 tipo=$("#selectipo").val();
		datacredi=new Array(parseInt(canti));
		var crediTemplate = Handlebars.templates['crearCredenciales'];
		var htmlCredi = crediTemplate(datacredi);
		$("#form2").empty();
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
		$("#contentsearch").show('fast');
	});

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

		$.post((base+"/create/credencial/"+tipo),JSON.stringify(form2),function(data){
			if(data.sucess){
				$("#form2").hide();
				$("#form2").empty();

				fillpaso3(data.idacti);
				$("#paso3").show('slow');
			}
			else{
				boton.button("reset");
			}
		},"json").fail(function() {
			boton.button("reset");
		});
	});

	function fillpaso3(idacti){
		var uri= base+'/credenciales2/'+idacti;
		$.get(uri,function(data){
			if(data.sucess){
				var html='<h3>Imprimir</h3><br/><div class="list-group">';
				$.each(data.items, function(index, val) {
					var link='imprimir.html'+val;
  						html=html+'<a href='+link+' target="_blank" class="list-group-item">Imprimir Pagina '+(index+1)+'</a>';
				});
				html=html+'</div>';
		}
			$("#form2").html(html);
			$("#form2").show('fast');
		},"json");

	}

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
	});// $(document).on("change",".uploadimage"
});