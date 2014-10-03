$(function() {

	$('.volver').click(function(e){
		e.preventDefault();
		$("#bodytop").stop().scrollTo( 0,500);
	});

	$('ul.menu li').click(function(e){
		e.preventDefault();
		var elemento=this;
		$('ul.menu li').removeClass('active');
		$(elemento).addClass('active');
	});

});



