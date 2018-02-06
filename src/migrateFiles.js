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

        let list = _.pull(fs.readdirSync(corePath), '.gitkeep');
        const coreFileList = _.map(list, function (fileName) {
            return {
                name: fileName,
                path: corePath
            };
        });

        list = _.pull(fs.readdirSync(implementationPath), '.gitkeep');
        const implementationFileList = _.map(list, function (fileName) {
            return {
                name: fileName,
                path: implementationPath
            };
        });

        return _.sortBy(_.concat(coreFileList, implementationFileList), ['name']);
    }
}

module.exports = MigrateFiles;
