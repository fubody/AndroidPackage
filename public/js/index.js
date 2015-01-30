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
    var data_span = $('#service_data');
    if (data_span) {
        var data_string = data_span.text()
        eval('service_data = ' + data_string)
        if (service_data) {
            var tasks = service_data.tasks;
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

            var page_index = parseInt(service_data.page_index);
            var page_count = parseInt(service_data.page_count);
            var navigator_html = '';
            if (page_count && page_index) {
                var start = page_index - 4 > 0 ? page_index -4 : 1;
                var end = page_index + 4 < page_count ? page_index + 4 : page_count;
                if (page_index > 1) {
                    navigator_html += '<li><a href="/?p=' + (page_index - 1) + '">&laquo;</a></li>';
                } else {
                    navigator_html += '<li><a class="disabled">&laquo;</a></li>';
                }
                for (var i = start; i <= end; i++) {
                    if (i == page_index) {
                        navigator_html += '<li><a class="active" href="#">' + i + '</a></li>';
                    } else {
                        navigator_html += '<li><a href="/?p=' + i + '">' + i + '</a></li>';
                    }
                }
                if (page_index < page_count) {
                    navigator_html += '<li><a href="/?p=' + (page_index + 1) + '">&raquo;</a></li>';
                } else {
                    navigator_html += '<li><a class="disabled">&raquo;</a></li>';
                }
            } else {
                navigator_html += '<li><a class="active" href="#">1</a></li>';
                navigator_html += '<li><a class="disabled">&raquo;</a></li>';
            }
            $('#page_navigation').html(navigator_html)
        }
    }
}

$(function () {
    var page = $('#page1');
    var options;
    options = {
        bootstrapMajorVersion: 3,
        currentPage: page.attr('pageNum'),//选中页
        totalPages: page.attr('pageCount'),//总页数
        pageUrl: function (type, page, current) {
            return '/index?p=' + page;
        }
    };
    $('#page1').bootstrapPaginator(options);
})