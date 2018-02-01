const fs = require('fs');
const _ = require('lodash');
const DIR_CORE = 'core';

class MigrateFiles {
    constructor(path, implementation) {
        this.path = path;
        this.implementation = implementation;
    }

    getList() {
        const corePath = this.path + '/' + DIR_CORE;
        const implementationPath = this.path + '/' + this.implementation;

        const coreFileList = _.map(fs.readdirSync(corePath), function (fileName) {
            return {
                name: fileName,
                path: corePath
            };
        });

        const implementationFileList = _.map(fs.readdirSync(implementationPath), function (fileName) {
            return {
                name: fileName,
                path: implementationPath
            };
        });

        return _.sortBy(_.concat(coreFileList, implementationFileList), ['name']);
    }
}

module.exports = MigrateFiles;
