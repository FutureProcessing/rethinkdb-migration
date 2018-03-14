const fs = require('fs');
const _ = require('lodash');
const DIR_CORE = 'core';

class MigrateFiles {
    /**
     *
     * @param {string} path
     * @param {string} implementation
     * @param {RegExp} filePattern
     */
    constructor(path, implementation, filePattern) {
        this.path = path;
        this.implementation = implementation;
        this.filePattern = filePattern;
    }

    getList() {
        const corePath = this.path + '/' + DIR_CORE;
        const implementationPath = this.path + '/' + this.implementation;

        return _.sortBy(_.concat(this.getDirFiles(corePath), this.getDirFiles(implementationPath)), ['name']);
    }

    getSortedList(path) {
        return _.sortBy(this.getDirFiles(this.path + path, true), ['name']);
    }

    getDirFiles(path, noPattern) {
        if (_.isEmpty(path)) {
            return [];
        }

        const filePattern = this.filePattern;
        const list = _.filter(fs.readdirSync(path), file => {
            return noPattern || filePattern.test(file);
        });

        return _.map(list, fileName => {
            return {
                name: fileName,
                path: path
            };
        });
    }
}

module.exports = MigrateFiles;
