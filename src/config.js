class Config {
    constructor(dbHost, dbPort, dbUser, dbPass, dbName, dbTable, dirMigrate, dirImpementation) {
        this.dbHost = dbHost;
        this.dbPort = dbPort;
        this.dbUser = dbUser;
        this.dbPass = dbPass;
        this.dbName = dbName;
        this.dbTable = dbTable;
        this.dirMigrate = dirMigrate;
        this.dirImplementation = dirImpementation;
    }

    getDbHost() {
        return this.dbHost;
    }

    getDbPort() {
        return this.dbPort;
    }

    getDbUser() {
        return this.dbUser;
    }

    getDbPass() {
        return this.dbPass;
    }

    getDbName() {
        return this.dbName;
    }

    getDbTable() {
        return this.dbTable;
    }

    getDirMigrate() {
        return this.dirMigrate;
    }

    getDirImplementation() {
        return this.dirImplementation;
    }
}

module.exports = Config;
