'use strict';

const fs = require('fs'),
      zmq = require('zmq'),
      // socket to reply to client requests
      responder = zmq.socket('rep');

// handle incoming requests
responder.on('message', function(data) {

  // parse incoming message
  let request = JSON.parse(data);
  console.log("Received request to get: " + request.path);

  // read file and reply with content
  fs.readFile(request.path, function(err, content) {
    const newContent = content.toString();
    const now = Date.now();
    const pkg = {content: newContent, timestamp: now, pid: process.pid};
    const obj = {key: "value"};
    console.log("Sending response content: " + newContent);
    responder.send(JSON.stringify(pkg));
  });

});

// listen to TCP port 5433
responder.bind('tcp://127.0.0.1:5433', function(err) {
  console.log("Listening for zmq requesters...");
});

// close the responder when the node process ends
process.on('SIGINT', function() {
  console.log("Shutting down...");
  responder.close();
});
