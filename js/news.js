var template = Handlebars.templates['mainPost'];
Parse.initialize("Lms9wcmgrtdlh3Xx2U1eAcOYc58j51I01asnjLdJ", "4GFJGXCj83lyvScyKT33IRgchYISxtLlkK5Xg7Yt");
var Post = Parse.Object.extend("Post");
var query = new Parse.Query(Post);
query.descending('createdAt');
query.limit(3);
query.find().then(function(results) {
        for (var i = 0; i < results.length; i++) {
            var object = results[i];
            ////console.log(object.get('thumbnail'))
            var html = template({
                id: object.id,
                postName: object.get('postname'),
                title: object.get('title'),
                description: object.get('content'),
                thumbnail: object.get('thumbnail').thumbnail.replace("http://", "http://i1.wp.com/")
            });
            $("#newsPost").append(html);
        }
    },
    function() {
        //console.log('Failed loading posts');
    });


var viewPost = function(postname) {


    var postTemplate = Handlebars.templates['postModal'];

    query.equalTo("postname", postname);
    query.first({
        success: function(fullpost) {
            //console.log(fullpost.get('title'));
            var postM = postTemplate({
                id: fullpost.id,
                photo: fullpost.get('photos')[1][0],
                photos: fullpost.get('photos')[1],
                postName: fullpost.get('postname'),
                title: fullpost.get('title'),
                content: fullpost.get('content').replace(/\n/g, "<br>"),
                thumbnail: fullpost.get('thumbnail').thumbnail
            });
            $("#newsmodal").html(postM);
            $('#newsmodal').modal('show')
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
};

var routes = {
    '/noticias/:postName': viewPost
};

var router = Router(routes);

router.init();

$('#newsmodal').on('hidden.bs.modal', function(e) {
    history.pushState({}, '', '/');
})


Handlebars.registerHelper('truncate', function(str, len) {
    try {
        if (str.length > len && str.length > 0) {
            var new_str = str + " ";
            new_str = str.substr(0, len);
            new_str = str.substr(0, new_str.lastIndexOf(" "));
            new_str = (new_str.length > 0) ? new_str : str.substr(0, len);

            return new Handlebars.SafeString(new_str + '...');
        }
    } catch (e) {
        // statements to handle any exceptions
        //console.log(e); // pass exception object to error handler
    }

    return str;
});


Handlebars.registerHelper('ifimg', function(str) {
    try {
        url = Handlebars.Utils.escapeExpression(str);
        if (str.length > 0) {
            var result = '<img src="' + url + '" alt="">';
            return new Handlebars.SafeString(result);
        }
    } catch (e) {
        return;

    }
});
