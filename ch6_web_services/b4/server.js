"use strict";

const express = require('express'),
      app = express();
const config = {
  bookdb: 'mongodb://localhost/books/',
  b4db: 'mongodb://localhost/b4'
};

//require('./lib/book-search.js')(config, app);
require('./lib/field-search.js')(config, app);
//require('./lib/bundle.js')(config, app);
