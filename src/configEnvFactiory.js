const Config = require('./config');

function configEnvFactory() {
    return new Config(
        process.env.TRM_DB_HOST,
        process.env.TRM_DB_PORT,
        process.env.TRM_DB_USER,
        process.env.TRM_DB_PASS,
        process.env.TRM_DB_NAME,
        process.env.TRM_DB_TABLE,
        process.env.TRM_DIR_MIGRATE,
        process.env.TRM_DIR_IMPLEMENTATION,
        process.env.TIMEOUT
    );
}

module.exports = configEnvFactory;
