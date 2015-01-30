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
    });

    render_tasks_table();
})

function create_single_tr(task) {

    var result_tr = '<td>' + task.id + '</td>' + '<td>' + task.status_code + '</td>' +
        '<td>' + task.create_at + '</td>' + '<td>' + task.finish_at + '</td>' +
        '<td>' + task.app_version + '</td>' + '<td>' + task.value_desc + '</td>' +
        '<td><a target="_blank" href="../task/' + task.id + '">查看</a></td>';
    if (task.log_path) {
        result_tr +=  '<td><a target="_blank" href="../task/' + task.id + '/download' + '?file_name=' + task.log_path + '">下载</a></td>';
    } else {
        result_tr += '<td></td>'
    }
    if (task.zip_path) {
        result_tr +=  '<td><a target="_blank" href="../task/' + task.id + '/download' + '?file_name=' + task.zip_path + '">下载</a></td>';
    } else {
        result_tr += '<td></td>'
    }
    if (task.apk_path) {
        result_tr +=  '<td><a target="_blank" href="../task/' + task.id + '/download' + '?file_name=' + task.apk_path + '">下载</a></td>';
    } else {
        result_tr += '<td></td>'
    }
    return result_tr;
}

function render_tasks_table() {
    var tasks_span = $('#tasks_data');
    if (tasks_span) {
        var tasks_string = tasks_span.text()
        eval('tasks = ' + tasks_string)
        if (tasks && tasks.length > 0) {
            var task_html_info = '';
            for (var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                task_html_info += '<tr task_id=' + task.id + '>'+ create_single_tr(task) + '</tr>\n';
            }
            $('#tasks_table').html(task_html_info)
        } else {
            var task_html_info = '<tr><td colspan="10">暂无数据</td></tr>'
            $('#tasks_table').html(task_html_info)
        }
    }
}
