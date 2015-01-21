base="http://expotachira.herokuapp.com/locatarios/index.php";
$(function(){


   //$.getJSON( localStorage.getItem('uri')+"/expotachira_apisite/index.php/comercios", function( data ) {
   $.getJSON(base+"/acreditaciones", function(data) {
       var items = [];
       $.each(data, function(key, val) {
          var tagged="";
          $.each(val.credenciales,function(index, val) {
              var link='imprimir.html'+val;
              tagged=tagged+'<a href='+link+' target="_blank" class="list-group-item">Pagina '+(index+1)+'</a>';
           });
           items.push("<tr data-credi='"+val.credenciales+"'><td>" + val.comercio + "</td><td>"+tagged+"</td></tr>");
       });

       var html = items.join("")
       $("#comerciosCre").append(html);

      });

 }); //ready


