const { handleConfigContent } = require('./determine-git-repo');

const sshRemote = `
[core]
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
        precomposeunicode = true
[remote "origin"]
        url = git@github.com:vidhill/package-json-editor.git
        fetch = +refs/heads/*:refs/remotes/origin/*
`;

const httpsRemote = `
[core]
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = true
[remote "origin"]
	url = https://github.com/vidhill/equanimous-lamp.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
`;

describe("test 'handleConfigContent()'", () => {
    it('should be a defined function', () => {
        expect(handleConfigContent).not.toBeUndefined();
        expect(handleConfigContent).toBeType('function');
    });

    describe('test ssh remote', () => {
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

    describe('test http remote', () => {
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

    describe('test missing remote', () => {
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
});
