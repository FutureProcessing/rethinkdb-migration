/**
 * @param {Rethink} rethink
 * @param {Migrate} migrate;
 */
async function up(rethink, migrate) {
    console.log('20180122_1010-seed.js');
    await migrate.finishMigrationScript();
}

module.exports = {
    up
};