const {
    checkVersionNumber,
    makeRejectEmptyAnswer,
    getExistingRepositoryUrl,
    getPackagePath,
} = require('./utils');

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

describe("test 'makeRejectEmptyAnswer()'", () => {
    it('should be a defined function', () => {
        expect(makeRejectEmptyAnswer).not.toBeUndefined();
        expect(makeRejectEmptyAnswer).toBeType('function');
    });

    it('should return a defined function', () => {
        const rejectEmptyAnswer = makeRejectEmptyAnswer('description');
        expect(rejectEmptyAnswer).not.toBeUndefined();
        expect(rejectEmptyAnswer).toBeType('function');
    });

    describe('test return value, invalid inputs', () => {
        const rejectEmptyAnswer = makeRejectEmptyAnswer('description');
        it('should return a defined string', () => {
            const result = rejectEmptyAnswer('');

            expect(result).not.toBeUndefined();
            expect(result).toBeType('string');
        });
        it('should return the expected error string, empty string', () => {
            const result = rejectEmptyAnswer('');

            expect(result).toBe(
                'Invalid description, description should not be empty'
            );
        });

        it('should return the expected error string, undefined value', () => {
            const result = rejectEmptyAnswer();

            expect(result).toBe(
                'Invalid description, description should not be empty'
            );
        });

        it('should return a defined boolean', () => {
            const result = rejectEmptyAnswer('Hello World');

            expect(result).not.toBeUndefined();
            expect(result).toBeType('boolean');
        });

        it('should return the expected value', () => {
            const result = rejectEmptyAnswer('Hello World');
            expect(result).toBe(true);
        });
    });
});

describe("test 'getExistingRepositoryUrl()'", () => {
    it('should be a defined function', () => {
        expect(getExistingRepositoryUrl).not.toBeUndefined();
        expect(getExistingRepositoryUrl).toBeType('function');
    });
});

describe("test 'getPackagePath()'", () => {
    it('should be a defined function', () => {
        expect(getPackagePath).not.toBeUndefined();
        expect(getPackagePath).toBeType('function');
    });
});
