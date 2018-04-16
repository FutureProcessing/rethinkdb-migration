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
        this.corePath = this.path + '/' + DIR_CORE;
        this.implementationPath = this.path + '/' + this.implementation;
    }

    getList() {
        return _.sortBy(_.concat(this.getDirFiles(this.corePath),
            this.getDirFiles(this.implementationPath)), ['name']);
    }

    getSortedList(path) {
        return _.sortBy(_.concat(this.getDirFiles(this.corePath + path),
            this.getDirFiles(this.implementationPath + path, true)), ['name']);
    }

    getDirFiles(path, noPattern) {
        if (_.isEmpty(path) || !fs.existsSync(path)) {
            return [];
        }

        const filePattern = this.filePattern;
        const list = _.filter(fs.readdirSync(path), file => noPattern || filePattern.test(file));

        return _.map(list, fileName => {
            return {
                name: fileName,
                path: path
            };
        });
    }
}

module.exports = MigrateFiles;
