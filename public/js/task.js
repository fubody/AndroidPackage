/**
 * Created by lijie8 on 2015/1/23.
 */
function display(version_name) {

    var target = $('#version_display')
    target.html(version_name)
    target = $('#version_input')
    target.val(version_name)
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