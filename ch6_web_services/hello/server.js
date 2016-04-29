'use strict';

const express = require('express'),
      app = express(),
      morgan = require('morgan');

app.use(morgan('dev'));

app.get('/api/:name', function(req, res) {
  res.json(200, {"hello": req.params.name});
});

app.listen(3000, function() {
  console.log('ready captain!');
});
