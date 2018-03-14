const MigrateWrapperCore = require('./migrateWrapperCore');

class PostMigrate extends MigrateWrapperCore {
    /**
     * @param {Rethink} rethink
     * @param {MigrateFiles} migrateFiles
     */
    constructor(rethink, migrateFiles) {
        super();
        this.endEvent = 'EVENT_END_POST_MIGRATION';
        this.path = '/post';
        this.rethink = rethink;
        this.migrateFiles = migrateFiles;
        this.migrateQueue = [];
    }
}

module.exports = PostMigrate;
