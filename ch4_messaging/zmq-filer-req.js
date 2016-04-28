"use strict";

const zmq = require('zmq'),
      filename = process.argv[2],
      // create request endpoint
      requester = zmq.socket('req');

// handle replies from responder
requester.on('message', function(data) {
  const response = JSON.parse(data);
  console.log("Received response: " + data);
});

requester.connect("tcp://localhost:5433");
// send request for conetnt
console.log("Sending request for " + filename);

requester.send(JSON.stringify({
  path: filename
}));
