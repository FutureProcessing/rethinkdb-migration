class Config {
    constructor(dbHost, dbPort, dbUser, dbPass, dbName, dbTable, dirMigrate, dirImpementation, timeout) {
        this.dbHost = dbHost;
        this.dbPort = dbPort;
        this.dbUser = dbUser;
        this.dbPass = dbPass;
        this.dbName = dbName;
        this.dbTable = dbTable;
        this.dirMigrate = dirMigrate;
        this.dirImplementation = dirImpementation;
        this.timeout = timeout || 60000;
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
        return process.cwd() + '/' + this.dirMigrate;
    }

    getDirImplementation() {
        return this.dirImplementation;
    }

    getTimeout() {
        return this.timeout;
    }
}

module.exports = Config;
