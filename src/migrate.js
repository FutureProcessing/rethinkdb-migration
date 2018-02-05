const _ = require('lodash');
const MigrateModel = require('./migrateModel');

class Migrate {
    /**
     * @param {Rethink} rethink
     * @param {MigrateFiles} migrateFiles
     * @param {MigrateVersion} migrateVersion
     * @param {MigrateDao} migrateDao
     */
    constructor(rethink, migrateFiles, migrateVersion, migrateDao) {
        this.rethink = rethink;
        this.migrateFiles = migrateFiles;
        this.migrateVersion = migrateVersion;
        this.migrateDao = migrateDao;
        this.migrateQueue = [];
    }

    up() {
        const migrateVersion = this.migrateVersion;
        const migrateQueue = this.migrateQueue;

        _.forEach(this.migrateFiles.getList(), function (file) {
            if (migrateVersion.compare(file.name) !== 1) {
                return;
            }

            migrateQueue.push(file);
        });

        this.consumeQueue();
    }

    consumeQueue() {
        const file = _.first(this.migrateQueue);
        if (_.isUndefined(file)) {
            this.rethink.closeConnection();
            return;
        }
        console.info('starting migration ' + file.name);

        const migrateScript = require(file.path + '/' + file.name);
        migrateScript.up(this.rethink, this);
    }

    async finishMigrationScript() {
        const file = this.migrateQueue.shift();
        const migrateModel = new MigrateModel();

        migrateModel
            .setVersion(this.migrateVersion.getVersionFromString(file.name))
            .setFileName(file.name)
            .setDate(new Date());
        await this.migrateDao.save(migrateModel);

        console.info('finished migration ' + file.name);

        this.consumeQueue();
    }
}

module.exports = Migrate;
