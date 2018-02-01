const path = require('path');

function tests() {
    return {
        test: {
            options: {
                reporter: 'mocha-multi',
                require: 'co-mocha',
                reporterOptions: {
                    xunit: {
                        stdout: path.join('grunt', 'var', 'tests.xml')
                    },
                    dot: '-'
                },
                timeout: 10000
            },
            src: [
                'test/*.spec.js'
            ]
        }
    };
}

function coverage() {
    return {
        coverage: {
            src: path.join('test'),
            options: {
                coverageFolder: path.join('grunt', 'var', 'coverage'),
                mask: '**/*.spec.js',
                excludes: [],
                timeout: 10000
            }
        }
    };
}

function task() {
    return {
        tests,
        coverage
    };
}

module.exports = task;
