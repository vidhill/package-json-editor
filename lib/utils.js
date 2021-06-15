const semverValid = require('semver/functions/valid');

function checkVersionNumber(string) {
    const result = semverValid(string);
    return string === result;
}

module.exports = {
    checkVersionNumber,
};
