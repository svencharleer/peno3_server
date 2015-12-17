/**
 * Created by svenc on 03/11/15.
 */
exports.init = function(ioWeb) {

    ioWeb.on('connection', function (socket) {


        var address = socket.handshake.address;
        console.log('Client connected with id: ' + socket.id + " from " + address.address + ":" + address.port);

        //REGISTER FOR BROADCASTS
        socket.on("register", function (msg) {
            try {
                console.log(msg.groupid + " registered for broadcast");
                var listener = 'listener' + msg.groupid + msg.sessionid;
                socket.join(listener);
                socket.emit('registered', {status: "OK", to: msg.groupid + " " + msg.sessionid});
            }
            catch(e)
            {
                try{
                    console.log("register failed")
                    socket.emit('registered', {status:"NOK", error: e});
                }
                catch(e2)
                {
                    console.log("weird stuff going on in sockets " + e2);
                }
            }


        })
        socket.on('disconnect', function () {

            console.log(socket.id + " disconnecting");

        });
        socket.on("broadcast", function(msg){
            try {
                console.log(msg.groupid + " broadcasted " + msg);
                var listener = 'listener' + msg.groupid + msg.sessionid;
                ioWeb.sockets.in(listener).emit('broadcastReceived', msg.data);
                socket.emit('broadcasted', {status:"OK", to: msg.groupid + " " + msg.sessionid});
            }
            catch(e)
            {
                try{
                    console.log("broadcast failed")
                    socket.emit('broadcasted', {status:"NOK", error: e});
                }
                catch(e2)
                {
                    console.log("weird stuff going on in sockets " + e2);
                }
            }
        })

    });
}