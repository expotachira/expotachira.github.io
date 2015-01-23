base="http://expotachira.herokuapp.com/locatarios/index.php";
$(function(){
   $.getJSON(base+"/comerciosuri", function(data) {
    if(data.sucess){
        $("#tablebody").html((Handlebars.templates['listaImagenes'])(data));
      }
  });


   Parse.initialize("Lms9wcmgrtdlh3Xx2U1eAcOYc58j51I01asnjLdJ", "4GFJGXCj83lyvScyKT33IRgchYISxtLlkK5Xg7Yt");
  $(document).on("change",".uploadimage", function(e) {
    if(this.files[0].size&&this.files[0].size<=1048576){
      var fileUploadControl = $(this)[0];
      var load=$(fileUploadControl).next();
      load.removeClass("errorajax sucessajax").addClass("loadajax");
      load.hide().show('fast');
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

              // hacer el post de update y chao
               $.post(base+'/updatelogo/'+$(fileUploadControl).attr("value"),JSON.stringify({ urllogo:photo.url()}), function(data){
                if(data.sucess){
                   load.removeClass("errorajax loadajax").addClass("sucessajax");
                }
                else{
                  load.removeClass("sucessajax loadajax").addClass("errorajax");
                }

               },"json").fail(function(){
                  load.removeClass("sucessajax loadajax").addClass("errorajax");
               });
            },
            error: function(result, error) {
              load.removeClass("sucessajax loadajax").addClass("errorajax");
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
      alert("Tamaño menor a 1mb");
    }
  });// $(document).on("change",".uploadimage"



 }); //ready