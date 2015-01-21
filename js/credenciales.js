$.getJSON( localStorage.getItem('uri')+"/expotachira_apisite/index.php/comercios", function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<tr><td>"+val.nombre"</td><td>"+val.stand+"</td><td>"+val.pabellon+"</td><td>"+val.credencial+"</td><td>"+val.status+"</td></tr>" );
  });
 	
 
   
    var html = items.join( "" )
    console.log(html)
   $( "#comerciosCre").append(html);
});



