module.exports = {
    preset: 'ts-jest',
    testRegex: '/test/.*\\.test\\.tsx$',
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
