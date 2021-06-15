const fsp = require('fs/promises');
const logger = require('./logger');

function writeNewPackageDefinition(json) {
    return fsp
        .writeFile('package.json', json)
        .then(() => {
            logger.log('New package.json saved');
        })
        .catch((er) => {
            logger.log(er);
        });
}

module.exports = writeNewPackageDefinition;
