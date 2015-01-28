/**
 * Created by lijie8 on 2015/1/26.
 */
child_process = require('child_process')
fs = require('fs')
path = require('path')

//var root_dir = path.resolve(process.argv[1],'../'),
//    build_root_dir = path.join(root_dir, 'build'),
//    source_root_dir = path.join(build_root_dir, 'source'),
//    output_root_dir = path.join(build_root_dir, 'output'),
//    script_root_dir = path.join(build_root_dir, 'script'),
//    temp_root_dir = path.join(build_root_dir, 'temp')
var source_root_dir = './build/source',
    output_root_dir = '.\\build\\output'

module.exports.package = function (task) {
    console.log('try to package')
    var stdout = fs.openSync('./build/script/stdout.txt','a')
    var stderr = fs.openSync('./build/script/stderr.txt','a')
    var args = []
    var add_build_arg = function(arg) {
        args[args.length] = arg
    }
    add_build_arg(task.id)
    add_build_arg(source_root_dir)
    add_build_arg(output_root_dir)
    package = child_process.spawn('.\\build\\script\\package.bat',args,{stdio: ['ignore', stdout, stderr]})
    package.on('exit', function(code){
        console.log(code)
    })
}