const TaskRunner = require('./taskRunner');

class PreMigrate extends TaskRunner {
    /**
     * @param {Rethink} rethink
     * @param {MigrateFiles} migrateFiles
     */
    constructor(rethink, migrateFiles) {
        super();
        this.path = '/pre';
        this.rethink = rethink;
        this.migrateFiles = migrateFiles;
        this.migrateQueue = [];
    }

    get END_EVENT() {
        return 'EVENT_END_PRE_MIGRATION';
    }
}

module.exports = PreMigrate;
