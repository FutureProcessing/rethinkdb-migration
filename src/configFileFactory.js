const Config = require('./config');

function configFileFactory(file) {
    const configFile = require(file);
    return new Config(
        configFile.DB_HOST,
        configFile.DB_PORT,
        configFile.DB_USER,
        configFile.DB_PASS,
        configFile.DB_NAME,
        configFile.DB_TABLE,
        configFile.DIR_MIGRATE,
        configFile.DIR_IMPLEMENTATION
    );
}

module.exports = configFileFactory;
