const TaskRunner = require('./taskRunner');

class PostMigrate extends TaskRunner {
    /**
     * @param {Rethink} rethink
     * @param {MigrateFiles} migrateFiles
     */
    constructor(rethink, migrateFiles) {
        super();
        this.path = '/post';
        this.rethink = rethink;
        this.migrateFiles = migrateFiles;
        this.migrateQueue = [];
    }

    get END_EVENT() {
        return 'EVENT_END_POST_MIGRATION';
    }
}

module.exports = PostMigrate;
