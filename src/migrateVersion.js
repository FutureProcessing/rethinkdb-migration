const _ = require('lodash');

class MigrateVersion {
    /**
     * @param {string} version Migrate version in format `\d+_\d+`. Example: 1_1
     * @param {RegExp} filePattern
     */
    constructor(version, filePattern) {
        this.version = version;
        this.filePattern = filePattern;
        this.parsedVersion = this.getParsedVersionFromString(this.version);
    }

    /**
     * @return {string|*}
     */
    getVersion() {
        return this.version;
    }

    /**
     * @param {string} fileName
     * @return {number}
     */
    compare(fileName) {
        const version = this.getParsedVersionFromString(fileName);

        if (version === this.parsedVersion) {
            return 0;
        }

        if (version > this.parsedVersion) {
            return 1;
        }

        return -1;
    }

    /**
     * @param {string} name
     * @return {string}
     */
    getVersionFromString(name) {
        const match = name.match(this.filePattern);
        return _.first(match);
    }
    /**
     * @param {string} name
     * @return {number}
     */
    getParsedVersionFromString(name) {
        if (_.isNull(name)) {
            return 0;
        }

        const match = name.match(this.filePattern);
        return parseInt(_.first(match).replace('_', ''));
    }
}

module.exports = MigrateVersion;
