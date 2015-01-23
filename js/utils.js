/**
 * Created by zhangqiang5 on 2015/1/23.
 */
function display(version){
    console.log(version);
    document.getElementById('display_btn').value = version;
}

function jumpTo(){
    console.log('jumpTo');
    var objs = document.getElementById("verSelect");
    for(var i=0;i<objs.options.length;i++){
        var value = objs.options[objS.selectedIndex].value;
        if (value == '0'){
            location.href('/wbv/version');
            break;
        }
    }
}
