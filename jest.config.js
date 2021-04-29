module.exports = {
    preset: 'ts-jest',
    testRegex: '.*\\.test\\.(ts|tsx)$',
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
    ],
}
