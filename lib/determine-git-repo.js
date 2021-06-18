const fsp = require('fs').promises;

const GIT_CONFIG_PATH = '.git/config';

const handleConfigContent = (gitConfig) => {
    if (!gitConfig) {
        return '';
    }
    const gitConfigLines = gitConfig.split(/\r?\n/);
    const lineNumber = gitConfigLines.indexOf('[remote "origin"]');
    if (lineNumber === -1) {
        return '';
    }
    const line = gitConfigLines[lineNumber + 1];

    const url = line.replace(/^\s*url = /, '');

    if (!url) {
        return '';
    }

    if (url.match(/^git@github.com:/)) {
        return url
            .replace(/^git@github.com:/, 'https://github.com/')
            .replace('.git', '');
    }
    if (url.match(/^http[s]?:/)) {
        return url.replace('.git', '');
    }

    return '';
};

function checkIsGitRepo() {
    return fsp
        .access(GIT_CONFIG_PATH)
        .then(() => true)
        .catch(() => false);
}

function determineGitRepo() {
    return checkIsGitRepo()
        .then((isGitRepo) => {
            if (isGitRepo) {
                return fsp.readFile(GIT_CONFIG_PATH, 'utf8');
            }
            return '';
        })
        .then(handleConfigContent)
        .catch(() => '');
}

module.exports = {
    handleConfigContent,
    determineGitRepo,
};
