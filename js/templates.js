(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['mainPost'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"col-xs-12 col-sm-12 col-md-4 col-lg-4\">\n    <div class=\"row\">\n             \n        <div class=\"product-chooser-item col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n\n            <a href=\"#/noticias/"
    + escapeExpression(((helper = (helper = helpers.postName || (depth0 != null ? depth0.postName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"postName","hash":{},"data":data}) : helper)))
    + "\"><img src=\""
    + escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\"  class=\"img-responsive col-xs-4 col-sm-4 col-md-12 col-lg-12\" alt=\"Mobile\">\n            </a>\n\n            <div class=\"parrafo col-xs-8 col-sm-8 col-md-12 col-lg-12\">\n                <span class=\"title\"><a href=\"#/noticias/"
    + escapeExpression(((helper = (helper = helpers.postName || (depth0 != null ? depth0.postName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"postName","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</a></span>\n                <span class=\"description\">";
  stack1 = ((helpers.truncate || (depth0 && depth0.truncate) || helperMissing).call(depth0, (depth0 != null ? depth0.description : depth0), 150, {"name":"truncate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\n                <input type=\"radio\" name=\"product\" value=\"mobile\">\n            </div>\n\n            <div class=\"clear\"></div>\n             </div>\n     \n        </div>\n        \n    </div>\n</div>";
},"useData":true});
templates['postModal'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span>\n            </button>\n            <h4 class=\"modal-title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h4>\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"row\">\n                <div class=\"col-md-12 col-xs-12\">\n                    <div>\n                        <div class=\"imagenes_not\">\n                        ";
  stack1 = ((helpers.ifimg || (depth0 && depth0.ifimg) || helperMissing).call(depth0, (depth0 != null ? depth0.photo : depth0), {"name":"ifimg","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n                        </div>\n                        </br>\n                        ";
  stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n                    </div>\n                </div>\n            </div>\n\n        </div>\n        <div class=\"modal-footer\">\n\n        </div>\n    </div>\n</div>";
},"useData":true});
})();