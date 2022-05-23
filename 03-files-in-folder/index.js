const { readdir } = require('fs/promises');
const { stat } = require('fs/promises');
const path = require('path');

const secretFolder = path.join(__dirname, 'secret-folder');

async function filesInFolder(dirPath) {
    const files = await readdir(dirPath);
    for (const fileName of files) {
        const filePath = path.join(dirPath, fileName);
        const file = await stat(filePath);
        if (file.isDirectory()) continue;
        const ext = path.extname(filePath);
        const name = path.basename(filePath, ext);
        const size = file.size;
        console.log(`${name} - ${ext.slice(1)} - ${size}`);
    }
}

filesInFolder(secretFolder);
