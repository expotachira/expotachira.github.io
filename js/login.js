$(function(){
  localStorage.setItem('uri', 'http://expotachira.herokuapp.com/index.php');
$(document).on('keypress',"input[name='passwd']",function(e) {
    if(e.which == 13) {
        $("#submit").trigger('click');
    }
});

$(document).on('keypress',"input[name='login']",function(e) {
    if(e.which == 13) {
        $("input[name='passwd']").trigger('focus');
    }
});

$(document).on('click','#submit',function(){
	$("#alertmsg").hide();
	var bot=this;
	bot.setAttribute('disabled','disabled');


	$.post( localStorage.getItem("uri")+"/login", $("#formlog").serialize(), function( data ) {
		if(data.estatus){
			localStorage.setItem("token",data.item.token);
			localStorage.setItem("usuario",data.item.user);
			location.href="admin.html";
		}
		else{
			$("#alertmsg").html(data.item).show();
		}
	bot.removeAttribute('disabled');
	}, "json").fail(function(){
		$("#alertmsg").html("Ocurrio un error de comunicación");
		bot.removeAttribute('disabled');
	});

});

$(document).on('focus','input',function(){
	$("#alertmsg").hide();
});

});