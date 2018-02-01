'use strict';

function tasks(grunt) {
    const mocha = require('./grunt/tasks/mocha')(__dirname);

    require('jit-grunt')(grunt);

    grunt.initConfig({
        mochaTest: mocha.tests(),
        mocha_istanbul: mocha.coverage(),
        eslint: require('./grunt/tasks/eslint')(__dirname)
    });

    grunt.registerTask('test', 'Run tests', ['mochaTest', 'mocha_istanbul', 'eslint']);
}

module.exports = tasks;
