const fs = require('fs'),
      filename = process.argv[2],
      message = process.argv[3];

fs.writeFile(filename, message, function(err) {
  if (err) {
    throw err;
  }
  console.log("File successfully created.");
});
