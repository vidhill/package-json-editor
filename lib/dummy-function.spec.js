const dummyFunction = require('./dummy-function');

jest.mock('./logger.js');

describe("test 'dummyFunction()'", () => {
    it('should be a defined function', () => {
        expect(dummyFunction).not.toBeUndefined();
        expect(dummyFunction).toBeType('function');
    });
});
