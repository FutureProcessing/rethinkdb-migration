const _ = require('lodash');
/**
 * @param {Rethink} rethink
 * @param {Migrate} migrate;
 */
async function up(rethink, migrate) {
    let last = _.first(await rethink
        .getReQL()
        .table('toolRethingDBMigrate')
        .orderBy(rethink.getReQL().desc('version'))
        .limit(1)
        .run());

    console.log(last);
    await migrate.finishMigrationScript();
}

module.exports = {
    up
};
