$(function(){
	$(document).on('click','.volver',function(e){
		e.preventDefault();
		$('#bodytop').stop().scrollTo( 0,500);
	});

}); //FUNCTION READY

