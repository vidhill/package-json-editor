const fsp = require('fs').promises;
const logger = require('./logger');

const { getPackagePath } = require('./utils');

const packagePath = getPackagePath();

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
