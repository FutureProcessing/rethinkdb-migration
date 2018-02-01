class RethinkConnectionParams {
    setHost(host) {
        this.host = host;
        return this;
    }

    setPort(port) {
        this.port = port;
        return this;
    }

    setDb(db) {
        this.db = db;
        return this;
    }

    setUser(user) {
        this.user = user;
        return this;
    }

    setPassword(password) {
        this.password = password;
        return this;
    }
}

module.exports = RethinkConnectionParams;
