const fsp = require('fs').promises;

const {
    handleConfigContent,
    determineGitRepo,
    checkIsGitRepo,
} = require('./determine-git-repo');

const loadDummyFile = function (fakeGitConfigPath) {
    const filePath = `./lib/mock-git-config/${fakeGitConfigPath}.txt`;
    return fsp.readFile(filePath, 'utf8');
};

describe("test 'handleConfigContent()'", () => {
    it('should be a defined function', () => {
        expect(handleConfigContent).not.toBeUndefined();
        expect(handleConfigContent).toBeType('function');
    });

    describe('test falsey config passed as arg', () => {
        it('should return a defined string', () => {
            const result = handleConfigContent();
            expect(result).not.toBeUndefined();
            expect(result).toBeType('string');
        });

        it.each([undefined, ''])(
            'should return a defined string, case handleConfigContent(%p)',
            (input) => {
                const result = handleConfigContent(input);
                expect(result).not.toBeUndefined();
                expect(result).toBeType('string');
            }
        );

        it.each([undefined, ''])(
            'should return the expected value, case handleConfigContent(%p)',
            (input) => {
                const result = handleConfigContent(input);
                expect(result).toBe('');
            }
        );

        it('should return the expected value', () => {
            const result = handleConfigContent();
            expect(result).toBe('');
        });
    });

    describe('test config file with ssh remote', () => {
        let sshRemote;
        beforeAll(async () => {
            sshRemote = await loadDummyFile('ssh-remote');
        });
        it('should return a defined string', () => {
            const result = handleConfigContent(sshRemote);
            expect(result).not.toBeUndefined();
            expect(result).toBeType('string');
        });

        it('should return the expected value', () => {
            const result = handleConfigContent(sshRemote);
            expect(result).toBe(
                'https://github.com/vidhill/package-json-editor'
            );
        });
    });

    describe('test config file with https remote', () => {
        let httpsRemote;
        beforeAll(async () => {
            httpsRemote = await loadDummyFile('https-remote');
        });
        it('should return a defined string', () => {
            const result = handleConfigContent(httpsRemote);
            expect(result).not.toBeUndefined();
            expect(result).toBeType('string');
        });

        it('should return the expected value', () => {
            const result = handleConfigContent(httpsRemote);
            expect(result).toBe('https://github.com/vidhill/equanimous-lamp');
        });
    });

    describe('test config file with missing remote', () => {
        let missingRemote;
        beforeAll(async () => {
            missingRemote = await loadDummyFile('missing-remote');
        });

        it('should return a defined string', () => {
            const result = handleConfigContent(missingRemote);
            expect(result).not.toBeUndefined();
            expect(result).toBeType('string');
        });

        it('should return the expected value', () => {
            const result = handleConfigContent(missingRemote);
            expect(result).toBe('');
        });
    });
    describe('test an empty config file', () => {
        let emptyFile;
        beforeAll(async () => {
            emptyFile = await loadDummyFile('empty-file');
        });
        it('should return a defined string', () => {
            const result = handleConfigContent(emptyFile);
            expect(result).not.toBeUndefined();
            expect(result).toBeType('string');
        });

        it('should return the expected value', () => {
            const result = handleConfigContent(emptyFile);
            expect(result).toBe('');
        });
    });
});

describe("test 'determineGitRepo()'", () => {
    it('should be a defined function', () => {
        expect(determineGitRepo).not.toBeUndefined();
        expect(determineGitRepo).toBeType('function');
    });
});

describe("test 'checkIsGitRepo()'", () => {
    it('should be a defined function', () => {
        expect(checkIsGitRepo).not.toBeUndefined();
        expect(checkIsGitRepo).toBeType('function');
    });
});
