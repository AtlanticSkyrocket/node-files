const fs = require('fs').promises;
const axios = require('axios');
const process = require('process');
const argv = process.argv;

async function main() {
  function cat(path) {
    return fs.readFile(path, 'utf8');
  }

  async function webCat(url) {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  function writeToFile(fileName, text) {
    return fs.writeFile(fileName, text, 'utf8');
  }

  function checkIfWriteToFile(arg) {
    return arg === '--out';
  }

  async function getContent(arg) {
    if (arg.slice(0, 4) === 'http') {
      return webCat(arg);
    } else {
      return cat(arg);
    }
  }

  if (checkIfWriteToFile(argv[2])) {
    const content = await getContent(argv[4]);
    try {
      writeToFile(argv[3], content);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  } else {
    try {
    const content = await getContent(argv[2]);
    console.log(content);
    } catch(err){
      console.log(err);
      process.exit(1);
    }
  }
}

main();
