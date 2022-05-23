const fs = require('fs');
const path = require('path');

const writeFile = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const stdin = process.stdin;
const stdout = process.stdout;

stdin.on('data', data => {
    if (data.toString().trim() == 'exit') process.exit();
    writeFile.write(data);
});

stdout.write('Hello. Write some text, please!\n');
process.on('exit', () => stdout.write('Thank you. Have a nice day!'));
process.on('SIGINT', () => process.exit());
