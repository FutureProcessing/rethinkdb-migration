const MigrateWrapperCore = require('./migrateWrapperCore');

class PreMigrate extends MigrateWrapperCore {
    /**
     * @param {Rethink} rethink
     * @param {MigrateFiles} migrateFiles
     */
    constructor(rethink, migrateFiles) {
        super();
        this.endEvent = 'EVENT_END_PRE_MIGRATION';
        this.path = '/pre';
        this.rethink = rethink;
        this.migrateFiles = migrateFiles;
        this.migrateQueue = [];
    }
}

module.exports = PreMigrate;
