/**
 * Created by Finnishandy on 19/04/15.
 */
var ipc=require('node-ipc');

ipc.config.id   = 'world';
ipc.config.retry= 1500;

ipc.serve(
    function(){
        ipc.server.on(
            'message',
            function(data,socket){
                ipc.log('got a message : '.debug, data);
                ipc.server.emit(
                    'message',
                    data+' world!'
                );
            }
        );
    }
);

ipc.server.start();
