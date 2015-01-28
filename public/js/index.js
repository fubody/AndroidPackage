/**
 * Created by lijie8 on 2015/1/27.
 */
$(document).ready(function() {

    // socket.on('task_created', function (data) {
    // 	console.log('task_created : ', data);
    // });

    var socket = io();
    socket.on('task_created', function (data) {
        alert('task_created:');
        console.log('task_created:' + data)
        //refresh_task_status(data);
    });

})