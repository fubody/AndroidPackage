/**
 * Created by lijie8 on 2015/1/27.
 */
$(document).ready(function() {

    // socket.on('task_created', function (data) {
    // 	console.log('task_created : ', data);
    // });

    var socket = io();
    socket.on('task_created', function (data) {
        console.log('task_created:' + data)
        //refresh_task_status(data);
    });

    socket.on('task_status_changed', function(task){
        var target_tr = $("[task_id='"+ task.id +"']");
        if (target_tr) {
            target_tr.html(create_single_tr(task))
            target_tr.css('background-color', 'yellow');
        }
    })

})

function create_single_tr(task) {

    return '<td>' + task.id + '</td>' + '<td>' + task.status_code + '</td>' +
        '<td>' + task.create_at + '</td>' + '<td>' + task.finish_at + '</td>' +
        '<td>' + task.app_version + '</td>' + '<td>' + task.value_desc + '</td>' +
        '<td><a target="_blank" href="../task/' + task.id + '">查看</a></td>' +
        '<td><a target="_blank" href="../task/' + task.id + '/download_apk' + '">下载</a></td>' +
        '<td><a target="_blank" href="#">下载</a></td>' +
        '<td><a target="_blank" href="#">下载</a></td>';

}