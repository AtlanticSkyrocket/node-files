const fs = require('fs');
const process = require('process');

const argv = process.argv;
const path = argv[2];

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(data);
  });
}

cat(path);