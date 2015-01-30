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

function check_relationform(){
    var version_text = $('#version_input').val();
    var model_text = $('#model_input').val();
    var tag_text = $('#tag_input').val();
    var hasVersion=true,hasModel=true,hasTag=true;
    var msg = '';
    if(version_text.length == 0){
        msg += '微博版本';
        hasVersion = false;
    }
    if(model_text.length == 0){
        if(hasVersion){
            msg += '仓库'
        }else {
            msg += '、仓库'
        }
        hasModel = false;
    }
    if(tag_text.length == 0){
        if(hasVersion && hasModel){
            msg += '标签';
        }else{
            msg += '、标签'
        }
        hasTag = false;
    }

    if(msg.length == 0){
        return true;
    }else{
        document.getElementById('sub_btn').blur();
        alert(msg+'未选择');
        return false;
    }
}

function check_versionform(){
    var version_name_text = $("#version_name").val();
    if(version_name_text.length == 0){
        document.getElementById('version_name').focus();
        alert('版本名称不能为空');
        return false;
    }
    return true;
}
