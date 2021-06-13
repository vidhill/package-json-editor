const fsp = require('fs/promises');
const inquirer = require('inquirer');

const logger = require('./logger');
const existingPackageDefinition = require('../package.json');

const makeQuestions = require('./make-questions');

const questions = makeQuestions(existingPackageDefinition);

const { repository: existingRepository } = existingPackageDefinition;

const handleAnswers = ({
    name,
    version,
    description,
    repositoryUrl,
    author,
    license,
    keywords,
}) => {
    const newRepository = Object.assign({}, existingRepository, {
        url: `git+${repositoryUrl}.git`,
    });

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

    const newPackageDefinition = Object.assign(
        {},
        existingPackageDefinition,
        newSettings
    );

    return JSON.stringify(newPackageDefinition, null, 4) + '\n';
};

inquirer.prompt(questions).then(handleAnswers).then(writeNewPackageDefinition);

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
