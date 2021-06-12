// super simple console.log wrapper,
// should be replaced with more featured npm package as required
const envVarString = process.env.LOGGING_ENABLED;

const loggingEnabled = envVarString ? envVarString === 'true' : true;
const noop = () => {};

const logMethodsArray = ['debug', 'log', 'warn', 'error'];

const logger = logMethodsArray.reduce((agg, id) => {
    // eslint-disable-next-line no-console
    agg[id] = loggingEnabled ? console[id] : noop;
    return agg;
}, {});

module.exports = logger;
