const { checkVersionNumber } = require('./utils');

describe("test 'checkVersionNumber()'", () => {
    it('should be a defined function', () => {
        expect(checkVersionNumber).not.toBeUndefined();
        expect(checkVersionNumber).toBeType('function');
    });

    describe('test valid version numbers', () => {
        it.each(['0.1.1', '1.1.1', '0.0.15-alpha.0'])(
            'checkVersionNumber(%s)',
            (input) => {
                const res = checkVersionNumber(input);
                expect(res).toBe(true);
            }
        );
    });

    it('should return false for an invalid version number', () => {
        const res = checkVersionNumber('bad-0.1.1');
        expect(res).toBe(false);
    });
});
