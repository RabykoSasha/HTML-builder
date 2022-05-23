const fs = require('fs');
const path = require('path');

const readFile = fs.createReadStream(path.join(__dirname, 'text.txt'));
readFile.on('data', (chunk) => {
    console.log(chunk.toString());
})
