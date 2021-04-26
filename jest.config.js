module.exports = {
    preset: 'ts-jest',
    testRegex: '/test/.*\\.test\\.tsx$',
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
    ],
}
