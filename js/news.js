function output(data) {
    //console.log(data);
}

function getImage(data) {

    var patt = new RegExp(/i2.wp/g);
    var res = patt.test(data);

    if (res) {
        return data

    } else {
        return data.replace("http://", "http://i1.wp.com/")
    }
}



var template = Handlebars.templates['mainPost'];
Parse.initialize("Lms9wcmgrtdlh3Xx2U1eAcOYc58j51I01asnjLdJ", "4GFJGXCj83lyvScyKT33IRgchYISxtLlkK5Xg7Yt");
var Post = Parse.Object.extend("Post");
var query = new Parse.Query(Post);
query.descending('wpId');
query.limit(3);
query.find().then(function(results) {
        for (var i = 0; i < results.length; i++) {
            var object = results[i];
            var html = template({
                id: object.id,
                postName: object.get('postname'),
                title: object.get('title'),
                description: object.get('content'),
                thumbnail: getImage(object.get('thumbnail').thumbnail)
                    //.replace("http://", "http://i1.wp.com/")
            });
            $("#newsPost").append(html);
        }
    },
    function() {

    });
var step = 0;
var limit;
query.count({
    success: function(count) {
        // The count request succeeded. Show the count
        limit = count;
    },
    error: function(error) {
        // The request failed
    }
});

var viewPost = function(postname) {


    var postTemplate = Handlebars.templates['postModal'];
    var Post = Parse.Object.extend("Post");
    var query = new Parse.Query(Post);
    query.equalTo("postname", postname);
    query.first({
        success: function(fullpost) {

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



var viewEvent = function(id) {


    var eventTemplate = Handlebars.templates['eventosModal'];

    $.getJSON("evento.json", function(data) {
        var evento = _.where(data.items, {
            id: id
        })

        var eventM = eventTemplate({
            nombre: evento[0].nombre,
            descripcion: evento[0].descripcion,
            banner:evento[0].urlflayer,
            inicio:evento[0].fini,
            fin:evento[0].ffin
        });
        $("#eventModal").html(eventM);
       
    });
    $('#eventModal').modal('show');

};


var routes = {
    '/noticias/:postName': viewPost,
    '/eventos/:id': viewEvent,
};

var router = Router(routes);

router.init();

$('#newsmodal').on('hidden.bs.modal', function(e) {
    history.pushState({}, '', '/');
})
$('#eventModal').on('hidden.bs.modal', function(e) {
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





$("#ff").click(function() {
    output(step);

    function steps(steps, limit) {
        current = steps - 1;
        if ((current > 0) && (current <= limit)) {
            output(current);
            return current;
        } else {
            return 0
        }
    }

    query.descending('wpId');
    query.skip(steps(step, limit));
    query.limit(3);
    query.find().then(function(results) {
            $("#newsPost").html("");
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                var html = template({
                    id: object.id,
                    postName: object.get('postname'),
                    title: object.get('title'),
                    description: object.get('content'),
                    thumbnail: getImage(object.get('thumbnail').thumbnail)
                        //.replace("http://", "http://i1.wp.com/")
                });
                $("#newsPost").append(html);
            }
        },
        function() {});
    if (step < 0) {
        step = 0;
    } else {
        step = step - 1;
    }


});

$("#rw").click(function() {
    output(step);

    function steps(steps, limit) {
        current = steps + 1;
        currentLimit = current + 2;
        if ((current > 0) && (currentLimit < limit)) {
            output("rw current: " + current);
            return current;
        } else {
            return
        }
    }

    query.descending('wpId');
    query.skip(steps(step, limit));
    query.limit(3);
    query.find().then(function(results) {
            $("#newsPost").html("");
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                var html = template({
                    id: object.id,
                    postName: object.get('postname'),
                    title: object.get('title'),
                    description: object.get('content'),
                    thumbnail: getImage(object.get('thumbnail').thumbnail)
                        //
                });
                $("#newsPost").append(html);
            }
        },
        function() {});
    step = step + 1;

});
