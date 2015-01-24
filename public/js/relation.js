/**
 * Created by lijie8 on 2015/1/23.
 */
function display(id, version_name) {
    var target = $('#'+id)
    target.html(version_name)
}

function displayModel(model_name) {
    var target = $('#model_display')
    target.html(model_name)
}