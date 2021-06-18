const fsp = require('fs').promises;

const stdout = require('./stdout');
const { getPackagePath } = require('./utils');

const packagePath = getPackagePath();

function writeNewPackageDefinition(json) {
    return fsp
        .writeFile(packagePath, json)
        .then(() => {
            stdout.success(`** Updated "package.json" written to disk`);
        })
        .catch((error) => {
            stdout.error('Error writing package.json', error);
        });
}

module.exports = writeNewPackageDefinition;
