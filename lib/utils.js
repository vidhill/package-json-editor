const semverValid = require('semver/functions/valid');

function checkVersionNumber(string) {
    const result = semverValid(string);
    return string === result;
}

function makeRejectEmptyAnswer(id) {
    return (input) => {
        if (input.length === 0) {
            return `Invalid ${id}, ${id} should not be empty`;
        }
        return true;
    };
}

function getExistingRepositoryUrl(repoObject) {
    if (repoObject && repoObject.url) {
        return repoObject.url.replace('git+', '').replace('.git', '');
    }
}

module.exports = {
    checkVersionNumber,
    makeRejectEmptyAnswer,
    getExistingRepositoryUrl,
};
