/**
 * Created by lijie8 on 2015/1/23.
 */
function display(display_id,input_id, version_name) {
    var target = $('#'+display_id)
    target.html(version_name)
    target = $('#'+input_id)
    target.val(version_name)
}

function displayModel(model_name) {
    var target = $('#model_display')
    target.html(model_name)
    target = $('#model_input')
    target.val(model_name)
    var tag_menu = $('#tag_menu')
    tag_menu.html("")
    for (var i =0; i<models.length;i++) {
        if (models[i].model_name == model_name) {

            for (var j = 0; j < models[i].tags.length; j++) {
                tag_menu.append("<li><a onclick=\"display(\'tag_display\',\'tag_input\',\'" + models[i].tags[j].tag_name + "\')\" class=\"btn\">" + models[i].tags[j].tag_name + "</a></li>")
            }
            break;
        }
    }
}
