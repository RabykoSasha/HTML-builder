const { rm } = require('fs/promises');
const { mkdir } = require('fs/promises');
const { copyFile } = require('fs/promises');
const { readdir } = require('fs/promises');
const path = require('path');

const oldPath = path.join(__dirname, 'files');
const newPath = path.join(__dirname, 'files-copy');

async function copyDir(fromDir, toDir) {
    await rm(newPath, { force: true, recursive: true });
    await mkdir(newPath);
    const files = await readdir(fromDir, { withFileTypes: true });
    for (const file of files) {
        if (file.isDirectory()) continue;
        const filePath = path.join(fromDir, file.name);
        const newPath = path.join(toDir, file.name);
        await copyFile(filePath, newPath);
    }
}

copyDir(oldPath, newPath);
