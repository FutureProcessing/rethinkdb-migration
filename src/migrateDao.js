const _ = require('lodash');
const MigrateModel = require('./migrateModel');

class MigrateDao {
    /**
     * @param {Rethink} rethink
     * @param {string} tableName
     */
    constructor(rethink, tableName) {
        this.rethink = rethink;
        this.tableName = tableName;
    }

    /**
     * @return {null|MigrateModel}
     */
    async getLast() {
        const model = _.first(await this.rethink
            .getReQL()
            .table(this.tableName)
            .orderBy(this.rethink.getReQL().desc('version'))
            .limit(1)
            .run().call('map', row => {
                return new MigrateModel()
                    .setId(row.id)
                    .setDate(row.date)
                    .setFileName(row.fileName)
                    .setVersion(row.version);
            }));

        return model || null;
    }

    /**
     * @param {MigrateModel} migrateModel
     */
    save(migrateModel) {
        return this.rethink
            .getReQL()
            .table(this.tableName)
            .insert(migrateModel, {conflict: 'update'})
            .run();
    }
}

module.exports = MigrateDao;
