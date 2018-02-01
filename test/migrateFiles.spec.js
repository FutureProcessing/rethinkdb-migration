/*global describe, before, after, it */

'use strict';

const sinon = require('sinon');
const fs = require('fs');
const expect = require('chai').expect;

const MigrateFiles = require('./../src/migrateFiles');

const FAKE_PATH = 'fake/path';

// given
const coreMigrationFiles = [
    '20180126_1000-init.js',
    '20180126_1010-seed.js',
    '20180126_1020-test.js'
];

const envMigrationFiles = [
    '20180130_1030-init.js',
    '20180130_1040-seed.js',
    '20180130_1050-test.js'
];

describe('Migrate files', () => {
    before(() => {
        // when.
        sinon.stub(fs, 'readdirSync').callsFake((path) => {
            if (path === FAKE_PATH + '/core') {
                return coreMigrationFiles;
            }
            if (path === FAKE_PATH + '/stage') {
                return envMigrationFiles;
            }
            return [];
        });
    });

    after(() => {
        fs.readdirSync.restore();
    });

    // then
    it('should return files list', () => {
        const migrateFiles = new MigrateFiles(FAKE_PATH, 'stage');
        const expectation = [
            { name: coreMigrationFiles[0], path: FAKE_PATH + '/core' },
            { name: coreMigrationFiles[1], path: FAKE_PATH + '/core' },
            { name: coreMigrationFiles[2], path: FAKE_PATH + '/core' },
            { name: envMigrationFiles[0], path: FAKE_PATH + '/stage' },
            { name: envMigrationFiles[1], path: FAKE_PATH + '/stage' },
            { name: envMigrationFiles[2], path: FAKE_PATH + '/stage' }
        ];
        expect(migrateFiles.getList()).to.deep.equal(expectation);
    });
});
