const fsp = require('fs').promises;

const { handleConfigContent } = require('./determine-git-repo');

const loadDummyFile = function (fakeGitConfigPath) {
    const filePath = `./lib/mock-git-config/${fakeGitConfigPath}.txt`;
    return fsp.readFile(filePath, 'utf8');
};

describe("test 'handleConfigContent()'", () => {
    let sshRemote;
    let httpsRemote;
    let missingRemote;
    let emptyFile;

    beforeAll(() => {
        return Promise.all([
            loadDummyFile('ssh-remote'),
            loadDummyFile('https-remote'),
            loadDummyFile('missing-remote'),
            loadDummyFile('empty-file'),
        ]).then(([ssh, https, missing, empty]) => {
            sshRemote = ssh;
            httpsRemote = https;
            missingRemote = missing;
            emptyFile = empty;
        });
    });

    it('should be a defined function', () => {
        expect(handleConfigContent).not.toBeUndefined();
        expect(handleConfigContent).toBeType('function');
    });

    describe('test config file with ssh remote', () => {
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
