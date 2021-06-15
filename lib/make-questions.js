const { checkVersionNumber, makeRejectEmptyAnswer } = require('./utils');

function makeQuestions(existingPackageDefinition) {
    const {
        name: existingName,
        version: existingVersion,
        description: existingDescription,
        repository: existingRepository,
        author: existingAuthor,
        license: existingLicense,
        keywords: existingKeywords,
    } = existingPackageDefinition;

    const existingRepositoryUrl = existingRepository.url
        .replace('git+', '')
        .replace('.git', '');

    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'NPM Package name',
            default: existingName,
            validate: makeRejectEmptyAnswer('package name'),
        },
        {
            type: 'input',
            name: 'description',
            message: 'Package description',
            value: 'Placeholder',
            default: existingDescription,
            validate: makeRejectEmptyAnswer('description'),
        },
        {
            type: 'input',
            name: 'repositoryUrl',
            message: 'Git repository',
            default: existingRepositoryUrl,
            validate(input) {
                if (input.length === 0) {
                    return `Invalid repository url, repository url should not be empty`;
                }
                const re = /http[s]?:\/\/[^\s]+/;
                if (re.test(input) === false) {
                    return `Invalid repository url`;
                }
                return true;
            },
            filter(input) {
                // if url includes a trailing slash, remove it
                if (input.endsWith('/')) {
                    return input.substr(0, input.length - 1);
                }
                return input;
            },
        },
        {
            type: 'input',
            name: 'version',
            message: 'Version number, (validated using semver)',
            validate(input) {
                if (!checkVersionNumber(input)) {
                    return 'Invalid version number';
                }
                return true;
            },
            default: existingVersion,
        },
        {
            type: 'input',
            name: 'keywords',
            message: 'Keywords, (comma separated)',
            default() {
                if (existingKeywords.length > 0) {
                    return existingKeywords.join(',');
                }
            },
            filter(input) {
                if (input.length > 0) {
                    return input.split(',');
                }
                return [];
            },
        },
    ];

    const additionalQuestions = [
        {
            type: 'input',
            name: 'author',
            message: 'Author',
            default: existingAuthor,
            validate: makeRejectEmptyAnswer('author'),
        },
        {
            type: 'input',
            name: 'license',
            message: 'License',
            default: existingLicense,
            validate: makeRejectEmptyAnswer('license'),
        },
    ];

    return [...questions, ...additionalQuestions];
}

module.exports = makeQuestions;
