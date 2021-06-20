const inquirer = require('inquirer');

const makeQuestions = require('./make-questions');
const writeNewPackageDefinition = require('./write-new-package-definition');
const { getPackagePath } = require('./utils');
const stdout = require('./stdout');

const packagePath = getPackagePath();
const existingPackageDefinition = require(packagePath);

function makeNewRepositoryObject(existingRepo, repositoryUrl) {
    const repo = existingRepo || {};
    return Object.assign({}, repo, {
        url: `git+${repositoryUrl}.git`,
    });
}

function prepareStringifiedPackageJSON(newPackageDefinition) {
    return JSON.stringify(newPackageDefinition, null, 4) + '\n';
}

const questions = makeQuestions(existingPackageDefinition);

const existingRepository = existingPackageDefinition.repository;

const handleAnswers = ({
    name,
    version,
    description,
    repositoryUrl,
    author,
    license,
    keywords,
    confirmation,
}) => {
    if (confirmation === false) {
        throw new Error('Not confirmed');
    }

    const newRepository = makeNewRepositoryObject(
        existingRepository,
        repositoryUrl
    );

    const newSettings = {
        name,
        version,
        description,
        author,
        license,
        keywords,
        repository: newRepository,
        bugs: {
            url: repositoryUrl + '/issues',
        },
        homepage: repositoryUrl + '#readme',
    };

    return Object.assign({}, existingPackageDefinition, newSettings);
};

inquirer
    .prompt(questions)
    .then(handleAnswers)
    .then(prepareStringifiedPackageJSON)
    .then(writeNewPackageDefinition)
    .catch((err) => {
        if (err.message === 'Not confirmed') {
            return stdout.warning('** Answered no, so changes not written');
        }
        stdout.error(err);
    });
