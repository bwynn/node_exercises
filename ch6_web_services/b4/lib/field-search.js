'use strict';

const mongoose = require('mongoose');
module.exports = function(config, app) {
  app.get('/api/search/:view', function(req, res) {
    mongoose.connect(config.bookdb)
  }, function(err, mongodb, body) {

    // couldnt connect to mongo
    if (err) {
      res.json(502, {error: "bad_gateway", reason: err.code});
      return;
    }

    // mongodb couldnt process request
    if (res.statusCode !== 200) {
      res.json(res.statusCode, JSON.parse(body));
      return;
    }

    // send back just the keys we got back from mongodb
    res.json(JSON.parse(body).rows.map(function(elem) {
      return elem.key;
    }));
  });
};
