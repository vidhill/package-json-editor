const logger = require('./logger');
const dummyFunction = (...args) => {
    // eslint-disable-next-line no-console
    logger.log(...args);
};

module.exports = dummyFunction;
