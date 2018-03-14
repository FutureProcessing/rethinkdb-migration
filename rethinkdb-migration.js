const _ = require('lodash');
const commandLineArgs = require('command-line-args');
const fs = require('fs');
const RethinkConnectionParams = require('./src/rethinkConnectionParams');
const Rethink = require('./src/rethink');
const MigrateFiles = require('./src/migrateFiles');
const Migrate = require('./src/migrate');
const PreMigrate = require('./src/preMigrate');
const PostMigrate = require('./src/postMigrate');
const MigrateDao = require('./src/migrateDao');
const MigrateVersion = require('./src/migrateVersion');
const configEnvFactory = require('./src/configEnvFactiory');
const configFileFactory = require('./src/configFileFactory');
const REGEX_VERSION = /\d+_\d+/;

const TEMPLATE_FILE_NAME = 'migrateScriptTpl.js';

const optionDefinitions = [
    {name: 'create', type: Boolean, alias: 'c'},
    {name: 'script', type: String, alias: 's'},
    {name: 'config', type: String},
    {name: 'setup', type: Boolean},
];

/**
 * @param {Config} config
 * @param {boolean} isSetup
 * @return {Promise<string>}
 */
async function initMigrate(config, isSetup) {
    let rethink = null;

    try {
        const connectionParams = new RethinkConnectionParams();

        if (_.isUndefined(config.getDbName()) || !config.getDbName().length) {
            return Promise.reject(Error("Database name is required"));
        }

        connectionParams.setDb(config.getDbName());

        if (!_.isUndefined(config.getDbHost())) {
            connectionParams.setHost(config.getDbHost());
        }

        if (!_.isUndefined(config.getDbPort())) {
            connectionParams.setPort(config.getDbPort());
        }

        if (!_.isUndefined(config.getDbUser())) {
            connectionParams.setUser(config.getDbUser());
        }

        if (!_.isUndefined(config.getDbPass())) {
            connectionParams.setPassword(config.getDbPass());
        }

        rethink = new Rethink(connectionParams);
        await rethink.createDatabase(config.getDbName());
        await rethink.createMissingTables([config.getDbTable()]);

        const migrateDao = new MigrateDao(rethink, config.getDbTable());

        /** @var MigrateModel model */
        const model = await migrateDao.getLast();
        const version = model && model.getVersion();

        const migrateFiles = new MigrateFiles(config.getDirMigrate(), config.getDirImplementation(), REGEX_VERSION);
        const migrateVersion = new MigrateVersion(version, REGEX_VERSION);

        const migrate = new Migrate(rethink, migrateFiles, migrateVersion, migrateDao);
        const preMigrate = new PreMigrate(rethink, migrateFiles);
        const postMigrate = new PostMigrate(rethink, migrateFiles);

        if (isSetup) {
            await migrate.setup();
            console.log('added migration stats to existing database');
            rethink.closeConnection();
        } else {
            postMigrate.on(postMigrate.endEvent, function () {
                rethink.closeConnection();
            });
            preMigrate.on(preMigrate.endEvent, function() {
                migrate.up();
            });
            migrate.on(Migrate.EVENT_END_MIGRATION(), function() {
                postMigrate.up();
            });

            preMigrate.up();
        }
    }
    catch (error) {
        console.error(error.message);
        rethink.closeConnection();
    }
}

/**
 *
 * @param {int} num
 * @param {int} places
 * @return {string}
 */
function zeroPad(num, places) {
    const zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

/**
 *
 * @param {string} scriptName
 * @param {Config} config
 */
function createScript(scriptName, config) {
    const date = new Date();
    let parsedName = date.getFullYear() + zeroPad(date.getMonth()+1, 2) + zeroPad(date.getDate(), 2) +
        '_' + zeroPad(date.getHours(), 2) + zeroPad(date.getMinutes());

    parsedName += '-' + (scriptName.indexOf('.js') === -1 ? scriptName + '.js' : scriptName);

    fs.createReadStream(__dirname + '/src/' + TEMPLATE_FILE_NAME).pipe(fs.createWriteStream(config.getDirMigrate() + '/core/' + parsedName));
}

const options = commandLineArgs(optionDefinitions);
const config = (options.config) ? configFileFactory(process.cwd() + '/' + options.config) : configEnvFactory();

if (options.create && options.script) {
    createScript(options.script, config);
} else {
    initMigrate(config, !_.isUndefined(options.setup)).catch(console.error);
}
