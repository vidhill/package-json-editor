const fsp = require('fs/promises');
const path = require('path');
const logger = require('./logger');

const packagePath = path.resolve(process.cwd(), 'package.json');

function writeNewPackageDefinition(json) {
    return fsp
        .writeFile(packagePath, json)
        .then(() => {
            logger.log('Updated package.json saved');
        })
        .catch((error) => {
            logger.log('Error writing package.json', error);
        });
}

module.exports = writeNewPackageDefinition;
