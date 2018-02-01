class MigrateModel {
    /**
     * @param {string} id
     * @return {MigrateModel}
     */
    setId(id) {
        this.id = id;
        return this;
    }

    /**
     * @return {string|*}
     */
    getId() {
        return this.id;
    }

    /**
     * @param {Date} date
     * @return {MigrateModel}
     */
    setDate(date) {
        this.date = date;
        return this;
    }

    /**
     * @return {Date|*}
     */
    getDate() {
        return this.data;
    }

    /**
     * @param {string} fileName
     * @return {MigrateModel}
     */
    setFileName(fileName) {
        this.fileName = fileName;
        return this;
    }

    /**
     * @return {string|*}
     */
    getFileName() {
        return this.fileName;
    }

    /**
     * @param {string} version
     * @return {MigrateModel}
     */
    setVersion(version) {
        this.version = version;
        return this;
    }

    /**
     * @return {string|*}
     */
    getVersion() {
        return this.version;
    }
}

module.exports = MigrateModel;
