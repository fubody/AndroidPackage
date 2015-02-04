/**
 * Created by lijie8 on 2015/1/23.
 */
var selected_models = []
var all_models = []

function display(id,model_name) {
    var target = $('#' + id)
    target.html(model_name)
}

function commitAddModel() {
    var model_name = $('#model_display').html();
    if(!isModelAdded(model_name)) {
        selected_models[selected_models.length] = model_name;
        refresh_models_content();
    }
}

function check_form(){
    var version_name = $('#version_input').val();
    if(version_name.length == 0){
        document.getElementById('sub_btn').blur();
        alert('未选择微博版本');
        return false;
    }
    return true;
}

$(document).ready(function() {
    var model_span = $('#models_data');
    if (model_span) {
        var models = model_span.text();
        eval('all_models = ' + models);
    }

    for (var i = 0; i < all_models.length; i++) {
        selected_models[i] = all_models[i].model_name;
    }

    if (selected_models.length == 0) {
        $('#models_content').html('当前未选择任何模块')
    } else {
        refresh_models_content();
    }
})

function refresh_models_content() {
    var models_content_html = '';
    for (var i = 0; i < selected_models.length; i++) {
        var name = selected_models[i];
        models_content_html += get_single_model_html(getModelByName(name));
    }
    $('#models_content').html(models_content_html);
}

function get_single_model_html(model) {
    var model_html = '<div class="well well-sm" style="width: 500px"><span style="margin-right: 20px">' + model.model_name + ':</span>' +
        '<div class="btn-group">' +
        '<div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">' +
        '<a id="' + model.model_name + '_tags_display">选择tag</a><span class="caret"></span></button><ul class="dropdown-menu pull-right">';
    for(var i = 0; i < model.tags.length; i++) {
        var tag = model.tags[i];
        model_html += '<li><a class="btn" onclick="display(\'' + model.model_name + '_tags_display\',\'' + tag + '\')" >' + tag + '</a></li>'
    }
    model_html += '</ul></div>' +
        '<a type="button" class="btn btn-danger" onclick="removeModel(\'' + model.model_name + '\')">删除</a>' +
        '</div></div>';
    return model_html;
}

function removeModel(model_name) {
    var i;
    for(i = 0; i < selected_models.length; i++) {
        if (selected_models[i] == model_name) {
            break;
        }
    }
    selected_models.splice(i,1);
    refresh_models_content();
}

function addModel() {
    $('#add_model').modal();
    $('#model_display').html('选择模块');
    var modal_html_info = '';
    for(var i = 0; i < all_models.length; i++) {
        var model = all_models[i];
        if (!isModelAdded(model.model_name)) {
            modal_html_info += '<li><a class="btn" onclick="display(\'model_display\',\'' + model.model_name + '\')" >' + model.model_name + '</a></li>';
        }
    }
    $('#modal_options').html(modal_html_info);
}

function isModelAdded(model_name) {
    for (var i = 0; i < selected_models.length; i++) {
        if (selected_models[i] == model_name) {
            return true;
        }
    }
    return false;
}

function getModelByName(name) {
    for (var i = 0; i < all_models.length; i++) {
        if (all_models[i].model_name == name) {

            return all_models[i];
        }
    }
}

function suggest_tags() {
    var version_name = $('#weibo_version_name').val();
    if (version_name && version_name.trim().length > 0) {
        var index = version_name.lastIndexOf('_');
        if (index > 0) {
            var suffix = version_name.substring(index);
            for (var i = 0; i < selected_models.length; i++) {
                var name = selected_models[i];
                var model = getModelByName(name);
                for (var j = 0; j < model.tags.length; j ++) {
                    var tag = model.tags[j];
                    //判断tag名后缀与版本名是否一样
                    var tag_index = tag.lastIndexOf('_');
                    if (tag_index > 0) {
                        var tag_suffix = tag.substring(tag_index);
                        if(tag_suffix == suffix) {
                            display(name + '_tags_display',tag);
                        }
                    }
                }
            }
        }
    }
}