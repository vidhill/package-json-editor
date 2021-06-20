const chalk = require('chalk');

const makeChalkLogger = function (colour) {
    // eslint-disable-next-line no-console
    return (...args) => console.log('\n' + chalk[colour](...args));
};

const stdout = {
    success: makeChalkLogger('green'),
    error: makeChalkLogger('red'),
    warning: makeChalkLogger('yellow'),
};

module.exports = stdout;
