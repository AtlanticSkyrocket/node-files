const fs = require('fs');
const process = require('process');
const axios = require('axios');
const argv = process.argv;
const arg = argv[2];

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(data);
  });
}

async function webCat(url){
  try{
  const resp = await axios.get(url);
  console.log(resp.data);
  } catch(err){
    console.log(err);
    process.exit(1);
  }
}

if (arg.slice(0,4) === 'http'){
  webCat(arg);
} else {  
  cat(arg);
}