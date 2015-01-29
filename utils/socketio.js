//ScoketIO.prototype.task_created = function(task) {
//	this.io.sockets.emit('task_created', task);
//}
//
//ScoketIO.prototype.task_status_changed = function(task) {
//	this.io.sockets.emit('task_status_changed', task);
//}
//
//ScoketIO.prototype.task_test_status_changed = function(task) {
//	this.io.sockets.emit('task_test_status_changed', task);
//}

module.exports.init = function(server) {
	var io = require('socket.io');
	return io.listen(server)
}

module.exports.task_created = function (task) {
	global.io.sockets.emit('task_created', task)
}

module.exports.task_status_changed = function (task) {
	global.io.sockets.emit('task_status_changed', task)
}