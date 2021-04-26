module.exports = {
    preset: 'ts-jest',
    testRegex: '/test/.*\\.test\\.tsx$',
    setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json',
        },
    },
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
    ],
}
