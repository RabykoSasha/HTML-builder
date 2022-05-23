const path = require('path');
const fs = require('fs');
const { rm } = require('fs/promises');
const { readdir } = require('fs/promises');

const fromDir = path.join(__dirname, 'styles');
const toDir = path.join(__dirname, 'project-dist');
const data = [];


async function createBundle(from, to) {
    const output = path.join(to, 'bundle.css');
    await rm(output, { force: true });

    const files = await readdir(from, { withFileTypes: true });
    for (const file of files) {
        const filePath = path.join(from, file.name);
        const ext = path.extname(filePath);
        if (file.isDirectory() || ext != '.css') continue;
        data.push(filePath);
    };

    for (let i = 0; i < data.length; i++) {
        const writeStream = fs.createWriteStream(output, { flags: 'a' });
        const readStream = fs.createReadStream(data[i]);
        readStream.on('data', chunk => writeStream.write(chunk));
        readStream.on('close', function() {
            writeStream.close();
            return;
        });
    };
};

createBundle(fromDir, toDir);
