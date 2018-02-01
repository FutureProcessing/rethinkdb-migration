/**
 * @param {Rethink} rethink
 * @param {Migrate} migrate;
 */
async function up(rethink, migrate) {
    await migrate.finishMigrationScript();
}

module.exports = {
    up
};
