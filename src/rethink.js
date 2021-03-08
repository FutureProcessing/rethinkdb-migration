const r = require('rethinkdbdash');
const _ = require('lodash');

class Rethink {
    /**
     * @param {RethinkConnectionParams} connectionParams
     */
    constructor(connectionParams) {
        this.r = r(connectionParams);
    }

    /**
     * @returns {r}
     */
    getReQL() {
        return this.r;
    }

    closeConnection() {
        this.getReQL().getPoolMaster().drain();
    }

    waitFor(table) {
        return this.getReQL().table(table).wait({timeout: 60000});
    }

    /**
     * @param {String} databaseName
     * @returns {Promise<void>}
     */
    async createDatabase(databaseName) {
        const db = this.getReQL();
        const dbList = await db.dbList().run();

        if (!_.includes(dbList, databaseName)) {
            await db.dbCreate(databaseName);
        }
    }

    /**
     * @param {array} tablesName
     * @return {Promise<void>}
     */
    createMissingTables(tablesName) {
        const db = this.getReQL();
        return db.tableList().do(function (dbTables) {
            return db.expr(tablesName).difference(dbTables).forEach(missingTable => db.tableCreate(missingTable));
        }).run();
    }

    /**
     * @param tableName
     * @param data
     */
    insertWhenTableIsEmpty(tableName, data) {
        return this.getReQL()
            .table(tableName)
            .isEmpty()
            .branch(this.getReQL().table(tableName).insert(data), true).run();
    }
}

module.exports = Rethink;
