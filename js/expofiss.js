$(function() {
	stipo = GetURLParameter('stype')|0;
	sid = GetURLParameter('sid')|0;

	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$("[data-required=true]").popover('destroy').removeClass('ms-inv');
		}
	});

	$(document).on("click",".volver",function(e){
		e.preventDefault();
		$("#bodytop").stop().scrollTo( 0,500);
	});

	$(document).on("click",".infobody .submit",function(evt){
		e.preventDefault();
		var form=$('#infoform');
		var cont=0;
		$.each(form.find("[data-required=true]"),function(val,element){
			if($(element).val().length==0){
				$(element).popover('destroy');
				$(element).data('content','Campo obligatorio');
				$(element).addClass('ms-inv');
				$(element).popover('show');
				cont++;
			}
			else if($(element).val().length>0){

			}


		}
			if(cont==0){
				$.post( "http://192.168.1.12/expofiss/index.php/savenew",($(infoform).serialize()+'&pre_ruta='+stipo+'&pre_rutaid='+sid), function( data ) {
					console.warn("----------Resultado----------");
					console.log(data);
				},"json").fail(function(res){
					console.log("se cago");
				});
			}
		});

	$(document).on("blur","[data-required=true]",function(e){
		e.preventDefault();
		if($(this).val().length==0){
			$(this).popover('destroy');
			$(this).data('content','Campo obligatorio');
			$(this).addClass('ms-inv');
			$(this).popover('show');
		}
		else
		{
			$(this).popover('destroy').removeClass('ms-inv');
		}
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
		$('.selectpicker.btn').css("border","none");
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
function Validador(){
    //arguments[0] value
    this.ValidateMonto=  function (){
      return (/^(-)?\d+([\.,]{1}\d+)?$/g.test(arguments[0]))
    }
    //argument [0] value, argument[1] min, arguments[2] max
    this.ValidateDigits=  function (){
      return (/^\d+$/g.test(arguments[0][0]))?((arguments[0][1] === undefined && arguments[0][2] === undefined)?true:(Number(arguments[0][0])>=Number(arguments[0][1]) && Number(arguments[0][0])<=Number(arguments[0][2]))):false;
    }
    //argument[0] value, arguments[1] maxlength
    this.ValidateOnlyText= function (){
      return (/^[a-z]+$/gi.test(arguments[0][0]))?((arguments[0][2]===undefined)?true:(arguments[0][0].length<=arguments[0][2])):false;
    }
    //argument[0] value, arguments[1] maxlength
    this.ValidateTextSize= function (){
      return (/^.+$/gi.test(arguments[0][0]))?((arguments[0][2]===undefined)?false:(arguments[0][0].length<=arguments[0][2])):false;
    }
    //argument[0] value
    this.ValidateDocumentID= function (){
      return /^(V|E|v|e)-\d+(-\d+)?$/.test(arguments[0]);
    }
    //argument[0] value
    this.ValidateEmail=function (){
      return /\S+@\S+\.\S+/.test(arguments[0]);
    }
  }
});
// 'pre_emp' => $vars['empresa'],
// 'pre_con' => $vars['contacto'],
// 'pre_tel' => $vars['telefono'],
// 'pre_ema' => $vars['email'],
// 'pre_tip' => $vars['tipo'],
// 'pre_ruta' => $vars['ruta'],
// 'pre_rutaid' => $vars['rutaid'],

